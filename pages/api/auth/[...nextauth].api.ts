import { HOME_PATH } from "@/constants"
import { prisma } from "@/lib/api/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: HOME_PATH,
    signOut: HOME_PATH,
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        id: user.id,
      },
    }),
  },
})
