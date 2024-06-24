import Link from 'next/link'
import Image from 'next/image'

import './style.css';

export function Logo() {
    return (
        <Link href="/" className="logo">
            <Image
                width={200}
                height={70}
                className="logo1"
                src="/images/LOGO.png"
                alt="RATETABLE"
                quality={25}
                priority={true}
            />
            <Image
                width={200}
                height={200}
                className="logo2"
                src="/images/LOGO.svg"
                alt="RATETABLE"
                quality={25}
                priority={true}
            />
        </Link>
    );
}