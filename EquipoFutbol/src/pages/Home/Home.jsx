import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import SearchInput from "../../components/SearchInput/SearchInput";
import { getTeams, searchTeams } from "../../services/teamsService";

function Home() {
    const { t } = useTranslation();

    const [teams, setTeams] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const loadTeams = async () => {
                try {
                    setLoading(true);
                    setError("");

                    const cleanSearchValue = searchValue.trim();

                    const data = cleanSearchValue
                        ? await searchTeams(cleanSearchValue, 1, 20)
                        : await getTeams(1, 20);

                    setTeams(data);
                } catch (error) {
                    setError(t("home.error"));
                } finally {
                    setLoading(false);
                }
            };

            loadTeams();
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [searchValue, t]);

    const hasSearchValue = searchValue.trim().length > 0;

    return (
        <section>
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    {t("home.title")}
                </h1>

                <p className="max-w-2xl text-slate-700">
                    {t("home.description")}
                </p>
            </div>

            <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                label={t("home.searchLabel")}
                placeholder={t("home.searchPlaceholder")}
            />

            {loading && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {hasSearchValue ? t("home.searching") : t("home.loading")}
                </p>
            )}

            {error && (
                <p className="rounded-xl bg-red-100 p-4 text-red-700 shadow">
                    {error}
                </p>
            )}

            {!loading && !error && teams.length === 0 && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {hasSearchValue ? t("home.noResults") : t("home.empty")}
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