'use client'

import { TitleTable } from "@/entities/Title/Table";
import { SwiperMain } from "@/entities/Swiper/Main";
import { API_URL_POPULAR, getData } from "@/shared/api/api";
import { useQuery } from '@tanstack/react-query';
import { Preloader } from "@/features/PreLoader";

// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "ГЛАВНАЯ",
//   openGraph: {
//     title: "ГЛАВНАЯ",
//     images: "/images/LOGO.png",
//     description:
//       "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
//   },
// };

export default function Home() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['home'],
    queryFn: () => getData({ url: API_URL_POPULAR }),
    staleTime: Infinity,
  })

  if (isLoading) {
    return <Preloader/>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных</div>;
  }


  const details = data?.data;
  console.log(details)

  const titlesWithLogo = details?.filter((item: any) => item.logo);
  const titlesWithBackDrop = titlesWithLogo?.filter((item: any) => item.backdrop);
  const topTenTitlesWithLogo = titlesWithBackDrop?.slice(0, 10);

  return (
    <>
      <SwiperMain details={topTenTitlesWithLogo} />
      <hr />
      <TitleTable details={details} />
    </>
  );
}