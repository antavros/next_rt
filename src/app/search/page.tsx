
import { useParams } from 'react-router-dom';
import { API_URL_SEARCH } from "../../shared/api/api.jsx";
import { TitlesContainer } from "../../entities/titles_table/titles_table.jsx";
import { Seo } from "../../shared/seo/seo.jsx";

export default function Search() {
    const params = useParams();

    return (
        <>
            <Seo
                seoTitle='ПОИСК'
            />
            <TitlesContainer url={`${API_URL_SEARCH}${params.searchValue}`} />
        </>
    );
}