"use server";
import bcrypt from "bcryptjs";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";

export const handleUpdate = async (
  field: string,
  value: string,
  session: any
) => {
  try {
    const userId = session?.user?.id ?? "";
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      if (field === "password") {
        value = await bcrypt.hash(value, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { [field]: value },
      });

      return updatedUser; // Возвращаем актуальные данные пользователя
    }
    return null;
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    throw error;
  }
};
