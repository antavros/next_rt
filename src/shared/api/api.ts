


import { getDetails } from './data_types';

const currentYear = new Date().getFullYear();
const pastYear = currentYear - 1;
const yearRange = `${pastYear}-${currentYear}`;

const API_URL = `https://api.kinopoisk.dev/v1.4/movie`;
const API_limit = `limit=5`;
const API_page = `page=1`;
const API_params = `sortField=votes.kp&sortType=-1&notNullFields=poster.url`;

export const API_URL_SWIPER = `${API_URL}?&lists=popular-films&limit=10&year=${yearRange}&${API_params}`;
export const API_URL_POPULAR = `${API_URL}?&lists=popular-films&limit=150&year=${yearRange}&${API_params}`;
// `/data/1267348.json`
export const API_URL_title = `${API_URL}/`;
export const API_URL_SEARCH = `${API_URL}/search?${API_limit}&query=`;
export const API_URL_movie = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=movie`;
export const API_URL_tvseries = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=tv-series`;
export const API_URL_cartoon = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=cartoon`;
export const API_URL_animated_series = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=animated-series`;
export const API_URL_anime = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=anime`;

export async function getData({ url }: any) {

  const API_KEY = `${process.env.NEXT_PUBLIC_API_TOKEN}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
    next: {
      revalidate: 36000
    },
  };

  const response = await fetch(url, options);
  const responseData = await response.json();

  const details = await getDetails({ details: responseData });

  return details;
}

