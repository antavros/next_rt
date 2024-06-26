import NextAuth from "next-auth";
import "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const {
  handlers,
  auth,
  signIn,
  signOut,
  register
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
});

export async function registerUser(email: string, password: string, name?: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        accounts: {
          create: {
            provider: "credentials",
            type: "credentials",
            providerAccountId: email,
            password // здесь нужно захэшировать пароль, перед сохранением
          }
        }
      }
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}
  