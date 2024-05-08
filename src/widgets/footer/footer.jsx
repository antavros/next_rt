import { Link } from "react-router-dom";
import { Logo } from '../../entities/logo/logo';
import './footer.css';

export function Footer() {

    return (
        <footer id="footer">
            <section className="footer">
                <Logo />
                <ul>
                    <li><Link to="/about"><button><p>О нас</p></button></Link></li>
                    <li><Link to="/contacts"><button><p>Контакты</p></button></Link></li>
                </ul>
                <p>2024 © All Rights Reserved</p>
            </section>

        </footer>
    );
}