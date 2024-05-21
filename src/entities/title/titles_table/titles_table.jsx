import { TitleCard } from "../../title/title_card/title_card";
import titlesTableStyles from "./titles_table.module.css";

export function TitlesContainer({ titleData }) {

  return (
    <section className={titlesTableStyles.titles}>
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

