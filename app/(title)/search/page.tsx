"use server";

import type { Metadata, ResolvingMetadata } from "next";

import { getData } from "@/components/shared/api/api";
import { ApiFactory } from "@/components/shared/api/urlFactory";
import { TitleTable } from "@/components/entities/title/features/table";
import { SearchForm } from "@/components/widgets/search/form";

// Получение данных и метаданных для поиска
async function fetchSearchDetailsAndMetadata(
  query: string,
  page: string,
  parent: ResolvingMetadata
): Promise<{ details: any; metadata: Metadata }> {
  const url = ApiFactory.search(query, page);
  const response = await getData({ url });

  const metadata: Metadata = {
    title: `Поиск: ${query}`,
    openGraph: { title: `Поиск: ${query}` },
    twitter: { title: `Поиск: ${query}` },
  };

  return { details: response, metadata };
}

// Генерация метаданных
export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = searchParams.query ?? "";
  const page = searchParams.page ?? "1";

  const { metadata } = await fetchSearchDetailsAndMetadata(query, page, parent);
  return metadata;
}

// Компонент страницы поиска
export default async function SearchRender({
  searchParams,
}: {
  readonly searchParams: { [key: string]: string };
}) {
  const query = searchParams.query ?? "";
  const page = searchParams.page ?? "1";

  const { details } = await fetchSearchDetailsAndMetadata(
    query,
    page,
    {} as ResolvingMetadata
  );

  const results = details?.data ?? [];
  const hasResults = results.length > 0;

  return (
    <>
      <SearchForm />
      <h1 className="text-xl font-semibold mt-4 mb-2">
        Результаты по запросу: &quot;{query}&quot;
      </h1>
      {hasResults ? (
        <TitleTable
          TableTitle={`Поиск – "${query}"`}
          details={results}
          pagination={details?.pagination}
        />
      ) : (
        <div className="text-gray-500 mt-6">
          Ничего не найдено по запросу <strong>&quot;{query}&quot;</strong>.
        </div>
      )}
    </>
  );
}
