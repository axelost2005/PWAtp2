import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
    const { t } = useTranslation();

    return (
        <section className="text-center">
            <h1 className="mb-4 text-4xl font-bold">
                404
            </h1>

            <p className="mb-6 text-slate-700">
                {t("notFound.description")}
            </p>

            <Link
                to="/"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
            >
                {t("common.backHome")}
            </Link>
        </section>
    );
}

export default NotFound;