import { TitlePageTop } from './Top';
import { TitlePageCenter } from './Center';
import { TitlePageBottom } from './Bottom';

import "./style.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className="titlePage" id={details.id}>
            <TitlePageTop details={details}/>
            <hr />
            <TitlePageCenter details={details} />
            <hr />
            <TitlePageBottom details={details}/>
        </section >
    );
}