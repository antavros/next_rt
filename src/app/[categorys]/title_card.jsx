import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';
import "../../entities/rate/rate.css";
import "./title_card.css";
import { Preloader } from "../../features/preloader/preloader";
import { detailsProps } from "../../shared/api/data_types"



TitleCard.propTypes = detailsProps;

export default function Page({ params }: { params: { slug: string } }) {
    return <div>My Post: {params.slug}</div>
}
export function TitleCard({ details }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <article className="title" id={details.id}>
            {!imageLoaded && <Preloader />}
            <Link href={`/${details.type}/${details.id}`}>
                <Image
                    fill={true}
                    onLoad={() => setImageLoaded(true)}
                    src={details.poster}
                    className={`title_poster`}
                    id="title_poster"
                    alt={details.name}
                    loading="lazy"
                    decoding="async"
                />
                <section className="title_info">
                    <section className="title_rate">
                        {details.average_All}
                        {details.average_personal}
                    </section>
                    <h2>
                        <article>{details.name}</article>
                        <article><p>{details.enName}</p></article>
                    </h2>
                    <p>{details.countries}</p>
                    <p className="title_year">{details.year}г {details.length}</p>
                    <p>{details.genres}</p>
                    <p className="title_description">{details.sDescription}</p>
                </section>
            </Link >
        </article>
    );
}