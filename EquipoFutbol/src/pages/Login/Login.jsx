import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Ruta a la que volver tras loguearse (la guarda ProtectedRoute).
    // Si entró directo al login, vuelve al inicio.
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login(email.trim(), password);
            navigate(from, { replace: true });
        } catch (err) {
            // El backend responde 401 con credenciales incorrectas
            // o 400 si falta algún campo.
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const inputClassName =
        "mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-white/30 focus:bg-white/10";

    return (
        <section className="mx-auto w-full max-w-md px-4 py-12">
            <h1 className="mb-6 font-display text-3xl uppercase tracking-wide text-white">
                {t("auth.login.title")}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
                {error && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <label className="block text-sm font-medium text-slate-300">
                    {t("auth.fields.email")}
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoComplete="email"
                        className={inputClassName}
                    />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                    {t("auth.fields.password")}
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                        className={inputClassName}
                    />
                </label>

                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? t("auth.login.submitting") : t("auth.login.submit")}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                {t("auth.login.noAccount")}{" "}
                <Link to="/registro" className="font-semibold text-white underline">
                    {t("auth.login.registerLink")}
                </Link>
            </p>
        </section>
    );
}

export default Login;
