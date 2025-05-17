"use server";

import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { SettingsPage } from "@/components/entities/user/page/settings";

export default async function SettingsRender() {
  const session = await auth();
  if (!session) {
    redirect(`/signin`);
    return null;
  }
  return <SettingsPage />;
}
