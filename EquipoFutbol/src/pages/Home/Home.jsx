import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import { getTeams } from "../../services/teamsService";
import { searchTeams } from "../../services/teamsService";
import { Filter } from "../../components/Filter/Filter";

function Home() {
    const { t } = useTranslation();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("")

    useEffect(() => {
        const loadTeams = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await searchTeams(search, 1, 20);
                setTeams(data);
            } catch (error) {
                setError(t("home.error"));
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, [search,t]);
    return (
        <section>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-3xl font-bold text-slate-950">
                        {t("home.title")}
                    </h1>
                    <Filter search={search} setSearch={setSearch}/>
                </div>
                

                <p className="max-w-2xl text-slate-700">
                    {t("home.description")}
                </p>
                
            </div>

            {loading && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {t("home.loading")}
                </p>
            )}

            {error && (
                <p className="rounded-xl bg-red-100 p-4 text-red-700 shadow">
                    {error}
                </p>
            )}

            {!loading && !error && teams.length === 0 && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {t("home.empty")}
                </p>
            )}

            {!loading && !error && teams.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {teams.map((team, index) => (
                        <TeamCard
                            key={team.id || index + 1}
                            team={{
                                ...team,
                                id: team.id || String(index + 1),
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Home;