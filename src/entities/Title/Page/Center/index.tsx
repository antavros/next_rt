
import Link from 'next/link';

import { SwiperCardPerson } from "./Swiper/Person";
import { SwiperCardTrailer } from "./Swiper/Trailer";
import { ExpandableListPerson } from "./List/Person";

import "@/entities/Title/Rate/style.css";
import style from "./style.module.css";

import { Details } from '@/shared/api/lib';

export function TitlePageCenter({ details }: Details) {
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
            {/* {details.trailers ? ( */}
            <section className={style.videos}>
                <SwiperCardTrailer details={details} />
                {/* <Player details={details} /> */}
            </section>

            <section className={style.description}>
                <h5>Описание</h5>
                <p>{details?.description}</p>
            </section>
            <section className={style.persons}>
                <h5>Над {typeName} работали</h5>
                <ExpandableListPerson persons={details?.person} />
            </section>
            <section className={style.actors}>
                <SwiperCardPerson details={filteredPersonsActor} />
            </section>
        </div >
    );
}
