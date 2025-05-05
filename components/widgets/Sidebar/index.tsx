"use server";

import { Togglers } from "@/components/Features/Togglers";
import { Logo } from "@/components/Features/Logo";
import "./style.css";
import { UserCard } from "@/components/Entities/User/Widgets/Card/Personal";
import { NavMenu } from "./NavMenu/";

export async function Sidebar() {
  return (
    <header>
      <aside className="sidebar">
        <Logo />
        <NavMenu />
        <Togglers />
        <UserCard />
      </aside>
    </header>
  );
}
