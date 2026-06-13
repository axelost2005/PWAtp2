import { useTranslation } from "react-i18next";

function LanguageSelector() {
    const { i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];

    const handleChangeLanguage = async (event) => {
        const selectedLanguage = event.target.value;

        await i18n.changeLanguage(selectedLanguage);

        localStorage.setItem("i18nextLng", selectedLanguage);
    };

    return (
        <select
            value={currentLanguage}
            onChange={handleChangeLanguage}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
        >
            <option value="es" className="text-slate-900">ES</option>
            <option value="en" className="text-slate-900">EN</option>
        </select>
    );
}

export default LanguageSelector;