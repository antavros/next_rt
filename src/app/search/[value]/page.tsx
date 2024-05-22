
import { TitlesContainer } from "../../../entities/title/titles_table/titles_table.jsx";
import {
    API_URL_SEARCH,
    getData
} from "../../../shared/api/api";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'ПОИСК',
    openGraph: {
        title: 'ПОИСК',
    },
}

export default async function Search({ params}: { readonly params: { readonly value: string } }) {
    const searchValue = params.value.toLowerCase();
    const data = await getData({ url: `${API_URL_SEARCH}${searchValue}` });
    return (<TitlesContainer titleData={data} />);
}