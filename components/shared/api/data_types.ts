import { Details } from "./next-title";

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
    return "";
  }
};

function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function convertValueFormat(value: any): string {
  if (value === undefined || value === null) {
    console.warn("convertValueFormat: received undefined or null value", value); // Логирование для отладки
    return ""; // Возвращаем пустую строку по умолчанию
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export async function getDetails({
  details,
}: {
  readonly details: any;
}): Promise<{
  data: Details[];
  pagination: { total: number; limit: number; page: number; pages: number };
}> {
  try {
    const docs = Array.isArray(details?.docs) ? details?.docs : [details];

    const detailData = await Promise.all(
      docs.map(async (doc: any) => {
        const person = Array.isArray(doc?.persons) ? doc.persons : [];
        const similar = Array.isArray(doc?.similarMovies)
          ? doc.similarMovies
          : [];
        const trailers = Array.isArray(doc?.videos?.trailers)
          ? doc.videos.trailers
          : [];
        const chapters = Array.isArray(doc?.sequelsAndPrequels)
          ? doc.sequelsAndPrequels
          : [];
        const watchability = Array.isArray(doc?.watchability?.items)
          ? doc.watchability?.items
          : [];

        const sex = doc?.sex;
        const age = doc?.age;

        const id = doc?.id;
        const type = doc?.type;
        const name = doc?.name ?? doc?.alternativeName ?? doc?.enName ?? "";
        const enName = doc?.enName ?? doc?.alternativeName ?? "";

        const names = Array.isArray(doc?.names)
          ? doc?.names.map((names: any) => names?.name).join(" ")
          : "";
        const slogan = doc?.slogan ?? "";
        const status = doc?.status ?? "";
        const ageRating = doc?.ageRating ?? "";
        const ageMpaa = doc?.ratingMpaa ?? "";

        const year = doc?.year ?? "...";
        const length = doc?.movieLength
          ? convertMinutesToHours({ minutes: doc?.movieLength })
          : "";
        const countries = Array.isArray(doc?.countries)
          ? doc?.countries.map((country: any) => country?.name).join(" ")
          : "";
        const genres = Array.isArray(doc?.genres)
          ? doc?.genres.map((genre: any) => genre?.name).join(" ")
          : "";
        const sDescription = doc?.shortDescription ?? "";
        const description = doc?.description ?? "";

        const logo = doc?.logo?.url ?? "";
        const poster =
          doc?.poster?.previewUrl ?? doc?.poster?.url ?? doc?.photo ?? "";
        const backdrop = doc?.backdrop?.url ?? "";

        const average_kp = doc?.rating?.kp ?? "";
        const votes_kp = doc?.votes?.kp ?? "";

        const average_imdb = doc?.rating?.imdb ?? "";

        const budget = doc?.budget?.value
          ? `${convertValueFormat(doc?.budget?.value)} ${doc?.budget?.currency}`
          : "";

        const fees = doc?.fees ?? {};
        const feesRussia = fees?.russia?.value
          ? `${convertValueFormat(fees?.russia?.value)} ${
              fees?.russia?.currency
            }`
          : "";
        const feesUSA = fees?.usa?.value
          ? `${convertValueFormat(fees.usa.value)} ${fees?.usa?.currency}`
          : "";
        const feesWorld = fees?.world?.value
          ? `${convertValueFormat(fees?.world?.value)} ${fees?.world?.currency}`
          : "";

        const premiereRussia = doc?.premiere?.russia
          ? convertDateFormat(doc?.premiere?.russia)
          : "";

        const premiereUSA = doc?.premiere?.usa
          ? convertDateFormat(doc?.premiere?.usa)
          : "";
        const premiereWorld = doc?.premiere?.world
          ? convertDateFormat(doc?.premiere?.world)
          : "";
        const premiereBluray = doc?.premiere?.digital
          ? convertDateFormat(doc?.premiere?.digital)
          : "";

        const audience = Array.isArray(doc?.audience)
          ? doc?.audience?.map((audience: any) => ({
              count: convertValueFormat(audience?.count),
              country: audience?.country,
            }))
          : [];

        return {
          id,
          type,
          name,
          enName,
          names,
          slogan,
          status,
          ageRating,
          ageMpaa,
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
          chapters,
          trailers,
          watchability,
          average_kp,
          votes_kp,
          average_imdb,
          budget,
          feesRussia,
          feesUSA,
          feesWorld,
          premiereWorld,
          premiereRussia,
          premiereBluray,
          premiereUSA,
          audience,
          sex,
          age,
          hasPosters: !!poster,
        };
      })
    );

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
  } catch (error: any) {
    console.error("getDetails error:", error);
    throw new Error(`Failed to get details: ${error.message}`);
  }
}
