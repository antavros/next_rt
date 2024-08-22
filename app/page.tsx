"use server";

import { TitleTable } from "@/components/entities/Title/Table";
import { SwiperMain } from "@/components/entities/Swiper/Main";
import { ApiUrl_Title_Popular } from "@/components/shared/api/url";
import { getData } from "@/components/shared/api/api";
import type { Metadata } from "next";

// Функция для извлечения данных и генерации метаданных
async function fetchDetailsAndMetadata(): Promise<{
  details: any[];
  metadata: Metadata;
}> {
  const data = await getData({ url: ApiUrl_Title_Popular });
  const details = data?.data;

  const metadata: Metadata = {
    title: "ГЛАВНАЯ",
    openGraph: {
      title: "ГЛАВНАЯ",
      images: "/images/LOGO.webp",
    },
    twitter: {
      title: "ГЛАВНАЯ",
      images: "/images/LOGO.webp",
    },
  };

  return { details: details ?? [], metadata };
}

// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await fetchDetailsAndMetadata();
  return metadata;
}

// Главная страница компонента
export default async function Home() {
  let details = [];

  try {
    const { details: fetchedDetails } = await fetchDetailsAndMetadata();
    details = fetchedDetails;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div>
        <h1>Ошибка загрузки данных</h1>
        <p>Не удалось загрузить данные. Попробуйте позже.</p>
      </div>
    );
  }

  if (!details.length) {
    return (
      <div>
        <h1>Нет данных</h1>
        <p>На данный момент нет доступных данных.</p>
      </div>
    );
  }

  const titlesWithLogo = details.filter((item) => item.logo);
  const titlesWithBackDrop = titlesWithLogo.filter((item) => item.backdrop);
  const topTenTitlesWithLogo = titlesWithBackDrop.slice(0, 10);

  return (
    <>
      <hr />
      <SwiperMain details={topTenTitlesWithLogo} />
      <hr />
      <TitleTable details={details} />
    </>
  );
}
