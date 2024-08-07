import NextAuth, { DefaultSession } from "next-auth";

import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      emailVerified?: string;
      nameOrEmail?: string;
      id: string;
      name?: string;
      username?: string;
      email?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    emailVerified?: string;
    role?: string;
    nameOrEmail?: string;
    id: string;
    name?: string;
    username?: string;
    email?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    emailVerified?: DateTime;
    role?: string;
    nameOrEmail?: string;
    id: string;
    name?: string;
    username?: string;
    email?: string;
    accessToken?: string;
  }
}
interface SignInResponse {
  notRegistered?: boolean;
}
