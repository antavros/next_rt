import { TitleContainer } from "@/entities/title/title_page/title_page";
import { API_URL_title, getData } from "../../../shared/api/api";
import { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';

type TitlePageProps = {
  params: { readonly id: string };
};

export async function generateMetadata(
  { params }: TitlePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await getData({ url: `${API_URL_title}${id}` });
  const details = data[0];

  const previousImages = (await parent).openGraph?.images || [];

  // Ensure that logo and poster are strings and not objects or undefined
  const logo = typeof details.logo === 'string' ? details.logo : '';
  const poster = typeof details.poster === 'string' ? details.poster : '';
  const images = [logo, poster].filter(Boolean) as string[];

  return {
    title: details.name,
    description: details.sDescription || details.description || '',
    openGraph: {
      title: details.name,
      images: [...images, ...previousImages],
    },
  };
}

export default async function TitlePage({ params }: TitlePageProps) {
  const id = params.id;
  const data = await getData({ url: `${API_URL_title}${id}` });
  const details = data[0];

  // Ensure that logo and poster are strings and not objects or undefined
  const logo = typeof details.logo === 'string' ? details.logo : '';
  const poster = typeof details.poster === 'string' ? details.poster : '';
  const image = logo || poster;

  return (
    <>
      <Head>
        <title>{details.name}</title>
        <meta name="description" content={details.sDescription || details.description || ''}></meta>
        <meta property="og:title" content={details.name}></meta>
        {image && <meta property="og:image" content={image}></meta>}
      </Head>
      <TitleContainer details={details} />
    </>
  );
}