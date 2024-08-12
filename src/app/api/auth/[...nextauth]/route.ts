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

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getUserFromDb = async (password: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { password: password }],
    },
  });

  if (user && (await bcrypt.compare(password, user.password ?? ""))) {
    return user;
  } else {
    return null;
  }
};

export const registerUser = async (
  password: string,
  email: string,
  login?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: email,
      name: login,
    },
  });
  return user;
};

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
            const existingUser = await getUserFromDb(password, email);
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
  basePath: "/api/auth",
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user?.id ?? "";
        token.role = user?.role ?? "";
        token.name = user?.name ?? "";
        token.email = user?.email ?? "";
        token.image = user?.image ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
});

export const { GET, POST } = handlers;
