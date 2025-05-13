"use server";

import { redirect } from "next/navigation";
import { TitleTable } from "@/components/entities/title/features/table";
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import type { Metadata, ResolvingMetadata } from "next";

// Генерация метаданных для страниц категорий:
export async function generateMetadata(
  props: { readonly params: Promise<{ readonly category: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await fetchCategoryDetailsAndMetadata(params.category);
  return metadata;
}

// Рендеринг страницы категорий
export default async function categoryRender(props: {
  readonly params: Promise<any>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
