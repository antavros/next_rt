import { TitleTable } from "@/entities/Title/Table";
import { SwiperMain } from "@/entities/Swiper/Main";
import { API_URL_POPULAR, getData } from "@/shared/api/api";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ГЛАВНАЯ",
  openGraph: {
    title: "ГЛАВНАЯ",
    images: "/images/LOGO.png",
    description:
      "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
  },
};

export default async function Home() {
  const details = await getData({ url: API_URL_POPULAR });
  const titlesWithLogo = details.data.filter((item) => item.logo);
  const titlesWithBackDrop = titlesWithLogo.filter((item) => item.backdrop);
  const topTenTitlesWithLogo = titlesWithBackDrop.slice(0, 10);
  return (
    <>
      <SwiperMain details={topTenTitlesWithLogo} />
      <hr />
      <TitleTable details={details.data} />
    </>
  );
}
