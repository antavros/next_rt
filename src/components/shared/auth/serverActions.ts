"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserFromDb = async (password: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { password: password }],
    },
  });

  if (user && (await bcrypt.compare(password, user.password ?? ""))) {
    return user;
  } else {
    return null;
  }
};

export const registerUser = async (
  password: string,
  email: string,
  login?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: email,
      name: login,
    },
  });
  return user;
};
