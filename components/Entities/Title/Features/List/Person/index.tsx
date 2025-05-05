"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Details, Person } from "@/components/Shared/Api/next-title";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import "./style.css";

export const ExpandableListPerson: React.FC<Details> = ({ persons }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (profession: string) => {
    setExpanded((prev) => ({
      ...prev,
      [profession]: !prev[profession],
    }));
  };

  const grouped = persons
    ?.filter((person: any) => person?.profession?.toLowerCase() !== "актеры")
    .reduce((acc: Record<string, Person[]>, person: any) => {
      const prof = person.profession ?? "Другое";
      acc[prof] = acc[prof] || [];
      acc[prof].push(person);
      return acc;
    }, {});

  return (
    <section className="persons_list">
      {grouped &&
        Object.entries(grouped).map(([profession, people]) => {
          const isExpanded = expanded[profession] || false;
          const visiblePeople = isExpanded ? people : people.slice(0, 2);

          const canExpand = people.length > 2;

          return (
            <article key={profession}>
              <button
                className="profession_toggle"
                onClick={() => canExpand && toggleExpand(profession)}
                aria-expanded={isExpanded}
                role="button"
              >
                {canExpand ? (
                  <>
                    {isExpanded ? (
                      <IconChevronDown stroke={2} />
                    ) : (
                      <IconChevronRight stroke={2} />
                    )}
                    <h6>{profession}</h6>
                  </>
                ) : (
                  <h6>{profession}</h6>
                )}
              </button>

              <ul>
                {visiblePeople.map((person: any) => (
                  <li key={person.id}>
                    <Link href={`/person/${person.id}`} prefetch={false}>
                      <h6>{person.name || person.enName}</h6>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
    </section>
  );
};
