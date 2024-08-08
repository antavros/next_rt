"use server";

import { TitlePageHead } from "./Head";
import { TitlePageBody } from "./Body";
import { TitleRate } from "@/components/entities/Title/Rate/";
import "./style.css";
import { auth } from "@/components/shared/auth/auth";
import { PrismaClient } from "@prisma/client";
import { UserSessionButton } from "./UserSessionButton"; // Импортируем клиентский компонент

const prisma = new PrismaClient();

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

export async function TitlePage({ details }: { readonly details: any }) {
  const session = await auth();

  const id = details.id.toString(); // Преобразуем id в строку
  const name = details.name;
  const engname = details.enName;
  const description = details.sDescription;
  const image = details.poster;

  // Проверяем наличие титула в базе данных
  let title = await getTitleFromDb(id);

  // Если титула нет, добавляем его
  if (!title) {
    title = await addTitle(id, name, engname, description, image);
  }

  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitleRate
        personal={details.personal_rating}
        kp={details.kp_rating}
        imdb={details.imdb_rating}
        rt={details.rt_rating}
      />
      <UserSessionButton user={title} /> {/* Передаем информацию о титуле */}
      <TitlePageBody details={details} />
    </section>
  );
}
