import Link from 'next/link';

import { IconUserCircle, IconLogout, IconLogin } from '@tabler/icons-react';

import { Search } from "@/features/Search";
import { Logo } from '@/entities/Logo';
import './style.css';

export function Header() {

    return (
        <header>
            <section className="headBar">
                <Logo />
                <Search />
                <Link href="/profile">
                    <button className="user">
                        <IconLogin stroke={2} />
                    </button>
                </Link>
            </section >
        </header>
    );
}