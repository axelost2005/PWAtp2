const FAVORITES_KEY = "favoriteTeams";

export const getFavoriteTeams =  ({ search = "" } = {}) =>  {
    const response = localStorage.getItem(FAVORITES_KEY);

    if (!response) {
        return [];
    }

    const favorites = JSON.parse(response);

    if (!search) {
        return favorites;
    }

    return favorites.filter(team =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );
};

export const saveFavoriteTeams = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavoriteTeam = (teamId) => {
    const favorites = getFavoriteTeams();

    return favorites.some((team) => String(team.id) === String(teamId));
};

export const addFavoriteTeam = (team) => {
    const favorites = getFavoriteTeams();

    const alreadyExists = favorites.some(
        (favoriteTeam) => String(favoriteTeam.id) === String(team.id)
    );

    if (alreadyExists) {
        return favorites;
    }

    const updatedFavorites = [...favorites, team];

    saveFavoriteTeams(updatedFavorites);

    return updatedFavorites;
};

export const removeFavoriteTeam = (teamId) => {
    const favorites = getFavoriteTeams();

    const updatedFavorites = favorites.filter(
        (team) => String(team.id) !== String(teamId)
    );

    saveFavoriteTeams(updatedFavorites);

    return updatedFavorites;
};

export const toggleFavoriteTeam = (team) => {
    if (isFavoriteTeam(team.id)) {
        return removeFavoriteTeam(team.id);
    }

    return addFavoriteTeam(team);
};