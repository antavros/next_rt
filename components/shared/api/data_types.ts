import { Details } from "./next-title";
import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

// Утилиты для форматирования
const convertMinutesToHours = (minutes: number): string => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч${mins ? mins + "м" : ""}`;
};

const convertDate = (dateString?: string): string => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return [
    d.getDate().toString().padStart(2, "0"),
    (d.getMonth() + 1).toString().padStart(2, "0"),
    d.getFullYear(),
  ].join(".");
};

const formatNumber = (value?: number): string =>
  value != null ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";

export async function getUserMovieData(
  movieIds: string[]
): Promise<Record<string, {
  rating?: number;
  viewed: boolean;
  favourite: boolean;
  bookmark: boolean;
}>> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !movieIds.length) return {};

  try {
    const records = await prisma.userTitle.findMany({
      where: { userId, titleId: { in: movieIds } },
      select: { titleId: true, rating: true, viewed: true, favourite: true, bookmark: true },
    });

    return records.reduce((acc, rec) => {
      acc[rec.titleId] = {
        rating: rec.rating ?? undefined,
        viewed: rec.viewed,
        favourite: rec.favourite,
        bookmark: rec.bookmark,
      };
      return acc;
    }, {} as Record<string, { rating?: number; viewed: boolean; favourite: boolean; bookmark: boolean }>);
  } catch (err: any) {
    console.error("getUserMovieData error:", err);
    return {};
  }
}

export async function getDetails(
  raw: any
): Promise<{
  data: Details[];
  pagination: { total: number; limit: number; page: number; pages: number };
}> {
  try {
    const docs = Array.isArray(raw.docs) ? raw.docs : raw.docs ? [raw.docs] : [];
    const ids = docs.map((d) => String(d.id)).filter(Boolean);
    const userData = await getUserMovieData(ids);

    const data: Details[] = docs.map((d: any) => {
      const id = String(d.id);
      const u = userData[id] ?? { viewed: false, favourite: false, bookmark: false };
      console.log(data);

      return {
        id,
        type: d.type,
        name: d.name ?? d.alternativeName ?? d.enName ?? "",
        enName: d.enName ?? "",
        names: Array.isArray(d.names) ? d.names.map((n: any) => n.name).join(", ") : "",
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
        budget: d.budget?.value ? `${formatNumber(d.budget.value)} ${d.budget.currency}` : "",
        fees: {
          russia: d.fees?.russia ? `${formatNumber(d.fees.russia.value)} ${d.fees.russia.currency}` : "",
          usa: d.fees?.usa ? `${formatNumber(d.fees.usa.value)} ${d.fees.usa.currency}` : "",
          world: d.fees?.world ? `${formatNumber(d.fees.world.value)} ${d.fees.world.currency}` : "",
        },
        premiere: {
          world: convertDate(d.premiere?.world),
          russia: convertDate(d.premiere?.russia),
          digital: convertDate(d.premiere?.digital),
          usa: convertDate(d.premiere?.usa),
        },
        audience: d.audience?.map((a: any) => ({ count: formatNumber(a.count), country: a.country })) ?? [],
        sex: d.sex ?? "",
        age: d.age ?? 0,
        profession: d.profession?.map((p: any) => p.value).join(", ") ?? "",
        userRating: u.rating,
        viewed: u.viewed,
        favourite: u.favourite,
        bookmark: u.bookmark,
      };
    });

    const { total, limit, page, pages } = raw;
    return { data, pagination: { total, limit, page, pages } };
  } catch (err: any) {
    console.error("getDetails error:", err);
    throw err;
  }
}
