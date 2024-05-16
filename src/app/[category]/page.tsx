import { TitlesContainer } from "../../entities/titles_table/titles_table";
import {
    API_URL_animated_series,
    API_URL_anime,
    API_URL_cartoon,
    API_URL_movie,
    API_URL_series
} from "../../shared/api/data_types.tsx";
import { getData } from "../../shared/api/api.tsx";

export default async function categoryRender({ params }) {
    const category = params.category.toLowerCase();

    switch (category) {
        case "movie":{
            const data = await getData({ url: `${API_URL_movie}` });
            return <TitlesContainer titleData={data} />
        }
        case "tvseries":{
            const data = await getData({ url: `${API_URL_series}` });            
            return <TitlesContainer titleData={data} />
        }     
        case "cartoon":{
            const data = await getData({ url: `${API_URL_cartoon}` });
            return <TitlesContainer titleData={data} />
        }    
        case "animatedseries":{
            const data = await getData({ url: `${API_URL_animated_series}` });
            return <TitlesContainer titleData={data} />;
        }
        case "anime":{
            const data = await getData({ url: `${API_URL_anime}` });
            return <TitlesContainer titleData={data} />;
        }
        default:{
            return <div>Неизвестная категория: {category}</div>;
        }
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