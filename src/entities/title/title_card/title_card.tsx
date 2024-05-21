'use client';

import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';
import { Preloader } from "../../../features/preloader/preloader";
import { detailsProps } from "../../../shared/api/data_types";

import RateStyles from "../../title/rate/rate.module.css";
import TitleCardStyles from "./title_card.module.css";


TitleCard.propTypes = detailsProps;

export function TitleCard({ details }: { readonly details: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <article className={TitleCardStyles.title} id={details.id}>
            {!imageLoaded && <Preloader />}
            <Link href={`/${details.type}/${details.id}`}>
                <Image
                    fill={true}
                    onLoad={() => setImageLoaded(true)}
                    src={details.poster}
                    alt={details.name}
                    loading="lazy"
                    decoding="async"
                />
                <section className={TitleCardStyles.title_info}>
                    <section className={RateStyles.title_rate}>
                        {details.average_All}
                        {details.average_personal}
                    </section>
                    <h2>
                        <article>{details.name}</article>
                        <article><p>{details.enName}</p></article>
                    </h2>
                    <p>{details.countries}</p>
                    <p className={TitleCardStyles.title_year}>{details.year}г {details.length}</p>
                    <p>{details.genres}</p>
                    <p className={TitleCardStyles.title_description}>{details.sDescription}</p>
                </section>
            </Link >
        </article>
    );
}