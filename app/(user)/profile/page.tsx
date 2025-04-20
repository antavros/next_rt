"use server";

import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";

import { ProfilePage } from "@/components/entities/User/Page/Profile";

export async function getTitlesList(type: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const filter = {};
  switch (type) {
    case "visited":
      filter.visited = true;
      break;
    case "viewed":
      filter.viewed = true;
      break;
    case "favourite":
      filter.favourite = true;
      break;
    case "bookmark":
      filter.bookmark = true;
      break;
    default:
      return [];
  }

  const titles = await prisma.userTitle.findMany({
    where: {
      userId: session.user.id,
      ...filter,
    },
    include: {
      title: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return titles.map((userTitle) => userTitle.title);
}

export default async function ProfileRender() {
  const session = await auth();
  if (!session) {
    redirect(`/signin`);
    return null;
  }
  const [visitedTitles, viewedTitles, favouriteTitles, bookmarkedTitles] =
    await Promise.all([
      getTitlesList("visited"),
      getTitlesList("viewed"),
      getTitlesList("favourite"),
      getTitlesList("bookmark"),
    ]);

  return (
    <ProfilePage
      visitedTitles={visitedTitles}
      viewedTitles={viewedTitles}
      favouriteTitles={favouriteTitles}
      bookmarkedTitles={bookmarkedTitles}
    />
  );
}
