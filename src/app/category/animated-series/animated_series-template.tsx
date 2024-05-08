import { TitlesContainer } from "../../../entities/titles_table/titles_table";
import { API_URL_animated_series } from "../../../shared/api/api.jsx";
import { Seo } from "../../../shared/seo/seo.jsx";

export default function AnimatedSeries() {
    return (
        <>
            <Seo
                seoTitle='МУЛЬТСЕРИАЛЫ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='МУЛЬТСЕРИАЛЫ'
                seoOgImage="/images/LOGO.png"
            />
            <TitlesContainer url={API_URL_animated_series} />
        </>
    );
}