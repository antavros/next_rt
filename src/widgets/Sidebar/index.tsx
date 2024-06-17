'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { IconHome, IconMovie, IconDeviceTvOld, IconMickey, IconHorseToy, IconTorii } from '@tabler/icons-react';

import { Togglers } from '@/features/Togglers';
import './style.css';

export function Sidebar() {
    const pathname = usePathname()
    const isActive = (href: string) => {
        return pathname.startsWith(href) ? 'active' : '';
    };
    return (
        <aside>
            <section className='Sidebar'>
                <hr />
                <nav className="1" id="Sidebar" aria-label="Боковое меню навигации" >
                    <ul>
                        <li className="nav-item nav-itemC nav-active">
                            <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/" >
                                <button>
                                    <IconHome stroke={2} />
                                    <p>Главная</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`link ${isActive('/movie')}`} href="/movie?page=1" >
                                <button>
                                    <IconMovie stroke={2} />
                                    <p>Фильмы</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`link ${isActive('/tv-series')}`} href="/tv-series?page=1">
                                <button>
                                    <IconDeviceTvOld stroke={2} />
                                    <p>Сериалы</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`link ${isActive('/cartoon')}`} href="/cartoon?page=1">
                                <button>
                                    <IconMickey stroke={2} />
                                    <p>Мультфильмы</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`link ${isActive('/animated-series')}`} href="/animated-series?page=1">
                                <button>
                                    <IconHorseToy stroke={2} />
                                    <p>Мультсериалы</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`link ${isActive('/anime')}`} href="/anime?page=1">
                                <button>
                                    <IconTorii stroke={2} />
                                    <p>Аниме</p>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <hr />
                <Togglers />
            </section>
        </aside >
    );
}