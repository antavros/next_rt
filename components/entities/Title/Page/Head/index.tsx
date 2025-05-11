"use client";

import React from "react";

import { TitleCardBig } from "@/components/entities/title/widgets/card/big";

import "./style.css";

export function TitlePageHead({ details }: { readonly details: any }) {
  return (
    <section className="head">
      <TitleCardBig details={details} />
    </section>
  );
}
