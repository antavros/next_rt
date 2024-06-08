import Image from 'next/image'

import "@/entities/Title/Rate/style.css";
import style from "./style.module.css";

export function TitlePageTop({ details }: { readonly details: any }) {

    return (
        <div className={style.titlePage_head}>
            {details.backdrop ? (
                <Image
                    fill={true}
                    src={details.backdrop}
                    className={style.title_back}
                    alt={details.name}
                    priority={true}
                />
            ) : (
                <iframe
                    width="100%"
                    height="100%"
                    className={style.title_back}
                    src={details.trailers[0].url}
                    title={details.trailers.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
            <div className={style.titlePage_head_Info}>
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
                <section className={`${style.title_rate} title_rate`}>
                    {details.average_kp}
                    {details.average_imdb}
                    {details.average_All}
                    {details.average_personal}
                </section>
            </div>
        </div>
    );
}