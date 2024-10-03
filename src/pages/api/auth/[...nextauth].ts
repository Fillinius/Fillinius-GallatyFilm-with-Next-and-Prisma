import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProveder from 'next-auth/providers/credentials'
import { prisma } from '../../../server/db'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProveder({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (user?.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = Number(token.sub)

      return session
    },
  },
}
export default NextAuth(authOptions)
