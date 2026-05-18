import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../components/TeamCard/TeamCard";
import SearchInput from "../../components/SearchInput/SearchInput";
import { getTeams, searchTeams } from "../../services/teamsService";

function Home() {
    const { t } = useTranslation();

    const [teams, setTeams] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorKey, setErrorKey] = useState("");

    const limit = 8;

    // Debounce de búsqueda:
    // Espera 400ms después de que el usuario escribe para actualizar el término real de búsqueda.
    // Importante: ya no vaciamos teams acá, porque eso rompía la carga inicial.
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPage(1);
            setHasMore(true);
            setDebouncedSearchValue(searchValue.trim());
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    // Carga de equipos:
    // Si hay búsqueda, llama a searchTeams.
    // Si no hay búsqueda, llama a getTeams.
    // Si page es 1, reemplaza la lista.
    // Si page es mayor a 1, agrega equipos para el scroll infinito.
    useEffect(() => {
        let isCancelled = false;

        const loadTeams = async () => {
            try {
                setLoading(true);
                setErrorKey("");

                const data = debouncedSearchValue
                    ? await searchTeams(debouncedSearchValue, page, limit)
                    : await getTeams(page, limit);

                if (isCancelled) return;

                if (page === 1) {
                    setTeams(data);
                } else {
                    setTeams((prevTeams) => [...prevTeams, ...data]);
                }

                setHasMore(data.length === limit);
            } catch (error) {
                if (isCancelled) return;

                setErrorKey("home.error");

                if (page === 1) {
                    setTeams([]);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        loadTeams();

        return () => {
            isCancelled = true;
        };
    }, [page, debouncedSearchValue]);

    // Scroll infinito:
    // Cuando el usuario llega cerca del final de la página,
    // aumenta el número de página para pedir más equipos.
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const isNearBottom = scrollPosition >= pageHeight - 250;

            if (isNearBottom && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hasMore, loading]);

    const hasSearchValue = debouncedSearchValue.length > 0;
    const isFirstLoad = loading && page === 1;
    const isLoadingMore = loading && page > 1;

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

            {isFirstLoad && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {hasSearchValue ? t("home.searching") : t("home.loading")}
                </p>
            )}

            {errorKey && (
                <p className="rounded-xl bg-red-100 p-4 text-red-700 shadow">
                    {t(errorKey)}
                </p>
            )}

            {!loading && !errorKey && teams.length === 0 && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {hasSearchValue ? t("home.noResults") : t("home.empty")}
                </p>
            )}

            {!errorKey && teams.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            )}

            {isLoadingMore && (
                <p className="mt-6 text-center text-slate-600">
                    {t("home.loadingMore")}
                </p>
            )}

            {!loading && !hasMore && teams.length > 0 && (
                <p className="mt-6 text-center text-slate-500">
                    {t("home.noMore")}
                </p>
            )}
        </section>
    );
}

export default Home;