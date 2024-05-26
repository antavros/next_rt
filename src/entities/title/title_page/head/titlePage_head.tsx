import Image from 'next/image'

import "@/entities/title/rate/rate.css";

export function TitlePageHead({ details }: { readonly details: any }) {
    return (
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
                <h1>{details.name}</h1>
                <h2>{details.enName}</h2>
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
    );
}