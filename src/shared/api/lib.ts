import { ReactNode } from 'react';
import { SwiperOptions } from 'swiper/types';

interface TitleRating {
    rating?: object;
    kp?: string;
    imdb?: string;
    rt?: string;
    averageRating?: ReactNode;
    average_All?: string;
}

export interface Person {
    id: number;
    photo: string;
    name: string;
    enName: string | null;
    description: string | null;
    profession: string;
    enProfession: string;
}

export interface Similar {
    id: string;
    photo: string;
    name: string;
    enName: string | null;
    description: string | null;
    profession: string;
    enProfession: string;
    poster?: { url: string; previewUrl: string; };
}

export interface Details extends SwiperOptions {
    style?: {
        swiper: string;
        swiper_wrapper: string;
        swiper_info: string;
    };
    href?: string | null;

    className?: string;
    params?: { readonly id: string };
    option?: any;

    data?: any;
    details?: any;
    detailsData?: any;

    person?: Person[];
    similar?: any;
    trailers?: any;

    [key: string]: any;
    index?: number;
    id?: number;
    type?: string;

    name?: string;
    alternativeName?: string;
    enName?: string;
    countries?: string | { name: string }[];
    year?: any;
    length?: any;
    movieLength?: number;
    genres?: string | { name: string }[];
    sDescription?: string;
    description?: string;

    logo?: { url: any };
    poster?: { url: any; previewUrl: any; };
    backdrop?: { url: any; previewUrl: any; };

    rating?: TitleRating;
    vote?: any;
}



interface Movie {
    id: number;
    collections: [];
    countries: Country[];
    createdAt: string;
    facts: Fact[];
    genres: Genre[];
    names: Name[];
    persons: Person[];
    productionCompanies: [];
    seasonsInfo: [];
    sequelsAndPrequels: [];
    similarMovies: Movie[];
    spokenLanguages: [];
    updatedAt: string;
    imagesInfo: ImagesInfo;
    budget: {};
    fees: Fees;
    premiere: Premiere;
    alternativeName: string | null;
    description: string;
    enName: string | null;
    externalId: ExternalId;
    movieLength: number;
    name: string;
    poster: Poster;
    rating: Rating;
    ratingMpaa: string | null;
    shortDescription: string;
    slogan: string;
    status: string | null;
    technology: Technology;
    ticketsOnSale: boolean;
    type: string;
    typeNumber: number;
    votes: Votes;
    year: number;
    ageRating: number;
    backdrop: Poster;
    logo: Poster | null;
    watchability: Watchability;
    top10: null | number;
    top250: null | number;
    isSeries: boolean;
    seriesLength: number | null;
    totalSeriesLength: number | null;
    deletedAt: string | null;
    lists: string[];
    audience: Audience[];
    networks: [];
    videos: Videos;
}

interface Country {
    name: string;
}

interface Fact {
    value: string;
    type: string;
    spoiler: boolean;
}

interface Genre {
    name: string;
}

interface Name {
    name: string;
}

interface ImagesInfo {
    framesCount: number;
}

interface Fees {
    russia: {
        value: number;
        currency: string;
    };
}

interface Premiere {
    world: string;
    russia: string;
}

interface ExternalId {
    imdb: string;
    tmdb: number;
    kpHD: string;
}

interface Poster {
    url: string;
    previewUrl: string;
}

interface Rating {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
}

interface Technology {
    hasImax: boolean;
    has3D: boolean;
}

interface Votes {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
}

interface Audience {
    count: number;
    country: string;
}

interface WatchabilityItem {
    name: string;
    logo: {
        url: string;
    };
    url: string;
}

interface Watchability {
    items: WatchabilityItem[];
}

interface Videos {
    trailers: Trailer[];
}

interface Trailer {
    url: string;
    name: string;
    site: string;
    type: string;
}
