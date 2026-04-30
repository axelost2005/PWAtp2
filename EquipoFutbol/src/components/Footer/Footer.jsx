import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="mt-auto bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm md:grid-cols-3">
                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">
                        {t("app.name")}
                    </h3>

                    <p className="leading-relaxed">
                        {t("footer.description")}
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">
                        {t("footer.contact")}
                    </h3>

                    <p>{t("footer.email")}: contacto@equipofutbol.com</p>
                    <p>{t("footer.phone")}: +54 299 123 4567</p>
                    <p>{t("footer.address")}: Av. Fútbol 123, Argentina</p>
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">
                        {t("footer.socialMedia")}
                    </h3>

                    <p>Instagram: @equipofutbol</p>
                    <p>X/Twitter: @equipofutbol_app</p>
                    <p>Facebook: EquipoFútbol App</p>
                </div>
            </div>

            <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
                {t("footer.rights")}
            </div>
        </footer>
    );
}

export default Footer;