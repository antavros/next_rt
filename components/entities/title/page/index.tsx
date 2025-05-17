"use server";

import { TitlePageHead } from "./head";
import { TitlePageBody } from "./body";
import "./style.css";

export async function TitlePage({ details }: { readonly details: any }) {
  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitlePageBody details={details} />
    </section>
  );
}
