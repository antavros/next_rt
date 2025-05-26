"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { TitlePage } from "@/components/entities/title/page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { markTitleVisited } from "@/components/entities/user/shared";

// Допустимые категории
const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
  "person",
] as const;

type AllowedCategory = typeof allowedCategories[number];

// Проверка допустимости категории
function isAllowedCategory(category: string): category is AllowedCategory {
  return allowedCategories.includes(category as AllowedCategory);
}

// Проверка валидности данных
function isValidDetails(details: any, category: AllowedCategory): boolean {
  if (!details) return false;
  if (category === "person") return true;
  return details?.type === category;
}

// Генерация метаданных
export async function generateMetadata(
  { params }: { params: { category: string; id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, id } = params;
  if (!isAllowedCategory(category)) {
    return {
      title: "Неизвестная категория",
      description: "Категория не поддерживается",
    };
  }

  const { metadata } = await fetchDetailsAndMetadata(category, id, parent);
  return metadata;
}

// Рендер страницы
export default async function TitlePageRender({
  params,
}: {
  readonly params: { category: string; id: string };
}) {
  const { category, id } = params;

  if (!isAllowedCategory(category)) {
    redirect("/");
  }

  const { details } = await fetchDetailsAndMetadata(
    category,
    id,
    {} as ResolvingMetadata
  );

  if (!isValidDetails(details, category)) {
    redirect(`/${details?.type ?? "error"}`);
  }

  // Отметка о просмотре только если это не персона
  if (category !== "person") {
    const { type, name, enName, sDescription, posters } = details;
    await markTitleVisited(id, type, name, enName, sDescription, posters);
  }

  return <TitlePage details={details} />;
}
