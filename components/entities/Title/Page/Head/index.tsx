"use client";

import React from "react";

import { TitleCardBig } from "@/components/Entities/Title/Widgets/Card/Big";

import "./style.css";

export function TitlePageHead({ details }: { readonly details: any }) {
  return (
    <section className="head">
      <TitleCardBig details={details} />
    </section>
  );
}
