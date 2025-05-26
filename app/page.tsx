import { TitleTable } from "@/components/entities/title/features/table";
import { SwiperMain } from "@/components/features/swiper/main";
import { fetchMainPageDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import type { Metadata } from "next";

// Принудительная динамическая генерация страницы (SSR)
export const dynamic = "force-dynamic";

// Генерация метаданных для главной
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await fetchMainPageDetailsAndMetadata();
  return metadata;
}

// Главная страница
export default async function Home() {
  const { details } = await fetchMainPageDetailsAndMetadata();

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

  // Фильтруем данные для Swiper — только с логотипами и фонами
  const topTenTitlesWithLogo = details
    .filter((item) => item.logo?.url && item.backdrop?.url)
    .slice(0, 10);

  return (
    <>
      {topTenTitlesWithLogo.length > 0 && (
        <SwiperMain details={topTenTitlesWithLogo} />
      )}
      <TitleTable
        TableTitle="Популярные новинки"
        details={details?.data ?? []}
        pagination={details?.pagination}
      />
    </>
  );
}
