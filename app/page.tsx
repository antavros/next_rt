import { TitleTable } from "@/components/entities/title/features/table";
import { SwiperMain } from "@/components/features/swiper/main";
import { fetchMainPageDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import type { Metadata } from "next";

// Установка принудительной динамической генерации страницы
export const dynamic = "force-dynamic";

// Генерация метаданных
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await fetchMainPageDetailsAndMetadata();
  return metadata;
}

// Главная страница
export default async function Home() {
  const { details } = await fetchMainPageDetailsAndMetadata();

  if (!details?.length) {
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
      {/* <SwiperMain details={topTenTitlesWithLogo} />
      <TitleTable TableTitle="Популярные новинки" details={details} /> */}
    </>
  );
}
