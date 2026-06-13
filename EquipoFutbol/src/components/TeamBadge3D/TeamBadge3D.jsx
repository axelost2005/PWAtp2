import { getTeamColors } from "../../utils/teamColors";

/*
    Panel deportivo en estilo 3D para el carrusel del hero.
    No usa imágenes nuevas: combina el logo existente del club con
    gradientes, franja diagonal, brillo superior y sombras de color
    para dar sensación de profundidad.
*/
function TeamBadge3D({ team, logoAlt, isActive = false }) {
    const colors = getTeamColors(team.name);

    return (
        <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-white/15 ${
                isActive ? "animate-float" : ""
            }`}
            style={{
                background: `linear-gradient(165deg, ${colors.primary} 0%, color-mix(in oklab, ${colors.primary} 50%, #05070d) 80%)`,
                boxShadow: isActive
                    ? `0 30px 80px -20px ${colors.primary}cc, 0 12px 30px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25)`
                    : "0 18px 45px -18px rgba(0, 0, 0, 0.7)",
            }}
        >
            {/* Franja diagonal con el color secundario del club */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(115deg, transparent 40%, ${colors.secondary}2e 40%, ${colors.secondary}2e 60%, transparent 60%)`,
                }}
            />

            {/* Brillo superior que simula luz sobre una superficie curva */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 via-white/5 to-transparent" />

            {/* Halo difuso detrás del escudo */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="h-3/5 w-3/5 rounded-full blur-2xl"
                    style={{
                        background: `radial-gradient(circle, ${colors.secondary}40, transparent 70%)`,
                    }}
                />
            </div>

            <img
                src={team.logo}
                alt={logoAlt}
                className="absolute inset-0 m-auto max-h-[58%] max-w-[62%] object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)]"
            />
        </div>
    );
}

export default TeamBadge3D;
