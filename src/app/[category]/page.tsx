import { TitlesContainer } from "../../entities/titles_table/titles_table";
import {
    API_URL_animated_series,
    API_URL_anime,
    API_URL_cartoon,
    API_URL_movie,
    API_URL_series
} from "../../shared/api/api";

export default function categoryRender({ params }: { params: { category: string } }) {
    const category = params.category.toLowerCase();
    switch (category) {
        case "movie":
            return <TitlesContainer url={API_URL_movie} />
        case "tvseries":
            return <TitlesContainer url={API_URL_series} />        
        case "cartoon":
            return <TitlesContainer url={API_URL_cartoon} />        
        case "animatedseries":
            return <TitlesContainer url={API_URL_animated_series} />;
        case "anime":
            return <TitlesContainer url={API_URL_anime} />;
        default:
            return <div>Неизвестная категория: {category}</div>;
    }
}

// <Seo
//     seoTitle='МУЛЬТСЕРИАЛЫ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='МУЛЬТСЕРИАЛЫ'
//     seoOgImage="/images/LOGO.png"
// />

//<Seo
//     seoTitle='АНИМЕ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='АНИМЕ'
//     seoOgImage="/images/LOGO.png"
// />

// <Seo
//     seoTitle='МУЛЬТФИЛЬМЫ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='МУЛЬТФИЛЬМЫ'
//     seoOgImage="/images/LOGO.png"
// />

//<Seo
//     seoTitle='ФИЛЬМЫ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='ФИЛЬМЫ'
//     seoOgImage="/images/LOGO.png"
// />

//<Seo
//     seoTitle='СЕРИАЛЫ'
//     seoDescription="RATETABLE - фильмы, мультфильмы и аниме"
//     seoOgTitle='СЕРИАЛЫ'
//     seoOgImage="/images/LOGO.png"
// />