import { useTranslation } from "react-i18next";

function Favorites() {
    const { t } = useTranslation();

    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">
                {t("favorites.title")}
            </h1>

            <p className="text-slate-700">
                {t("favorites.description")}
            </p>
        </section>
    );
}

export default Favorites;