
import { TitlesContainer } from "../../entities/titles_table/titles_table.jsx";
import { SwiperTitles } from "../../entities/swiper/swiper.jsx";
import { API_URL_POPULAR, API_URL_SWIPER } from "../../shared/api/api.jsx";
import { Seo } from "../../shared/seo/seo.jsx";

export default function Home() {
    return (
        <>
            <Seo
                seoTitle='ГЛАВНАЯ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='ГЛАВНАЯ'
                seoOgImage="/images/LOGO.png"
            />

            <SwiperTitles url={API_URL_SWIPER} />
            <hr />
            <TitlesContainer url={API_URL_POPULAR} />
        </>
    );
}