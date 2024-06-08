import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";

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

  return {
    title: details.name,
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
  const logo = typeof details.logo === "string" ? details.logo : "";
  const poster = typeof details.poster === "string" ? details.poster : "";
  const image = logo || poster;

  return (
    <>
      <Head>
        <title>{details.name}</title>
        <meta
          name="description"
          content={details.sDescription ?? details.description ?? ""}
        ></meta>
        <meta property="og:title" content={details.name}></meta>
        {image && <meta property="og:image" content={image}></meta>}
      </Head>
      <TitleContainer details={details} />
    </>
  );
}
