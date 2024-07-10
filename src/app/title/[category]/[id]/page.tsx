'use server';

import type { Metadata, ResolvingMetadata } from "next";

import { TitlePage } from "@/components/entities/Title/Page";
import { getData } from "@/components/shared/api/api";
import { ApiUrl_Title_Page } from "@/components/shared/api/url";
import { Details } from "../../../../../types/next-title";

// Функция для извлечения данных и генерации метаданных
async function fetchDetailsAndMetadata(id: string, parent: ResolvingMetadata): Promise<{ details: any, metadata: Metadata }> {
  const data = await getData({ url: `${ApiUrl_Title_Page}${id}` });
  const details = data.data[0];
  const previousImages = (await parent).openGraph?.images || [];
  const poster = details?.poster ?? '';

  const metadata: Metadata = {
    title: details?.name,
    metadataBase: new URL('https://ratetable.vercel.app'),
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

// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata({ params }: { readonly params: Details }, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const { metadata } = await fetchDetailsAndMetadata(id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({ params }: { readonly params: Details }) {
  const id = params.id;
  const { details } = await fetchDetailsAndMetadata(id, {} as ResolvingMetadata);

  return <TitlePage details={details} />;
}
