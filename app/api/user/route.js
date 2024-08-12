import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { name: name }],
      },
    });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Ошибка получения данных пользователя" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(req) {
  const { id, field, value } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { [field]: value },
    });
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Ошибка обновления данных пользователя" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
