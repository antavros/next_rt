"use server";

import { TitleTable } from "@/components/Entities/Title/Features/Table";
import { Pagination } from "@/components/Features/Pagination";
import { getData } from "@/components/Shared/Api/api";
import { ApiUrl_Title_Search } from "@/components/Shared/Api/url";
import { SearchForm } from "@/components/Widgets/Search/Form";
import type { Metadata, ResolvingMetadata } from "next";

// Функция для извлечения данных и генерации метаданных
async function fetchDetailsAndMetadata(
  searchValue: string,
  page: string,
  parent: ResolvingMetadata
): Promise<{ details: any; metadata: Metadata }> {
  const details = await getData({
    url: `${ApiUrl_Title_Search}${searchValue}&page=${page}`,
  });
  const metadata: Metadata = {
    title: `поиск: ${searchValue}`,
    openGraph: {
      title: `поиск: ${searchValue}`,
    },
    twitter: {
      title: `поиск: ${searchValue}`,
    },
  };

  return { details, metadata };
}

// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata(
  { searchParams }: { readonly searchParams: { [key: string]: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = searchParams["page"] ?? "1";
  const searchValue = searchParams["query"] ?? "5";
  const { metadata } = await fetchDetailsAndMetadata(searchValue, page, parent);
  return metadata;
}

export default async function SearchRender({
  searchParams,
}: {
  readonly searchParams: { [key: string]: string };
}) {
  const page = searchParams["page"] ?? "1";
  const searchValue = searchParams["query"] ?? "5";

  const { details } = await fetchDetailsAndMetadata(
    searchValue,
    page,
    {} as ResolvingMetadata
  );
  return (
    <>
      <SearchForm />
      <TitleTable details={details?.data} />
      <Pagination pagination={details?.pagination} />
    </>
  );
}
