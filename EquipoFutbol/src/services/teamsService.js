const BASE_URL = "https://69f3549dbd2396bf530fccd6.mockapi.io/api/v1";

const normalizeTeams = (teams) => {
    return teams.map((team, index) => ({
        ...team,
        id: team.id || String(index + 1),
    }));
};

export const getTeams = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/equipos?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error("GET_TEAMS_ERROR");
    }

    const data = await response.json();

    return normalizeTeams(data);
};

export const getTeamById = async (id) => {
    const response = await fetch(`${BASE_URL}/equipos`);

    if (!response.ok) {
        throw new Error("GET_TEAMS_ERROR");
    }

    const data = await response.json();
    const teams = normalizeTeams(data);

    const team = teams.find((team) => team.id === String(id));

    if (!team) {
        throw new Error("TEAM_NOT_FOUND");
    }

    return team;
};

export const searchTeams = async (searchValue = "", page = 1, limit = 8) => {
    const response = await fetch(
        `${BASE_URL}/equipos?name=${searchValue}&page=${page}&limit=${limit}`
    );
    if (response.status === 404) {
        return []; // 👈 esto evita que caiga en catch
    }
    if (!response.ok) {
        throw new Error("SEARCH_TEAMS_ERROR");
    }
    

    const data = await response.json();

    return normalizeTeams(data);
};