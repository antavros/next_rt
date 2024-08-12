"use server";

import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { SwiperCardTitle } from "@/components/entities/User/History";

import "./style.css";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getVisitedTitles() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const visitedTitles = await prisma.userTitle.findMany({
    where: {
      userId: session.user.id,
      visited: true,
    },
    include: {
      title: true,
    },
    orderBy: {
      updatedAt: "desc", // Сортируем по полю updatedAt в порядке убывания (от новых к старым)
    },
  });

  return visitedTitles.map((userTitle) => userTitle.title);
}

export async function ProfilePage() {
  const session = await auth();
  const visitedTitles = await getVisitedTitles();
  if (!session) {
    redirect(`/signin`);
    return null;
  }

  return (
    <section className="profile">
      <h1>Профиль</h1>
      {visitedTitles.length > 0 && (
        <section className="history block">
          <h3>История</h3>
          <SwiperCardTitle details={visitedTitles} />
        </section>
      )}
      <section className="viewed block">
        <h3>Просмотрено</h3>
      </section>
      <section className="favourite block">
        <h3>Избранное</h3>
      </section>
    </section>
  );
}
