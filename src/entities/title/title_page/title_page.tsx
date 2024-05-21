import Image from 'next/image'

import RateStyles from "../../title/rate/rate.module.css";
import titlePageStyles from "./title_page.module.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className={titlePageStyles.titlePage} id={details.id}>
            <div className={titlePageStyles.titlePage_head}>
                <Image
                    fill={true}
                    src={details.backdrop2}
                    className={titlePageStyles.title_back}
                    alt={details.name}
                />
                <section className={titlePageStyles.titlePage_shortInfo}>
                    <Image
                        fill={true}
                        src={details.logo || details.poster}
                        className={titlePageStyles.title_logo}
                        alt={details.name}
                    />
                    <h2>
                        <article>{details.name}</article>
                        <article><p>{details.enName}</p></article>
                    </h2>
                    <p>{details.countries}</p>
                    <p className={titlePageStyles.titlePage_year}>{details.year}г {details.length}</p>
                    <p>{details.genres}</p>
                    <section className={RateStyles.title_rate}>
                        {details.average_kp}
                        {details.average_imdb}
                        {details.average_All}
                        {details.average_personal}
                    </section>
                </section>
            </div>
            <hr />
            <div className={titlePageStyles.titlePage_body}>
                <section className={titlePageStyles.titlePage_mainInfo}>
                    <div className={titlePageStyles.titlePage_description}>
                        <p>Описание</p>
                        <p>{details.description}</p>
                    </div>
                    <p className={titlePageStyles.titlePage_description}>Трейлеры</p>
                    <p className={titlePageStyles.titlePage_description}>ПРОСМОТР</p>
                </section>
            </div >
            <div className={titlePageStyles.titlePage_footer}>
            </div>
        </section >
    );
}