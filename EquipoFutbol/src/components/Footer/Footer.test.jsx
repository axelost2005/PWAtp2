// Importamos las funciones principales de Vitest
// describe: agrupa tests relacionados
// it: define un test puntual
// expect: permite hacer validaciones
// vi: permite crear mocks o simulaciones
import { describe, it, expect, vi } from "vitest";

// Importamos herramientas de React Testing Library
// render: renderiza el componente en el test
// screen: permite buscar elementos como los vería el usuario
import { render, screen } from "@testing-library/react";

// Importamos el componente Footer que vamos a testear
import Footer from "./Footer";

// Mockeamos react-i18next porque Footer usa useTranslation()
// No queremos testear la librería de idiomas acá
// Solo queremos comprobar que Footer renderiza correctamente su contenido
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        // Simulamos la función t() que traduce las claves del Footer
        t: (key) => {
            // Creamos las traducciones mínimas que necesita este test
            const translations = {
                "app.name": "EquipoFútbol",
                "footer.description": "Aplicación para explorar equipos de fútbol.",
                "footer.contact": "Contacto",
                "footer.email": "Email",
                "footer.phone": "Teléfono",
                "footer.address": "Dirección",
                "footer.socialMedia": "Redes sociales",
                "footer.rights": "Todos los derechos reservados",
            };

            // Si existe una traducción para esa key, la devuelve
            // Si no existe, devuelve la key original
            return translations[key] || key;
        },
    }),
}));

// Agrupamos los tests relacionados al componente Footer
describe("Footer", () => {
    // Primer test: valida que se muestre la información general del footer
    it("muestra el nombre de la app, la descripción y los derechos", () => {
        // Renderizamos el componente Footer
        render(<Footer />);

        // Validamos que exista el footer como región de contenido informativo
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();

        // Validamos que se muestre el nombre de la aplicación
        expect(screen.getByText("EquipoFútbol")).toBeInTheDocument();

        // Validamos que se muestre la descripción del footer
        expect(screen.getByText("Aplicación para explorar equipos de fútbol.")).toBeInTheDocument();

        // Validamos que se muestre el texto de derechos
        expect(screen.getByText("Todos los derechos reservados")).toBeInTheDocument();
    });

    // Segundo test: valida que se muestre la información de contacto
    it("muestra los datos de contacto de la aplicación", () => {
        // Renderizamos el componente Footer
        render(<Footer />);

        // Validamos que se muestre el título de contacto
        expect(screen.getByText("Contacto")).toBeInTheDocument();

        // Validamos que se muestre el email
        expect(screen.getByText(/contacto@equipofutbol.com/i)).toBeInTheDocument();

        // Validamos que se muestre el teléfono
        expect(screen.getByText(/\+54 299 123 4567/i)).toBeInTheDocument();

        // Validamos que se muestre la dirección
        expect(screen.getByText(/Av. Fútbol 123, Argentina/i)).toBeInTheDocument();
    });

    // Tercer test: valida que se muestren las redes sociales
    it("muestra las redes sociales de la aplicación", () => {
        // Renderizamos el componente Footer
        render(<Footer />);

        // Validamos que se muestre el título de redes sociales
        expect(screen.getByText("Redes sociales")).toBeInTheDocument();

        // Validamos que se muestre Instagram
        expect(screen.getByText(/Instagram: @equipofutbol/i)).toBeInTheDocument();

        // Validamos que se muestre X/Twitter
        expect(screen.getByText(/X\/Twitter: @equipofutbol_app/i)).toBeInTheDocument();

        // Validamos que se muestre Facebook
        expect(screen.getByText(/Facebook: EquipoFútbol App/i)).toBeInTheDocument();
    });
});