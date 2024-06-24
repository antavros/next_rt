'use client'

import { useSession } from 'next-auth/react';

import { SwiperCardPerson } from "./Swiper/Person";
import { SwiperCardTrailer } from "./Swiper/Trailer";
import { ExpandableListPerson } from "./List/Person";
import { Player } from "@/components/entities/Player";

import style from "./style.module.css";

import { Details } from '@/components/shared/api/lib';

export function TitlePageCenter({ details }: Details) {
    const { data: session, status } = useSession();

    const filteredPersonsActor = details?.person.filter((person: any) => person.enProfession === 'actor');
    const category = details.type.toLowerCase();
    let typeName: string;
    switch (category) {
        case "movie": {
            typeName = "фильмом";
            break;
        }
        case "tv-series": {
            typeName = "сериалом";
            break;
        }
        case "cartoon": {
            typeName = "мультфильмом";
            break;
        }
        case "animated-series": {
            typeName = "мультсериалом";
            break;
        }
        case "anime": {
            typeName = "аниме";
            break;
        }
        default: {
            typeName = "тайтлом";
        }
    }

    return (
        <div className={`${style.center} center`}>
            <section className={style.description}>
                <h5>Описание</h5>
                <p>{details?.description}</p>
            </section>
            {details.trailers.length > 0 && (
                <section className={style.trailer}>
                    <SwiperCardTrailer details={details} />
                </section>
            )}
            {status && (status as any) === "authenticated" ? (
                <section className={style.player}>
                    <Player details={details.id} />
                </section>
            ) : (
                null
            )}
            <section className={style.actors}>
                <SwiperCardPerson details={filteredPersonsActor} />
            </section>
            <section className={style.persons}>
                <h5>Над {typeName} работали</h5>
                <ExpandableListPerson persons={details?.person} />
            </section>

        </div >
    );
}
