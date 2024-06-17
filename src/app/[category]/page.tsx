'use server';

import { TitleTable } from "@/entities/Title/Table";
import { Pagination } from '@/features/Pagination';
import { getData } from "@/shared/api/api";
import {
  API_URL_movie,
  API_URL_tvseries,
  API_URL_cartoon,
  API_URL_animated_series,
  API_URL_anime,
} from "@/shared/api/url";

import type { Metadata, ResolvingMetadata } from "next";

// Функция для получения URL и имени категории
function getCategoryDetails(category: string): { url: string, name: string } {
  switch (category.toLowerCase()) {
    case "movie":
      return { url: API_URL_movie, name: "Фильмы" };
    case "tv-series":
      return { url: API_URL_tvseries, name: "Сериалы" };
    case "cartoon":
      return { url: API_URL_cartoon, name: "Мультфильмы" };
    case "animated-series":
      return { url: API_URL_animated_series, name: "Мултсериалы" };
    case "anime":
      return { url: API_URL_anime, name: "Аниме" };
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

// Функция для получения данных категории и метаданных
async function fetchCategoryDetailsAndMetadata(category: string, page: string = '1'): Promise<{ details: any; metadata: Metadata }> {
  const { url, name } = getCategoryDetails(category);
  const response = await getData({ url: `${url}&page=${page}` });

  const metadata: Metadata = {
    title: name.toUpperCase(),
    openGraph: {
      title: name.toUpperCase(),
    },
    twitter: {
      card: "summary_large_image",
      title: name.toUpperCase(),
    },
  };

  return { details: response, metadata };
}

// Генерация метаданных для страниц категорий
export async function generateMetadata({ params }: { readonly params: { readonly category: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const { metadata } = await fetchCategoryDetailsAndMetadata(params.category);
  return metadata;
}

// Рендеринг страницы категорий
export default async function categoryRender({ searchParams, params }: { readonly params: any; searchParams: { [key: string]: string } }) {
  const page = searchParams['page'] ?? '1';
  const { details } = await fetchCategoryDetailsAndMetadata(params.category, page);
  return (
    <>
      <TitleTable details={details.data} />
      <Pagination pagination={details.pagination} />
    </>
  );
}
