import { TitleCard } from "../title_card/title_card";
import "./titles_table.css";

export function TitlesContainer({ titleData }: any) {

  return (
    <section className="titles">
      {
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

