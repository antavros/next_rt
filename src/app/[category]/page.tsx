'use server';

import { TitleTable } from "@/entities/Title/Table";
import { Pagination } from '@/features/Pagination';
import { getData } from "@/shared/api/api";
import {
  ApiUrl_Title_Movie,
  ApiUrl_Title_TvSeries,
  ApiUrl_Title_Cartoon,
  ApiUrl_Title_AniSeries,
  ApiUrl_Title_Anime,
} from "@/shared/api/url";

import type { Metadata, ResolvingMetadata } from "next";

// Функция для получения URL и имени категории
function getCategoryDetails(category: string): { url?: string, name?: string } {
  switch (category) {
    case "movie":
      return { url: ApiUrl_Title_Movie, name: "Фильмы" };
    case "tv-series":
      return { url: ApiUrl_Title_TvSeries, name: "Сериалы" };
    case "cartoon":
      return { url: ApiUrl_Title_Cartoon, name: "Мультфильмы" };
    case "animated-series":
      return { url: ApiUrl_Title_AniSeries, name: "Мултсериалы" };
    case "anime":
      return { url: ApiUrl_Title_Anime, name: "Аниме" };
    default: {
      return { name: "404" };
    }
  }
}

// Функция для получения данных категории и метаданных
async function fetchCategoryDetailsAndMetadata(category: string, page: string = '1'): Promise<{ details: any; metadata: Metadata }> {
  const { url, name } = getCategoryDetails(category);
  const response = url ? await getData({ url: `${url}&page=${page}` }) : null;

  const metadata: Metadata = {
    title: name,
    openGraph: {
      title: name,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
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
      <TitleTable details={details?.data} />
      <Pagination pagination={details?.pagination} />
    </>
  );
}
