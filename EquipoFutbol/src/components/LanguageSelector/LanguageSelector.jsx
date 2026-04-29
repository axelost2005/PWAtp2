import { useTranslation } from "react-i18next";

function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;

        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    };

    return (
        <select
            value={i18n.language}
            onChange={handleChangeLanguage}
            className="rounded-md bg-slate-800 px-3 py-2 text-sm text-white outline-none transition hover:bg-slate-700"
        >
            <option value="es">ES</option>
            <option value="en">EN</option>
        </select>
    );
}

export default LanguageSelector;