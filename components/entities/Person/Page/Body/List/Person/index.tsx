'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import { Details, Person } from '@/components/shared/api/next-title';
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react';

import "./style.css";

export const ExpandableListPerson: React.FC<Details> = ({ persons }) => {
  const [expandedProfessions, setExpandedProfessions] = useState<Record<string, boolean>>({});

  const groupByProfession = persons?.filter((person: any) => person?.profession !== "актеры")
    .reduce((acc: { [key: string]: Person[] }, person: Person) => {
      if (!acc[person?.profession]) {
        acc[person?.profession] = [];
      }
      acc[person?.profession].push(person);
      return acc;
    }, {});

  const toggleExpand = (profession: string) => {
    setExpandedProfessions(prevState => ({
      ...prevState,
      [profession]: !prevState[profession],
    }));
  };

  return (
    <section className="persons_list">
      {groupByProfession && Object.keys(groupByProfession)?.map(profession => {
        const isExpanded = expandedProfessions[profession] || false;
        const visiblePersons = isExpanded ? groupByProfession[profession] : groupByProfession[profession].slice(0, 2);
        return (
          <article key={profession}>
            <span>
              {groupByProfession[profession].length > 2 ? (
                <button onClick={() => toggleExpand(profession)}>
                  {isExpanded ? (
                    <>
                      <IconChevronDown stroke={2} />
                      <h6>{profession}</h6>
                    </>
                  ) : (
                    <>
                      <IconChevronRight stroke={2} />
                      <h6>{profession}</h6>
                    </>
                  )}
                </button>
              ) : (
                <h4>{profession}</h4>
              )}
            </span>
            <ul>
              {visiblePersons.map((person: any) => (
                <li key={person?.id}>
                  <Link href={`/person/${person?.id}`} prefetch={false}>
                    <h6>{person?.name ? person?.name : person?.enName}</h6>
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