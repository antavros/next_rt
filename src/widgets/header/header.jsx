import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search } from "../../features/search/search";
import { Logo } from '../../entities/logo/logo';
import './header.css';

export function Header() {

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        function handleScroll() {
            const header = document.querySelector("header");
            const sidebarContainer = document.querySelector("aside");
            const currentScrollPos = window.scrollY;

            if (prevScrollPos > currentScrollPos) {
                header.style.top = "0";
                if (window.matchMedia("(min-width: 601px)").matches) { // Добавляем проверку для медиа-запроса
                    sidebarContainer.style.top = "calc((var(--block-gap) * 2) + var(--header-height))";
                }
            } else {
                header.style.top = "-5.5rem";
                if (window.matchMedia("(min-width: 601px)").matches) { // Добавляем проверку для медиа-запроса
                    sidebarContainer.style.top = "var(--block-gap)";
                }
            }
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);


    //------------------------------------------------------------------------------------------------------------>

    return (
        <header>
            <section className="headBar">
                <Logo />
                <Search />
                <Link to="/profile">
                    <button className="user">
                        <span id="user_avatar" className="symbols">account_circle</span>
                        <p>Войти</p>
                    </button>
                </Link>
            </section >
        </header>
    );
}