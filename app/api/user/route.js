import prisma from "../auth/[...nextauth]/prismadb";

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
    console.error("Ошибка при получении пользователя:", error);
    return new Response(
      JSON.stringify({ error: "Ошибка получения данных пользователя" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req) {
  try {
    const { id, field, value } = await req.json();

    if (!id || !field || !value) {
      return new Response(
        JSON.stringify({ error: "Некорректные данные для обновления" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { [field]: value },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    return new Response(
      JSON.stringify({ error: "Ошибка обновления данных пользователя" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
