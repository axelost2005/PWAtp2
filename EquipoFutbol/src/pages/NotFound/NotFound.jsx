import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-6 text-slate-700">
                La página que estás buscando no existe.
            </p>

            <Link
                to="/"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
                Volver al inicio
            </Link>
        </section>
    );
}

export default NotFound;