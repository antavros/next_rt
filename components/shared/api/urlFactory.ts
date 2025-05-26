const BASE_URL = "https://api.kinopoisk.dev/v1.4";

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const pastYear = currentYear - 2;

const defaultLimit = 48;

type MovieType =
  | "movie"
  | "anime"
  | "cartoon"
  | "tv-series"
  | "animated-series";
type SortField =
  | "year"
  | "votes.kp"
  | "rating.kp"
  | "countAwards"
  | "movies.rating";
type SortType = 1 | -1;

interface MovieQueryParams {
  type?: MovieType;
  year?: string;
  lists?: string;
  sortFields?: SortField[];
  sortTypes?: SortType[];
  notNullFields?: string[];
  limit?: number;
}

interface PersonQueryParams {
  sortFields?: SortField[];
  sortTypes?: SortType[];
  limit?: number;
  notNullFields?: string[];
  selectFields?: string[];
}

function toQueryString(obj: Record<string, any>) {
  const params = [];

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (const val of value) {
        params.push(`${key}=${encodeURIComponent(val)}`);
      }
    } else if (value !== undefined && value !== null) {
      params.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return params.join("&");
}

export const ApiFactory = {
  movie: (params: MovieQueryParams = {}) => {
    const query = toQueryString({
      limit: params.limit ?? defaultLimit,
      sortField: params.sortFields ?? ["year", "votes.kp"],
      sortType: params.sortTypes ?? [-1, -1],
      notNullFields: params.notNullFields ?? ["poster.url", "rating.kp"],
      type: params.type,
      year: params.year,
      lists: params.lists,
    });

    return `${BASE_URL}/movie?${query}`;
  },

  person: (params: PersonQueryParams = {}) => {
    const query = toQueryString({
      limit: params.limit ?? defaultLimit,
      sortField: params.sortFields ?? ["countAwards", "movies.rating"],
      sortType: params.sortTypes ?? [-1, -1],
      notNullFields: params.notNullFields ?? ["photo", "profession.value"],
      selectFields: params.selectFields ?? [
        "profession",
        "name",
        "enName",
        "age",
        "sex",
        "id",
        "photo",
      ],
    });

    return `${BASE_URL}/person?${query}`;
  },

  searchMovie: (query: string) =>
    `${BASE_URL}/movie/search?limit=${defaultLimit}&query=${encodeURIComponent(query)}`,

  listPopular: () =>
    `${BASE_URL}/list?limit=${defaultLimit}&sortField=updatedAt&sortType=-1`,
};
