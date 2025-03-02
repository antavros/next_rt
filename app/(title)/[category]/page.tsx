"use server";

import { redirect } from "next/navigation";
import { TitleTable } from "@/components/entities/Title/Table";
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import type { Metadata, ResolvingMetadata } from "next";

// Генерация метаданных для страниц категорий
export async function generateMetadata(
  { params }: { readonly params: { readonly category: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { metadata } = await fetchCategoryDetailsAndMetadata(params.category);
  return metadata;
}

// Рендеринг страницы категорий
export default async function categoryRender({
  searchParams,
  params,
}: {
  readonly params: any;
  searchParams: { [key: string]: string };
}) {
  const allowedCategories = [
    "movie",
    "tv-series",
    "cartoon",
    "animated-series",
    "anime",
    "person",
    "announced",
  ];
  const category = params.category;

  // Проверка, является ли категория допустимой
  if (!allowedCategories.includes(category)) {
    redirect(`/`);
  }

  const page = searchParams["page"] ?? "1";
  const { details } = await fetchCategoryDetailsAndMetadata(
    params.category,
    page
  );

  // Определение заголовка таблицы в зависимости от категории
  let tableTitle = "RATETABLE";
  switch (category) {
    case "movie":
      tableTitle = "Фильмы";
      break;
    case "tv-series":
      tableTitle = "Сериалы";
      break;
    case "cartoon":
      tableTitle = "Мультфильмы";
      break;
    case "animated-series":
      tableTitle = "Анимационные сериалы";
      break;
    case "anime":
      tableTitle = "Аниме";
      break;
    case "person":
      tableTitle = "Персоны";
      break;
    case "announced":
      tableTitle = "Анонсированные";
      break;
  }

  return (
    <TitleTable
      TableTitle={tableTitle}
      details={details?.data}
      pagination={details?.pagination}
    />
  );
}
