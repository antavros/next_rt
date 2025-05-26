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

// app/[category]/page.tsx
export default async function categoryRender({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string };
}) {
  // params и searchParams уже распакованы, можно сразу читать свойства
  const { category } = params;
  const allowedCategories = [
    "movie",
    "tv-series",
    "cartoon",
    "animated-series",
    "anime",
    "person",
    "announced",
  ];
  if (!allowedCategories.includes(category)) {
    redirect(`/`);
  }

  // Поскольку searchParams — plain object, читаем сразу
  const page = searchParams.page ?? "1";
  const filters = {
    genre: searchParams.genre,
    year: searchParams.year,
    rating: searchParams.rating,
  };

  const { details, metadata } = await fetchCategoryDetailsAndMetadata(
    category,
    page,
    filters
  );

  // Определение заголовка таблицы
  const titlesMap: Record<string, string> = {
    movie: "Фильмы",
    "tv-series": "Сериалы",
    cartoon: "Мультфильмы",
    "animated-series": "Анимационные сериалы",
    anime: "Аниме",
    person: "Персоны",
    announced: "Анонсированные",
  };
  const tableTitle = titlesMap[category] ?? "RATETABLE";

  return (
    <TitleTable
      TableTitle={tableTitle}
      details={details?.data}
      pagination={details?.pagination}
    />
  );
}
