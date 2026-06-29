// SERVICIO DE AUTENTICACION
// Centraliza las llamadas del frontend a los endpoints de auth del backend:
// POST /api/auth/register, POST /api/auth/login y GET /api/auth/me.
//
// La URL base se configura con VITE_API_URL en el .env del frontend.

const API_URL = import.meta.env.VITE_API_URL;

// Valida que exista la variable de entorno antes de hacer fetch.
const getApiUrl = () => {
    if (!API_URL) {
        throw new Error("VITE_API_URL no está configurada en el frontend");
    }

    return API_URL;
};

// Procesa la respuesta del backend de auth.
//
// Si la respuesta no es ok, lanza un Error con el mensaje del backend
// y le adjunta:
// - status: el código HTTP (400, 401, 409, ...)
// - details: errores de validación por campo ([{ field, message }]) si los hay.
// Así las pantallas pueden distinguir error general de error por campo.
const handleResponse = async (response) => {
    let data = null;

    try {
        data = await response.json();
    } catch {
        // El body puede venir vacío o no ser JSON: dejamos data en null.
    }

    if (!response.ok) {
        const error = new Error(data?.error || "Error inesperado del servidor");
        error.status = response.status;
        error.details = data?.details || [];
        throw error;
    }

    return data;
};

// POST /api/auth/register
// Crea un usuario nuevo. Devuelve el usuario creado (sin token).
export const register = async ({ name, email, password }) => {
    const baseUrl = getApiUrl();

    const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    return await handleResponse(response);
};

// POST /api/auth/login
// Valida credenciales. Devuelve { token, user: { id, name, email } }.
export const login = async ({ email, password }) => {
    const baseUrl = getApiUrl();

    const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return await handleResponse(response);
};

// GET /api/auth/me
// Ruta protegida: envía el token en el header Authorization.
// Sirve para rehidratar el usuario al recargar la página.
export const getMe = async (token) => {
    const baseUrl = getApiUrl();

    const response = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await handleResponse(response);
};
