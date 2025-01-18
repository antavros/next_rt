"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { TitlePage } from "@/components/entities/Title/Page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { addTitle, getTitleFromDb, markTitleVisited } from "./serverActions";

// Генерация метаданных
export async function generateMetadata(
  { params }: { params: { category: string; id: string; } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, id } = await params;

  const { metadata } = await fetchDetailsAndMetadata(category, id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({
  params,
}: {
  params: { category: string; id: string; };
}) {
  const { category, id } = await params;

  const allowedCategories = new Set([
    "movie", "tv-series", "cartoon", "animated-series", "anime", "person",
  ]);

  // Проверка категории и перенаправление
  if (!allowedCategories.has(category)) {
    redirect(`/`);
    return;
  }

  const { details } = await fetchDetailsAndMetadata(
    category,
    id,
    {} as ResolvingMetadata);

  // Проверка совпадения типа данных и категории
  if (!details || (category !== "person" && details.type !== category)) {
    redirect(`/${details?.type || "error"}`);
    return;
  }

  // Получение данных из базы или добавление нового заголовка
  if (category !== "person") {
    const { type, name, enName, sDescription, poster } = details;
    let title = await getTitleFromDb(id);
    // Обновление статуса посещения
    await markTitleVisited(id);
    if (!title) {
      title = await addTitle(id, type, name, enName, sDescription, poster);
    }
  }

  // Рендер страницы
  return <TitlePage details={details} />;
}
