"use server";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export const getTitleFromDb = async (id: string) => {
  console.log("Получение тайтла с ID:", id);

  try {
    const title = await prisma.title.findFirst({
      where: { id: String(id) }, // Убеждаемся, что id — строка
    });
    return title;
  } catch (error) {
    console.error("Ошибка при получении тайтла из БД:", error);
    return null;
  }
};

export const saveUserRating = async ({
  userId,
  titleId,
  rating,
}: {
  userId: string;
  titleId: string;
  rating: number;
}) => {
  try {
    await prisma.userTitle.upsert({
      where: {
        userId_titleId: { userId, titleId: String(titleId) }, // id в строке
      },
      update: { rating },
      create: { userId, titleId: String(titleId), rating },
    });

    console.log("Рейтинг успешно сохранён");
  } catch (error) {
    console.error("Ошибка при сохранении рейтинга:", error);
    throw new Error("Не удалось сохранить рейтинг");
  }
};

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
        id: String(id), // Приведение id к строке
        type,
        name,
        engname,
        description,
        image,
      },
    });
    return title;
  } catch (error) {
    console.error("Ошибка при добавлении тайтла в БД:", error);
    return null;
  }
};

export async function markTitleVisited(
  id: string,
  type: string,
  name: string,
  engname: string,
  description: string,
  image: string
) {
  try {
    const session = await auth();
    if (!session?.user?.id) return;
    const userId = session.user.id;

    await prisma.$transaction([
      prisma.title.upsert({
        where: { id: String(id) },
        update: {},
        create: { id: String(id), type, name, engname, description, image },
      }),
      prisma.userTitle.upsert({
        where: {
          userId_titleId: {
            userId,
            titleId: String(id),
          },
        },
        update: { visited: true },
        create: { userId, titleId: String(id), visited: true },
      }),
    ]);

    console.log("Тайтл помечен как посещённый");
  } catch (error) {
    console.error("Ошибка при пометке тайтла как посещённого:", error);
  }
}

export async function markTitle(payload: {
  mark: "favourite" | "viewed" | "bookmark";
  id: string | number;
  type: string;
  name: string;
  engname: string;
  description: string;
  image: string;
}) {
  try {
    if (!payload || typeof payload !== "object") {
      throw new Error("Некорректный payload");
    }

    const { mark, id, type, name, engname, description, image } = payload;
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Пользователь не авторизован");
    }

    const userId = session.user.id;
    const titleId = String(id).trim();

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error(`Пользователь с ID ${userId} не найден`);
    }

    // Проверяем, существует ли тайтл
    const existingTitle = await prisma.title.findUnique({
      where: { id: titleId },
    });

    if (!existingTitle) {
      await prisma.title.create({
        data: { id: titleId, type, name, engname, description, image },
      });
    }

    // Проверяем, существует ли запись о связи пользователя с тайтлом
    const userTitle = await prisma.userTitle.findUnique({
      where: { userId_titleId: { userId, titleId } },
    });

    if (userTitle && userTitle[mark]) {
      // Если метка уже установлена, снимаем её
      await prisma.userTitle.update({
        where: { userId_titleId: { userId, titleId } },
        data: { [mark]: false },
      });
      console.log(`Метка ${mark} снята с тайтла (${titleId})`);
    } else {
      // Если метки нет, устанавливаем её
      await prisma.userTitle.upsert({
        where: { userId_titleId: { userId, titleId } },
        update: { [mark]: true },
        create: { userId, titleId, [mark]: true },
      });
      console.log(`Тайтл (${titleId}) успешно помечен как ${mark}`);
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса тайтла:", error);
    throw new Error("Не удалось обновить статус тайтла");
  }
}
