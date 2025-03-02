"use server";

import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { SwiperCardTitle } from "@/components/entities/User/widgets/History";

import "./style.css";

export async function getTitlesList(type) {
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

export async function ProfilePage() {
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
    <>
      {visitedTitles.length > 0 && (
        <section className="history block">
          <h1>История</h1>
          <SwiperCardTitle details={visitedTitles} />
        </section>
      )}
      {viewedTitles.length > 0 && (
        <section className="viewed  block">
          <h1>Просмотрено</h1>
          <SwiperCardTitle details={viewedTitles} />
        </section>
      )}
      {favouriteTitles.length > 0 && (
        <section className="favourite  block">
          <h1>Избранное</h1>
          <SwiperCardTitle details={favouriteTitles} />
        </section>
      )}
      {bookmarkedTitles.length > 0 && (
        <section className="bookmarked  block">
          <h1>Закладки</h1>
          <SwiperCardTitle details={bookmarkedTitles} />
        </section>
      )}
    </>
  );
}
