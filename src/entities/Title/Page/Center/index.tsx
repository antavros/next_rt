
import { SwiperCardPerson } from "@/entities/Swiper/Card/Persons";

import "@/entities/Title/Rate/style.css";
import "./style.css";

export function TitlePageCenter({ details }: { readonly details: any }) {
        const filteredPersonsActor = details.persons.filter((person : any) => person.enProfession === 'actor');
    const filteredPersonsDirector = details.persons.filter((person : any) => person.enProfession === 'director');
    const filteredPersonsWriter = details.persons.filter((person : any) => person.enProfession === 'writer');
    const filteredPersonsComposer = details.persons.filter((person : any) => person.enProfession === 'composer');
    const filteredPersons = details.persons.filter((person : any) => !['actor', 'director', 'writer','composer'].includes(person.enProfession));

    // "profession": "актеры",
    // "enProfession": "actor"

    // "profession": "композиторы",
    // "enProfession": "composer"

    // "profession": "художники",
    // "enProfession": "designer"
    
    // "profession": "режиссеры",
    // "enProfession": "director"
    
    // "profession": "монтажеры",
    // "enProfession": "editor"
    
    // "profession": "операторы",
    // "enProfession": "operator"
    
    // "profession": "продюсеры",
    // "enProfession": "producer"
    
    // "profession": "редакторы",
    // "enProfession": "writer"
    return (
        <section className='main'>
            <section className='mainInfo'>
                <section className="description">
                    <h5>ОПИСАНИЕ</h5>
                    <p>{details.description}</p>
                </section>
                <section className="persons">
                    <h5>РЕЖИССЕРЫ</h5>
                    <h5>КОМПОЗИТОРЫ</h5>
                    <h5>АКТЕРЫ</h5>
                    <SwiperCardPerson details={filteredPersonsActor}/>
                </section>
                <section className="video">
                    <h5>ТРЕЙЛЕРЫ</h5>
                    <h5>ПРОСМОТР</h5>
                    <div className='player'>
                        {/* <Player details={details} /> */}
                    </div>
                </section>
            </section>
        </section >
    );
}