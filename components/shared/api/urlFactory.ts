// components/shared/api/urlFactory.ts
const BASE_URL = "https://api.kinopoisk.dev/v1.4";
const defaultLimit = 48;

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

// Преобразует объект параметров в строку query
function toQueryString(params: Record<string, any>): string {
  const parts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          parts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`
          );
        }
      });
    } else if (value !== undefined && value !== null && value !== "") {
      parts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  });

  return parts.join("&");
}

export const ApiFactory = {
  // Генерация URL для movie (по умолчанию сортировка по году и голосам)
  movie: (params: MovieQueryParams = {}): string => {
    const queryObj: Record<string, any> = {
      limit: params.limit ?? defaultLimit,
      sortField: params.sortFields ?? ["year", "votes.kp"],
      sortType: params.sortTypes ?? [-1, -1],
      notNullFields: params.notNullFields ?? ["poster.url", "rating.kp"],
      type: params.type,
      year: params.year,
      lists: params.lists,
    };

    const query = toQueryString(queryObj);
    return `${BASE_URL}/movie?${query}`;
  },

  // Генерация URL для person (сортировка по количеству наград и рейтингу фильмов)
  person: (params: PersonQueryParams = {}): string => {
    const queryObj: Record<string, any> = {
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
    };

    const query = toQueryString(queryObj);
    return `${BASE_URL}/person?${query}`;
  },

  // Поиск фильма по запросу
  search: (queryString: string, page: string = "1"): string => {
    return `${BASE_URL}/movie/search?limit=${defaultLimit}&query=${encodeURIComponent(
      queryString
    )}&page=${encodeURIComponent(page)}`;
  },

  listPopular: (): string => {
    return `${BASE_URL}/list?limit=${defaultLimit}&sortField=updatedAt&sortType=-1`;
  },

  // Получение детальной информации (movie или person) по ID
  details: (category: "movie" | "person", id: string): string => {
    return `${BASE_URL}/${category}/${encodeURIComponent(id)}`;
  },
};
