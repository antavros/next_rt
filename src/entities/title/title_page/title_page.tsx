import Image from 'next/image'

import RateStyles from "../../title/rate/rate.module.css";
import styles from "./title_page.module.css"

export function TitleContainer({ details }: { readonly details: any }) {

    return (
        <section className="titlePage" id={details.id}>
            <div className='titlePage_head'>
                <Image
                    fill={true}
                    src={details.backdrop2}
                    className={`title_back`}
                    alt={details.name}
                />
                <section className="titlePage_shortInfo">
                    <Image
                        fill={true}
                        src={details.logo || details.poster}
                        className={`title_logo`}
                        alt={details.name}
                    />
                    <h2>
                        <article>{details.name}</article>
                        <article><p>{details.enName}</p></article>
                    </h2>
                    <p>{details.countries}</p>
                    <p className="titlePage_year">{details.year}г {details.length}</p>
                    <p>{details.genres}</p>
                    <section className="title_rate">
                        {details.average_kp}
                        {details.average_imdb}
                        {details.average_All}
                        {details.average_personal}
                    </section>
                </section>
            </div>
            <hr />
            <div className='titlePage_body'>
                <section className='titlePage_mainInfo'>
                    <div className="titlePage_description">
                        <p>Описание</p>
                        <p>{details.description}</p>
                    </div>
                    <p className="titlePage_description">Трейлеры</p>
                    <p className="titlePage_description">ПРОСМОТР</p>
                </section>
            </div >
            <div className='titlePage_footer'>
            </div>
        </section >
    );
}