import { TitlePageHead } from './head/titlePage_head';
import { TitlePageMain } from './main/titlePage_main';
import { TitlePageFooter } from './footer/titlePage_footer';

import "./title_page.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className="titlePage" id={details.id}>
            <TitlePageHead details={details}/>
            <hr />
            <TitlePageMain details={details} />
            <hr />
            <TitlePageFooter details={details}/>
        </section >
    );
}