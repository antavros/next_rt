"use client";

import { getSession } from "next-auth/react"; // Изменен импорт с useSession на getSession
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getSessionUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function markTitleVisited(titleId: string) {
  const user = await getSessionUser();
  if (user?.id) {
    await prisma.userTitle.update({
      where: { userId_titleId: { userId: user.id, titleId } },
      data: { visited: true },
    });
  }
}

export async function toggleFavourite(titleId: string) {
  const user = await getSessionUser();
  if (user?.id) {
    const userTitle = await prisma.userTitle.findUnique({
      where: { userId_titleId: { userId: user.id, titleId } },
    });

    if (userTitle) {
      await prisma.userTitle.update({
        where: { userId_titleId: { userId: user.id, titleId } },
        data: { favourite: !userTitle.favourite },
      });
    } else {
      await prisma.userTitle.create({
        data: {
          userId: user.id,
          titleId,
          favourite: true,
        },
      });
    }
  }
}

export async function rateTitle(titleId: string, rating: number) {
  const user = await getSessionUser();
  if (user?.id) {
    await prisma.userTitle.upsert({
      where: { userId_titleId: { userId: user.id, titleId } },
      update: { rating, viewed: true },
      create: {
        userId: user.id,
        titleId,
        rating,
        viewed: true,
      },
    });
  }
}
