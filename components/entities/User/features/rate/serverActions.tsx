"use server";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";

export const saveUserRating = async ({
  userId,
  titleId,
  rating,
}: {
  userId: string;
  titleId: string; // Убедитесь, что тип - строка
  rating: number;
}) => {
  try {

    const existingRating = await prisma.userTitle.findFirst({
      where: { userId, titleId },
    });

    if (existingRating) {
      // Обновляем существующий рейтинг
      await prisma.userTitle.update({
        where: { id: existingRating.id },
        data: { rating },
      });
    } else {
      // Создаем новый рейтинг
      await prisma.userTitle.create({
        data: {
          userId,
          titleId,
          rating,
        },
      });
    }

    console.log('Рейтинг успешно сохранен');
  } catch (error) {
    console.error('Ошибка при сохранении рейтинга:', error);
    throw new Error('Не удалось сохранить рейтинг');
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
  } finally {
    await prisma.$disconnect();
  }
};

export const getTitleFromDb = async (id: string) => {
  try {
    const title = await prisma.title.findFirst({ where: { id } });
    return title;
  } catch (error) {
    console.error("Error fetching title from database:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
