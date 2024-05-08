import { NavLink } from "react-router-dom";
import { Togglers } from '../../features/togglers/togglers';
import './sidebar.css';

export function Sidebar() {
    return (
        <aside>
            <section className='Sidebar'>
                <nav id="Sidebar" aria-label="Боковое меню навигации" >
                    <ul>
                        <NavLink to="/" >
                            <li>
                                <button>
                                    <span className="symbols">Home</span>
                                    <p>Главная</p>
                                </button>
                            </li>
                        </NavLink>
                        <NavLink to="/movie" >
                            <li>
                                <button>
                                    <span className="symbols">Movie</span>
                                    <p>Фильмы</p>
                                </button>
                            </li>
                        </NavLink>
                        <NavLink to="/tvseries">
                            <li>
                                <button>
                                    <span className="symbols">Live_Tv</span>
                                    <p>Сериалы</p>
                                </button>
                            </li>
                        </NavLink>
                        <NavLink to="/cartoon">
                            <li>
                                <button>
                                    <span className="symbols">family_star</span>
                                    <p>Мультфильмы</p>
                                </button>
                            </li>
                        </NavLink>
                        <NavLink to="/animatedseries">
                            <li>
                                <button>
                                    <span className="symbols">bedroom_baby</span>
                                    <p>Мультсериалы</p>
                                </button>
                            </li>
                        </NavLink>
                        <NavLink to="/anime">
                            <li>
                                <button>
                                    <span className="symbols">language_japanese_kana</span>
                                    <p>Аниме</p>
                                </button>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <hr />
                <Togglers />
            </section>
        </aside >
    );
}