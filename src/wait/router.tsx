import * as React from "react";
import { lazy, StrictMode, Suspense } from "react";

import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

import {Preloader} from "../features/preloader/preloader";
import Base from "./app/dashboard/base-template";

const Home  = lazy(() => import("./wait/home/home-template"));
const Title = lazy(() => import("../app/title/{slug}/page"));
const Search = lazy(() => import("./pages/search/search-template"));
const Movie = lazy(() => import("./app/title_type/movie/movie-template"));
const TvSeries = lazy(() => import("./app/title_type/tv-series/tv_series-template"));
const Cartoon = lazy(() => import("./app/title_type/cartoon/cartoon-template"));
const AnimatedSeries = lazy(() => import("./app/title_type/animated-series/animated_series-template"));
const Anime = lazy(() => import("./app/title_type/anime/anime-template"));
const Error404 = lazy(() => import("./errors/error404-template"));
import {HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <Base />,
    errorElement: <Error404 />,
    children: [
      {
        path: `/`,
        element: <Home />,
      },
      {
        path: `/:titleType/:titleId`,
        element: <Title />,
      },
      {
        path: `/search/:searchValue`,
        element: <Search />,
      },
      {
        path: `/movie`,
        element: <Movie />,
      },
      {
        path: `/tvseries`,
        element: <TvSeries />,
      },
      {
        path: `/cartoon`,
        element: <Cartoon />,
      },
      {
        path: `/animatedseries`,
        element: <AnimatedSeries />,
      },
      {
        path: `/anime`,
        element: <Anime />,
      },         
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Preloader />}>
        <RouterProvider router={router} />
      </Suspense>
      <SpeedInsights />
      <Analytics />
    </HelmetProvider>
  </StrictMode>
);