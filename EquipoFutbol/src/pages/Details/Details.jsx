import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeamById } from "../../services/teamsService";

function Details() {
    const { id } = useParams();

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTeam = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getTeamById(id);
                setTeam(data);
            } catch (error) {
                setError("No se pudo cargar el equipo solicitado.");
            } finally {
                setLoading(false);
            }
        };

        loadTeam();
    }, [id]);

    if (loading) {
        return (
            <section>
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    Cargando detalle del equipo...
                </p>
            </section>
        );
    }

    if (error || !team) {
        return (
            <section className="rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    Equipo no encontrado
                </h1>

                <p className="mb-6 text-slate-700">
                    No existe un equipo cargado con ese ID.
                </p>

                <Link
                    to="/"
                    className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    Volver al inicio
                </Link>
            </section>
        );
    }

    return (
        <section className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <div className="flex h-72 items-center justify-center bg-slate-100 p-6">
                    <img
                        src={team.logo}
                        alt={`Escudo de ${team.name}`}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold text-slate-950">
                        {team.name}
                    </h1>

                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        {team.category}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-bold text-slate-950">
                    Detalle del equipo
                </h2>

                <p className="mb-6 leading-relaxed text-slate-700">
                    {team.description}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">País</p>
                        <p className="font-semibold text-slate-900">{team.country}</p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">Liga</p>
                        <p className="font-semibold text-slate-900">{team.league}</p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">Estadio</p>
                        <p className="font-semibold text-slate-900">{team.stadium}</p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">Fundación</p>
                        <p className="font-semibold text-slate-900">{team.founded}</p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">Entrenador</p>
                        <p className="font-semibold text-slate-900">{team.coach}</p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">Títulos</p>
                        <p className="font-semibold text-slate-900">{team.titles}</p>
                    </div>
                </div>

                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
}

export default Details;