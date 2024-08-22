import NextAuth from "next-auth";
import "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const getUserFromDb = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const registerUser = async (password: string, email: string, name: string) => {
  // Проверка на существующего пользователя
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создание нового пользователя
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: email,
      name: name,
    },
  });

  return user;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    updateAge: 24 * 60 * 60, // 24 часа
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
    newUser: "/",
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
        login: { label: "username", type: "text" },
        email: { label: "email", type: "email" },
      },
      authorize: async (credentials) => {
        try {
          const { password, email } = await signInSchema.parseAsync(
            credentials
          );

          if (!email || !password) {
            throw new Error("Please enter an email and password");
          }

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error("No user found");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(`Validation error: ${error}`);
          }
          console.error("Authorization error:", error);
          throw new Error("Authorization error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      try {
        if (user) {
          token.id = user.id ?? "";
          token.role = user.role ?? "";
          token.name = user.name ?? "";
          token.email = user.email ?? "";
          token.image = user.image ?? "";
        }
        if (trigger === "update" && session) {
          if (session.name) {
            token.name = session.name;
          }
          if (session.email) {
            token.email = session.email;
          }
          if (session.image) {
            token.image = session.image;
          }
          if (session.role) {
            token.role = session.role;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        throw new Error("JWT callback error");
      }
    },
    async session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.role = token.role ?? "";
      session.user.name = token.name ?? "";
      session.user.email = token.email ?? "";
      session.user.image = token.image ?? "";
      return session;
    },
  },
});
