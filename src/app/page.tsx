
import { TitlesContainer } from "../entities/titles_table/titles_table";
import { SwiperTitles } from "../entities/swiper/swiper";
import { API_URL_POPULAR, API_URL_SWIPER } from "../shared/api/api.jsx";

export default function Home() {
    return (
        <>
            {/* <Seo
                seoTitle='ГЛАВНАЯ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='ГЛАВНАЯ'
                seoOgImage="/images/LOGO.png"
            /> */}

            <SwiperTitles url={API_URL_SWIPER} />
            <hr />
            <TitlesContainer url={API_URL_POPULAR} />
        </>
    );
}