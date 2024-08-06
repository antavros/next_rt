"use server";

import { Logo } from "@/components/features/Logo";
import { IconUsers, IconAddressBook } from "@tabler/icons-react";
import { Button } from "@/components/features/Button";

import "./style.css";

export async function Footer() {
  const buttonItemsLogin = [
    {
      type: "button",
      title: "О нас",
      name: "О нас",
      url: "/user/policy",
      svg: <IconUsers stroke={2} />,
    },
    {
      type: "button",
      title: "Контакты",
      name: "Контакты",
      url: "/user/policy",
      svg: <IconAddressBook stroke={2} />,
    },
  ];
  return (
    <>
      <hr />
      <footer id="footer">
        <section className="footer">
          <Button items={buttonItemsLogin} />
          <Logo />
        </section>
      </footer>
    </>
  );
}
