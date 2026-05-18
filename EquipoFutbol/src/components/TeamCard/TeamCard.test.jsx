import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TeamCard from "./TeamCard";
import { beforeEach, describe, it } from "vitest";
import { isFavoriteTeam} from "../../services/localStorage";
import i18n from "../../i18n";

beforeEach(() =>{
    i18n.changeLanguage("es");
});
const mockTeam = {
    id: "1",
    name: "Boca Juniors",
    category: "Primera División",
    shortDescription: "Club argentino muy popular.",
    logo: "https://example.com/logo.png",
    league: "Liga Profesional",
    stadium: "La Bombonera",
    titles: 74,
};
vi.mock("../../services/localStorage", () => ({
    isFavoriteTeam: vi.fn(),
    toggleFavoriteTeam: vi.fn(),
}));

describe("teamCard", ()=>{
    it("muestra el boton para agregar a favoritos", () => {
        isFavoriteTeam.mockReturnValue(false);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam}/>
            </MemoryRouter>
        );

        expect(screen.getByRole("button", {name: "Agregar a favoritos",})).toBeInTheDocument();
        expect(screen.getByText("♡")).toBeInTheDocument();
    });
    it("muestra el boton para quitar de favoritos", () => {
        isFavoriteTeam.mockReturnValue(true);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam}/>
            </MemoryRouter>
        );

        expect(screen.getByRole("button", {name: "Quitar de favoritos",})).toBeInTheDocument();
        expect(screen.getByText("♥")).toBeInTheDocument();
    });
    it("muestra el logo del equipo",()=>{
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam}/>
            </MemoryRouter>
        );
        const image = screen.getByRole("img", {
            name: "Escudo de Boca Juniors",
        });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockTeam.logo);
    })
    it("muestra datos del equipo",() =>{
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam}/>
            </MemoryRouter>
        );
        expect(screen.getByText("Boca Juniors")).toBeInTheDocument();
        expect(screen.getByText("Primera División")).toBeInTheDocument();
        expect(screen.getByText("Club argentino muy popular.")).toBeInTheDocument();
        expect(screen.getByText("Liga Profesional")).toBeInTheDocument();
        expect(screen.getByText("La Bombonera")).toBeInTheDocument();
        expect(screen.getByText("74")).toBeInTheDocument();
    })
    
})