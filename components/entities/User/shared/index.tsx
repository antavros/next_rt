"use server";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

// Функция для получения титула из базы данных
export const getTitleFromDb = async (id: string) => {
  console.log(id);

  try {
    const title = await prisma.title.findFirst({
      where: { id },
    });
    return title;
  } catch (error) {
    console.error("Error fetching title from database:", error);
    return null;
  }
};

// Функция для добавления титула в базу данных
export const addTitle = async (
  id: string,
  type: string,
  name: string,
  engname: string,
  description: string,
  image: string
) => {
  try {
    const title = await prisma.title.create({
      data: {
        id,
        type,
        name,
        engname,
        description,
        image,
      },
    });
    return title;
  } catch (error) {
    console.error("Error adding title to database:", error);
    return null;
  }
};

// Функция для отметки титула как посещённого
export async function markTitleVisited(
  id: string,
  type: string,
  name: string,
  engname: string,
  description: string,
  image: string
) {
  const session = await auth();
  if (session?.user?.id) {
    const userId = session.user.id;

    // Пытаемся найти титул
    let title = await getTitleFromDb(id);

    // Если титул не найден, добавляем его
    if (!title) {
      title = await addTitle(id, type, name, engname, description, image);
    }

    // После добавления титула отмечаем его как посещённый
    await prisma.userTitle.upsert({
      where: {
        userId_titleId: {
          userId,
          titleId: id,
        },
      },
      update: {
        visited: true,
      },
      create: {
        userId,
        titleId: id,
        visited: true,
      },
    });
  }
}

export async function markTitle(payload: {
  mark: "favourite" | "viewed";
  id: string;
  type: string;
  name: string;
  engname: string;
  description: string;
  image: string;
}) {
  if (!payload) {
    throw new Error("Payload must be provided and not null");
  }

  const { mark, id, type, name, engname, description, image } = payload;
  const session = await auth();
  console.log(id);

  if (session?.user?.id) {
    const userId = session.user.id;
    console.log(id);
    // Пытаемся найти титул
  let existingRating = await prisma.userTitle.findFirst({
    where: { userId, titleId },
  });
    // Если титул не найден, добавляем его
    if (!existingRating) {
      existingRating = await addTitle(
        id,
        type,
        name,
        engname,
        description,
        image
      );
    }

    // Динамическое обновление поля
    await prisma.userTitle.upsert({
      where: {
        userId_titleId: {
          userId,
          titleId: id,
        },
      },
      update: {
        [mark]: true, // Исправленный синтаксис
      },
      create: {
        userId,
        titleId: id,
        [mark]: true, // Добавление с нужным полем
      },
    });
  }
}
