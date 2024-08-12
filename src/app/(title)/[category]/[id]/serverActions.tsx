import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// Вынесем функцию markTitleVisited из основного компонента
export async function markTitleVisited(id: string) {
  const session = await auth();
  if (session?.user?.id) {
    const userId = session.user.id;

    const existingUserTitle = await prisma.userTitle.findUnique({
      where: {
        userId_titleId: {
          userId,
          titleId: id,
        },
      },
    });

    if (existingUserTitle) {
      await prisma.userTitle.update({
        where: {
          userId_titleId: {
            userId,
            titleId: id,
          },
        },
        data: {
          visited: true,
        },
      });
    } else {
      await prisma.userTitle.create({
        data: {
          userId,
          titleId: id,
          visited: true,
        },
      });
    }
  }
}
