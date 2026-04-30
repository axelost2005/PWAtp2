import { getLocalStorage } from "../../services/localStorage";

function Home() {
    const teams = getLocalStorage("teams") || [];

    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">Equipos de fútbol</h1>

            <p className="mb-6 text-slate-700">
                Página principal donde se mostrará el listado de equipos.
            </p>

            {teams.length === 0 ? (
                <p className="rounded-lg bg-white p-4 text-slate-700 shadow">
                    Todavía no hay equipos cargados.
                </p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {teams.map((teamItem) => (
                        <div
                            key={teamItem.team.id}
                            className="w-48 rounded-lg border bg-slate-800 p-4 text-white shadow"
                        >
                            <h2 className="mb-2 font-bold">
                                {teamItem.team.name}
                            </h2>

                            <img
                                src={teamItem.team.logo}
                                width="50"
                                alt={`Logo de ${teamItem.team.name}`}
                                className="mb-2"
                            />

                            <p className="text-sm">
                                Estadio: {teamItem.venue.name}
                            </p>

                            <img
                                src={teamItem.venue.image}
                                width="80"
                                alt={`Estadio de ${teamItem.team.name}`}
                                className="mt-2 rounded"
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Home;