import Link from 'next/link';
import { Search } from "../../features/search/search";
import { Logo } from '../../entities/logo/logo';
import './header.css';

export function Header() {

    return (
        <header>
            <section className="headBar">
                <Logo />
                <Search />
                <Link href="/profile">
                    <button className="user">
                        <span id="user_avatar" className="symbols">account_circle</span>
                        <p>Войти</p>
                    </button>
                </Link>
            </section >
        </header>
    );
}