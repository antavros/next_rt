import NextAuth from "next-auth"
import "next-auth/jwt"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const {
  handlers,
  auth,
  signIn,
  signOut 
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    generateSessionToken: () => {
      return "generated_session_token";
    },
    maxAge: 9999999,
    strategy: "jwt",
    updateAge: 9999999,
  },
  ...authConfig,
})