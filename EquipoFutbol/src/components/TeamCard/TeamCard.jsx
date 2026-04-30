import { Link } from "react-router-dom";

function TeamCard({ team }) {
    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-44 items-center justify-center bg-slate-100 p-5">
                <img
                    src={team.logo}
                    alt={`Escudo de ${team.name}`}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {team.category}
                </p>

                <h2 className="mb-2 text-xl font-bold text-slate-950">
                    {team.name}
                </h2>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {team.shortDescription}
                </p>

                <div className="mb-4 space-y-1 text-sm text-slate-700">
                    <p>
                        <span className="font-semibold">Liga:</span> {team.league}
                    </p>
                    <p>
                        <span className="font-semibold">Estadio:</span> {team.stadium}
                    </p>
                    <p>
                        <span className="font-semibold">Títulos:</span> {team.titles}
                    </p>
                </div>

                <Link
                    to={`/equipos/${team.id}`}
                    className="inline-flex w-full justify-center rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    Ver detalle
                </Link>
            </div>
        </article>
    );
}

export default TeamCard;