'use server'

import { Details } from '@/shared/api/lib';

const convertMinutesToHours = ({ minutes }: { minutes: number }): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}ч${remainingMinutes}м`;
    } else if (hours > 0) {
        return `${hours}ч`;
    } else if (remainingMinutes > 0) {
        return `${remainingMinutes}м`;
    } else {
        return '';
    }
}

export async function getDetails({ details }: { readonly details: Details }): Promise<Details> {
    const person = Array.isArray(details?.persons) ? details.persons : [];
    const similar = Array.isArray(details?.similarMovies) ? details.similarMovies : [];
    const trailers = Array.isArray(details?.videos?.trailers) ? details.videos.trailers : [];

    const id = details?.id;
    const type = details?.type;
    const name = details?.name ?? details?.alternativeName ?? details?.enName ?? '';
    const enName = details?.enName ?? details?.alternativeName ?? "";

    const year = details?.year ?? "...";
    const length = details?.movieLength ? convertMinutesToHours({ minutes: details.movieLength }) : '';
    const countries = Array.isArray(details?.countries) ? details.countries.map(country => country.name).join(' ') : details?.countries ?? '';
    const genres = Array.isArray(details?.genres) ? details.genres.map(genre => genre.name).join(' ') : details?.countries ?? '';
    const sDescription = details?.shortDescription ?? '';
    const description = details?.description ?? '';

    const logo = details?.logo?.url ?? '';
    const poster = details?.poster?.url ?? details?.poster?.previewUrl ?? '';
    const backdrop = details?.backdrop?.url ?? details?.backdrop?.previewUrl ?? '';

    const average_kp = details?.rating?.kp ?? '';
    const average_imdb = details?.rating?.imdb ?? '';

    return {
        id,
        type,
        name,
        enName,
        countries,
        year,
        length,
        genres,
        sDescription,
        description,
        logo,
        poster,
        backdrop,
        person,
        similar,
        trailers,
        average_kp,
        average_imdb,
    };
}