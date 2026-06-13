import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TeamBadge3D from "../TeamBadge3D/TeamBadge3D";
import { getTranslatedTeam } from "../../utils/teamTranslations";
import { getTeamColors } from "../../utils/teamColors";
import { isFavoriteTeam, toggleFavoriteTeam } from "../../services/localStorage";

// Duración de la transición del carrusel. Mientras corre, la navegación queda
// bloqueada para evitar estados intermedios rotos.
const ANIMATION_MS = 650;

// Cantidad máxima de equipos que rota el hero (el listado completo vive abajo).
const MAX_CAROUSEL_TEAMS = 10;

const CARD_TRANSITION =
    "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1)";

// Versión corta del nombre para el ghost text gigante:
// nombres largos usan solo la primera palabra para no desbordar.
const getGhostName = (name) => {
    return name.length <= 13 ? name : name.split(" ")[0];
};

function HeroCarousel({ teams }) {
    const { t, i18n } = useTranslation();
    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];

    const carouselTeams = teams.slice(0, MAX_CAROUSEL_TEAMS);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const animationTimeoutRef = useRef(null);

    // Si la lista cambió (por ejemplo, una búsqueda nueva) o el índice quedó
    // fuera de rango, ajustamos el estado durante el render. Es el patrón que
    // recomienda React para derivar estado de props, sin pasar por un effect.
    const firstTeamId = carouselTeams[0]?.id;
    const [prevFirstTeamId, setPrevFirstTeamId] = useState(firstTeamId);

    if (prevFirstTeamId !== firstTeamId) {
        setPrevFirstTeamId(firstTeamId);
        setActiveIndex(0);
    } else if (carouselTeams.length > 0 && activeIndex >= carouselTeams.length) {
        setActiveIndex(0);
    }

    // Detección de mobile para ajustar las transformaciones del carrusel.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const updateIsMobile = () => setIsMobile(mediaQuery.matches);

        updateIsMobile();
        mediaQuery.addEventListener("change", updateIsMobile);

        return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }, []);

    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    const safeIndex = activeIndex < carouselTeams.length ? activeIndex : 0;
    const activeTeam = carouselTeams[safeIndex];
    const activeTeamId = activeTeam?.id;

    // El estado de favorito se sincroniza con localStorage y con el evento
    // "favorites-updated" que también disparan las cards del listado.
    useEffect(() => {
        if (!activeTeamId) return;

        const syncFavorite = () => setIsFavorite(isFavoriteTeam(activeTeamId));

        syncFavorite();
        window.addEventListener("favorites-updated", syncFavorite);

        return () => window.removeEventListener("favorites-updated", syncFavorite);
    }, [activeTeamId]);

    if (!activeTeam) {
        return null;
    }

    const activeTranslated = getTranslatedTeam(activeTeam, currentLanguage);

    const lockDuringAnimation = () => {
        setIsAnimating(true);

        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
        }, ANIMATION_MS);
    };

    const navigate = (direction) => {
        if (isAnimating || carouselTeams.length < 2) return;

        setActiveIndex((prev) =>
            direction === "next"
                ? (prev + 1) % carouselTeams.length
                : (prev - 1 + carouselTeams.length) % carouselTeams.length
        );

        lockDuringAnimation();
    };

    const goTo = (index) => {
        if (isAnimating || index === safeIndex) return;

        setActiveIndex(index);
        lockDuringAnimation();
    };

    const handleFavoriteClick = () => {
        toggleFavoriteTeam(activeTeam);
        window.dispatchEvent(new Event("favorites-updated"));
    };

    // Rol de cada card según su distancia al equipo activo.
    const getRole = (index) => {
        const length = carouselTeams.length;
        const offset = (index - safeIndex + length) % length;

        if (offset === 0) return "center";
        if (offset === 1) return "right";
        if (offset === length - 1 && length > 2) return "left";
        if (offset === 2 && length > 3) return "back";
        return "hidden";
    };

    const getRoleStyle = (role) => {
        if (role === "center") {
            return {
                transform: "translateX(0) rotateY(0deg) scale(1)",
                opacity: 1,
                zIndex: 30,
                filter: "none",
            };
        }

        if (role === "left" || role === "right") {
            const direction = role === "left" ? -1 : 1;

            if (isMobile) {
                return {
                    transform: `translateX(${direction * 40}vw) rotateY(${direction * -16}deg) scale(0.4)`,
                    opacity: 0.3,
                    zIndex: 20,
                    filter: "blur(2px)",
                };
            }

            return {
                transform: `translateX(calc(${direction} * clamp(11rem, 25vw, 23rem))) rotateY(${direction * -22}deg) scale(0.6)`,
                opacity: 0.55,
                zIndex: 20,
                filter: "blur(2px)",
            };
        }

        if (role === "back" && !isMobile) {
            return {
                transform: "translateY(-2.75rem) scale(0.45)",
                opacity: 0.35,
                zIndex: 10,
                filter: "blur(5px)",
            };
        }

        return {
            transform: "scale(0.25)",
            opacity: 0,
            zIndex: 0,
            filter: "blur(8px)",
        };
    };

    return (
        <section
            aria-roledescription="carousel"
            aria-label={t("home.title")}
            className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-pitch-950"
        >
            {/* Capas de fondo: un glow con los colores de cada club, con crossfade suave */}
            {carouselTeams.map((team, index) => {
                const colors = getTeamColors(team.name);

                return (
                    <div
                        key={team.id}
                        aria-hidden="true"
                        className="absolute inset-0 transition-opacity duration-[650ms] ease-carousel"
                        style={{
                            opacity: index === safeIndex ? 1 : 0,
                            background: `radial-gradient(ellipse 90% 65% at 50% 12%, ${colors.primary}66, transparent 65%), radial-gradient(ellipse 70% 55% at 85% 95%, ${colors.secondary}1a, transparent 60%)`,
                        }}
                    />
                );
            })}

            {/* Viñeta para hundir los bordes y fundido hacia la sección siguiente */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,6,12,0.55)_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-pitch-950"
            />

            {/* Ghost text: nombre gigante del club activo detrás del badge */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 select-none overflow-hidden"
            >
                {carouselTeams.map((team, index) => (
                    <div
                        key={team.id}
                        className="absolute inset-0 flex items-center justify-center pb-24 transition-opacity duration-[650ms] ease-carousel"
                        style={{ opacity: index === safeIndex ? 1 : 0 }}
                    >
                        <span
                            className="px-2 text-center font-display uppercase leading-none tracking-tight text-white/[0.07]"
                            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
                        >
                            {getGhostName(team.name)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Escenario 3D del carrusel */}
            <div
                className="relative z-10 flex flex-1 items-center justify-center px-4 pt-8"
                style={{ perspective: "1600px" }}
            >
                {carouselTeams.map((team, index) => {
                    const role = getRole(index);
                    const translatedTeam = getTranslatedTeam(team, currentLanguage);
                    const isSide = role === "left" || role === "right";

                    return (
                        <div
                            key={team.id}
                            className="absolute w-[clamp(13rem,26vw,19rem)]"
                            style={{
                                ...getRoleStyle(role),
                                transition: CARD_TRANSITION,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {isSide ? (
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    onClick={() => navigate(role === "left" ? "prev" : "next")}
                                    className="block w-full cursor-pointer"
                                >
                                    <TeamBadge3D
                                        team={translatedTeam}
                                        logoAlt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                                    />
                                </button>
                            ) : (
                                <TeamBadge3D
                                    team={translatedTeam}
                                    logoAlt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                                    isActive={role === "center"}
                                />
                            )}
                        </div>
                    );
                })}

                {/* Flechas de navegación */}
                {carouselTeams.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("prev")}
                            aria-label={t("hero.prevTeam")}
                            className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8 sm:h-12 sm:w-12"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("next")}
                            aria-label={t("hero.nextTeam")}
                            className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:h-12 sm:w-12"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Información del equipo activo */}
            <div
                key={activeTeam.id}
                className="relative z-20 mx-auto w-full max-w-2xl animate-rise px-4 text-center"
            >
                <h2 className="font-display text-3xl uppercase tracking-wide text-white sm:text-5xl">
                    {activeTranslated.name}
                </h2>

                <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">
                    {activeTranslated.league} · {activeTranslated.stadium}
                </p>

                <p className="mx-auto mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    {activeTranslated.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={handleFavoriteClick}
                        aria-label={
                            isFavorite
                                ? t("teamCard.removeFavorite")
                                : t("teamCard.addFavorite")
                        }
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-xl transition hover:scale-110 ${
                            isFavorite
                                ? "border-transparent bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
                                : "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-red-400"
                        }`}
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>

                    <Link
                        to={`/equipos/${activeTeam.id}`}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 font-semibold text-slate-950 no-underline transition hover:scale-[1.03] hover:bg-slate-200"
                    >
                        {t("teamCard.viewDetail")}
                    </Link>
                </div>
            </div>

            {/* Indicadores de posición */}
            {carouselTeams.length > 1 && (
                <div className="relative z-20 mt-7 flex flex-wrap items-center justify-center gap-2 px-4 pb-10 sm:pb-12">
                    {carouselTeams.map((team, index) => (
                        <button
                            key={team.id}
                            type="button"
                            onClick={() => goTo(index)}
                            aria-label={t("hero.goToTeam", { teamName: team.name })}
                            aria-current={index === safeIndex ? "true" : undefined}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === safeIndex
                                    ? "w-7 bg-white"
                                    : "w-3 bg-white/30 hover:bg-white/60"
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default HeroCarousel;
