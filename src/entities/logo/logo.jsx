import Link from 'next/link'
import Image from 'next/image'

import './logo.css';

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