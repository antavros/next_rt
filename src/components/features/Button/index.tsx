"use client";

import Link from "next/link";
import React from "react";
import "./style.css";

type Item = {
  url?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  svg?: JSX.Element;
  name: string;
};

interface ButtonProps {
  items: Item[];
}

export const Button = ({ items }: ButtonProps) => {
  const renderButton = (item: Item) => (
    <button
      {...(item?.type && { type: item.type })}
      title={item?.name}
      className={item?.className}
      onClick={item?.onClick}
    >
      {item?.url ? (
        <Link href={item.url} prefetch={false}>
          {item?.svg}
          <h6>{item.name}</h6>
        </Link>
      ) : (
        <>
          {item?.svg}
          <h6>{item.name}</h6>
        </>
      )}
    </button>
  );

  return items.length > 1 ? (
    <ul>
      {items.map((item) => (
        <li key={item?.name}>
          {renderButton(item)}
        </li>
      ))}
    </ul>
  ) : (
    items.map((item) => renderButton(item))
  );
};
