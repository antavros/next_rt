import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RATETABLE",
    short_name: "RATETABLE",
    description:
      "Фильмы, сериалы, мультфильмы, мультсериалы, аниме - каждый найдет что ему по вкусу!",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/images/LOGO.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
