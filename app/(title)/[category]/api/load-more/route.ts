import { NextResponse } from "next/server";
import { fetchCategoryDetailsAndMetadata } from "@/components/shared/api/serverUtils";
import type { NextRequest } from "next/server";

// Файл: app/[category]/api/load-more/route.ts
// Обрабатывает запросы вида: GET /{category}/api/load-more?page=2&genre=драма&year=2023&rating=8

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  // Разбор query-параметров из URL
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const filters = {
    genre: url.searchParams.get("genre") ?? undefined,
    year: url.searchParams.get("year") ?? undefined,
    rating: url.searchParams.get("rating") ?? undefined,
  };

  // Получаем детали и пагинацию
  const { details } = await fetchCategoryDetailsAndMetadata(
    category,
    page,
    filters
  );

  // В ответ возвращаем только массив data и обновлённую информацию о пагинации
  return NextResponse.json({
    details: details?.data ?? [],
    pagination: details?.pagination ?? {
      page: Number(page),
      pages: 1,
      limit: 0,
      total: 0,
    },
  });
}
