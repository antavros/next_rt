"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { TitlePage } from "@/components/entities/Title/Page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { addTitle, getTitleFromDb, markTitleVisited } from "./serverActions";

// Генерация метаданных
export async function generateMetadata(
  { params }: { readonly params: { readonly id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const { metadata } = await fetchDetailsAndMetadata(id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({
  params,
}: {
  readonly params: { readonly id: string; readonly category: string };
}) {
  const id = params.id.toString();
  const category = params.category;
  const allowedCategories = [
    "movie",
    "tv-series",
    "cartoon",
    "animated-series",
    "anime",
  ];

  if (!allowedCategories.includes(category)) {
    return null;
  }

  const { details } = await fetchDetailsAndMetadata(
    id,
    {} as ResolvingMetadata
  );

  if (details.type !== category) {
    redirect(`/${details.type}/${id}`);
    return;
  }

  const type = details.type;
  const name = details.name;
  const engname = details.enName;
  const description = details.sDescription;
  const image = details.poster;

  let title = await getTitleFromDb(id);

  if (!title) {
    title = await addTitle(id, type, name, engname, description, image);
  }

  // Вызываем обновление статуса посещения
  await markTitleVisited(id);

  return <TitlePage details={details} />;
}
