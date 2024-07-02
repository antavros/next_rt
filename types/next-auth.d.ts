import NextAuth, { DefaultSession } from "next-auth";

import "next-auth/jwt";

declare module "next-auth" {
  type Session = {
    user: {
      nameOrEmail?: string;
      id?: string;
      name?: string | null;
      username?: string;
      email?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  };

  type User = {
    nameOrEmail?: string;
    id?: string;
    name?: string | null;
    username?: string;
    email?: string;
    accessToken?: string;
  };
}

declare module "next-auth/jwt" {
  // Расширяем интерфейс JWT
  type JWT = {
    nameOrEmail?: string;
    id?: string;
    name?: string | null;
    username?: string;
    email?: string;
    accessToken?: string;
  };
}

type SignInResponse = {
  // other properties
  notRegistered?: boolean; // add this line
};
