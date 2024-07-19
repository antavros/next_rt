"use client";

import { getData } from "@/components/shared/api/api";
import {
  ApiUrl_Title_Movie,
  ApiUrl_Title_TvSeries,
  ApiUrl_Title_Cartoon,
  ApiUrl_Title_AniSeries,
  ApiUrl_Title_Anime,
  ApiUrl_Title_Page,
} from "@/components/shared/api/url";
import type { Metadata, ResolvingMetadata } from "next";
import { getSession } from "next-auth/react"; // Изменен импорт с useSession на getSession
import { PrismaClient } from "@prisma/client";

export const allowedCategories = [
  "movie",
  "tv-series",
  "cartoon",
  "animated-series",
  "anime",
];

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
  id: string,
  parent: ResolvingMetadata
): Promise<{ details: any; metadata: Metadata }> {
  const data = await getData({ url: `${ApiUrl_Title_Page}${id}` });
  const details = data.data[0];
  const previousImages = (await parent).openGraph?.images || [];
  const poster = details?.poster ?? "";

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

const prisma = new PrismaClient();

async function getSessionUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function markTitleVisited(titleId: string) {
  const user = await getSessionUser();
  if (user?.id) {
    await prisma.userTitle.update({
      where: { userId_titleId: { userId: user.id, titleId } },
      data: { visited: true },
    });
  }
}

export async function toggleFavourite(titleId: string) {
  const user = await getSessionUser();
  if (user?.id) {
    const userTitle = await prisma.userTitle.findUnique({
      where: { userId_titleId: { userId: user.id, titleId } },
    });

    if (userTitle) {
      await prisma.userTitle.update({
        where: { userId_titleId: { userId: user.id, titleId } },
        data: { favourite: !userTitle.favourite },
      });
    } else {
      await prisma.userTitle.create({
        data: {
          userId: user.id,
          titleId,
          favourite: true,
        },
      });
    }
  }
}

export async function rateTitle(titleId: string, rating: number) {
  const user = await getSessionUser();
  if (user?.id) {
    await prisma.userTitle.upsert({
      where: { userId_titleId: { userId: user.id, titleId } },
      update: { rating, viewed: true },
      create: {
        userId: user.id,
        titleId,
        rating,
        viewed: true,
      },
    });
  }
}
