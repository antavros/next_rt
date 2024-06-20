const currentYear = new Date().getFullYear();
const pastYear = currentYear - 1;
const yearRange = `${pastYear}-${currentYear}`;

const ApiUrl = `https://api.kinopoisk.dev/v1.4/`;

const ApiUrl_limit = `limit=40`;
const ApiUrl_params = `sortField=votes.kp&sortType=-1&notNullFields=poster.url`;

export const ApiUrl_Title_Page = `${ApiUrl}movie/`;
export const ApiUrl_Title_Search = `${ApiUrl}movie/search?${ApiUrl_limit}&query=`;

export const ApiUrl_Title_Popular = `${ApiUrl}movie?&lists=popular-films&limit=250&notNullFields=backdrop.url&notNullFields=logo.url&year=${yearRange}&${ApiUrl_params}`;
export const ApiUrl_Title_Anime = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=anime`;
export const ApiUrl_Title_Movie = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=movie`;
export const ApiUrl_Title_Cartoon = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=cartoon`;
export const ApiUrl_Title_TvSeries = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=tv-series`;
export const ApiUrl_Title_AniSeries = `${ApiUrl}movie?${ApiUrl_limit}&${ApiUrl_params}&type=animated-series`;

export const ApiUrl_List_Popular = `${ApiUrl}list?page=1&limit=250&sortField=updatedAt&sortType=-1`;
export const ApiUrl_Person_Popular = `${ApiUrl}person?page=1&limit=250&sortField=movies.rating&sortType=-1`;
