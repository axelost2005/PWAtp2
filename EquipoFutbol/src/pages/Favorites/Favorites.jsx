import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import { useFavorites } from "../../context/FavoritesContext";

function Favorites() {
    const { t } = useTranslation();

    // Los favoritos salen del context, que los carga desde GET /api/favorites.
    const { favorites, loading, error } = useFavorites();

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
            <h1 className="mb-3 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
                {t("favorites.title")}
            </h1>

            {error && (
                <p className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    {t(error)}
                </p>
            )}

            {loading ? (
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {t("favorites.loading")}
                </p>
            ) : favorites.length === 0 ? (
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {t("favorites.empty")}
                </p>
            ) : (
                <>
                    <p className="mb-8 max-w-2xl text-slate-400">
                        {t("favorites.description")}
                    </p>

                    <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {favorites.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Favorites;
