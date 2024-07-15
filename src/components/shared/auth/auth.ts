import NextAuth from "next-auth";
import "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { signInSchema } from "./zod";

const prisma = new PrismaClient();

const getUserFromDb = async (password: string, email: string) => {
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

const checkUserExists = async (password: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { password: password }],
    },
  });
  return user;
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
    signIn: "/",
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
      authorize: async (credentials) => {
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
    jwt({ token, trigger, session }) {
      if (trigger === "update") {
        if (session?.name) {
          token.name = session.name;
        }
        if (session?.email) {
          token.email = session.email;
        }
        if (session?.image) {
          token.picture = session.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.email) {
        session.user.email = token.email;
      }
      if (token?.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
