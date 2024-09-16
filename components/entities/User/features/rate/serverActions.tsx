"use server";


import prisma from "@/app/api/auth/[...nextauth]/prismadb";

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
        id: id, // id должно быть строкой
        type: type,
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

export async function TitleCard({ details }: { readonly details: any }) {
  const id = details.id.toString(); // Преобразуем id в строку
  const type = details.type;
  const name = details.name;
  const engname = details.enName;
  const description = details.sDescription;
  const image = details.poster;
  // Проверяем наличие титула в базе данных
  let title = await getTitleFromDb(id);

  // Если титула нет, добавляем его
  if (!title) {
    title = await addTitle(id, type, name, engname, description, image);
  }
  return null;
}
