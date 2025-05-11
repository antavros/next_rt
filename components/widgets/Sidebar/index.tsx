"use server";

import { Togglers } from "@/components/features/togglers";
import { Logo } from "@/components/features/logo";
import "./style.css";
import { UserCard } from "@/components/entities/user/widgets/card/personal";
import { NavMenu } from "./navMenu/";

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
