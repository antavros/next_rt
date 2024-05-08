import { TitlesContainer } from "../../../entities/titles_table/titles_table";
import { API_URL_movie } from "../../../shared/api/api.jsx";
import { Seo } from "../../../shared/seo/seo.jsx";

export default function Movie() {
    return (
        <>
            <Seo
                seoTitle='ФИЛЬМЫ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='ФИЛЬМЫ'
                seoOgImage="/images/LOGO.png"
            />
            <TitlesContainer url={API_URL_movie} />
        </>
    );
}