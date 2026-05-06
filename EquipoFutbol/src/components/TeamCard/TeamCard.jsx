import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTranslatedTeam } from "../../utils/teamTranslations";
import { isFavoriteTeam, toggleFavoriteTeam } from "../../services/localStorage";

function TeamCard({ team, onFavoriteChange }) {
    const { t, i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];
    const translatedTeam = getTranslatedTeam(team, currentLanguage);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(isFavoriteTeam(team.id));
    }, [team.id]);

    const handleFavoriteClick = () => {
        const updatedFavorites = toggleFavoriteTeam(team);

        setIsFavorite(isFavoriteTeam(team.id));

        if (onFavoriteChange) {
            onFavoriteChange(updatedFavorites);
        }
    };

    return (
        <article className="flex h-[500px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative flex h-44 shrink-0 items-center justify-center bg-slate-100 p-5">
                <button
                    type="button"
                    onClick={handleFavoriteClick}
                    className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow transition ${
                        isFavorite
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-slate-500 hover:bg-red-50 hover:text-red-500"
                    }`}
                    aria-label={
                        isFavorite
                            ? t("teamCard.removeFavorite")
                            : t("teamCard.addFavorite")
                    }
                >
                    {isFavorite ? "♥" : "♡"}
                </button>

                <img
                    src={translatedTeam.logo}
                    alt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 h-4 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {translatedTeam.category}
                </p>

                <h2 className="mb-2 h-7 overflow-hidden text-xl font-bold leading-7 text-slate-950">
                    {translatedTeam.name}
                </h2>

                <p className="mb-4 h-[64px] overflow-hidden text-sm leading-relaxed text-slate-600">
                    {translatedTeam.shortDescription}
                </p>

                <div className="h-[88px] overflow-hidden text-sm text-slate-700">
                    <p className="h-6 overflow-hidden whitespace-nowrap">
                        <span className="font-semibold">
                            {t("teamCard.league")}:
                        </span>{" "}
                        {translatedTeam.league}
                    </p>

                    <p className="h-10 overflow-hidden leading-5">
                        <span className="font-semibold">
                            {t("teamCard.stadium")}:
                        </span>{" "}
                        {translatedTeam.stadium}
                    </p>

                    <p className="h-6 overflow-hidden whitespace-nowrap">
                        <span className="font-semibold">
                            {t("teamCard.titles")}:
                        </span>{" "}
                        {translatedTeam.titles}
                    </p>
                </div>

                <Link
                    to={`/equipos/${translatedTeam.id}`}
                    className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl bg-blue-600 px-4 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    {t("teamCard.viewDetail")}
                </Link>
            </div>
        </article>
    );
}

export default TeamCard;