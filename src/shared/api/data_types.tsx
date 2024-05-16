import PropTypes from 'prop-types';

function getClassByRate(vote) {
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

function convertMinutesToHours(minutes) {
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



//------------------------------------------------------------------------------------------------------------>
const currentYear = new Date().getFullYear();
const pastYear = currentYear - 1;
const yearRange = `${pastYear}-${currentYear}`;

const API_URL = `https://api.kinopoisk.dev/v1.4/movie`;
const API_limit = `limit=50`;
const API_page = `page=1`;
const API_params = `sortField=votes.kp&sortType=-1&notNullFields=poster.url`;

export const API_URL_SWIPER = `${API_URL}?&lists=popular-films&limit=10&year=${yearRange}&${API_params}`;
export const API_URL_POPULAR = `${API_URL}?&lists=popular-films&${API_limit}&year=${yearRange}&${API_params}`;
// `/data/1267348.json`
export const API_URL_title = `${API_URL}/`;
export const API_URL_SEARCH = `${API_URL}/search?${API_limit}&${API_page}&query=`;
export const API_URL_movie = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=movie`;
export const API_URL_series = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=tv-series`;
export const API_URL_cartoon = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=cartoon`;
export const API_URL_animated_series = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=animated-series`;
export const API_URL_anime = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=anime`;

//------------------------------------------------------------------------------------------------------------>

export const detailsProps = {
    title: PropTypes.node,
    details: PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
        name: PropTypes.string,
        enName: PropTypes.string,
        countries: PropTypes.string,
        year: PropTypes.number,
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
        average_All: PropTypes.node
    }),
};

getDetail.propTypes = detailsProps;
export async function getDetail({ title }) {
    const id = title?.id;
    const type = title?.type;
    const name = title?.name || title?.alternativeName || title?.enName || '';
    const enName = title?.enName || title?.alternativeName || "";
    const countries = title?.countries?.map(name => name.name).join(' ') || '';
    const year = title?.year || "...";
    const length = title?.movieLength ? convertMinutesToHours(title.movieLength) : '';
    const genres = title?.genres ? title.genres.map(name => name.name).join(' ') : '';
    const sDescription = title?.shortDescription || '';
    const description = title?.description || '';
    const logo = title?.logo?.url || '';
    const poster = title?.poster?.previewUrl || '';
    const poster2 = title?.poster?.url || '';
    const backdrop = title?.backdrop?.previewUrl || '';
    const backdrop2 = title?.backdrop?.url || '';
    const average_kp = title?.rating?.kp ?
        <article className="kp" style={getClassByRate(title.rating.kp)}>
            <h3>КП</h3>
            <span>
                {parseFloat(title.rating.kp).toFixed(1)}
            </span>
        </article> : '';

    const average_imdb = title?.rating?.imdb ?
        <article className="imdb" style={getClassByRate(title.rating.imdb)}>
            <h3>IMDB</h3>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_rt = title?.rating?.imdb ?
        <article className="rt" style={getClassByRate(title.rating.imdb)}>
            <h3>RT</h3>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const average_personal = title?.rating?.imdb ?
        <article className="personal" style={getClassByRate(title.rating.imdb)}>
            <h3 className="symbols">account_circle</h3>
            <span>
                {parseFloat(title.rating.imdb).toFixed(1)}
            </span>
        </article> : '';

    const ratings = [];
    let average_All = '';
    if (title?.rating?.kp) {
        ratings.push(parseFloat(title.rating.kp));
    }
    if (title?.rating?.imdb) {
        ratings.push(parseFloat(title.rating.imdb));
    }
    if (title?.rating?.rt) {
        ratings.push(parseFloat(title.rating.rt));
    }
    if (ratings.length > 0) {
        const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

        average_All = (
            <article className="all" style={getClassByRate(averageRating)}>
                <h3>RT</h3>
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
