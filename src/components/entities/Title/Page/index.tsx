"use client";

import { TitlePageHead } from "./Head";
import { TitlePageBody } from "./Body";

import { TitleRate } from "@/components/entities/Title/Rate/";

import "./style.css";

export function TitlePage({ details }: { readonly details: any }) {
  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitleRate
        personal={details.personal_rating}
        kp={details.kp_rating}
        imdb={details.imdb_rating}
        rt={details.rt_rating}
      />
      <TitlePageBody details={details} />
    </section>
  );
}
