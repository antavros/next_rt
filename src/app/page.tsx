
import { TitlesContainer } from "../entities/title/titles_table/titles_table";
import { SwiperTitles } from "../entities/swiper/swiper_home/swiper_home";
import {
    API_URL_POPULAR,
    getData
} from "../shared/api/api";


import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'ГЛАВНАЯ',
    openGraph: {
        title: 'ГЛАВНАЯ',
    },
}

export default async function Home() {
    const dataTitles = await getData({ url: API_URL_POPULAR });
    const titlesWithLogo = dataTitles.filter(item => item.logo);
    const titlesWithBackDrop = titlesWithLogo.filter(item => item.backdrop2);
    const topTenTitlesWithLogo = titlesWithBackDrop.slice(0, 10);
    return (
        <>
            <SwiperTitles titleData={topTenTitlesWithLogo} />
            <hr />
            <TitlesContainer titleData={dataTitles} />
        </>
    );
}


