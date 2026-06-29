import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import { getFavoriteTeams } from "../../services/localStorage";

function Favorites() {
    const { t } = useTranslation();

    const [favoriteTeams, setFavoriteTeams] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setFavoriteTeams(getFavoriteTeams());
    }, []);

    const handleFavoriteChange = (updatedFavorites) => {
        setFavoriteTeams(updatedFavorites);
    };

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
            <h1 className="mb-3 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
                {t("favorites.title")}
            </h1>

            {favoriteTeams.length === 0 ? (
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {t("favorites.empty")}
                </p>
            ) : (
                <>
                    <p className="mb-8 max-w-2xl text-slate-400">
                        {t("favorites.description")}
                    </p>

                    <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {favoriteTeams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Favorites;
