import Link from 'next/link'
import Image from 'next/image'

import './style.css';

export function Logo() {
    return (
        <Link href="/">
            <Image
                width={500}
                height={500}
                className="logo" 
                src="/images/LOGO.png" 
                alt="RATETABLE" 
            />
        </Link>
    );
}