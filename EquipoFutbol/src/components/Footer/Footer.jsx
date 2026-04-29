function Footer() {
    return (
        <footer className="mt-auto bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm md:grid-cols-3">
                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">EquipoFútbol</h3>
                    <p className="leading-relaxed">
                        Plataforma ficticia para explorar equipos de fútbol, conocer sus datos
                        principales y guardar favoritos.
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">Contacto</h3>
                    <p>Email: contacto@equipofutbol.com</p>
                    <p>Teléfono: +54 299 123 4567</p>
                    <p>Dirección: Av. Fútbol 123, Argentina</p>
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">Redes sociales</h3>
                    <p>Instagram: @equipofutbol</p>
                    <p>X/Twitter: @equipofutbol_app</p>
                    <p>Facebook: EquipoFútbol App</p>
                </div>
            </div>

            <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
                © 2026 EquipoFútbol. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;