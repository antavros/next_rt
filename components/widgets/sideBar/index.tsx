"use server";

import { Logo } from "@/components/features/logo";
import { NavMenu } from "./navMenu";
import { Togglers } from "@/components/features/togglers";
import { UserCard } from "@/components/entities/user/widgets/card/personal";

import "./style.css";

export async function SideBar() {
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
