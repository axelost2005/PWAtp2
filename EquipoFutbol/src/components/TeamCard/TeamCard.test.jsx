import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TeamCard from "./TeamCard";
import { beforeEach, describe, it, expect, vi } from "vitest";
import i18n from "../../i18n";

// Mockeamos los contexts de auth y favoritos para aislar la card.
// Con sesión iniciada, la card muestra el botón de favorito.
const mockIsFavorite = vi.fn();

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => ({ isAuthenticated: true }),
}));

vi.mock("../../context/FavoritesContext", () => ({
    useFavorites: () => ({
        isFavorite: mockIsFavorite,
        toggleFavorite: vi.fn(),
    }),
}));

beforeEach(() => {
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

describe("teamCard", () => {
    it("muestra el boton para agregar a favoritos", () => {
        mockIsFavorite.mockReturnValue(false);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam} />
            </MemoryRouter>
        );

        expect(screen.getByRole("button", { name: "Agregar a favoritos" })).toBeInTheDocument();
        expect(screen.getByText("♡")).toBeInTheDocument();
    });

    it("muestra el boton para quitar de favoritos", () => {
        mockIsFavorite.mockReturnValue(true);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam} />
            </MemoryRouter>
        );

        expect(screen.getByRole("button", { name: "Quitar de favoritos" })).toBeInTheDocument();
        expect(screen.getByText("♥")).toBeInTheDocument();
    });

    it("muestra el logo del equipo", () => {
        mockIsFavorite.mockReturnValue(false);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam} />
            </MemoryRouter>
        );
        const image = screen.getByRole("img", {
            name: "Escudo de Boca Juniors",
        });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockTeam.logo);
    });

    it("muestra datos del equipo", () => {
        mockIsFavorite.mockReturnValue(false);
        render(
            <MemoryRouter>
                <TeamCard team={mockTeam} />
            </MemoryRouter>
        );
        expect(screen.getByText("Boca Juniors")).toBeInTheDocument();
        expect(screen.getByText("Primera División")).toBeInTheDocument();
        expect(screen.getByText("Club argentino muy popular.")).toBeInTheDocument();
        expect(screen.getByText("Liga Profesional")).toBeInTheDocument();
        expect(screen.getByText("La Bombonera")).toBeInTheDocument();
        expect(screen.getByText("74")).toBeInTheDocument();
    });
});
