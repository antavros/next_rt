import Link from 'next/link'
import Image from 'next/image'

import './style.css';

export function Logo() {
    return (
        <Link href="/">
            <Image
                width={200}
                height={70}
                className="logo"
                src="/images/LOGO.png"
                alt="RATETABLE"
                priority={true}
            />
        </Link>
    );
}