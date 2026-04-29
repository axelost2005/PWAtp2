const BASE_URL = "https://v3.football.api-sports.io";

export const headers = {
  "x-rapidapi-key": import.meta.env.VITE_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_API_HOST
};

export const Api = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  const data = await res.json();
  return data;
};