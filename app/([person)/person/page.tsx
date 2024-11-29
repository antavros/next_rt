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
  const page = searchParams["page"] ?? "1";
  const { details } = await fetchCategoryDetailsAndMetadata("person", page);

  return (
    <TitleTable
      TableTitle={"Персоны"}
      details={details?.data}
      pagination={details?.pagination}
    />
  );
}
