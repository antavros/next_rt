// components/entities/user/shared.ts
import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export interface UserTitleData {
  rating?: number;
  viewed: boolean;
  favourite: boolean;
  bookmark: boolean;
}
// Преобразует минуты в формат "XчYм"
export function convertMinutesToHours(minutes: number | undefined): string {
  if (!minutes) return "";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}ч${mins ? `${mins}м` : ""}`;
}

// Преобразует дату из ISO-строки в "DD.MM.YYYY"
export function convertDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Форматирует число с разделителем тысяч (например, 1000000 → "1 000 000")
export function formatNumber(value: number | undefined): string {
  if (value == null) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// Получение пользовательских данных по списку ID фильмов/сериалов
export async function getUserMovieData(
  movieIds: string[]
): Promise<Record<string, UserTitleData>> {
  // Проверяем авторизацию
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || movieIds.length === 0) {
    return {};
  }

  try {
    const records = await prisma.userTitle.findMany({
      where: {
        userId,
        titleId: { in: movieIds },
      },
      select: {
        titleId: true,
        rating: true,
        viewed: true,
        favourite: true,
        bookmark: true,
      },
    });

    // Преобразуем массив в объект вида { [titleId]: { rating, viewed, favourite, bookmark } }
    return records.reduce(
      (acc, rec) => {
        acc[rec.titleId] = {
          rating: rec.rating ?? undefined,
          viewed: rec.viewed,
          favourite: rec.favourite,
          bookmark: rec.bookmark,
        };
        return acc;
      },
      {} as Record<string, UserTitleData>
    );
  } catch (err) {
    console.error("Ошибка getUserMovieData:", err);
    return {};
  }
}

// Преобразование “сырых” данных API в формат для компонента TitlePage
export async function parseDetails(raw: any): Promise<{
  data: any[];
  pagination: { total: number; limit: number; page: number; pages: number };
}> {
  try {
    // raw может содержать .docs (из person API) или .data (из movie API)
    const docsArray = Array.isArray(raw.docs)
      ? raw.docs
      : raw.docs
        ? [raw.docs]
        : [];
    const ids = docsArray.map((d: any) => String(d.id)).filter(Boolean);

    // Получаем данные пользователя (рейтинги и пр.)
    const userData = await getUserMovieData(ids);

    const data = docsArray.map((d: any) => {
      const id = String(d.id);
      const u = userData[id] ?? {
        viewed: false,
        favourite: false,
        bookmark: false,
      };

      return {
        id,
        type: d.type,
        name: d.name ?? d.alternativeName ?? d.enName ?? "",
        enName: d.enName ?? "",
        names: Array.isArray(d.names)
          ? d.names.map((n: any) => n.name).join(", ")
          : "",
        slogan: d.slogan ?? "",
        status: d.status ?? "",
        ageRating: d.ageRating ?? 0,
        ageMpaa: d.ratingMpaa ?? 0,
        year: d.year,
        length: convertMinutesToHours(d.movieLength),
        countries: d.countries?.map((c: any) => c.name).join(", ") ?? "",
        genres: d.genres?.map((g: any) => g.name).join(", ") ?? "",
        shortDescription: d.shortDescription ?? "",
        description: d.description ?? "",
        logo: d.logo?.url ?? "",
        posters: d.poster?.url ?? "/images/placeholder.webp",
        backdrop: d.backdrop?.url ?? "/images/placeholder.webp",
        persons: d.persons ?? [],
        similar: d.similarMovies ?? [],
        sequels: d.sequelsAndPrequels ?? [],
        trailers: d.videos?.trailers ?? [],
        watchability: d.watchability?.items ?? [],
        ratingKP: d.rating?.kp ?? 0,
        votesKP: d.votes?.kp ?? 0,
        budget: d.budget?.value
          ? `${formatNumber(d.budget.value)} ${d.budget.currency}`
          : "",
        fees: {
          russia: d.fees?.russia
            ? `${formatNumber(d.fees.russia.value)} ${d.fees.russia.currency}`
            : "",
          usa: d.fees?.usa
            ? `${formatNumber(d.fees.usa.value)} ${d.fees.usa.currency}`
            : "",
          world: d.fees?.world
            ? `${formatNumber(d.fees.world.value)} ${d.fees.world.currency}`
            : "",
        },
        premiere: {
          world: convertDate(d.premiere?.world),
          russia: convertDate(d.premiere?.russia),
          digital: convertDate(d.premiere?.digital),
          usa: convertDate(d.premiere?.usa),
        },
        audience: Array.isArray(d.audience)
          ? d.audience.map((a: any) => ({
              count: formatNumber(a.count),
              country: a.country,
            }))
          : [],
        sex: d.sex ?? "",
        age: d.age ?? 0,
        profession: d.profession?.map((p: any) => p.value).join(", ") ?? "",
        userRating: u.rating,
        viewed: u.viewed,
        favourite: u.favourite,
        bookmark: u.bookmark,
      };
    });

    const pagination = {
      total: raw.total ?? raw.pagination?.total ?? 0,
      limit: raw.limit ?? raw.pagination?.limit ?? 0,
      page: raw.page ?? raw.pagination?.page ?? 0,
      pages: raw.pages ?? raw.pagination?.pages ?? 0,
    };

    return { data, pagination };
  } catch (err) {
    console.error("Ошибка parseDetails:", err);
    throw err;
  }
}
