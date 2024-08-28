import { eventHandler } from 'h3'
import { getServerSession } from '#auth'
import { db } from '../../database'
import { users } from '../../database/schema'
export default eventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session || !session.user || !session.user.email) {
    console.log('User is not authenticated')
    return { status: 'unauthenticated!' }
  }

  const userEmail = session.user.email
  console.log('Authenticated user email:', userEmail)
  const userData = await getUserDataByEmail(userEmail)
  console.log(userData)
  return {
    status: 'authenticated!',
    text: 'im protected by an in-endpoint check',
    session
  }
})

async function getUserDataByEmail(email: string) {
    try {
      const userData = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          avatar: users.avatar,
          createdAt: users.createdAt,
        })
        .from(users)
        .where((row) => row.email === email)
        .all();
  
      if (userData.length > 0) {
        return userData[0];
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }