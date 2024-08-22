"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/auth";
export { UserRate } from "./ui";

export async function UserRateRender() {
  return <UserRate />;
}
