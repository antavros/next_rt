import { TitleContainer } from "../../../entities/title_page/title_page.jsx";
import { API_URL_title } from "../../../shared/api/data_types";
import { getData } from "../../../shared/api/api";

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

export default async function TitlePage({ params }) {
    const id = params.id;
    const data = await getData({ url: `${API_URL_title}${id}` });
    console.log(data);
    return (
        <>
            <TitleContainer details={data[0]} />
            <div>{ `${API_URL_title}${id}` }</div>
        </>
    );
}
