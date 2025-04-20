"use server";

import { getData } from "@/components/shared/api/api";
import {
  ApiUrl_Title_Movie,
  ApiUrl_Title_TvSeries,
  ApiUrl_Title_Cartoon,
  ApiUrl_Title_AniSeries,
  ApiUrl_Title_Anime,
  ApiUrl_Title_Person,
  ApiUrl_Title_Announced,
  ApiUrl_Title_Page,
  ApiUrl_Person_Page,
} from "@/components/shared/api/url";
import type { Metadata, ResolvingMetadata } from "next";

export async function getCategoryDetails(
  category: string
): Promise<{ url?: string; name?: string }> {
  switch (category) {
    case "movie":
      return { url: ApiUrl_Title_Movie, name: "Фильмы" };
    case "tv-series":
      return { url: ApiUrl_Title_TvSeries, name: "Сериалы" };
    case "cartoon":
      return { url: ApiUrl_Title_Cartoon, name: "Мультфильмы" };
    case "animated-series":
      return { url: ApiUrl_Title_AniSeries, name: "Мультсериалы" };
    case "anime":
      return { url: ApiUrl_Title_Anime, name: "Аниме" };
    case "person":
      return { url: ApiUrl_Title_Person, name: "Персоны" };
    case "announced":
      return { url: ApiUrl_Title_Announced, name: "Анонсированные" };
    default:
      return { name: "404" };
  }
}

export async function fetchCategoryDetailsAndMetadata(
  category: string,
  page: string = "1"
): Promise<{ details: any; metadata: Metadata }> {
  const { url, name } = await getCategoryDetails(category);
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

export async function fetchDetailsAndMetadata(
    category: string,
  id: string,
  parent: ResolvingMetadata
): Promise<{ details: any; metadata: Metadata }> {
  const apiUrl = category === "person" ? ApiUrl_Person_Page : ApiUrl_Title_Page;

  const data = await getData({ url: `${apiUrl}${id}` });
  const details = data?.data[0];
  const previousImages = (await parent).openGraph?.images || [];
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

  return { details, metadata };
}
