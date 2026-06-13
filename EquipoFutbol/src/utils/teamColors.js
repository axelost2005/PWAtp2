/*
    Colores de identidad de cada club, solo para presentación en el frontend.
    primary: color dominante (fondo del hero, glow del badge).
    secondary: color de acento (franja del badge, brillos).
    Las claves coinciden con team.name tal como llega de la API.
*/
const teamColors = {
    "Boca Juniors": { primary: "#0a3a82", secondary: "#f7b500" },
    "River Plate": { primary: "#d2122e", secondary: "#f4f4f5" },
    "Racing Club": { primary: "#3d8fd6", secondary: "#f4f4f5" },
    "Independiente": { primary: "#d61a21", secondary: "#f4f4f5" },
    "San Lorenzo": { primary: "#16367c", secondary: "#c8102e" },
    "Estudiantes de La Plata": { primary: "#d8232a", secondary: "#f4f4f5" },
    "Vélez Sarsfield": { primary: "#0f3f93", secondary: "#f4f4f5" },
    "Huracán": { primary: "#c8102e", secondary: "#f4f4f5" },
    "Argentinos Juniors": { primary: "#c8102e", secondary: "#f4f4f5" },
    "Rosario Central": { primary: "#1c2e6b", secondary: "#ffd100" },
    "Newell's Old Boys": { primary: "#c8102e", secondary: "#111827" },
    "Talleres de Córdoba": { primary: "#1d4289", secondary: "#f4f4f5" },
    "Belgrano": { primary: "#58a7dd", secondary: "#f4f4f5" },
    "Lanús": { primary: "#7a1530", secondary: "#f4f4f5" },
    "Banfield": { primary: "#0c7a4d", secondary: "#f4f4f5" },
    "Defensa y Justicia": { primary: "#0e7a3e", secondary: "#ffd100" },
    "Unión de Santa Fe": { primary: "#c8102e", secondary: "#f4f4f5" },
    "Tigre": { primary: "#173f7a", secondary: "#c8102e" },
    "Platense": { primary: "#5b3a29", secondary: "#f4f4f5" },
    "Central Córdoba": { primary: "#1f2937", secondary: "#f4f4f5" },
    "Instituto": { primary: "#c8102e", secondary: "#f4f4f5" },
    "Gimnasia y Esgrima La Plata": { primary: "#0f3f93", secondary: "#f4f4f5" },
    "Godoy Cruz": { primary: "#1d4289", secondary: "#f4f4f5" },
    "Atlético Tucumán": { primary: "#4a9bd8", secondary: "#f4f4f5" },
    "Sarmiento": { primary: "#0c7a4d", secondary: "#f4f4f5" },
    "Deportivo Riestra": { primary: "#1f2937", secondary: "#f4f4f5" },
    "Aldosivi": { primary: "#e8b800", secondary: "#0c7a4d" },
};

const DEFAULT_COLORS = { primary: "#1d4289", secondary: "#f4f4f5" };

export const getTeamColors = (teamName) => {
    return teamColors[teamName] || DEFAULT_COLORS;
};
