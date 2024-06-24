import { Details } from '@/components/shared/api/lib';

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

export async function getDetails({ details }: { readonly details: any }): Promise<{ data: Details[], pagination: { total: number, limit: number, page: number, pages: number } }> {
    const docs = Array.isArray(details?.docs) ? details?.docs : [details];

    const detailData = await Promise.all(docs.map(async (doc: any) => {
        const person = Array.isArray(doc?.persons) ? doc.persons : [];
        const similar = Array.isArray(doc?.similarMovies) ? doc.similarMovies : [];
        const trailers = Array.isArray(doc?.videos?.trailers) ? doc.videos.trailers : [];

        const id = doc?.id;
        const type = doc?.type;
        const name = doc?.name ?? doc?.alternativeName ?? doc?.enName ?? '';
        const enName = doc?.enName ?? doc?.alternativeName ?? "";

        const year = doc?.year ?? "...";
        const length = doc?.movieLength ? convertMinutesToHours({ minutes: doc.movieLength }) : '';
        const countries = Array.isArray(doc?.countries) ? doc.countries.map((country: any) => country.name).join(' ') : '';
        const genres = Array.isArray(doc?.genres) ? doc.genres.map((genre: any) => genre.name).join(' ') : '';
        const sDescription = doc?.shortDescription ?? '';
        const description = doc?.description ?? '';

        const logo = doc?.logo?.url ?? '';
        const poster = doc?.poster?.previewUrl ?? doc?.poster?.url ?? '';
        const backdrop = doc?.backdrop?.url ?? '';

        const average_kp = doc?.rating?.kp ?? '';
        const average_imdb = doc?.rating?.imdb ?? '';

        const photo = doc?.photo ?? '';
        const sex = doc?.sex ?? '';
        const age = doc?.age ?? '';


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
            photo,
            sex,
            age,
            hasPosters: !!poster
        };
    }));

    const filteredData = detailData.filter((movie) => movie.hasPosters);
    const { total, limit, page, pages } = details;

    return {
        data: filteredData,
        pagination: {
            total,
            limit,
            page,
            pages,
        },
    };
}
