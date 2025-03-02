"use client";
import React from "react";
import Link from "next/link";
import "./style.css";

export type Item = {
  id?: string;
  className?: string;
  role?: string;
  type?: "button" | "submit" | "reset";
  "aria-details"?: string;
  title?: string;
  name?: string;
  url?: string;
  onClick?: () => void;
  svg?: JSX.Element;
};

interface ButtonProps {
  items: Item[];
}

export const Button = ({ items }: ButtonProps) => {
  const createButtonElement = (item: Item) => {
    const { type = "button", title = "button", ...rest } = item;

    return (
      <button type={type} title={title} {...rest}>
        {item.svg && item.svg}
        {item.name && <h6>{item.name}</h6>}
      </button>
    );
  };

  const renderButton = (item: Item) =>
    item.url ? (
      <Link href={item.url} prefetch={false} key={item.id || item.name}>
        {createButtonElement(item)}
      </Link>
    ) : (
      <div key={item.id || item.name}>{createButtonElement(item)}</div>
    );

  return items.length > 1 ? (
    <ul>
      {items.map((item, index) => (
        <li key={item.id || item.name || `item-${index}`}>
          {renderButton(item)}
        </li>
      ))}
    </ul>
  ) : (
    <>{renderButton(items[0])}</>
  );
};
