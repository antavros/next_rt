import { Pagination } from '@/features/Pagination';
import {
  API_URL_movie,
  API_URL_tvseries,
  API_URL_cartoon,
  API_URL_animated_series,
  API_URL_anime,
  getData,
} from "@/shared/api/api";

export default async function categoryRender({ params }: { readonly params: { readonly category: string }; }) {


  const category = params.category.toLowerCase();

  switch (category) {
    case "movie": {
      const details = await getData({ url: `${API_URL_movie}` });
      return <Pagination pagination={details.pagination} />;
    }
    case "tv-series": {
      const details = await getData({ url: `${API_URL_tvseries}` });
      return <Pagination pagination={details.pagination} />;
    }
    case "cartoon": {
      const details = await getData({ url: `${API_URL_cartoon}` });
      return <Pagination pagination={details.pagination} />;
    }
    case "animated-series": {
      const details = await getData({ url: `${API_URL_animated_series}` });
      return <Pagination pagination={details.pagination} />;
    }
    case "anime": {
      const details = await getData({ url: `${API_URL_anime}` });
      return <Pagination pagination={details.pagination} />;
    }
    default: {
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
