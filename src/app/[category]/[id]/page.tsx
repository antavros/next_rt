import { TitleContainer } from "../../../entities/title_page/title_page";
import {
    API_URL_title,
    getData
} from "../../../shared/api/api";
import Head from 'next/head'

export default async function TitlePage({ params}: { readonly params: { readonly id: string } }) {
    const id = params.id;
    const data = await getData({ url: `${API_URL_title}${id}` });
    console.log(data);
    return (
        <>
            {/* <Head>
                <meta name="title" content={data.name}></meta>
                <meta name="description" content={data.sDescription}></meta>
                <meta name="og:title" content={data.name}></meta>
                <meta name="og:image" content={data.logo || data.poster}></meta>
            </Head> */}
            <TitleContainer details={data[0]} />
            <div>{ `${API_URL_title}${id}` }</div>
        </>
    );
}
