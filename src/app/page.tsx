
import { TitlesContainer } from "../entities/titles_table/titles_table";
import { SwiperTitles } from "../entities/swiper/swiper";
import { API_URL_POPULAR, API_URL_SWIPER } from "../shared/api/data_types.tsx";
import { getData } from "../shared/api/api.tsx";

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

// <Seo
//     seoTitle='ГЛАВНАЯ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='ГЛАВНАЯ'
//     seoOgImage="/images/LOGO.png"
// />
