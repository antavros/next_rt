import { TitlePageTop } from './top/titlePage_top';
import { TitlePageCenter } from './center/titlePage_center';
import { TitlePageBottom } from './bottom/titlePage_bottom';

import "./title_page.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className="titlePage" id={details.id}>
            {/* <TitlePageTop details={details}/>
            <hr />
            <TitlePageCenter details={details} />
            <hr /> */}
            <TitlePageBottom details={details}/>
        </section >
    );
}