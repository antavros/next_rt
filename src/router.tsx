import * as React from "react";
import { lazy, StrictMode, Suspense } from "react";

import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

import {Preloader} from "./features/preloader/preloader";
import Base from "./pages/base/base-template";

const Home  = lazy(() => import("./pages/home/home-template"));
const Title = lazy(() => import("./pages/title/title-template"));
const Search = lazy(() => import("./pages/search/search-template"));
const Movie = lazy(() => import("./pages/title_type/movie-template"));
const TvSeries = lazy(() => import("./pages/title_type/tv_series-template"));
const Cartoon = lazy(() => import("./pages/title_type/cartoon-template"));
const AnimatedSeries = lazy(() => import("./pages/title_type/animated_series-template"));
const Anime = lazy(() => import("./pages/title_type/anime-template"));
const Error404 = lazy(() => import("./pages/errors/error404-template"));
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