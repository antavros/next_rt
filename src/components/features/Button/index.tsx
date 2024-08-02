"use client";

import Link from "next/link";
import React from "react";
import "./style.css";

export type Item = {
  type?: any;
  title?: string;
  name?: string;
  url?: string;
  className?: string;
  onClick?: () => void;
  svg?: JSX.Element;
};

interface ButtonProps {
  items: Item[];
}

export const Button = ({ items }: ButtonProps) => {
  const createButtonElement = (item: Item) => (
    <button
      {...(item.type ? { type: item.type } : { type: "button" })}
      {...(item.title ? { title: item.title } : { title: "button" })}
      {...(item.className ? { className: item.className } : null)}
      {...(item.onClick ? { onClick: item.onClick } : null)}
    >
      {item.svg ? item.svg : null}
      {item.name ? <h6>{item.name}</h6> : null}
    </button>
  );

  const renderButton = (item: Item) =>
    item?.url ? (
      <Link href={item.url} prefetch={false} key={item?.name}>
        {createButtonElement(item)}
      </Link>
    ) : (
      createButtonElement(item)
    );

  return items.length > 1 ? (
    <ul>
      {items.map((item) => (
        <li key={item?.name}>{renderButton(item)}</li>
      ))}
    </ul>
  ) : (
    <>{renderButton(items[0])}</>
  );
};
