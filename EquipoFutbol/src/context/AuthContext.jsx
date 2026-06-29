// CONTEXTO DE AUTENTICACION
// Expone, desde cualquier componente:
// - user: datos básicos del usuario autenticado (o null)
// - token: el JWT (o null)
// - isAuthenticated: si hay sesión activa
// - loading: si todavía estamos validando el token guardado
// - login(email, password) / logout()
//
// El token se persiste en localStorage. El usuario NO se persiste:
// se rehidrata desde GET /api/auth/me usando el token, así el estado
// siempre refleja lo que dice el backend.

import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, getMe } from "../services/authService";

// Clave bajo la que guardamos el JWT en localStorage.
const TOKEN_KEY = "token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Inicializamos el token desde localStorage para mantener la sesión
    // entre recargas de página.
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);

    // loading evita decidir las rutas privadas antes de validar el token.
    const [loading, setLoading] = useState(true);

    // Cada vez que cambia el token, rehidratamos el usuario desde /api/auth/me.
    // Si el token es inválido o expiró, cerramos la sesión.
    useEffect(() => {
        let active = true;

        const loadUser = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const profile = await getMe(token);

                if (active) {
                    setUser(profile);
                }
            } catch {
                if (active) {
                    localStorage.removeItem(TOKEN_KEY);
                    setToken(null);
                    setUser(null);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            active = false;
        };
    }, [token]);

    // Inicia sesión: pide el token, lo guarda y setea el usuario.
    const login = async (email, password) => {
        const data = await loginRequest({ email, password });

        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);

        return data.user;
    };

    // Cierra sesión: limpia token y usuario de localStorage y del estado.
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: Boolean(token),
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para consumir el contexto de auth desde cualquier componente.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return context;
}
