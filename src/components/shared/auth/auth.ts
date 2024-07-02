import NextAuth from "next-auth";
import "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { signInSchema } from "@/components/lib/zod";

const prisma = new PrismaClient();

const getUserFromDb = async (
  password: string,
  nameOrEmail?: string,
  email?: string,
  login?: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        ...(nameOrEmail ? [{ email: nameOrEmail }, { name: nameOrEmail }] : []),
        ...(email ? [{ email: email }] : []),
        ...(login ? [{ name: login }] : []),
      ],
    },
  });

  if (user && (await bcrypt.compare(password, user.password ?? ""))) {
    return user;
  } else {
    return null;
  }
};

const checkUserExists = async (
  nameOrEmail?: string,
  email?: string,
  login?: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        ...(nameOrEmail ? [{ email: nameOrEmail }, { name: nameOrEmail }] : []),
        ...(email ? [{ email: email }] : []),
        ...(login ? [{ name: login }] : []),
      ],
    },
  });
  return user;
};

export const registerUser = async (
  password: string,
  login?: string,
  email?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: (login ?? "").trim(),
      email: (email ?? "").trim(),
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
        nameOrEmail: { label: "nameOrEmail", type: "text" },
        login: { label: "login", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { nameOrEmail, login, email, password } =
            await signInSchema.parseAsync(credentials);
          const user = await getUserFromDb(password, nameOrEmail, email, login);
          if (!user) {
            const existingUser = await checkUserExists(
              nameOrEmail,
              email,
              login
            );
            if (existingUser) {
              throw new Error("Invalid password");
            } else {
              const newUser = await registerUser(password, login, email);
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
});
