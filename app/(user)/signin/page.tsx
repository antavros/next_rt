"use server";

import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { SignInPage } from "@/components/entities/User/Page/SignIn";

export default async function SignInRender() {
  const session = await auth();
  if (session) {
    redirect(`/`);
    return null;
  }
  return <SignInPage />;
}
