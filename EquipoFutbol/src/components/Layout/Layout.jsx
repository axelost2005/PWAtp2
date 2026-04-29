import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;