// URL base del backend.
// En desarrollo puede ser http://localhost:3000.
// En producción puede ser https://equipofutbol-backend.vercel.app.
const API_URL = import.meta.env.VITE_API_URL;

// GET /api/equipos
// Trae el listado de equipos desde el backend.
export const getTeams = async () => {
    const response = await fetch(`${API_URL}/api/equipos`);

    if (!response.ok) {
        throw new Error("Error al obtener los equipos");
    }

    return await response.json();
};

// GET /api/equipos/:id
// Trae el detalle de un equipo por id.
export const getTeamById = async (id) => {
    const response = await fetch(`${API_URL}/api/equipos/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el equipo");
    }

    return await response.json();
};

// POST /api/equipos
// Crea un equipo nuevo en el backend.
export const createTeam = async (teamData) => {
    const response = await fetch(`${API_URL}/api/equipos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
    });

    if (!response.ok) {
        throw new Error("Error al crear el equipo");
    }

    return await response.json();
};

// PUT /api/equipos/:id
// Actualiza un equipo existente.
export const updateTeam = async (id, teamData) => {
    const response = await fetch(`${API_URL}/api/equipos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el equipo");
    }

    return await response.json();
};

// DELETE /api/equipos/:id
// Elimina un equipo existente.
export const deleteTeam = async (id) => {
    const response = await fetch(`${API_URL}/api/equipos/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el equipo");
    }

    return await response.json();
};