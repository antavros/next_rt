import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    name: string | null;
    email: string;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Account {}

  interface Session {
    user: {
      id: string;
      role: Role;
      name: string | null;
      email: string;
      password: string | null;
      emailVerified: Date | null;
      image: string | null;
      bio: string | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    name: string | null;
    email: string;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  interface Token {
    id: string;
    role: string;
    name: string;
    email: string;
    image: string;
  }
}
interface SignInResponse {
  notRegistered?: boolean;
}
