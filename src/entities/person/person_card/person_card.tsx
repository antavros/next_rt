'use client';

import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';
import { Preloader } from "../../../features/preloader/preloader";

import "../../../entities/title/rate/rate.css";
import "./person_card.css";

export function PersonCard({ person }: { readonly person: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <article className="person_card" id={person.id}>
            {!imageLoaded && <Preloader />}
            <Link href={`/${person.enProfession}/${person.id}`}>
                <Image
                    width={256}
                    height={400}
                    onLoad={() => setImageLoaded(true)}
                    src={person.photo}
                    alt={person.name}
                />
                <section className="title_card_info">
                    <p>{person.name}</p>
                    <p>{person.profession}</p>
                    <p>{person.description}</p>
                </section>
            </Link >
        </article>
    );
}