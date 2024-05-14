import { TitleContainer } from "../../../entities/title_page/title_page.jsx";
import { getData, API_URL_title } from "../../../shared/api/api.jsx";

export default function Title({ params }) {
    console.log(params.id);
    const data = getData({ url: `${API_URL_title}${params.id}` });
    return <TitleContainer details={data} />;
}   