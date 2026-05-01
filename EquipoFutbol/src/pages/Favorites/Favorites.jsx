import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import { getFavoriteTeams } from "../../services/localStorage";
import { Filter } from "../../components/Filter/Filter";

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
        <section>
            <div  className="flex items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold">
                    {t("favorites.title")}
                </h1>
            </div>
            

            {favoriteTeams.length === 0 ? (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {t("favorites.empty")}
                </p>
            ) : (
                <>
                    <p className="mb-6 text-slate-700">
                        {t("favorites.description")}
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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