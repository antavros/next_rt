"use server";

import { redirect } from "next/navigation";
import { ApiFactory } from "@/components/shared/api/urlFactory";
import type { Metadata, ResolvingMetadata } from "next";

interface PaginationMeta {
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export async function getData<T>({
  url,
  cacheMode = "force-cache",
  revalidate = 9991209600,
}: {
  url: string;
  cacheMode?: RequestCache;
  revalidate?: number;
}): Promise<T | null> {
  const API_KEY = process.env.API_TOKEN;
  if (!API_KEY) {
    console.error("API_KEY отсутствует. Перенаправление на страницу ошибки.");
    redirect("/error");
    return null;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": API_KEY,
      },
      next: {
        cache: cacheMode,
        revalidate,
      } as any,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Ошибка при запросе: ${response.status} ${response.statusText}`,
        errorText
      );
      throw new Error(`Ошибка при запросе данных: ${response.statusText}`);
    }

    const json = await response.json();
    if (!json) {
      throw new Error("Пустой ответ от API");
    }
    return json as T;
  } catch (error: unknown) {
    console.error("Ошибка в getData:", error);
    redirect("/");
    return null;
  }
}

/**
 * fetchPopularMoviesAndMetadata:
 * - собирает URL вида:
 *     https://api.kinopoisk.dev/v1.4/movie?
 *       lists=popular-films&
 *       limit=250&
 *       notNullFields=backdrop.url&
 *       year=<pastYear>-<currentYear>
 * - запрашивает данные и возвращает { details, pagination, metadata }
 */
export async function fetchPopularMoviesAndMetadata(): Promise<{
  details: any[];
  pagination: PaginationMeta;
  metadata: Metadata;
}> {
  // Текущий год и год два года назад
  const currentYear = new Date().getFullYear();
  const pastYear = currentYear - 2;
  const yearRange = `${pastYear}-${currentYear}`;

  // Составляем базовый URL с нужными параметрами
  // (limit=250, lists=popular-films, notNullFields=backdrop.url, year=pastYear-currentYear)
  const baseUrl = `${ApiFactory.movie({
    lists: "popular-films",
    limit: 250,
    notNullFields: ["backdrop.url"],
    year: yearRange,
  })}`;

  // Выполняем запрос
  const result = await getData<{
    docs?: any[];
    total?: number;
    limit?: number;
    page?: number;
    pages?: number;
  }>({ url: baseUrl });

  // Если result = null (например, отсутствие API_KEY) – возвращаем пустой ответ
  if (!result) {
    return {
      details: [],
      pagination: { total: 0, limit: 0, page: 0, pages: 0 },
      metadata: {
        title: "Популярные",
        openGraph: { title: "Популярные" },
        twitter: { card: "summary_large_image", title: "Популярные" },
      },
    };
  }

  // Тело приходит в docs (массив) и метаданные pagination разбросаны
  const docsArray = result.docs ?? [];
  const totalCount = result.total ?? 0;
  const limitCount = result.limit ?? docsArray.length;
  const currentPage = result.page ?? 1;
  const totalPages = result.pages ?? 1;

  const pagination: PaginationMeta = {
    total: totalCount,
    limit: limitCount,
    page: currentPage,
    pages: totalPages,
  };

  const metadata: Metadata = {
    title: "Популярные",
    openGraph: { title: "Популярные" },
    twitter: { card: "summary_large_image", title: "Популярные" },
  };

  return {
    details: docsArray,
    pagination,
    metadata,
  };
}

/**
 * fetchCategoryDetailsAndMetadata:
 * - Если category не передан (или пустая строка), запрашивает "популярные" через ApiFactory.listPopular()
 * - Иначе работает, как раньше: собирает URL по категории, page, filters
 * - Разбирает ответ: поле docs (или data), собирает pagination и формирует metadata
 */
export async function fetchCategoryDetailsAndMetadata(
  category?: string,
  page: string = "1",
  filters?: { genre?: string; year?: string; rating?: string }
): Promise<{
  details: any[];
  pagination: PaginationMeta;
  metadata: Metadata;
}> {
  let finalUrl: string;
  let name: string;

  if (!category) {
    // 1) Если category не указан, запрашиваем список популярных
    finalUrl = ApiFactory.listPopular();
    name = "Популярные";
  } else {
    // 2) Иначе работаем по обычной логике: по категории, page и фильтрам
    const { url: baseUrl, name: categoryName } =
      await getCategoryBaseInfo(category);

    if (!baseUrl) {
      // Если категория не найдена, возвращаем пустые данные
      return {
        details: [],
        pagination: { total: 0, limit: 0, page: 0, pages: 0 },
        metadata: {
          title: "404",
          openGraph: { title: "404" },
          twitter: { card: "summary_large_image", title: "404" },
        },
      };
    }

    name = categoryName;
    const params = new URLSearchParams({ page });
    if (filters?.genre) params.set("genres.name", filters.genre);
    if (filters?.year) params.set("year", filters.year);
    if (filters?.rating) params.set("rating.kp", `${filters.rating}-10`);

    finalUrl = `${baseUrl}&${params.toString()}`;
  }

  // 3) Выполняем запрос
  const result = await getData<{
    docs?: any[];
    total?: number;
    limit?: number;
    page?: number;
    pages?: number;
    data?: any[];
    pagination?: PaginationMeta;
  }>({ url: finalUrl });

  const docsArray = result?.docs ?? result?.data ?? [];
  const totalCount = result?.total ?? result?.pagination?.total ?? 0;
  const limitCount =
    result?.limit ?? result?.pagination?.limit ?? docsArray.length;
  const currentPage = result?.page ?? result?.pagination?.page ?? Number(page);
  const totalPages = result?.pages ?? result?.pagination?.pages ?? 0;

  const pagination: PaginationMeta = {
    total: totalCount,
    limit: limitCount,
    page: currentPage,
    pages: totalPages,
  };

  // 4) Формируем metadata для страницы
  const metadata: Metadata = {
    title: name,
    openGraph: { title: name },
    twitter: { card: "summary_large_image", title: name },
  };

  return {
    details: docsArray,
    pagination,
    metadata,
  };
}

/**
 * fetchDetailsAndMetadata:
 * - Запрашивает детали одного объекта (movie или person) по category и id
 * - Возвращает { details, metadata }
 */
export async function fetchDetailsAndMetadata(
  category: "movie" | "person",
  id: string,
  parent: ResolvingMetadata
): Promise<{
  details: any | null;
  metadata: Metadata;
}> {
  const url = ApiFactory.details(category, id);
  const result = await getData<{ data?: any[]; docs?: any[] }>({ url });

  if (!result) {
    return {
      details: null,
      metadata: {
        title: "Not found",
        description: "Запрашиваемый контент не найден.",
        openGraph: { title: "Not found", images: [] },
        twitter: {
          card: "summary_large_image",
          title: "Not found",
          images: [],
        },
      },
    };
  }

  const rawArray = result.data ?? result.docs ?? [];
  const details = rawArray.length > 0 ? rawArray[0] : null;

  if (!details) {
    return {
      details: null,
      metadata: {
        title: "Not found",
        description: "Запрашиваемый контент не найден.",
        openGraph: { title: "Not found", images: [] },
        twitter: {
          card: "summary_large_image",
          title: "Not found",
          images: [],
        },
      },
    };
  }

  const previousImages = (await parent)?.openGraph?.images ?? [];
  const posterUrl = details.poster?.url || details.photo || "";

  const imagesForMeta: string[] = [];
  if (posterUrl) imagesForMeta.push(posterUrl);
  if (Array.isArray(previousImages)) {
    imagesForMeta.push(...previousImages);
  }

  const metadata: Metadata = {
    title: details.name,
    metadataBase: new URL("https://ratetable.vercel.app"),
    description: details.slogan || details.description || "",
    openGraph: {
      title: details.name,
      images: imagesForMeta,
      description: details.slogan || details.description || "",
    },
    twitter: {
      card: "summary_large_image",
      title: details.name,
      images: imagesForMeta,
      description: details.slogan || details.description || "",
    },
  };

  return {
    details,
    metadata,
  };
}

/**
 * Вспомогательная функция getCategoryBaseInfo возвращает:
 *   - url — базовый URL для запроса (API endpoint)
 *   - name — человекочитаемое название категории (для метаданных)
 */
async function getCategoryBaseInfo(
  category: string
): Promise<{ url?: string; name: string }> {
  switch (category) {
    case "movie":
      return { url: ApiFactory.movie({ type: "movie" }), name: "Фильмы" };
    case "tv-series":
      return { url: ApiFactory.movie({ type: "tv-series" }), name: "Сериалы" };
    case "cartoon":
      return {
        url: ApiFactory.movie({ type: "cartoon" }),
        name: "Мультфильмы",
      };
    case "animated-series":
      return {
        url: ApiFactory.movie({ type: "animated-series" }),
        name: "Мультсериалы",
      };
    case "anime":
      return { url: ApiFactory.movie({ type: "anime" }), name: "Аниме" };
    case "person":
      return { url: ApiFactory.person(), name: "Персоны" };
    case "announced":
      const nextYear = new Date().getFullYear() + 1;
      return {
        url: ApiFactory.movie({ year: `${nextYear}-2050` }),
        name: "Анонсированные",
      };
    default:
      return { name: "404" };
  }
}
