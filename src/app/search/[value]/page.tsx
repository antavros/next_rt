
import { API_URL_SEARCH } from "../../../shared/api/api.jsx";
import { TitlesContainer } from "../../../entities/titles_table/titles_table.jsx";

export default function Search({ params }) {
    return (
        <TitlesContainer url={`${API_URL_SEARCH}${params.value}`} />
    );
}