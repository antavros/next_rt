import { TitleTable } from "@/entities/Title/Table";
import {
  API_URL_movie,
  API_URL_tvseries,
  API_URL_cartoon,
  API_URL_animated_series,
  API_URL_anime,
  getData,
} from "@/shared/api/api";

export default async function categoryRender({
  params,
}: {
  readonly params: { readonly category: string };
}) {
  const category = params.category.toLowerCase();

  switch (category) {
    case "movie": {
      const data = await getData({ url: `${API_URL_movie}` });
      return <TitleTable details={data} />;
    }
    case "tvseries": {
      const data = await getData({ url: `${API_URL_tvseries}` });
      return <TitleTable details={data} />;
    }
    case "cartoon": {
      const data = await getData({ url: `${API_URL_cartoon}` });
      return <TitleTable details={data} />;
    }
    case "animatedseries": {
      const data = await getData({ url: `${API_URL_animated_series}` });
      return <TitleTable details={data} />;
    }
    case "anime": {
      const data = await getData({ url: `${API_URL_anime}` });
      return <TitleTable details={data} />;
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
