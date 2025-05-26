"use server";

import { getData } from "@/components/shared/api/api";
import { ApiFactory } from "@/components/shared/api/urlFactory";
import type { Metadata, ResolvingMetadata } from "next";
import type { MovieQueryParams } from "@/components/shared/api/urlFactory";

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const pastYear = currentYear - 2;

export async function getCategoryDetails(
  category: string
): Promise<{ url?: string; name?: string }> {
  switch (category) {
    case "movie":
      return { url: ApiFactory.movie({ type: "movie" }), name: "Фильмы" };
    case "tv-series":
      return { url: ApiFactory.movie({ type: "tv-series" }), name: "Сериалы" };
    case "cartoon":
      return { url: ApiFactory.movie({ type: "cartoon" }), name: "Мультфильмы" };
    case "animated-series":
      return { url: ApiFactory.movie({ type: "animated-series" }), name: "Мультсериалы" };
    case "anime":
      return { url: ApiFactory.movie({ type: "anime" }), name: "Аниме" };
    case "person":
      return { url: ApiFactory.person(), name: "Персоны" };
    case "announced":
      return {
        url: ApiFactory.movie({ year: `${nextYear}-2050` }),
        name: "Анонсированные",
      };
    default:
      return { name: "404" };
  }
}

export async function fetchCategoryDetailsAndMetadata(
  category: string,
  page: string = "1",
  filters?: { genre?: string; year?: string; rating?: string }
): Promise<{
  details: any[];
  pagination: { total: number; limit: number; page: number; pages: number };
  metadata: Metadata;
}> {
  const { name } = await getCategoryDetails(category);
  const isPerson = category === "person";

  const baseParams: MovieQueryParams = {
    type: isPerson ? undefined : (category as any),
    limit: 1,
    sortFields: ["year", "votes.kp"],
    sortTypes: [-1, -1],
    notNullFields: ["poster.url", "rating.kp"],
    year: filters?.year,
  };

  let url = isPerson
    ? ApiFactory.person({ limit: 1 })
    : ApiFactory.movie(baseParams);

  const params = new URLSearchParams({ page });
  if (filters?.genre) params.set("genres.name", filters.genre);
  if (filters?.rating) params.set("rating.kp", `${filters.rating}-10`);

  url += `&${params.toString()}`;

  // Результат getData — это { data, pagination }
  const result = await getData<{
    data: any[];
    pagination: { total: number; limit: number; page: number; pages: number };
  }>({ url });

  const detailsArr = result?.data ?? [];
  const pagination = result?.pagination ?? { total: 0, limit: 0, page: 0, pages: 0 };

  const metadata: Metadata = {
    title: name,
    openGraph: { title: name },
    twitter: { card: "summary_large_image", title: name },
  };

  return { details: detailsArr, pagination, metadata };
}


export async function fetchDetailsAndMetadata(
  category: string,
  id: string,
  parent: ResolvingMetadata
) {
  const type = category === "person" ? "person" : "movie";
  const url = ApiFactory.details(type, id);

  const data = await getData({ url });
  const details = data?.data?.[0] ?? null;
  const previousImages = (await parent).openGraph?.images ?? [];
  const poster = details?.poster?.url || details?.photo || "";

  if (!details) {
    return {
      details: null,
      metadata: {
        title: "Not found",
        description: "The requested content was not found.",
      },
    };
  }

  const metadata: Metadata = {
    title: details?.name,
    metadataBase: new URL("https://ratetable.vercel.app"),
    description: details?.slogan || details?.description || "",
    openGraph: {
      title: details?.name,
      images: [poster, ...previousImages],
      description: details?.slogan || details?.description || "",
    },
    twitter: {
      card: "summary_large_image",
      title: details?.name,
      images: [poster, ...previousImages],
      description: details?.slogan || details?.description || "",
    },
  };

  return { details, metadata };
}

export async function fetchMainPageDetailsAndMetadata() {
  const url = ApiFactory.movie({
    lists: "popular-films",
    year: `${pastYear}-${currentYear}`,
    limit: 250,
    notNullFields: ["poster.url", "rating.kp", "backdrop.url"],
  });

  const data = await getData({ url });
  const details = data?.data ?? [];

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

  return { details, metadata };
}
