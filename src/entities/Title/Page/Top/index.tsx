import Image from 'next/image'

import "@/entities/Title/Rate/style.css";
import Style from "./style.module.css";

export function TitlePageTop({ details }: { readonly details: any }) {
    return (
        <div className={Style.titlePage_head}>
            <Image
                fill={true}
                src={details.backdrop2}
                className={Style.title_back}
                alt={details.name}
                priority={true}
            />
            <section className={Style.titlePage_head_Info}>
                <Image
                    width={1920}
                    height={1080}
                    src={details.logo || details.poster}
                    alt={details.name}
                    priority={true}
                />
                <h1>{details.name}</h1>
                <h2>{details.enName}</h2>
                <p>{details.countries}</p>
                <p>{details.year}г {details.length}</p>
                <p>{details.genres}</p>
                <section className={`${Style.title_rate} title_rate`}>
                    {details.average_kp}
                    {details.average_imdb}
                    {details.average_All}
                    {details.average_personal}
                </section>
            </section>
        </div>
    );
}