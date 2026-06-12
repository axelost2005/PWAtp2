// Importamos Outlet desde React Router.
// Outlet funciona como un “espacio reservado” donde se renderiza la página actual
// según la ruta: Home, Details, Favorites, etc.
import { Outlet } from "react-router-dom";

// Importamos los componentes fijos del layout.
// Header aparece arriba en todas las páginas.
// Footer aparece abajo en todas las páginas.
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
    return (
        // Contenedor principal de toda la aplicación.
        // flex + flex-col ordena la app en columna: Header, contenido y Footer.
        // min-h-screen asegura que ocupe al menos toda la altura de la pantalla.
        // bg-pitch-950 y text-slate-100 definen el tema oscuro general.
        <div className="flex min-h-screen flex-col bg-pitch-950 text-slate-100">
            <Header />

            {/*
                Contenido principal de la app.
                El main ocupa todo el ancho para permitir secciones full-bleed
                como el hero de la Home. Cada página define su propio
                contenedor centrado (max-w-6xl) cuando lo necesita.
            */}
            <main className="flex w-full flex-1 flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}


export default Layout;
