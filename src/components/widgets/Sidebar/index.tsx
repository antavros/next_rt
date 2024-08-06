"use server";

import { Togglers } from "@/components/features/Togglers";
import { Logo } from "@/components/features/Logo";
import "./style.css";
import { UserCard } from "@/components/entities/User/Card";
import { NavMenu } from "./NavMenu";

export async function Sidebar() {
  return (
    <header>
      <section className="sidebar">
        <Logo />
        <NavMenu />
        <hr />
        <Togglers />
        <UserCard />
      </section>
    </header>
  );
}
