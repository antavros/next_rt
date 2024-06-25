import Link from "next/link";

import { Logo } from "@/components/entities/Logo";
import "./style.css";

export function Footer() {
  return (
    <>
      <hr />
      <footer id="footer">
        <section className="footer">
          <ul>
            <li>
              <Link href="/about" className="button">
                О нас
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="button">
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
