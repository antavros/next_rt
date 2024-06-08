import Link from 'next/link'

import { IconHome, IconMovie, IconDeviceTvOld, IconMickey, IconHorseToy, IconTorii } from '@tabler/icons-react';

import { Togglers } from '@/features/Togglers';
import './style.css';

export function Sidebar() {
    return (
        <aside>
            <section className='Sidebar'>
                <nav id="Sidebar" aria-label="Боковое меню навигации" >
                    <ul>
                        <Link href="/" >
                            <li>
                                <button>
                                    <IconHome stroke={2} />
                                    <p>Главная</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/movie" >
                            <li>
                                <button>
                                    <IconMovie stroke={2} />
                                    <p>Фильмы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/tv-series">
                            <li>
                                <button>
                                    <IconDeviceTvOld stroke={2} />
                                    <p>Сериалы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/cartoon">
                            <li>
                                <button>
                                    <IconMickey stroke={2} />
                                    <p>Мультфильмы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/animated-series">
                            <li>
                                <button>
                                    <IconHorseToy stroke={2} />
                                    <p>Мультсериалы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/anime">
                            <li>
                                <button>
                                    <IconTorii stroke={2} />
                                    <p>Аниме</p>
                                </button>
                            </li>
                        </Link>
                    </ul>
                </nav>
                <hr />
                <Togglers />
            </section>
        </aside >
    );
}