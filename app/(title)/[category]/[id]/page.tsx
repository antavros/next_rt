// app/[category]/[id]/page.tsx
"use server";

import React from "react";
import { redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { TitlePage } from "@/components/entities/title/page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { markTitleVisited } from "@/components/entities/user/shared";

// Список допустимых категорий для просмотра тайтла
const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
  "person",
] as const;
type AllowedCategory = (typeof allowedCategories)[number];

// Проверка, что категория из params допустима
function isAllowedCategory(category: string): category is AllowedCategory {
  return (allowedCategories as readonly string[]).includes(category);
}

// Валидация того, что пришедшие детали соответствуют ожидаемой категории
function isValidDetails(details: any, category: AllowedCategory): boolean {
  if (!details) return false;
  // Для "person" всегда true, иначе проверяем совпадение типа
  return category === "person" || details.type === category;
}

// --- 1) Генерация метаданных для страницы тайтла ---
export async function generateMetadata(
  props: { params: Promise<{ category: string; id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 1.1. Await params, чтобы получить category и id
  const { category, id } = await props.params;
  if (!isAllowedCategory(category)) {
    return {
      title: "Неизвестная категория",
      description: "Категория не поддерживается",
    };
  }

  // 1.2. Запрашиваем детали и метаданные
  const { metadata } = await fetchDetailsAndMetadata(category, id, parent);
  return metadata;
}

export default async function TitlePageRender(props: {
  params: Promise<{ category: string; id: string }>;
}): Promise<JSX.Element> {
  const { category, id } = await props.params;

  if (!isAllowedCategory(category)) {
    redirect("/");
  }

  const categoryKey = category as AllowedCategory;
  const idNum = parseInt(id, 10);

  if (isNaN(idNum) || idNum < 250 || idNum > 10_000_000) {
    redirect("/");
  }

  const { details } = await fetchDetailsAndMetadata(
    categoryKey,
    idNum,
    {} as ResolvingMetadata
  );

  if (!isValidDetails(details, categoryKey)) {
    redirect("/");
  }

  if (categoryKey !== "person" && details) {
    const { type, name, enName, sDescription, posters } = details;
    await markTitleVisited(id, type, name, enName, sDescription, posters);
  }

  return <TitlePage details={details} />;
}
