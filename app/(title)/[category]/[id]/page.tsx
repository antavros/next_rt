"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { TitlePage } from "@/components/entities/Title/Page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { addTitle, getTitleFromDb, markTitleVisited } from "./serverActions";

// Генерация метаданных
export async function generateMetadata(
  { params }: { params: { category: string, id: string; } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const { metadata } = await fetchDetailsAndMetadata(id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({
  params,
}: {
  params: { category: string, id: string; };
}) {
  const { category, id } = await params;
  const allowedCategories = new Set([
    "movie", "tv-series", "cartoon", "animated-series", "anime", "person",
  ]);

  if (!allowedCategories.has(category)) {
    redirect(`/`);
  }
  const { details } = await fetchDetailsAndMetadata(
    id,
    {} as ResolvingMetadata
  );

  if (details.type !== category) {
    redirect(`/${details.type}/${id}`);
    return;
  }

  const { type, name, enName, sDescription, poster } = details;

  let title = await getTitleFromDb(id);

  if (!title) {
    title = await addTitle(id, type, name, enName, sDescription, poster);
  }

  // Вызываем обновление статуса посещения
  await markTitleVisited(id);

  return <TitlePage details={details} />;
}
