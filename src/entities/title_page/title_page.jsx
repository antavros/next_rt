
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Preloader } from "../../features/preloader/preloader.jsx";
// import Player from '../player/player.jsx';
import "../../entities/rate/rate.css";
import "./title_page.css"

export function TitleContainer({ details }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            {/* <Seo
                seoTitle={details.name}
                seoDescription={details.sDescription}
                seoOgTitle={details.name}
                seoOgImage={details.logo || details.poster}
            /> */}
            <title>{`${details.name}`}</title>
            <meta name="description" content={`${details.sDescription}`} />
            <meta property="og:title" content={`${details.name}`} />
            <meta property="og:image" content={`${details.logo || details.poster}`} />
            <meta property="og:description" content={`${details.sDescription}`} />

            <section className="titlePage" id={details.id}>
                {!imageLoaded && <Preloader />}
                <div className='titlePage_head'>
                    <img
                        onLoad={() => setImageLoaded(true)}
                        src={details.backdrop2}
                        className={`title_back`}
                        alt={details.name}
                    />
                    <section className="titlePage_shortInfo">
                        <img
                            src={details.logo || details.poster}
                            className={`title_logo`}
                            alt={details.name}
                        />
                        <h2>
                            <article>{details.name}</article>
                            <article><p>{details.enName}</p></article>
                        </h2>
                        <p>{details.countries}</p>
                        <p className="titlePage_year">{details.year}г {details.length}</p>
                        <p>{details.genres}</p>
                        <section className="title_rate">
                            {details.average_kp}
                            {details.average_imdb}
                            {details.average_All}
                            {details.average_personal}
                        </section>
                    </section>
                </div>
                <hr />
                <div className='titlePage_body'>
                    <section className='titlePage_mainInfo'>
                        <div className="titlePage_description">
                            <p>Описание</p>
                            <p>{details.description}</p>
                        </div>
                        <p className="titlePage_description">Трейлеры</p>
                        <p className="titlePage_description">ПРОСМОТР</p>
                        {/* <Player details={details} /> */}
                    </section>
                </div >
                <div className='titlePage_footer'>
                </div>
            </section >
        </>
    );
}

