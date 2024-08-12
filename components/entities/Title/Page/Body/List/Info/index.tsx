'use client'

import React from 'react';
import { Details } from "@/components/shared/api/next-title";

import "./style.css";

export const DetailsList: React.FC<Details> = ({ details }) => {

  return (
    <section className="details_list">
      <article className="age">
        <h4>Возрастной рейтинг</h4>
        <div className="data">
          <h6>
            {details?.ageMpaa?.length > 0 && (
              <span>{details?.ageMpaa}</span>
            )}
            <span>{details?.ageRating}+</span>
          </h6>
        </div>
      </article>
      <article>
        <h4>Страна</h4>
        <div className="data">
          <h6>{details?.countries}</h6>
        </div>
      </article>
      <article>
        <h4>Жанр</h4>
        <div className="data">
          <h6>{details?.genres}</h6>
        </div>
      </article>
      {details?.slogan?.length > 0 && (
        <article>
          <h4>Слоган</h4>
          <div className="data">
            <h6>{details?.slogan}</h6>
          </div>
        </article>
      )}
      {details?.length?.length > 0 && (
        <article>
          <h4>Длительность</h4>
          <div className="data">
            <h6>{details?.length}</h6>
          </div>
        </article>
      )}
      <article>
        <h4>Год производства</h4>
        <div className="data">
          <h6>{details?.year}</h6>
        </div>
      </article>
      {details?.premiereRussia?.length > 1 || details?.premiereUSA?.length > 1 || details?.premiereWorld?.length > 1 || details?.premiereBluray?.length > 1 ? (
        <article>
          <h4>Премьера</h4>
          <div className="data">
            <ul>
              {details?.premiereRussia?.length > 0 && (
                <li>
                  <h6>Россия</h6>
                  <h6>{details?.premiereRussia}</h6>
                </li>
              )}
              {details?.premiereUSA?.length > 0 && (
                <li>
                  <h6>США</h6>
                  <h6>{details?.premiereUSA}</h6>
                </li>
              )}
              {details?.premiereWorld?.length > 0 && (
                <li>
                  <h6>Мир</h6>
                  <h6>{details?.premiereWorld}</h6>
                </li>
              )}
              {details?.premiereBluray?.length > 0 && (
                <li>
                  <h6>Цифровой</h6>
                  <h6>{details?.premiereBluray}</h6>
                </li>
              )}
            </ul>
          </div>
        </article>
      ) : null}
      {details?.budget && (
        <article>
          <h4>Бюджет</h4>
          <div className="data">
            <h6>{details?.budget}</h6>
          </div>
        </article>
      )}
      {details?.feesRussia || details?.feesUSA || details?.feesWorld ? (
        <article>
          <h4>Сборы</h4>
          <div className="data">
            <ul>
              {details?.feesRussia && (
                <li>
                  <h6>Россия</h6><h6>{details?.feesRussia}</h6>
                </li>
              )}
              {details?.feesUSA && (
                <li>
                  <h6>США</h6><h6>{details?.feesUSA}</h6>
                </li>
              )}
              {details?.feesWorld && (
                <li>
                  <h6>Мир</h6><h6>{details?.feesWorld}</h6>
                </li>
              )}
            </ul>
          </div>
        </article>
      ) : null}
      {details?.audience?.length > 0 && (
        <article>
          <h4>Аудитория</h4>
          <div className="data">
            <ul>
              {details?.audience?.map((audience: any, index: any) => (
                <li key={index}>
                  <h6>{audience?.country}</h6><h6>{audience?.count}</h6>
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </section>
  );
};