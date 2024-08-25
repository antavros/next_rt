"use server";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";

import { UserRate } from "./ui";

export async function UserRateRender() {
  return <UserRate />;
}
