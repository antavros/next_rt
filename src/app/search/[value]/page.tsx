
import { TitleTable } from "@/entities/Title/Table";
import {
    API_URL_SEARCH,
    getData
} from "@/shared/api/api";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'ПОИСК',
    openGraph: {
        title: 'ПОИСК',
    },
}

export default async function Search({ params }: { readonly params: { readonly value: string } }) {
    const searchValue = params.value.toLowerCase();
    const data = await getData({ url: `${API_URL_SEARCH}${searchValue}` });
    return (<TitleTable titleData={data} />);
}