// SERVICIO DE EQUIPOS
// Este archivo centraliza las llamadas del frontend al backend.
//
// Antes el frontend podía usar datos mockeados o localStorage.
// Ahora los equipos vienen desde la API propia hecha con Express.
//
// Backend local:
// http://localhost:3000
//
// Backend deployado:
// https://equipo-futbol-backend-cxj3nccnt-tomassanchez2018-9032s-projects.vercel.app/
//
// La URL base se configura con VITE_API_URL en el archivo .env del frontend.

const API_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para validar que exista la variable de entorno.
// Si VITE_API_URL no está configurada, evitamos hacer fetch a "undefined/api/...".
const getApiUrl = () => {
    if (!API_URL) {
        throw new Error("VITE_API_URL no está configurada en el frontend");
    }

    return API_URL;
};

// Función auxiliar para procesar respuestas del backend.
//
// response.ok es true cuando el status está entre 200 y 299.
// Si la API responde 400, 404 o 500, response.ok será false.
const handleResponse = async (response, defaultErrorMessage) => {
    // Si el backend responde 404, lo usamos para que Details.jsx pueda mostrar
    // la pantalla de equipo no encontrado.
    if (response.status === 404) {
        throw new Error("TEAM_NOT_FOUND");
    }

    // Si hay otro error HTTP, intentamos leer el JSON del backend.
    if (!response.ok) {
        let errorData = null;

        try {
            errorData = await response.json();
        } catch (error) {
            errorData = null;
        }

        throw new Error(errorData?.error || defaultErrorMessage);
    }

    return await response.json();
};

// GET /api/equipos
// Trae equipos desde el backend con paginado.
//
// page = página solicitada.
// limit = cantidad de equipos por página.
export const getTeams = async (page = 1, limit = 8) => {
    const baseUrl = getApiUrl();

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    const response = await fetch(`${baseUrl}/api/equipos?${params.toString()}`);

    return await handleResponse(response, "Error al obtener los equipos");
};

// GET /api/equipos?search=boca
// Busca equipos por nombre usando el query param search del backend.
//
// search = texto que escribe el usuario.
// page y limit mantienen el scroll infinito funcionando.
export const searchTeams = async (search = "", page = 1, limit = 8) => {
    const baseUrl = getApiUrl();

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim() !== "") {
        params.append("search", search.trim());
    }

    const response = await fetch(`${baseUrl}/api/equipos?${params.toString()}`);

    return await handleResponse(response, "Error al buscar equipos");
};

// GET /api/equipos/:id
// Trae el detalle de un equipo por id.
//
// Este método lo usa Details.jsx.
export const getTeamById = async (id) => {
    const baseUrl = getApiUrl();

    const response = await fetch(`${baseUrl}/api/equipos/${id}`);

    return await handleResponse(response, "Error al obtener el equipo");
};