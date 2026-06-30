import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTranslatedTeam } from "../../utils/teamTranslations";
import { getTeamColors } from "../../utils/teamColors";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

function TeamCard({ team }) {
    const { t, i18n } = useTranslation();
    const { isAuthenticated } = useAuth();
    const { isFavorite, toggleFavorite } = useFavorites();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];
    const translatedTeam = getTranslatedTeam(team, currentLanguage);
    const colors = getTeamColors(team.name);

    const favorite = isFavorite(team.id);

    // El alta/baja pega a la API a través del context; los errores se manejan ahí.
    const handleFavoriteClick = () => {
        toggleFavorite(team);
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/50">
            <div
                className="relative flex h-44 shrink-0 items-center justify-center p-6"
                style={{
                    background: `radial-gradient(ellipse 90% 95% at 50% 0%, ${colors.primary}4d, transparent 72%)`,
                }}
            >
                {isAuthenticated && (
                    <button
                        type="button"
                        onClick={handleFavoriteClick}
                        className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-lg transition hover:scale-110 ${
                            favorite
                                ? "border-transparent bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
                                : "border-white/15 bg-white/10 text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-red-400"
                        }`}
                        aria-label={
                            favorite
                                ? t("teamCard.removeFavorite")
                                : t("teamCard.addFavorite")
                        }
                    >
                        {favorite ? "♥" : "♡"}
                    </button>
                )}

                <img
                    src={translatedTeam.logo}
                    alt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="mb-3 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                    {translatedTeam.category}
                </p>

                <h2 className="mb-2 line-clamp-1 text-xl font-bold text-white">
                    {translatedTeam.name}
                </h2>

                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
                    {translatedTeam.shortDescription}
                </p>

                <div className="mb-5 space-y-1.5 text-sm text-slate-300">
                    <p className="line-clamp-1">
                        <span className="font-semibold text-slate-100">
                            {t("teamCard.league")}:
                        </span>{" "}
                        {translatedTeam.league}
                    </p>

                    <p className="line-clamp-2">
                        <span className="font-semibold text-slate-100">
                            {t("teamCard.stadium")}:
                        </span>{" "}
                        {translatedTeam.stadium}
                    </p>

                    <p className="line-clamp-1">
                        <span className="font-semibold text-slate-100">
                            {t("teamCard.titles")}:
                        </span>{" "}
                        {translatedTeam.titles}
                    </p>
                </div>

                <Link
                    to={`/equipos/${translatedTeam.id}`}
                    className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-xl bg-white font-semibold text-slate-950 no-underline transition hover:bg-slate-200"
                >
                    {t("teamCard.viewDetail")}
                </Link>
            </div>
        </article>
    );
}

export default TeamCard;
