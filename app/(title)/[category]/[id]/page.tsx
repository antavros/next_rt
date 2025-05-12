"use server";

import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { TitlePage } from "@/components/entities/title/page";
import { fetchDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import { markTitleVisited } from "@/components/entities/user/shared";

// ✅ Список допустимых категорий
const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
  "person",
];

// ✅ Проверка, допустима ли категория
function isAllowedCategory(category: string): boolean {
  return allowedCategories.includes(category);
}

// ✅ Проверка, соответствует ли тип деталей категории
function isValidDetailsForCategory(details: any, category: string): boolean {
  if (!details) return false;
  if (category === "person") return true;
  return details.type === category;
}

// ✅ Генерация метаданных
export async function generateMetadata(
  { params }: { params: { category: string; id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, id } = params;
  const { metadata } = await fetchDetailsAndMetadata(category, id, parent);
  return metadata;
}

// ✅ Главный компонент страницы
export default async function TitlePageRender({
  params,
}: {
  readonly params: { category: string; id: string };
}) {
  const { category, id } = params;

  if (!isAllowedCategory(category)) {
    redirect(`/`);
  }

  const { details } = await fetchDetailsAndMetadata(
    category,
    id,
    {} as ResolvingMetadata
  );

  if (!isValidDetailsForCategory(details, category)) {
    redirect(`/${details?.type ?? "error"}`);
  }

  if (category !== "person") {
    const { type, name, enName, sDescription, posters } = details;
    await markTitleVisited(id, type, name, enName, sDescription, posters);
  }

  return <TitlePage details={details} />;
}
