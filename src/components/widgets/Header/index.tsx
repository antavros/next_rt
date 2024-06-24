import { Search } from "@/components/features/Search";
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
