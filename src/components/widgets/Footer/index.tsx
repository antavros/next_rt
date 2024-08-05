import Link from "next/link";

import { Logo } from "@/components/features/Logo";
import { IconUsers, IconAddressBook } from "@tabler/icons-react";

import "./style.css";

export function Footer() {
  return (
    <>
      <hr />
      <footer id="footer">
        <section className="footer">
          <ul>
            <li>
              <Link href="/user/policy" className="button" prefetch={false}>
                <IconUsers stroke={2} />О нас
              </Link>
            </li>
            <li>
              <Link href="/user/policy" className="button" prefetch={false}>
                <IconAddressBook stroke={2} />
                Контакты
              </Link>
            </li>
          </ul>
          <Logo />
        </section>
      </footer>
    </>
  );
}
