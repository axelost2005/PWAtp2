const BASE_URL = import.meta.env.VITE_API_URL;

export const getTeams = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/equipos?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error("GET_TEAMS_ERROR");
    }

    const data = await response.json();

    return data;
};

export const getTeamById = async (id) => {
    const response = await fetch(`${BASE_URL}/equipos/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("TEAM_NOT_FOUND");
        }
        throw new Error("GET_TEAM_ERROR");
    }

    return await response.json();
};

export const searchTeams = async (searchValue, page = 1, limit = 8) => {
    const cleanSearchValue = encodeURIComponent(searchValue.trim());

    const response = await fetch(
        `${BASE_URL}/equipos?search=${cleanSearchValue}&page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("SEARCH_TEAMS_ERROR");
    }

    const data = await response.json();

    return data;
};