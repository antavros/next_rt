import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id?: string;
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
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id?: string;
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
    id?: string;
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
}
interface SignInResponse {
  notRegistered?: boolean;
}
