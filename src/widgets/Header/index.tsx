import { Search } from "@/features/Search";
import './style.css';

export function Header() {
    return (
        <header>
            <section className="headBar">
                <Search />
            </section>
        </header>
    );
}
