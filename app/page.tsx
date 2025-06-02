// app/page.tsx
import React from "react";
import { SwiperMain } from "@/components/features/swiper/main";
import { TitleTable } from "@/components/entities/title/features/table";
import { fetchPopularMoviesAndMetadata } from "@/components/shared/api/serverUtils";
import type { Metadata } from "next";

// 1. Принудительная динамическая генерация страницы (SSR)
export const dynamic = "force-dynamic";

// 2. Генерация метаданных для главной страницы
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await fetchPopularMoviesAndMetadata();
  return metadata;
}

// 3. Главный компонент страницы
export default async function HomePage(): Promise<JSX.Element> {
  // Запрашиваем список популярных фильмов
  const { details, pagination } = await fetchPopularMoviesAndMetadata();

  if (!details?.length) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">Нет данных</h1>
        <p className="text-muted-foreground">
          На данный момент нет доступных данных.
        </p>
      </div>
    );
  }

  // Фильтрация для Swiper: первые 10 с logo.url и backdrop.url
  const topTenWithAssets = details
    .filter((item) => Boolean(item.backdrop?.url) && Boolean(item.logo?.url))
    .slice(0, 10);

  // Фильтрация по жанрам (русские названия жанров из API)
  const ComedyDetails = details.filter(
    (item) =>
      Array.isArray(item.genres) &&
      item.genres.some((g: any) => g.name === "комедия")
  );
  const DramaDetails = details.filter(
    (item) =>
      Array.isArray(item.genres) &&
      item.genres.some((g: any) => g.name === "драма")
  );

  const FantasyDetails = details.filter(
    (item) =>
      Array.isArray(item.genres) &&
      item.genres.some((g: any) => g.name === "фантастика")
  );

  const HorrorDetails = details.filter(
    (item) =>
      Array.isArray(item.genres) &&
      item.genres.some((g: any) => g.name === "ужасы")
  );

  return (
    <>
      {/* Слайдер популярных фильмов */}
      {topTenWithAssets.length > 0 && <SwiperMain details={topTenWithAssets} />}

      {/* Таблицы по жанрам */}
      {ComedyDetails.length > 0 && (
        <TitleTable
          TableTitle="Комедия"
          details={ComedyDetails}
          pagination={pagination}
        />
      )}
      {DramaDetails.length > 0 && (
        <TitleTable
          TableTitle="Драма"
          details={DramaDetails}
          pagination={pagination}
        />
      )}
      {FantasyDetails.length > 0 && (
        <TitleTable
          TableTitle="Фантастика"
          details={FantasyDetails}
          pagination={pagination}
        />
      )}
      {HorrorDetails.length > 0 && (
        <TitleTable
          TableTitle="Ужасы"
          details={HorrorDetails}
          pagination={pagination}
        />
      )}
    </>
  );
}
