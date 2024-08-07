import NextAuth from "next-auth";
import "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

import { getUserFromDb, checkUserExists, registerUser } from "./serverActions";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    updateAge: 24 * 60 * 60, // 24 часа
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    generateSessionToken: () => {
      return `session_${Math.random().toString(36).substring(2)}`;
    },
  },
  pages: {
    signIn: "/user/signin",
    error: "/user/signin",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
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
        password: { label: "password", type: "password" },
        login: { label: "login", type: "text" },
        email: { label: "email", type: "email" },
      },
      authorize: async (credentials: any) => {
        try {
          const { password, email, login } = await signInSchema.parseAsync(
            credentials
          );
          const user = await getUserFromDb(password, email);
          if (!user) {
            const existingUser = await checkUserExists(password, email);
            if (existingUser) {
              throw new Error("Invalid password");
            } else {
              const newUser = await registerUser(password, email, login);
              return newUser;
            }
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(`Validation error: ${error}`);
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      if (user) token.id = user.id;

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;

      return session;
    },
  },
});
