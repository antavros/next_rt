"use server";

import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { ProfilePage } from "@/components/entities/User/Page/Profile";

export default async function ProfileRender() {
  const session = await auth();
  if (!session) {
    redirect(`/signin`);
    return null;
  }
  return <ProfilePage />;
}
