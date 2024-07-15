'use server';

import { redirect } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from "next";
import { TitlePage } from "@/components/entities/Title/Page";
import { fetchDetailsAndMetadata, allowedCategories } from "@/components/shared/api/utils";

// Используем асинхронную функцию для генерации метаданных
export async function generateMetadata({ params }: { readonly params: { readonly id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const { metadata } = await fetchDetailsAndMetadata(id, parent);
  return metadata;
}

// Главный компонент страницы
export default async function TitlePageRender({ params }: { readonly params: { readonly id: string, readonly category: string } }) {
  const id = params.id;
  const category = params.category;

  // Проверка, является ли категория допустимой
  if (!allowedCategories.includes(category)) {
    return null;
  }

  const { details } = await fetchDetailsAndMetadata(id, {} as ResolvingMetadata);

  // Проверка, совпадает ли категория с details.type
  if (details.type !== category) {
    // Если не совпадает, перенаправляем на правильный URL
    redirect(`/${details.type}/${id}`);
    return;
  }

  return <TitlePage details={details} />;
}
