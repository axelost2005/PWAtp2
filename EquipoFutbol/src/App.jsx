import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";

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
      <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/equipos/:id" element={<Details />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;