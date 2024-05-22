
import { TitlesContainer } from "../entities/title/titles_table/titles_table";
import { SwiperTitles } from "../entities/swiper/swiper";
import {
    API_URL_POPULAR,
    API_URL_SWIPER,
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
        const dataSwiper = await getData({ url: API_URL_SWIPER });
        const dataTitles = await getData({ url: API_URL_POPULAR });

    return (
        <>
            <SwiperTitles titleData={dataSwiper} />
            <hr />
            <TitlesContainer titleData={dataTitles} />
        </>
    );
}


