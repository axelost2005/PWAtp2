// RUTA PROTEGIDA
// Envuelve las rutas privadas. Si no hay sesión activa, redirige al login
// recordando a dónde quería ir el usuario (location), para volver ahí
// después de iniciar sesión.

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Mientras validamos el token contra /api/auth/me no decidimos todavía,
    // para no redirigir al login por error en el primer render.
    if (loading) {
        return null;
    }

    // Sin sesión: al login, guardando la ruta de origen en el state.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Con sesión: renderiza la ruta hija.
    return <Outlet />;
}

export default ProtectedRoute;
