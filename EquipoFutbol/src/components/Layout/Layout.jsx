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
        // bg-slate-100 y text-slate-900 definen colores generales con Tailwind.
        <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
            <Header />

            {/* 
                Contenido principal de la app.
                max-w-6xl limita el ancho para que no se estire demasiado en pantallas grandes.
                mx-auto centra el contenido.
                flex-1 hace que el main ocupe el espacio disponible entre Header y Footer.
                px-4 y py-8 agregan espaciado interno.
                Outlet renderiza la página que corresponda según la ruta actual.
            */}
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}


export default Layout;