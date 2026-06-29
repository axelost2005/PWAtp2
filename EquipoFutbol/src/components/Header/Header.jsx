import { Link, NavLink, useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Header() {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const getNavLinkClassName = ({ isActive }) =>
        isActive
            ? "rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-950 no-underline"
            : "rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 no-underline transition hover:bg-white/10 hover:text-white";

    // Cierra sesión (avisa al backend + limpia estado) y vuelve al inicio.
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-pitch-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 no-underline"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg">
                        ⚽
                    </span>
                    <span className="font-display text-base uppercase tracking-wide text-white sm:text-lg">
                        {t("app.name")}
                    </span>
                </Link>

                <nav className="flex items-center gap-1.5 sm:gap-2">
                    <NavLink to="/" className={getNavLinkClassName}>
                        {t("navbar.home")}
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink to="/favoritos" className={getNavLinkClassName}>
                            {t("navbar.favorites")}
                        </NavLink>
                    )}

                    {isAuthenticated ? (
                        <>
                            <span className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300">
                                {t("navbar.greeting", { name: user?.name })}
                            </span>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                {t("navbar.logout")}
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={getNavLinkClassName}>
                                {t("navbar.login")}
                            </NavLink>

                            <NavLink to="/registro" className={getNavLinkClassName}>
                                {t("navbar.register")}
                            </NavLink>
                        </>
                    )}

                    <LanguageSelector />
                </nav>
            </div>
        </header>
    );
}

export default Header;
