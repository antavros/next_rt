import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, API_URL_title } from "../../../shared/api/api.jsx";
import { TitleContainer } from "../../../entities/title_page/title_page.jsx";

export default function Title() {
    const [data, setData] = useState(null);

    const { titleId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData({ url: `${API_URL_title}${titleId}` });
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [titleId]);

    return data && <TitleContainer details={data[0]} />;
}
