// CONTEXTO DE FAVORITOS
// Mantiene en memoria la lista de equipos favoritos del usuario autenticado
// y la sincroniza con el backend. Los favoritos NO se guardan en localStorage:
// se cargan siempre desde GET /api/favorites y cada alta/baja pega a la API.
//
// Expone, desde cualquier componente:
// - favorites: array de equipos (objeto team completo)
// - loading / error
// - isFavorite(teamId), toggleFavorite(team), addFavorite(team), removeFavorite(teamId)

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getFavorites,
    addFavorite as addFavoriteRequest,
    removeFavorite as removeFavoriteRequest,
} from "../services/favoritesService";

const FavoritesContext = createContext(null);

// Traduce el status HTTP a una clave de i18n para mostrar el mensaje apropiado.
const errorKeyFromStatus = (status) => {
    switch (status) {
        case 401:
            return "favorites.errors.unauthorized";
        case 403:
            return "favorites.errors.forbidden";
        case 404:
            return "favorites.errors.notFound";
        case 409:
            return "favorites.errors.alreadyAdded";
        default:
            return "favorites.errors.generic";
    }
};

export function FavoritesProvider({ children }) {
    const { token, isAuthenticated, logout } = useAuth();

    // Lista de equipos favoritos (el equipo completo que devuelve la API).
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // error guarda una clave de i18n (string) o "" si no hay error.
    const [error, setError] = useState("");

    const hasTeam = (list, teamId) =>
        list.some((team) => String(team.id) === String(teamId));

    // Carga los favoritos del backend cuando hay sesión.
    // Si no hay sesión (o se cierra), vacía la lista.
    useEffect(() => {
        let active = true;

        const load = async () => {
            if (!isAuthenticated) {
                setFavorites([]);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const data = await getFavorites(token);

                if (active) {
                    // El backend devuelve [{ ..., team: {...} }], nos quedamos con el equipo.
                    setFavorites(data.map((favorite) => favorite.team));
                }
            } catch (err) {
                if (!active) return;

                if (err.status === 401) {
                    logout();
                } else {
                    setError(errorKeyFromStatus(err.status));
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [token, isAuthenticated, logout]);

    const isFavorite = useCallback(
        (teamId) => hasTeam(favorites, teamId),
        [favorites]
    );

    const addFavorite = async (team) => {
        setError("");

        try {
            const created = await addFavoriteRequest(token, team.id);
            const addedTeam = created?.team || team;

            setFavorites((prev) =>
                hasTeam(prev, team.id) ? prev : [addedTeam, ...prev]
            );
        } catch (err) {
            // 409 = ya estaba en favoritos: lo dejamos marcado igual (idempotente).
            if (err.status === 409) {
                setFavorites((prev) =>
                    hasTeam(prev, team.id) ? prev : [team, ...prev]
                );

                return;
            }

            if (err.status === 401) {
                logout();
                return;
            }

            setError(errorKeyFromStatus(err.status));
        }
    };

    const removeFavorite = async (teamId) => {
        setError("");

        try {
            await removeFavoriteRequest(token, teamId);

            setFavorites((prev) =>
                prev.filter((team) => String(team.id) !== String(teamId))
            );
        } catch (err) {
            // 404 = no estaba en favoritos: sincronizamos quitándolo igual (idempotente).
            if (err.status === 404) {
                setFavorites((prev) =>
                    prev.filter((team) => String(team.id) !== String(teamId))
                );

                return;
            }

            if (err.status === 401) {
                logout();
                return;
            }

            setError(errorKeyFromStatus(err.status));
        }
    };

    const toggleFavorite = (team) => {
        if (isFavorite(team.id)) {
            return removeFavorite(team.id);
        }

        return addFavorite(team);
    };

    const value = {
        favorites,
        loading,
        error,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
    }

    return context;
}
