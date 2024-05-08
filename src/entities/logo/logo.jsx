import { Link } from "react-router-dom";
import './logo.css';

export function Logo() {
    return (
        <Link to="/">
            <img className="logo" src="/images/LOGO.png" alt="RATETABLE" />
        </Link>
    );
}