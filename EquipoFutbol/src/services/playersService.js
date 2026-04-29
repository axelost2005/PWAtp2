import { Api } from "./api";

export const getPlayers = async (teamId) => {
    const data = await Api(`/players/squads?team=${teamId}`);
    return data.response[0]?.players || [];
};