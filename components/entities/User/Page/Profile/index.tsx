"use client";

import React from "react";

import { SwiperCardTitle } from "@/components/entities/title/features/swiper/titles";

import "./style.css";

interface ProfilePageProps {
  visitedTitles: any[];
  viewedTitles: any[];
  favouriteTitles: any[];
  bookmarkedTitles: any[];
}

export function ProfilePage({
  visitedTitles,
  viewedTitles,
  favouriteTitles,
  bookmarkedTitles,
}: Readonly<ProfilePageProps>) {
  return (
    <>
      {visitedTitles.length > 0 && (
        <section className="history block">
          <h1>История</h1>
          <SwiperCardTitle details={visitedTitles} />
        </section>
      )}
      {viewedTitles.length > 0 && (
        <section className="viewed  block">
          <h1>Просмотрено</h1>
          <SwiperCardTitle details={viewedTitles} />
        </section>
      )}
      {favouriteTitles.length > 0 && (
        <section className="favourite  block">
          <h1>Избранное</h1>
          <SwiperCardTitle details={favouriteTitles} />
        </section>
      )}
      {bookmarkedTitles.length > 0 && (
        <section className="bookmarked  block">
          <h1>Закладки</h1>
          <SwiperCardTitle details={bookmarkedTitles} />
        </section>
      )}
    </>
  );
}
