
import { TitlesContainer } from "../../../entities/titles_table/titles_table.jsx";
import { API_URL_SEARCH } from "../../../shared/api/data_types";
import { getData } from "../../../shared/api/api";

export default async function Search({ params }) {
    const searchValue = params.value.toLowerCase();
    const data = await getData({ url: `${API_URL_SEARCH}${searchValue}` });
    return (<TitlesContainer titleData={data} />);
}