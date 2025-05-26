"use server";

import { getData } from "@/components/shared/api/api";
import { ApiFactory } from "@/components/shared/api/urlFactory";
import type { Metadata, ResolvingMetadata } from "next";

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
): Promise<{ details: any; metadata: Metadata }> {
  const { url, name } = await getCategoryDetails(category);

  const params = new URLSearchParams();
  params.set("page", page);

  // Применение фильтров
  if (filters?.genre) params.set("genres.name", filters.genre);
  if (filters?.year) params.set("year", filters.year);
  if (filters?.rating) params.set("rating.kp", `${filters.rating}-10`);

  const requestUrl = url ? `${url}&${params.toString()}` : "";

  const response = requestUrl ? await getData({ url: requestUrl }) : null;

  const metadata: Metadata = {
    title: name,
    openGraph: { title: name },
    twitter: { card: "summary_large_image", title: name },
  };

  return { details: response, metadata };
}

export async function fetchDetailsAndMetadata(
  category: string,
  id: string,
  parent: ResolvingMetadata
) {
  const apiUrl =
    category === "person"
      ? "https://api.kinopoisk.dev/v1.4/person/"
      : "https://api.kinopoisk.dev/v1.4/movie/";

  const data = await getData({ url: `${apiUrl}${id}` });
  const details = data?.data[0];
  const previousImages = (await parent).openGraph?.images ?? [];
  const poster = details?.posters ?? "";

  const metadata: Metadata = {
    title: details?.name,
    metadataBase: new URL("https://ratetable.vercel.app"),
    description: details?.sDescription ?? details?.description ?? "",
    openGraph: {
      title: details?.name,
      images: [poster, ...previousImages],
      description: details?.sDescription ?? details?.description ?? "",
    },
    twitter: {
      card: "summary_large_image",
      title: details?.name,
      images: [poster, ...previousImages],
      description: details?.sDescription ?? details?.description ?? "",
    },
  };

  if (!details) {
    return {
      details: null,
      metadata: {
        title: "Not found",
        description: "The requested content was not found.",
      },
    };
  }

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
