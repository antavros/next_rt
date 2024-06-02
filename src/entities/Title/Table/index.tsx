import { TitleCard } from "@/entities/Title/Card";
import "./style.css";

export function TitleTable({ details }: any) {

  return (
    <section className="titles">
      {
        (Array.isArray(details) && details.map((details) => (
          <TitleCard
            key={details.id}
            details={details}
          />
        )))
      }
    </section>
  );
}

