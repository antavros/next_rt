const BASE_URL = "https://api.kinopoisk.dev/v1.4";
const defaultLimit = 1;

export type MovieType =
  | "movie"
  | "anime"
  | "cartoon"
  | "tv-series"
  | "animated-series";

export type SortField =
  | "year"
  | "votes.kp"
  | "rating.kp"
  | "countAwards"
  | "movies.rating"
  | "updatedAt";

export type SortType = 1 | -1;

export interface MovieQueryParams {
  limit?: number;
  sortFields?: SortField[];
  sortTypes?: SortType[];
  notNullFields?: string[];
  type?: MovieType;
  year?: string;
  lists?: string;
}

export interface PersonQueryParams {
  limit?: number;
  sortFields?: SortField[];
  sortTypes?: SortType[];
  notNullFields?: string[];
  selectFields?: string[];
}

function toQueryString(params: Record<string, any>): string {
  const parts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (const v of value) {
        // для булевых и числовых приводим к строке
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      }
    } else if (value !== undefined && value !== null && value !== "") {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });

  return parts.join("&");
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

  search: (queryString: string, page: string = "1") => {
    // В API поиск работает через /movie/search
    return `${BASE_URL}/movie/search?limit=${defaultLimit}&query=${encodeURIComponent(
      queryString
    )}&page=${page}`;
  },

  listPopular: () =>
    `${BASE_URL}/list?limit=${defaultLimit}&sortField=updatedAt&sortType=-1`,

  details: (category: "movie" | "person", id: string) =>
    `${BASE_URL}/${category}/${id}`,
};
