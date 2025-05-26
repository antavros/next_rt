// app/[category]/page.tsx
"use server";

import { redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

// Ваша утилита, возвращающая { details, metadata }
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { TitleTable } from "@/components/entities/title/features/table";

// 1) Список категорий и тайпинг
const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
  "person",
  "announced",
] as const;
type AllowedCategory = typeof allowedCategories[number];

// 2) Генерация метаданных — params приходит как Promise<...>
export async function generateMetadata(
  props: {
    params: Promise<{ category: string }>;
    // если нужны метаданные, которые зависят от query:
    // searchParams: Promise<{ [key: string]: string | undefined }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await props.params;
  if (!allowedCategories.includes(category as AllowedCategory)) {
    return {
      title: "Категория не найдена",
      description: "Указанная категория не поддерживается.",
    };
  }
  const { metadata } = await fetchCategoryDetailsAndMetadata(category);
  return metadata;
}

// 3) Асинхронная страница
export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    genre?: string;
    year?: string;
    rating?: string;
  }>;
}) {
  // 4) await params и searchParams
  const { category: rawCategory } = await props.params;
  const { page: rawPage, genre, year, rating } = await props.searchParams;

  const category = rawCategory as AllowedCategory;
  if (!allowedCategories.includes(category)) {
    redirect("/"); // некорректная категория
  }

  // 5) Собираем фильтры и номер страницы
  const page = rawPage ?? "1";
  const filters = { genre, year, rating };

  // 6) Получаем данные
  const { details, pagination } = await fetchCategoryDetailsAndMetadata(
    category,
    page,
    filters
  );

  // 7) Заголовок таблицы
  const titlesMap: Record<AllowedCategory, string> = {
    movie: "Фильмы",
    "tv-series": "Сериалы",
    cartoon: "Мультфильмы",
    "animated-series": "Мультсериалы",
    anime: "Аниме",
    person: "Персоны",
    announced: "Анонсированные",
  };
  const tableTitle = titlesMap[category];

  return (
    <TitleTable
      TableTitle={tableTitle}
      details={details}
      pagination={pagination}
    />
  );
}
