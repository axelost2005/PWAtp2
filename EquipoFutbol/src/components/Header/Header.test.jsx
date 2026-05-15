// Importamos las funciones principales de Vitest
// describe: agrupa tests relacionados
// it: define un test puntual
// expect: permite hacer validaciones
// vi: permite crear mocks, o sea simulaciones de dependencias externas
import { describe, it, expect, vi } from "vitest";

// Importamos render y screen desde React Testing Library
// render: dibuja el componente en un entorno de prueba
// screen: permite buscar elementos como los vería el usuario
import { render, screen } from "@testing-library/react";

// Importamos MemoryRouter porque Header usa Link y NavLink
// Los links de React Router necesitan estar dentro de un Router para funcionar en tests
import { MemoryRouter } from "react-router-dom";

// Importamos el componente que vamos a testear
import Header from "./Header";

// Mockeamos react-i18next para no depender de la configuración real de idiomas
// En este test no queremos probar i18next, queremos probar que Header muestra bien su contenido
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        // Simulamos la función t() que usa Header para traducir textos
        t: (key) => {
            // Creamos un objeto con las traducciones que necesita este componente
            const translations = {
                "app.name": "EquipoFútbol",
                "navbar.home": "Inicio",
                "navbar.favorites": "Favoritos",
            };

            // Si existe la traducción, la devuelve
            // Si no existe, devuelve la key original
            return translations[key] || key;
        },
    }),
}));

// Mockeamos el LanguageSelector
// Esto significa que no testeamos su lógica interna acá
// Solo verificamos que Header lo renderiza
vi.mock("../LanguageSelector/LanguageSelector", () => ({
    default: () => <div>Selector de idioma</div>,
}));

// Agrupamos todos los tests relacionados al componente Header
describe("Header", () => {
    // Primer test: valida que se vea la navegación principal
    it("muestra el nombre de la app, la navegación principal y el selector de idioma", () => {
        // Renderizamos el Header dentro de MemoryRouter
        // Esto es necesario porque Header usa Link y NavLink
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        // Validamos que se muestre el nombre de la app
        expect(screen.getByText("EquipoFútbol")).toBeInTheDocument();

        // Validamos que el logo/nombre de la app sea un link
        expect(screen.getByRole("link", { name: /EquipoFútbol/i })).toBeInTheDocument();

        // Validamos que exista el link de Inicio
        expect(screen.getByRole("link", { name: /Inicio/i })).toBeInTheDocument();

        // Validamos que exista el link de Favoritos
        expect(screen.getByRole("link", { name: /Favoritos/i })).toBeInTheDocument();

        // Validamos que el selector de idioma esté presente en el Header
        expect(screen.getByText("Selector de idioma")).toBeInTheDocument();
    });

    // Segundo test: valida específicamente que el link de favoritos apunte a /favoritos
    it("tiene un link a la página de favoritos", () => {
        // Renderizamos nuevamente el Header
        // Cada test debe ser independiente del anterior
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        // Buscamos el link de Favoritos por su rol accesible
        const favoritesLink = screen.getByRole("link", { name: /Favoritos/i });

        // Validamos que el atributo href sea /favoritos
        expect(favoritesLink).toHaveAttribute("href", "/favoritos");
    });
});