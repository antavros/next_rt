"use server";

import { Togglers } from "@/components/features/Togglers";
import { Logo } from "@/components/features/Logo";
import "./style.css";
import { UserCard } from "@/components/entities/User/widgets/Card";
import { NavMenu } from "./NavMenu";

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
