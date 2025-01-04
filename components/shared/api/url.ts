const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const pastYear = currentYear - 2;
const yearRange = `${pastYear}-${currentYear}`;

const ApiUrl = `https://api.kinopoisk.dev/v1.4/`;

const ApiUrl_limit = `limit=42`;
const ApiUrl_params = `sortField=year&sortField=votes.kp&sortType=-1&sortType=-1&notNullFields=poster.url&notNullFields=rating.kp`;

export const ApiUrl_Title_Page = `${ApiUrl}movie/`;
export const ApiUrl_Person_Page = `${ApiUrl}person/`;
export const ApiUrl_Title_Search = `${ApiUrl}movie/search?${ApiUrl_limit}&query=`;
export const ApiUrl_Title_Popular = `${ApiUrl}movie?&lists=popular-films&limit=250&notNullFields=backdrop.url&year=${yearRange}&${ApiUrl_params}`;

export const ApiUrl_Title_Anime = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=anime&year=1874-2024`;
export const ApiUrl_Title_Movie = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=movie&year=1874-2024`;
export const ApiUrl_Title_Cartoon = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=cartoon&year=1874-2024`;
export const ApiUrl_Title_TvSeries = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=tv-series&year=1874-2024`;
export const ApiUrl_Title_AniSeries = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=animated-series&year=1874-2024`;
export const ApiUrl_Title_Announced = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&year=${nextYear}-2050`;

export const ApiUrl_Title_Person = `${ApiUrl}person?${ApiUrl_limit}&sortField=countAwards&sortField=movies.rating&sortType=-1&sortType=-1&notNullFields=photo&notNullFields=profession.value&selectFields=profession&selectFields=name&selectFields=enName&selectFields=age&selectFields=sex&selectFields=id&selectFields=photo`;

export const ApiUrl_List_Popular = `${ApiUrl}list?page=1&limit=250&sortField=updatedAt&sortType=-1`;
