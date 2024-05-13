import Link from 'next/link'
import { Togglers } from '../../features/togglers/togglers';
import './sidebar.css';

export function Sidebar() {
    return (
        <aside>
            <section className='Sidebar'>
                <nav id="Sidebar" aria-label="Боковое меню навигации" >
                    <ul>
                        <Link href="/" >
                            <li>
                                <button>
                                    <span className="symbols">Home</span>
                                    <p>Главная</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/movie" >
                            <li>
                                <button>
                                    <span className="symbols">Movie</span>
                                    <p>Фильмы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/tvseries">
                            <li>
                                <button>
                                    <span className="symbols">Live_Tv</span>
                                    <p>Сериалы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/cartoon">
                            <li>
                                <button>
                                    <span className="symbols">family_star</span>
                                    <p>Мультфильмы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/animatedseries">
                            <li>
                                <button>
                                    <span className="symbols">bedroom_baby</span>
                                    <p>Мультсериалы</p>
                                </button>
                            </li>
                        </Link>
                        <Link href="/anime">
                            <li>
                                <button>
                                    <span className="symbols">language_japanese_kana</span>
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