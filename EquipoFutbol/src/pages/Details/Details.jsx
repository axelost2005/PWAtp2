import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTeamById } from "../../services/teamsService";
import { getTranslatedTeam } from "../../utils/teamTranslations";

function Details() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0];
    const translatedTeam = team ? getTranslatedTeam(team, currentLanguage) : null;

    useEffect(() => {
        const loadTeam = async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await getTeamById(id);
                setTeam(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadTeam();
    }, [id]);

    if (loading) {
        return (
            <section>
                <p className="rounded-xl bg-white p-4 text-slate-700 shadow">
                    {t("details.loading")}
                </p>
            </section>
        );
    }

    if (error || !translatedTeam) {
        return (
            <section className="rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    {t("details.notFoundTitle")}
                </h1>

                <p className="mb-6 text-slate-700">
                    {t("details.notFoundDescription")}
                </p>

                <Link
                    to="/"
                    className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    {t("common.backHome")}
                </Link>
            </section>
        );
    }

    return (
        <section className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <div className="flex h-72 items-center justify-center bg-slate-100 p-6">
                    <img
                        src={translatedTeam.logo}
                        alt={t("teamCard.logoAlt", { teamName: translatedTeam.name })}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold text-slate-950">
                        {translatedTeam.name}
                    </h1>

                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        {translatedTeam.category}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-bold text-slate-950">
                    {t("details.title")}
                </h2>

                <p className="mb-6 leading-relaxed text-slate-700">
                    {translatedTeam.description}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.country")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.country}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.league")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.league}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.stadium")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.stadium}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.founded")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.founded}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("details.coach")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.coach}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4">
                        <p className="text-sm text-slate-500">
                            {t("teamCard.titles")}
                        </p>
                        <p className="font-semibold text-slate-900">
                            {translatedTeam.titles}
                        </p>
                    </div>
                </div>

                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-700"
                >
                    {t("common.backHome")}
                </Link>
            </div>
        </section>
    );
}

export default Details;