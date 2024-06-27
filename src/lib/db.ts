// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Ищет пользователя в базе данных по email и хешу пароля.
 * @param email Email пользователя.
 * @param passwordHash Хешированный пароль пользователя.
 * @returns Объект пользователя, если он найден, иначе null.
 */
export async function getUserFromDb(email: string, passwordHash: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && user.password === passwordHash) {
    return user;
  }

  return null;
}

/**
 * Создает нового пользователя в базе данных.
 * @param email Email пользователя.
 * @param password Хешированный пароль пользователя.
 * @param name Имя пользователя (необязательно).
 * @returns Созданный объект пользователя.
 */
export async function createUserInDb(email: string, password: string, name?: string) {
  return prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
}
