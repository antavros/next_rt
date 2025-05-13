"use server";

import type { Metadata, ResolvingMetadata } from "next";

import { getData } from "@/components/shared/api/api";
import { ApiUrl_Title_Search } from "@/components/shared/api/url";
import { TitleTable } from "@/components/entities/title/features/table";
import { Pagination } from "@/components/features/pagination";
import { SearchForm } from "@/components/widgets/search/form";

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

export async function generateMetadata(
  props: { readonly searchParams: Promise<{ [key: string]: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const page = searchParams["page"] ?? "1";
  const searchValue = searchParams["query"] ?? "5";
  const { metadata } = await fetchDetailsAndMetadata(searchValue, page, parent);
  return metadata;
}

export default async function SearchRender(
  props: {
    readonly searchParams: Promise<{ [key: string]: string }>;
  }
) {
  const searchParams = await props.searchParams;
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
