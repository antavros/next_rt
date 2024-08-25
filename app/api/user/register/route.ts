import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";


export async function POST(request: any) {
  const body = await request.json();
  const { email, password, name } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const emailExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const nameExist = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (emailExist && nameExist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: email,
      name: name,
    },
  });

  return NextResponse.json(user);
}
