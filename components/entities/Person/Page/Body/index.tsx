"use client";

import style from "./style.module.css";

import { Details } from "@/components/shared/api/next-title";

export function TitlePageBody({ details }: Details) {
  return (
    <div className={style.body}>
      <section className={`${style.details}`}>
        <span className={style.details_block_1}>
          <span className={style.details_block_2}>
            <section className={`${style.block} ${style.description}`}>
              <h3>Описание</h3>
              <p>{details?.description}</p>
            </section>
          </span>
        </span>
      </section>
    </div>
  );
}
