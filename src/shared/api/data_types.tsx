import React, { ReactNode } from 'react';

interface TitleRating {
    rating?: object;
    kp?: string;
    imdb?: string;
    rt?: string;
    averageRating?: ReactNode;
    average_All?: string;
}

export interface Details {

    details?: object;
    data?: object;
    persons?: any[];
    id?: string;
    type?: string;
    name?: string;
    alternativeName?: string;
    enName?: string;
    countries?: string | { name: string }[];
    year?: any;
    length?: any;
    movieLength?: number;
    genres?: string | { name: string }[]
    sDescription?: string;
    description?: string;
    logo?: { url: any };
    poster?: { previewUrl: any; url: string };
    poster2?: string;
    backdrop?: { previewUrl: any; url: string };
    backdrop2?: string;
    rating?: TitleRating;
    vote?: any;
    [key: string]: any;
}

function getClassByRate({ vote }: { vote: any }) {
    const hue = (vote / 10) * 110;
    const saturation = 100;
    const lightness = 50;
    const transparent = 1;
    const rateColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;
    return {
        border: `0 solid ${rateColor}`,
        boxShadow: `0rem 0rem 0.1rem 0.15rem ${rateColor}`,
        color: `${rateColor}`
    };
}

function convertMinutesToHours({ minutes }: { minutes: number }): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}ч${remainingMinutes}м`;
    } else if (hours > 1) {
        return `${hours}ч`;
    } else if (remainingMinutes > 0) {
        return `${remainingMinutes}м`;
    } else {
        return '';
    }
}

export async function getDetails({ details }: { readonly details: Details }): Promise<Details> {
    const persons = Array.isArray(details?.persons) ? details.persons : [];
    const similar = Array.isArray(details?.similarMovies) ? details.similarMovies : [];

    const id = details?.id ?? details?.similar?.id ;
    const type = details?.type;
    const name = details?.name ?? details?.alternativeName ?? details?.enName ?? details?.similar?.name ?? '';
    const enName = details?.enName ?? details?.alternativeName ?? details?.similar?.enName ?? "";

    const countries = Array.isArray(details?.countries) ? details.countries.map(country => country.name).join(' ') : details?.countries ?? '';
    const year = details?.year ?? details?.similar?.id ?? "...";
    const length = details?.movieLength ? convertMinutesToHours({ minutes: details.movieLength }) : '';
    const genres =  Array.isArray(details?.genres) ? details.genres.map(genre => genre.name).join(' ') : details?.countries ?? '';
    const sDescription = details?.shortDescription ?? '';
    const description = details?.description ?? '';

    const logo = details?.logo?.url ?? '';
    const poster = details?.poster?.previewUrl ?? details?.similar?.poster?.previewUrl ?? '';
    const poster2 = details?.poster?.url ?? details?.similar?.poster?.url ?? '';
    const backdrop = details?.backdrop?.previewUrl ?? '';
    const backdrop2 = details?.backdrop?.url ?? '';


    const average_kp = details?.rating?.kp ?
        <article className="kp" style={getClassByRate({ vote: details.rating.kp })}>
            <h6>КП</h6>
            <span>
                {parseFloat(details.rating.kp).toFixed(1)}
            </span>
        </article> : '';

    const average_imdb = details?.rating?.imdb ?
        <article className="imdb" style={getClassByRate({ vote: details.rating.imdb })}>
            <h6>IMDB</h6>
            <span>
                {parseFloat(details.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_rt = details?.rating?.imdb ?
        <article className="rt" style={getClassByRate({ vote: details.rating.imdb })}>
            <h6>RT</h6>
            <span>
                {parseFloat(details.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_personal = details?.rating?.imdb ?
        <article className="personal" style={getClassByRate({ vote: details.rating.imdb })}>
            <h6 className="symbols">account_circle</h6>
            <span>
                {parseFloat(details.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    let ratings = [];
    
    if (details?.rating?.kp) {
        ratings.push(parseFloat(details.rating.kp));
    }
    if (details?.rating?.imdb) {
        ratings.push(parseFloat(details.rating.imdb));
    }
    if (details?.rating?.rt) {
        ratings.push(parseFloat(details.rating.rt));
    }
    let average_All = null;
    if (ratings.length > 0) {
        const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

        average_All = (
            <article className="all" style={getClassByRate({ vote: averageRating })}>
                <h6>RT</h6>
                <span>{averageRating.toFixed(1)}</span>
            </article>
        );
    }
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
        poster2,
        backdrop,
        backdrop2,
        persons,
        similar,
        average_All,
        average_kp,
        average_imdb,
        average_rt,
        average_personal
    } as Details;
}