// Импорт необходимых модулей
import { TitleTable } from "@/entities/Title/Table";
import { SwiperMain } from "@/entities/Swiper/Main";
import { API_URL_POPULAR } from "@/shared/api/url";
import { getData } from "@/shared/api/api";
import type { Metadata, ResolvingMetadata } from "next";

// Функция для извлечения данных и генерации метаданных
async function fetchDetailsAndMetadata(parent: ResolvingMetadata): Promise<{ details: any[], metadata: Metadata }> {
  const data = await getData({ url: API_URL_POPULAR });
  const details = data.data;

  const metadata: Metadata = {
    title: "ГЛАВНАЯ",
    openGraph: {
      title: "ГЛАВНАЯ",
    },
    twitter: {
      title: "ГЛАВНАЯ",
    },
  };

  return { details, metadata };
}

// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const { metadata } = await fetchDetailsAndMetadata(parent);
  return metadata;
}

// Главная страница компонента
export default async function Home() {
  let details = [];

  try {
    const { details: fetchedDetails } = await fetchDetailsAndMetadata({} as ResolvingMetadata);
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
      <SwiperMain details={topTenTitlesWithLogo} />
      <hr />
      <TitleTable details={details} />
    </>
  );
}

// Убедитесь, что используемые типы корректны и соответствуют ожидаемым
type OmitWithTag<T, K extends keyof T, Tag> = Omit<T, K> & { [key in Tag]?: never };
type Diff<T, U, K extends keyof any> = Omit<T, K> & { [key in K]?: never };

// Исправляем проблемный участок кода
type PageProps = any;  // Определите тип PageProps корректно
type TEntry = any;     // Определите тип TEntry корректно

function checkFields<T>() { /* реализация функции */ }

// Предполагаем, что entry и MaybeField, FirstArg, SecondArg определены корректно
const entry: TEntry = {}; // Пример, замените на реальное определение

if ('generateMetadata' in entry) {
  checkFields<Diff<PageProps, FirstArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>();
  checkFields<Diff<ResolvingMetadata, SecondArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>();
}
