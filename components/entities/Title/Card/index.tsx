"use server";

import { ClientTitleCard } from "./ui";
import { addTitle, getTitleFromDb } from "@/components/entities/User/shared";

export async function TitleCard({ details }: { readonly details: any }) {
  const id = details.id.toString(); // Преобразуем id в строку
  const { type, name, enName, sDescription, poster } = details;

  // Проверяем наличие титула в базе данных
  let title = await getTitleFromDb(id);

  // Если титула нет, добавляем его
  if (!title) {
    title = await addTitle(id, type, name, enName, sDescription, poster);
  }

  return <ClientTitleCard details={details} />;
}
