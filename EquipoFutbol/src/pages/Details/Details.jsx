import { useParams } from "react-router-dom";

function Details() {
    const { id } = useParams();

    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">Detalle del equipo</h1>
            <p className="text-slate-700">
                Mostrando información del equipo con ID: {id}
            </p>
        </section>
    );
}

export default Details;