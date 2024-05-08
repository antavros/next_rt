import { TitlesContainer } from "../../../entities/titles_table/titles_table";
import { API_URL_cartoon } from "../../../shared/api/api.jsx";
import { Seo } from "../../../shared/seo/seo.jsx";

export default function Cartoon() {
    return (
        <>
            <Seo
                seoTitle='МУЛЬТФИЛЬМЫ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='МУЛЬТФИЛЬМЫ'
                seoOgImage="/images/LOGO.png"
            />
            <TitlesContainer url={API_URL_cartoon} />
        </>
    );
}