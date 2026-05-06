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
            className="rounded-md bg-slate-800 px-3 py-2 text-sm text-white outline-none transition hover:bg-slate-700"
        >
            <option value="es">ES</option>
            <option value="en">EN</option>
        </select>
    );
}

export default LanguageSelector;