'use client'

import React, { useState } from 'react';

import { Details, Person } from '@/shared/api/lib';

export const ExpandableListPerson: React.FC<Details> = ({ persons }) => {
  const [expandedProfessions, setExpandedProfessions] = useState<Record<string, boolean>>({});

  const groupByProfession = persons
    .filter((person: any) => person.profession !== "актеры")
    .reduce((acc: { [key: string]: Person[] }, person: Person) => {
      if (!acc[person.profession]) {
        acc[person.profession] = [];
      }
      acc[person.profession].push(person);
      return acc;
    }, {});

  const toggleExpand = (profession: string) => {
    setExpandedProfessions(prevState => ({
      ...prevState,
      [profession]: !prevState[profession],
    }));
  };

  return (
    <section>
      {Object.keys(groupByProfession).map(profession => {
        const isExpanded = expandedProfessions[profession] || false;
        const visiblePersons = isExpanded ? groupByProfession[profession] : groupByProfession[profession].slice(0, 1);

        return (
          <article key={profession}>
            <h4>{profession}</h4>
            <ul>
              {visiblePersons.map((person: any) => (
                <li key={person.id}>
                  <a href={`/person/${person.id}`}>
                    <p>{person.name}</p>
                  </a>
                </li>
              ))}
            </ul>
            {groupByProfession[profession].length > 1 && (
              <button onClick={() => toggleExpand(profession)}>
                {isExpanded ? 'Свернуть' : 'Показать всех'}
              </button>
            )}
          </article>
        );
      })}
    </section>
  );
};