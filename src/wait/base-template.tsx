import { Outlet } from "react-router-dom";
import { Header } from "../widgets/header/header";
import { Sidebar } from "../widgets/sidebar/sidebar";
import { Footer } from "../widgets/footer/footer";
import { FastNavigation } from "../features/fastNav/fastNav";
import "./base.css"

export default function Base() {
    return (
        <>
            <Header />
            <hr />
            <Sidebar />
            <main>
                <Outlet />
            </main>
            <hr />
            <Footer />
            <FastNavigation />
        </>
    );
}