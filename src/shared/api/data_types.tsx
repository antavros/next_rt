import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

interface TitleRating {
    kp?: any;
    imdb?: any;
    rt?: any;
    averageRating?: ReactNode;
    average_All?: any;
}

interface Title {
    id?: number;
    type?: string;
    name?: string;
    alternativeName?: string;
    enName?: string;
    countries?: string | { name: string }[];
    year?: any;
    length?: any;
    movieLength?: number;
    genres?: string | { name: string }[]
    shortDescription?: string;
    description?: string;
    logo?: { url: any };
    poster?: { previewUrl: any; url: string };
    backdrop?: { previewUrl: any; url: string };
    rating?: TitleRating;
    vote?: any;
    [key: string]: any;
}

export const detailsProps = {
    title: PropTypes.node,
    details: PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
        name: PropTypes.any,
        enName: PropTypes.string,
        countries: PropTypes.string,
        year: PropTypes.string,
        length: PropTypes.string,
        genres: PropTypes.string,
        sDescription: PropTypes.string,
        description: PropTypes.string,
        logo: PropTypes.node,
        poster: PropTypes.string,
        poster2: PropTypes.string,
        backdrop: PropTypes.string,
        backdrop2: PropTypes.string,
        average_kp: PropTypes.node,
        average_imdb: PropTypes.node,
        average_rt: PropTypes.node,
        average_personal: PropTypes.node,
        average_All: PropTypes.node,
    }),
};

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

// getDetail.propTypes = detailsProps;

export async function getDetail({ title }: { readonly title: Title }): Promise<Title> {
    const id = title?.id;
    const type = title?.type;
    const name = title?.name ?? title?.alternativeName ?? title?.enName ?? '';
    const enName = title?.enName ?? title?.alternativeName ?? "";
    const countries = Array.isArray(title?.countries) ? title.countries.map(country => country.name).join(' ') : title?.countries ?? '';
    const year = title?.year ?? "...";
    const length = title?.movieLength ? convertMinutesToHours({ minutes: title.movieLength }) : '';
    const genres =  Array.isArray(title?.genres) ? title.genres.map(genre => genre.name).join(' ') : title?.countries ?? '';
    const sDescription = title?.shortDescription ?? '';
    const description = title?.description ?? '';
    const logo = title?.logo?.url ?? '';
    const poster = title?.poster?.previewUrl ?? '';
    const poster2 = title?.poster?.url ?? '';
    const backdrop = title?.backdrop?.previewUrl ?? '';
    const backdrop2 = title?.backdrop?.url ?? '';
    const average_kp = title?.rating?.kp ?
        <article className="kp" style={getClassByRate({ vote: title.rating.kp })}>
            <h6>КП</h6>
            <span>
                {parseFloat(title.rating.kp).toFixed(1)}
            </span>
        </article> : '';

    const average_imdb = title?.rating?.imdb ?
        <article className="imdb" style={getClassByRate({ vote: title.rating.imdb })}>
            <h6>IMDB</h6>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_rt = title?.rating?.imdb ?
        <article className="rt" style={getClassByRate({ vote: title.rating.imdb })}>
            <h6>RT</h6>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_personal = title?.rating?.imdb ?
        <article className="personal" style={getClassByRate({ vote: title.rating.imdb })}>
            <h6 className="symbols">account_circle</h6>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    let ratings = [];
    
    if (title?.rating?.kp) {
        ratings.push(parseFloat(title.rating.kp));
    }
    if (title?.rating?.imdb) {
        ratings.push(parseFloat(title.rating.imdb));
    }
    if (title?.rating?.rt) {
        ratings.push(parseFloat(title.rating.rt));
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
        average_All,
        average_kp,
        average_imdb,
        average_rt,
        average_personal
    };
}