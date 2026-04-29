import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/equipos/:id" element={<Details />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
import { useEffect, useState } from "react";
import { getTeams } from "./services/teamsService";
import { getPlayers } from "./services/playersService";
import { getLocalStorage, setLocalStorage } from "./services/localStorage";

function App() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
      setLocalStorage("teams", data);
    } catch (error) {
      console.error( error);
    }
  };
  useEffect(() => {
    const Teams = getLocalStorage("teams");
    if (Teams) {
      setTeams(Teams);
    } else {
      fetchTeams();
    }
  }, []);
  
  const fetchPlayers = async (teamId) => {
    try {
      const data = await getPlayers(teamId);
      setPlayers(data);
      setLocalStorage(`players_${teamId}`, data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedTeam) return;

    const key = `players_${selectedTeam.id}`;
    const storedPlayers = getLocalStorage(key);

    if (storedPlayers) {
      setPlayers(storedPlayers);
    } else {
      fetchPlayers(selectedTeam.id);
    }
  }, [selectedTeam]);

  
  return (
    <div>
      <h1>Equipos</h1>
      <section className="flex flex-wrap gap-4">
        {teams.map((team) => (
          <div className="w-40 border p-2 bg-sky-300" key={team.team.id} onClick={() => setSelectedTeam(team.team)} style={{ cursor: "pointer" }}>
            {team.team.name} 
            <img src={team.team.logo} width="50" />
            <div>
              <p>{team.venue.name}</p>
              <img src={team.venue.image} width="50" />
            </div>
          </div>
        ))}
      </section>

      {selectedTeam && (
        <div>
          <h1>Jugadores de {selectedTeam.name}</h1>
          <ul>
            {players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;