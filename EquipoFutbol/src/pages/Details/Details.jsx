// Hooks de React:
// useState maneja estados internos del componente.
// useEffect ejecuta la carga del equipo cuando entra a la página o cambia el ID.
import { useEffect, useState } from "react";

// Link permite volver al Home sin recargar la página.
// useParams permite leer el ID que viene en la URL, por ejemplo /equipos/3.
import { Link, useParams } from "react-router-dom";

// Hook de traducción para mostrar textos en español o inglés.
import { useTranslation } from "react-i18next";

// Servicio encargado de buscar un equipo específico por ID.
// Esto separa la lógica de datos del componente visual.
import { getTeamById } from "../../services/teamsService";

// Función que adapta/traduce los datos del equipo según el idioma actual.
import { getTranslatedTeam } from "../../utils/teamTranslations";

function Details() {
    // Obtenemos el id desde la URL.
    // Si la ruta es /equipos/5, id vale "5".
    const { id } = useParams();

    // t se usa para traducir textos.
    // i18n permite saber qué idioma está activo.
    const { t, i18n } = useTranslation();

    // Estado donde guardamos el equipo encontrado.
    const [team, setTeam] = useState(null);

    // Estado para saber si la página está cargando.
    const [loading, setLoading] = useState(true);

    // Estado para saber si hubo error o si el equipo no existe.
    const [error, setError] = useState(false);

    // Detectamos el idioma actual.
    // Si viene "es-AR" o "en-US", nos quedamos solo con "es" o "en".
    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];

    // Si existe un equipo cargado, lo traducimos/adaptamos al idioma actual.
    // Si todavía no hay equipo, queda en null.
    const translatedTeam = team ? getTranslatedTeam(team, currentLanguage) : null;

    // Este efecto se ejecuta cuando se monta la página
    // y cada vez que cambia el id de la URL.
    useEffect(() => {
        const loadTeam = async () => {
            try {
                // Antes de pedir datos, activamos loading y limpiamos errores previos.
                setLoading(true);
                setError(false);

                // Pedimos el equipo por ID usando el servicio.
                const data = await getTeamById(id);

                // Guardamos el equipo recibido en el estado.
                setTeam(data);
            } catch (error) {
                // Si falla el fetch o no existe el equipo, activamos error.
                setError(true);
            } finally {
                // Pase lo que pase, dejamos de mostrar el estado de carga.
                setLoading(false);
            }
        };

        loadTeam();
    }, [id]);

    // Estado de carga:
    // Mientras se está buscando el equipo, mostramos un mensaje traducido.
    if (loading) {
        return (
            <section>
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {t("details.loading")}
                </p>
            </section>
        );
    }

    // Estado de error / 404:
    // Si hubo error o no se pudo traducir/cargar el equipo, mostramos una pantalla de no encontrado.
    if (error || !translatedTeam) {
        return (
            <section className="rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    {t("details.notFoundTitle")}
                </h1>

                <p className="mb-6 text-slate-700">
                    {t("details.notFoundDescription")}
                </p>

                <Link
                    to="/"
                    className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    {t("common.backHome")}
                </Link>
            </section>
        );
    }

    // Render principal:
    // Si el equipo existe, mostramos su logo, nombre, categoría y datos detallados.
    return (
        <section className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Card izquierda: logo, nombre y categoría del equipo */}
            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <div className="flex h-72 items-center justify-center bg-slate-100 p-6">
                    <img
                        src={translatedTeam.logo}
                        alt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold text-slate-950">
                        {translatedTeam.name}
                    </h1>

                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        {translatedTeam.category}
                    </p>
                </div>
            </div>

            {/* Card derecha: información detallada del equipo */}
            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-bold text-slate-950">
                    {t("details.title")}
                </h2>

                <p className="mb-6 leading-relaxed text-slate-700">
                    {translatedTeam.description}
                </p>

                {/* Grilla responsive con datos del equipo.
                    En mobile va en una columna y desde sm pasa a dos columnas. */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.country")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.country}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.league")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.league}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.stadium")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.stadium}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.founded")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.founded}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.coach")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.coach}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.titles")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.titles}
                        </p>
                    </div>
                </div>

                {/* Botón para volver al Home usando navegación interna de React Router */}
                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    {t("common.backHome")}
                </Link>
            </div>
        </section>
    );
}

// Exportamos la página Details para usarla en las rutas.
export default Details;