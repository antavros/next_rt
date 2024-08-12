"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { TitlePage } from "@/components/entities/Title/Page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";

import { UserSessionButton } from "./UserSessionButton"; // Импортируем клиентский компонент
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function markTitleVisited(titleId: string) {
  const session = await auth();
  if (session?.user?.id) {
    const userId = session.user.id;

    // Проверяем, существует ли запись UserTitle
    const existingUserTitle = await prisma.userTitle.findUnique({
      where: {
        userId_titleId: {
          userId: userId,
          titleId: titleId,
        },
      },
    });

    if (existingUserTitle) {
      // Если запись существует, обновляем поле visited
      await prisma.userTitle.update({
        where: {
          userId_titleId: {
            userId: userId,
            titleId: titleId,
          },
        },
        data: {
          visited: true,
        },
      });
    } else {
      // Если записи нет, создаем новую запись с флагом visited
      await prisma.userTitle.create({
        data: {
          userId: userId,
          titleId: titleId,
          visited: true,
        },
      });
    }
  }
}



export const addTitle = async (
  id: string,
  name: string,
  engname: string,
  description: string,
  image: string
) => {
  try {
    const title = await prisma.title.create({
      data: {
        id: id, // id должно быть строкой
        name: name,
        engname: engname,
        description: description,
        image: image,
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
    const title = await prisma.title.findFirst({
      where: { id },
    });
    return title;
  } catch (error) {
    console.error("Error fetching title from database:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};


// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata(
  { params }: { readonly params: { readonly id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const { metadata } = await fetchDetailsAndMetadata(id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({
  params,
}: {
  readonly params: { readonly id: string; readonly category: string };
}) {
  const id = params.id.toString(); // Преобразуем id в строку
  const category = params.category;
  const allowedCategories = [
    "movie",
    "tv-series",
    "cartoon",
    "animated-series",
    "anime",
  ];
  // Проверка, является ли категория допустимой
  if (!allowedCategories.includes(category)) {
    return null;
  }

  const { details } = await fetchDetailsAndMetadata(
    id,
    {} as ResolvingMetadata
  );

  // Проверка, совпадает ли категория с details.type
  if (details.type !== category) {
    // Если не совпадает, перенаправляем на правильный URL
    redirect(`/${details.type}/${id}`);
    return;
  }
  markTitleVisited(id);
  let title = await getTitleFromDb(id);

  return (
    <>
      <UserSessionButton title={title} />
      <TitlePage details={details} />
    </>
  );
}
