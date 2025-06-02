// app/[category]/page.tsx
"use server";

import React from "react";
import { redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { TitleTable } from "@/components/entities/title/features/table";
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/serverUtils";

// 1) Список допустимых категорий и тайпинг
const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
  "person",
  "announced",
] as const;
type AllowedCategory = (typeof allowedCategories)[number];

// 2) Человекочитаемые заголовки для таблицы
const titlesMap: Record<AllowedCategory, string> = {
  movie: "Фильмы",
  "tv-series": "Сериалы",
  cartoon: "Мультфильмы",
  "animated-series": "Мультсериалы",
  anime: "Аниме",
  person: "Персоны",
  announced: "Анонсированные",
};

// 3) Генерация метаданных
export async function generateMetadata(
  props: { params: Promise<{ category: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ожидаем params, так как он приходит как Promise
  const { category } = await props.params;
  const categoryParam = category as AllowedCategory;

  if (!allowedCategories.includes(categoryParam)) {
    return {
      title: "Категория не найдена",
      description: "Указанная категория не поддерживается.",
    };
  }

  const { metadata } = await fetchCategoryDetailsAndMetadata(categoryParam);
  return metadata;
}

// 4) Основная страница категории
export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    genre?: string;
    year?: string;
    rating?: string;
  }>;
}): Promise<JSX.Element> {
  // 4.1. Await params и searchParams
  const { category: rawCategory } = await props.params;
  const { page: rawPage, genre, year, rating } = await props.searchParams;

  const category = rawCategory as AllowedCategory;
  if (!allowedCategories.includes(category)) {
    // Если категория не поддерживается — перенаправляем на главную
    redirect("/");
  }

  // 4.2. Параметр page (если не указан — по умолчанию "1")
  const page = rawPage ?? "1";
  const filters = { genre, year, rating };

  // 4.3. Делаем запрос за деталями и пагинацией
  const { details, pagination } = await fetchCategoryDetailsAndMetadata(
    category,
    page,
    filters
  );

  // 4.4. Заголовок таблицы из сопоставления titlesMap
  const tableTitle = titlesMap[category];

  return (
    <TitleTable
      TableTitle={tableTitle}
      details={details}
      pagination={pagination}
    />
  );
}
