import { Details } from "./next-title";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

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

export async function getUserRatings({
  movieIds,
}: {
  movieIds: string[];
}): Promise<{ [key: string]: number }> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    console.warn("getUserRatings: User is not authenticated");
    return {};
  }

  if (!Array.isArray(movieIds) || movieIds.length === 0) {
    console.warn("getUserRatings: movieIds is empty or invalid", movieIds);
    return {};
  }

  try {
    const stringMovieIds = movieIds.map((id) => id.toString());
    const ratings = await prisma.userTitle.findMany({
      where: {
        userId,
        titleId: {
          in: stringMovieIds,
        },
      },
      select: {
        titleId: true,
        rating: true,
      },
    });

    const ratingsMap: { [key: string]: number } = {};
    ratings.forEach(({ titleId, rating }) => {
      if (rating !== null) {
        ratingsMap[titleId] = rating;
      }
    });
    console.log(ratingsMap);
    return ratingsMap;
  } catch (error: any) {
    console.error("Ошибка получения пользовательских рейтингов:", {
      userId,
      movieIds,
      error: error.message || error,
    });
    return {};
  }
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
    const docs = Array.isArray(details?.docs) ? details.docs : [details];
    const movieIds = docs.map((doc: any) => doc.id);

    // Получаем пользовательские рейтинги для всех фильмов на странице
    const userRatings = await getUserRatings({ movieIds });

    const transformMovie = (doc: any) => {
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
        ? doc.watchability.items
        : [];
      const audience = Array.isArray(doc?.audience)
        ? doc.audience.map((audience: any) => ({
            count: convertValueFormat(audience?.count),
            country: audience?.country,
          }))
        : [];

      const profession = Array.isArray(doc?.profession)
        ? doc.profession.map((p: any) => p?.value).join(" ")
        : "";

      return {
        id: doc?.id,
        movieIds: Array.isArray(doc) ? doc.map((d: any) => d.id) : [],
        type: doc?.type,
        name: doc?.name ?? doc?.alternativeName ?? doc?.enName ?? "",
        enName: doc?.enName ?? doc?.alternativeName ?? "",
        names: Array.isArray(doc?.names)
          ? doc.names.map((n: any) => n?.name).join(" ")
          : "",
        slogan: doc?.slogan ?? "",
        status: doc?.status ?? "",
        ageRating: doc?.ageRating ?? "",
        ageMpaa: doc?.ratingMpaa ?? "",
        year: doc?.year ?? "...",
        length: doc?.movieLength
          ? convertMinutesToHours({ minutes: doc.movieLength })
          : "",
        countries: Array.isArray(doc?.countries)
          ? doc.countries.map((c: any) => c?.name).join(" ")
          : "",
        genres: Array.isArray(doc?.genres)
          ? doc.genres.map((g: any) => g?.name).join(" ")
          : "",
        sDescription: doc?.shortDescription ?? "",
        description: doc?.description ?? "",
        logo: doc?.logo?.url ?? doc?.logo?.previewUrl ?? "",
        poster: doc?.poster?.previewUrl ?? doc?.poster?.url ?? "",
        backdrop: doc?.backdrop?.url ?? "",
        person,
        similar,
        chapters,
        trailers,
        watchability,
        average_kp: doc?.rating?.kp ?? "",
        votes_kp: doc?.votes?.kp ?? "",
        average_imdb: doc?.rating?.imdb ?? "",
        budget: doc?.budget?.value
          ? `${convertValueFormat(doc.budget.value)} ${doc.budget.currency}`
          : "",
        feesRussia: doc?.fees?.russia?.value
          ? `${convertValueFormat(doc.fees.russia.value)} ${
              doc.fees.russia.currency
            }`
          : "",
        feesUSA: doc?.fees?.usa?.value
          ? `${convertValueFormat(doc.fees.usa.value)} ${doc.fees.usa.currency}`
          : "",
        feesWorld: doc?.fees?.world?.value
          ? `${convertValueFormat(doc.fees.world.value)} ${
              doc.fees.world.currency
            }`
          : "",
        premiereWorld: doc?.premiere?.world
          ? convertDateFormat(doc.premiere.world)
          : "",
        premiereRussia: doc?.premiere?.russia
          ? convertDateFormat(doc.premiere.russia)
          : "",
        premiereBluray: doc?.premiere?.digital
          ? convertDateFormat(doc.premiere.digital)
          : "",
        premiereUSA: doc?.premiere?.usa
          ? convertDateFormat(doc.premiere.usa)
          : "",
        audience,
        sex: doc?.sex ?? "",
        age: doc?.age ?? "",
        profession,
        hasPosters: !!(doc?.poster?.url || doc?.poster?.previewUrl),
        userRating: userRatings[doc.id] || null, // Добавляем пользовательский рейтинг
      };
    };

    const detailData = docs.map(transformMovie);
    const filteredData = detailData.filter((movie) => movie.hasPosters);
    const { total, limit, page, pages } = details;

    return {
      data: filteredData,
      pagination: { total, limit, page, pages },
    };
  } catch (error: any) {
    console.error("getDetailsWithUserRatings error:", error);
    throw new Error(
      `Failed to get details with user ratings: ${error.message}`
    );
  }
}
