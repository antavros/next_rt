"use server";

import { TitleTable } from "@/components/entities/Title/Table";
import { Pagination } from "@/components/features/Pagination";
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/clientUtils";
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
  ];
  const category = params.category;
  // Проверка, является ли категория допустимой
  if (!allowedCategories.includes(category)) {
    return null;
  }

  const page = searchParams["page"] ?? "1";
  const { details } = await fetchCategoryDetailsAndMetadata(
    params.category,
    page
  );
  return (
    <>
      <TitleTable details={details?.data} />
      <Pagination pagination={details?.pagination} />
    </>
  );
}
