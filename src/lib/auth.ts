import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'

type CredentialsDTO = {
  email: string
  password: string
}

const db = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as CredentialsDTO

        const dosen = await db.dosen.findUnique({
          where: { email },
        })

        if (!dosen) {
          return null
        }

        const isValid = await bcrypt.compare(password, dosen.password)

        if (!isValid) {
          return null
        }

        const payload = {
          id: dosen.id,
          name: dosen.nama,
          email: dosen.email,
        }

        return payload
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('user', user)

        token = { ...token, ...user }
      }
      return token
    },
    async session({ session }) {
      return session
    },
  },
}
