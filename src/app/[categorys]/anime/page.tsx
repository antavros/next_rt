import { TitlesContainer } from "../../../entities/titles_table/titles_table";
import { API_URL_anime } from "../../../shared/api/api.jsx";
import { Seo } from "../../../shared/seo/seo.jsx";

export default function Anime() {
    return (
        <>
            <Seo
                seoTitle='АНИМЕ'
                seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
                seoOgTitle='АНИМЕ'
                seoOgImage="/images/LOGO.png"
            />
            <TitlesContainer url={API_URL_anime} />
        </>
    );
}