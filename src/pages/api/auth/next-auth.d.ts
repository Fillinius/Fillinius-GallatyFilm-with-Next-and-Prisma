import { User as dbUser } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: number
    email: string
    name: string
  }
  interface Session {
    user: dbUser
  }
}
