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

// Colores de identidad del club, solo para presentación.
import { getTeamColors } from "../../utils/teamColors";

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

    // Estado para saber si hubo un error de API al cargar el equipo (server caído, 500, etc.).
    const [error, setError] = useState(false);

    // Estado para saber si el equipo no existe (respuesta 404 del backend).
    const [notFound, setNotFound] = useState(false);

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
                // Antes de pedir datos, activamos loading y limpiamos estados previos.
                setLoading(true);
                setError(false);
                setNotFound(false);

                // Pedimos el equipo por ID usando el servicio.
                const data = await getTeamById(id);

                // Guardamos el equipo recibido en el estado.
                setTeam(data);
            } catch (err) {
                // El service distingue 404 (equipo inexistente) de cualquier otra falla de API.
                if (err.message === "TEAM_NOT_FOUND") {
                    setNotFound(true);
                } else {
                    setError(true);
                }
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
            <section className="mx-auto w-full max-w-6xl px-4 py-12">
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {t("details.loading")}
                </p>
            </section>
        );
    }

    // Estado de error de API:
    // Si la llamada al backend falló (server caído, 500, etc.), mostramos un mensaje de error,
    // distinto del "no encontrado" porque el equipo podría existir igual.
    if (error) {
        return (
            <section className="mx-auto w-full max-w-6xl px-4 py-12">
                <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
                    <h1 className="mb-4 font-display text-3xl uppercase tracking-wide text-white">
                        {t("details.errorTitle")}
                    </h1>

                    <p className="mb-6 text-slate-300">
                        {t("details.errorDescription")}
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-semibold text-slate-950 no-underline transition hover:bg-slate-200"
                    >
                        {t("common.backHome")}
                    </Link>
                </div>
            </section>
        );
    }

    // Estado 404 / sin datos:
    // Si el equipo no existe (404) o no hay datos para mostrar, mostramos la pantalla de no encontrado.
    if (notFound || !translatedTeam) {
        return (
            <section className="mx-auto w-full max-w-6xl px-4 py-12">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                    <h1 className="mb-4 font-display text-3xl uppercase tracking-wide text-white">
                        {t("details.notFoundTitle")}
                    </h1>

                    <p className="mb-6 text-slate-300">
                        {t("details.notFoundDescription")}
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-semibold text-slate-950 no-underline transition hover:bg-slate-200"
                    >
                        {t("common.backHome")}
                    </Link>
                </div>
            </section>
        );
    }

    // Colores del club para el panel del escudo.
    const colors = getTeamColors(translatedTeam.name);

    // Render principal:
    // Si el equipo existe, mostramos su logo, nombre, categoría y datos detallados.
    return (
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_1.3fr]">
            {/* Card izquierda: logo, nombre y categoría del equipo */}
            <div className="h-fit overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                <div
                    className="flex h-72 items-center justify-center p-8"
                    style={{
                        background: `radial-gradient(ellipse 95% 95% at 50% 0%, ${colors.primary}59, transparent 75%)`,
                    }}
                >
                    <img
                        src={translatedTeam.logo}
                        alt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                        className="max-h-full max-w-full object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)]"
                    />
                </div>

                <div className="p-6">
                    <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">
                        {translatedTeam.name}
                    </h1>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                        {translatedTeam.category}
                    </p>
                </div>
            </div>

            {/* Card derecha: información detallada del equipo */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <h2 className="mb-4 text-2xl font-bold text-white">
                    {t("details.title")}
                </h2>

                <p className="mb-6 leading-relaxed text-slate-300">
                    {translatedTeam.description}
                </p>

                {/* Grilla responsive con datos del equipo.
                    En mobile va en una columna y desde sm pasa a dos columnas. */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("details.country")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.country}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("teamCard.league")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.league}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("teamCard.stadium")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.stadium}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("details.founded")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.founded}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("details.coach")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.coach}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <p className="text-sm text-slate-400">
                            {t("teamCard.titles")}
                        </p>
                        <p className="font-semibold text-white">
                            {translatedTeam.titles}
                        </p>
                    </div>
                </div>

                {/* Botón para volver al Home usando navegación interna de React Router */}
                <Link
                    to="/"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-semibold text-slate-950 no-underline transition hover:bg-slate-200"
                >
                    {t("common.backHome")}
                </Link>
            </div>
        </section>
    );
}

// Exportamos la página Details para usarla en las rutas.
export default Details;
