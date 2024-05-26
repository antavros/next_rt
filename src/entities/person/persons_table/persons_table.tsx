import { PersonCard } from "@/entities/person/person_card/person_card";
import "./persons_table.css";

export function TitlesContainer({ person }: any) {

  return (
    <section className="titles">
      {
        (Array.isArray(person) && person.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
          />
        )))
      }
    </section>
  );
}

