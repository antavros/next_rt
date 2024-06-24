import React, { ReactNode } from 'react';
import Image from 'next/image';

import { IconUserCircle } from '@tabler/icons-react';
import style from "./style.module.css"

interface RatingProps {
  personal?: number;
  kp?: number;
  imdb?: number;
  rt?: number;
}

function getClassByRate({ vote }: { vote: number }) {
  const hue = (vote / 10) * 110;
  const saturation = 100;
  const lightness = 50;
  const transparent = 1;
  const rateColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;
  return {
    border: `0 solid ${rateColor}`,
    boxShadow: `0rem 0rem 0.1rem 0.15rem ${rateColor}`,
    color: `${rateColor}`
  };
}

export const TitleRate: React.FC<RatingProps> = ({ kp, imdb, rt, personal }) => {
  const ratings = [];

  if (kp) {
    ratings.push(kp);
  }
  if (imdb) {
    ratings.push(imdb);
  }
  if (rt) {
    ratings.push(rt);
  }
  if (personal) {
    ratings.push(personal);
  }

  let average_rt: ReactNode = null;
  if (ratings.length > 0) {
    const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
    average_rt = (
      <article className={style.rt} style={getClassByRate({ vote: averageRating })}>
        <Image
          fill={true}
          src="/images/RT.webp"
          alt="RT"
          priority={true}
        />
        <span>{averageRating.toFixed(1)}</span>
      </article>
    );
  }

  return (
    <section className={`${style.title_rate} title_rate`}>
      {rt !== undefined && rt > 0 && (
        average_rt
      )}
      {kp !== undefined && kp > 0 && (
        <article className={style.kp} style={getClassByRate({ vote: kp })}>
          <h6>КП</h6>
          <span>{kp.toFixed(1)}</span>
        </article>
      )}
      {imdb !== undefined && imdb > 0 && (
        <article className={style.imdb} style={getClassByRate({ vote: imdb })}>
          <h6>IMDB</h6>
          <span>{imdb.toFixed(1)}</span>
        </article>
      )}
      {personal !== undefined && personal > 0 && (
        <article className={style.personal} style={getClassByRate({ vote: personal })}>
          <IconUserCircle stroke={2} />
          <span>{personal.toFixed(1)}</span>
        </article>
      )}
    </section>
  );
};
