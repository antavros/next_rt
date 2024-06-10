import { Metadata, ResolvingMetadata } from "next";

import { TitleContainer } from "@/entities/Title/Page";
import { API_URL_title, getData } from "@/shared/api/api";
import { Details } from "@/shared/api/lib";

export async function generateMetadata(
  { params }: { readonly params: Details },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await getData({ url: `${API_URL_title}${id}` });
  const details = data[0];
  const previousImages = (await parent).openGraph?.images || [];
  const poster = details?.poster?.url ?? details?.poster?.previewUrl ?? '';
  console.log(poster)

  return {
    title: details.name,
    metadataBase: new URL('https://ratetable.vercel.app'),
    description: details.sDescription ?? details.description ?? "",
    openGraph: {
      title: details.name,
      images: [...poster, ...previousImages],
      description: details.sDescription ?? details.description ?? "",
    },
    twitter: {
      card: "summary_large_image",
      title: details.name,
      images: [...poster, ...previousImages],
      description: details.sDescription ?? details.description ?? "",
    },
  };
}

export default async function TitlePage({ params }: { readonly params: Details }) {

  const id = params.id;
  const data = await getData({ url: `${API_URL_title}${id}` });
  const details = data[0];

  return (
    <>
      <TitleContainer details={details} />
    </>
  );
}
