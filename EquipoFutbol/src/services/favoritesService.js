// SERVICIO DE FAVORITOS
// Centraliza las llamadas del frontend a los endpoints protegidos de favoritos.
// Todas requieren el token JWT en el header Authorization: Bearer <token>.
//
// Endpoints del backend:
// GET    /api/favorites          -> lista los favoritos del usuario (con el equipo completo)
// POST   /api/favorites          -> body { teamId } agrega un favorito
// DELETE /api/favorites/:teamId  -> quita un favorito

const API_URL = import.meta.env.VITE_API_URL;

const getApiUrl = () => {
    if (!API_URL) {
        throw new Error("VITE_API_URL no está configurada en el frontend");
    }

    return API_URL;
};

// Procesa la respuesta. Ante error, lanza un Error con el mensaje del backend
// y le adjunta el status HTTP (401, 403, 404, 409, ...) para que el context
// pueda decidir cómo manejar cada caso.
const handleResponse = async (response) => {
    let data = null;

    try {
        data = await response.json();
    } catch {
        // Algunas respuestas (o errores) pueden no traer body JSON.
    }

    if (!response.ok) {
        const error = new Error(data?.error || "Error inesperado del servidor");
        error.status = response.status;
        throw error;
    }

    return data;
};

// GET /api/favorites -> array de { id, userId, teamId, createdAt, team: {...} }
export const getFavorites = async (token) => {
    const response = await fetch(`${getApiUrl()}/api/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await handleResponse(response);
};

// POST /api/favorites -> agrega el equipo a favoritos. Devuelve el favorito con el equipo.
export const addFavorite = async (token, teamId) => {
    const response = await fetch(`${getApiUrl()}/api/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamId }),
    });

    return await handleResponse(response);
};

// DELETE /api/favorites/:teamId -> quita el equipo de favoritos.
export const removeFavorite = async (token, teamId) => {
    const response = await fetch(`${getApiUrl()}/api/favorites/${teamId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await handleResponse(response);
};
