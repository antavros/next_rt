import Image from 'next/image'

import "@/entities/title/rate/rate.css";

export function TitlePageMain({ details }: { readonly details: any }) {
    return (
        <div className='titlePage_main'>
            <section className='titlePage_mainInfo'>
                <div className="titlePage_description">
                    <p>Описание</p>
                    <p>{details.description}</p>
                </div>
                <p className="titlePage_description">Трейлеры</p>
                <p className="titlePage_description">ПРОСМОТР</p>
                {/* <Player details={details} /> */}
            </section>
            <section className='titlePage_player'>
                {/* <Player details={details} /> */}
            </section>
        </div >
    );
}