'use client';

import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';
import { Preloader } from "@/features/PreLoader";

import "@/entities/Title/Rate/style.css";
import "./style.css";

export function TitleCard({ details }: { readonly details: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <article className="title_card" id={details.id}>
            {!imageLoaded && <Preloader />}
            <Link href={`/${details.type}/${details.id}`}>
                <Image
                    width={256}
                    height={400}
                    onLoad={() => setImageLoaded(true)}
                    src={details.poster}
                    alt={details.name}
                />
                <section className="card_info">
                    <section className="title_rate">
                        {details.average_All}
                        {details.average_personal}
                    </section>
                    <h3>{details.name}</h3>
                    <h4>{details.enName}</h4>
                    <p>{details.countries}</p>
                    <p>{details.year}г {details.length}</p>
                    <p>{details.genres}</p>
                    <p className="card_description">{details.sDescription}</p>
                </section>
            </Link >
        </article>
    );
}