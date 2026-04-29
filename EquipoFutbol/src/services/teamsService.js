import { Api } from "./api";

export const getTeams = async (league = 128, season = 2024) => {
    const data = await Api(`/teams?league=${league}&season=${season}`);
    return data.response || [];
};