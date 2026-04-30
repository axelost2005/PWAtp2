import { useEffect, useState } from "react";
import TeamCard from "../../components/TeamCard/TeamCard";
import { getTeams } from "../../services/teamsService";

function Home() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTeams = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getTeams(1, 20);
                setTeams(data);
            } catch (error) {
                setError("No se pudieron cargar los equipos.");
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    return (
        <section>
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    Equipos de fútbol
                </h1>

                <p className="max-w-2xl text-slate-700">
                    Explorá equipos del fútbol argentino, conocé sus estadios, historia,
                    entrenadores y guardá tus favoritos.
                </p>
            </div>

            {loading && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    Cargando equipos...
                </p>
            )}

            {error && (
                <p className="rounded-xl bg-red-100 p-4 text-red-700 shadow">
                    {error}
                </p>
            )}

            {!loading && !error && teams.length === 0 && (
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    No hay equipos para mostrar.
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