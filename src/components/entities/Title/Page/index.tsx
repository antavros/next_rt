import { TitlePageHead } from './Head';
import { TitlePageBody } from './Body';

import "./style.css"

export function TitlePage({ details }: { readonly details: any }) {

  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitlePageBody details={details} />
    </section >
  );
}