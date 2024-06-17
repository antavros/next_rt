const currentYear = new Date().getFullYear();
const pastYear = currentYear - 1;
const yearRange = `${pastYear}-${currentYear}`;

const API_URL = `https://api.kinopoisk.dev/v1.4/movie`;
const API_limit = `limit=40`;
const API_params = `sortField=votes.kp&sortType=-1&notNullFields=poster.url`;

export const API_URL_POPULAR = `${API_URL}?&lists=popular-films&limit=200&year=${yearRange}&${API_params}`;
export const API_URL_title = `${API_URL}/`;
export const API_URL_SEARCH = `${API_URL}/search?${API_limit}&query=`;
export const API_URL_anime = `${API_URL}?${API_limit}&${API_params}&type=anime`;
export const API_URL_movie = `${API_URL}?${API_limit}&${API_params}&type=movie`;
export const API_URL_cartoon = `${API_URL}?${API_limit}&${API_params}&type=cartoon`;
export const API_URL_tvseries = `${API_URL}?${API_limit}&${API_params}&type=tv-series`;
export const API_URL_animated_series = `${API_URL}?${API_limit}&${API_params}&type=animated-series`;

