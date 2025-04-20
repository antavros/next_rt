import { Details } from "./next-title";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

const convertMinutesToHours = ({ minutes }: { minutes: number }): string => {
  let result = "";
  if (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    result = hours + "ч" + (remainingMinutes ? remainingMinutes + "м" : "");
  }
  return result;
};

const convertDateFormat = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
};

const convertValueFormat = (value: any): string =>
  value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";

export async function getUserMovieData({
  movieIds,
}: {
  movieIds: string[];
}): Promise<{
  [key: string]: {
    rating?: number;
    viewed?: boolean;
    favourite?: boolean;
    bookmark?: boolean;
  };
}> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !Array.isArray(movieIds) || movieIds.length === 0) {
    console.warn("getUserMovieData: Invalid input", { userId, movieIds });
    return {};
  }

  try {
    const stringMovieIds = movieIds.map((id) => String(id));
    const movieData = await prisma.userTitle.findMany({
      where: { userId, titleId: { in: stringMovieIds } },
      select: {
        titleId: true,
        rating: true,
        viewed: true,
        favourite: true,
        bookmark: true,
      },
    });

    return movieData.reduce(
      (acc, { titleId, rating, viewed, favourite, bookmark }) => {
        acc[titleId] = { rating, viewed, favourite, bookmark };
        return acc;
      },
      {} as {
        [key: string]: {
          rating?: number;
          viewed?: boolean;
          favourite?: boolean;
          bookmark?: boolean;
        };
      }
    );
  } catch (error: any) {
    console.error("Ошибка получения данных пользователя:", {
      userId,
      movieIds,
      error: error.message ?? error,
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
    const movieIds = docs.map((doc: any) => String(doc?.id)).filter(Boolean);

    // Получаем пользовательские данные
    const userMovieData = await getUserMovieData({ movieIds });

    const transformMovie = (doc: any) => {
      if (!doc?.id) return null;

      const userData = userMovieData[String(doc?.id)] || {};

      return {
        id: String(doc?.id),
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
        year: doc?.year ?? "",
        length: convertMinutesToHours({ minutes: doc?.movieLength }),
        countries: doc?.countries?.map((c: any) => c?.name).join(" ") ?? "",
        genres: doc?.genres?.map((g: any) => g?.name).join(" ") ?? "",
        sDescription: doc?.shortDescription ?? "",
        description: doc?.description ?? "",
        logo: doc?.logo?.url ?? doc?.logo?.previewUrl ?? "",
        posters:
          doc?.photo ??
          doc?.poster?.url ??
          doc?.poster?.previewUrl ??
          "/images/placeholder.webp",
        backdrop:
          doc?.backdrop?.url ??
          doc?.backdrop?.previewUrl ??
          "/images/placeholder.webp",
        person: doc?.persons ?? [],
        similar: doc?.similarMovies ?? [],
        chapters: doc?.sequelsAndPrequels ?? [],
        trailers: doc?.videos?.trailers ?? [],
        watchability: doc?.watchability?.items ?? [],
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
        premiereWorld: convertDateFormat(doc?.premiere?.world),
        premiereRussia: convertDateFormat(doc?.premiere?.russia),
        premiereBluray: convertDateFormat(doc?.premiere?.digital),
        premiereUSA: convertDateFormat(doc?.premiere?.usa),
        audience: doc?.audience
          ? doc.audience.map((audience: any) => ({
              count: convertValueFormat(audience?.count),
              country: audience?.country,
            }))
          : [],
        sex: doc?.sex ?? "",
        age: doc?.age ?? "",
        profession: doc?.profession
          ? doc.profession.map((p: any) => p?.value).join(" ")
          : "",
        hasPosters: !!(doc?.poster?.url ?? doc?.poster?.previewUrl),
        userRating: userData.rating ?? null,
        viewed: userData.viewed || false,
        favourite: userData.favourite || false,
        bookmark: userData.bookmark || false, // Добавлен bookmark
      };
    };

    const detailData = docs.map(transformMovie).filter(Boolean); // Убираем `null`
    const { total, limit, page, pages } = details;

    return { data: detailData, pagination: { total, limit, page, pages } };
  } catch (error: any) {
    console.error("Ошибка getDetails:", error);
    throw new Error(`Не удалось получить детали: ${error.message}`);
  }
}
