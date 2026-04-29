import { getLocalStorage } from "../../services/localStorage";

function Home() {
    const teams = getLocalStorage("teams");
    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">Equipos de fútbol</h1>
            <p className="text-slate-700">
                Página principal donde se mostrará el listado de equipos.
            </p>
            <div className="flex flex-wrap gap-4">
                {teams.map((team) => (
                <div key={team.team.id} className="w-40 border p-2 bg-mist-700 text-white"  >
                    {team.team.name}
                    <img src={team.team.logo} width="50"/>
                    <p>Estadio: {team.venue.name}</p>
                    <img src={team.venue.image} width="50"/>
                </div>))}
            </div>
        </section>
        
    );
}

export default Home;