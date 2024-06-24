import { TitlePageTop } from './Top';
import { TitlePageCenter } from './Center';
import { TitlePageBottom } from './Bottom';

import "./style.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className="titlePage">
            <TitlePageTop details={details} />
            <hr />
            <TitlePageCenter details={details} />
            <TitlePageBottom details={details} />
        </section >
    );
}