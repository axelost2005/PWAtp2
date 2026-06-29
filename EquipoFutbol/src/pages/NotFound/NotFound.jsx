import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
    const { t } = useTranslation();

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-24 text-center">
            <h1 className="mb-4 font-display text-7xl uppercase text-white/90">
                404
            </h1>

            <p className="mb-8 text-slate-400">
                {t("notFound.description")}
            </p>

            <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-semibold text-slate-950 no-underline transition hover:bg-slate-200"
            >
                {t("common.backHome")}
            </Link>
        </section>
    );
}

export default NotFound;
