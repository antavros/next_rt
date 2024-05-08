import { useEffect, useState } from 'react';
import { getData, dataProps } from "../../shared/api/api.jsx";
import { TitleCard } from "../title_card/title_card";
import { Preloader } from "../../features/preloader/preloader";
import "./titles_table.css";

TitlesContainer.propTypes = dataProps;
export function TitlesContainer({ url }) {
  const [titleData, setTitleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loader = async ({ url }) => {
    setIsLoading(true);
    const data = await getData({ url });
    setTitleData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loader({ url });
  }, [url]);

  return (
    <section className="titles">
      {isLoading ? <Preloader /> :
        (Array.isArray(titleData) && titleData.map((details) => (
          <TitleCard
            key={details.id}
            details={details}
          />
        )))
      }
    </section>
  );
}

