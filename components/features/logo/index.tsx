import Link from "next/link";
import Image from "next/image";

import "./style.css";

export function Logo() {
  return (
    <Link href="/" className="logo" prefetch={false}>
      <Image
        width={200}
        height={70}
        quality={25}
        id="logo1"
        alt="RATETABLE"
        src="/images/LOGO.webp"
      />
      <Image
        width={200}
        height={200}
        quality={25}
        id="logo2"
        alt="RATETABLE"
        src="/images/LOGO2.webp"
      />
    </Link>
  );
}
