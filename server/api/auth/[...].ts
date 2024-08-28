import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
  secret: process.env.AUTH_SECRET ?? 'test-123',
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID ?? 'your-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? 'your-client-secret'
    }),
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID ?? 'your-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'your-client-secret'
    }),
  ],
    pages: {
    signIn: '/login/'  // Redirect to custom login page
  }
})
