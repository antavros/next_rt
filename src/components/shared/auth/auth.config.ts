import Google from "next-auth/providers/google"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"

import { saltAndHashPassword } from "@/lib/password"
import { getUserFromDb } from "@/lib/db"

import type { NextAuthConfig } from "next-auth"

export default {
  providers:
    [
      Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
          const { email, password } = await signInSchema.parseAsync(credentials)
          const pwHash = saltAndHashPassword(password)
          user = await getUserFromDb(email, pwHash)
          if (!user) {
            throw new Error("User not found.")
          }
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig