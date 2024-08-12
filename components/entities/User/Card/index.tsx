"use server";

import React from "react";

import { UserAvatar } from "./Avatar";
import "./style.css";

export const UserCard: React.FC = async () => {
  return (
    <section className="userCard">
      <UserAvatar />
    </section>
  );
};
