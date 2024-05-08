import { TitlesContainer } from "../../../entities/titles_table/titles_table.jsx";
import { API_URL_series } from "../../../shared/api/api.jsx";
import { Seo } from "../../../shared/seo/seo.jsx";

export default function TvSeries() {
    return (
        <>
            <Seo
                seoTitle='СЕРИАЛЫ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='СЕРИАЛЫ'
                seoOgImage="/images/LOGO.png"
            />
            <TitlesContainer url={API_URL_series} />
        </>
    );
}