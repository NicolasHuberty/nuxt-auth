// server/api/simple-users.ts

import { db } from '../database' // Import the db instance and schema
import { users } from '../database/schema'
import { getServerSession } from '#auth'

// Example: Insert a user
async function insertUser(name: string, email: string, password: string, avatar: string, created_at: number) {
  await db.insert(users).values({ name, email, password, avatar, created_at }).run()
}

// Example: Fetch all users
async function getUserData(userEmail: string) {
  // Assuming userEmail is already validated and sanitized
  try {
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar: users.avatar,
        createdAt: users.createdAt
      })
      .from(users)
      .all()

    // If the user data is found, return it
    if (userData.length > 0) {
      return userData[0]
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Failed to fetch user data')
  }
}

// API handler
export default defineEventHandler(async (event) => {
  // Verify the user session or token
  const session = await getServerSession(event)

  if (!session || !session.user || !session.user.email) {
    // Return unauthorized if no valid session
    return { status: 'unauthenticated!', message: 'You must be logged in to access this resource.' }
  }

  const userEmail = session.user.email
  console.log(userEmail)
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    await insertUser(body.name, body.email, 'password', 'avatar', Date.now())
    return { status: 'User inserted' }
  } else if (event.req.method === 'GET') {
    const userData = await getUserData(userEmail)
    return userData
  } else {
    return { status: 'Method not allowed' }
  }
})
