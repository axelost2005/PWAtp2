import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

function Header() {
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold no-underline"
                >
                    <span>⚽</span>
                    <span>{t("app.name")}</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-blue-400 no-underline"
                                : "text-slate-200 no-underline transition hover:text-blue-400"
                        }
                    >
                        {t("navbar.home")}
                    </NavLink>

                    <NavLink
                        to="/favoritos"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-blue-400 no-underline"
                                : "text-slate-200 no-underline transition hover:text-blue-400"
                        }
                    >
                        {t("navbar.favorites")}
                    </NavLink>

                    <LanguageSelector />
                </nav>
            </div>
        </header>
    );
}

export default Header;