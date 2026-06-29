import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { register as registerRequest } from "../../services/authService";

// Mismas reglas que valida el backend, para avisar antes de enviar.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Validación en el cliente antes de pegarle al backend.
    const validate = () => {
        const errors = {};

        if (!form.name.trim()) {
            errors.name = t("auth.validation.nameRequired");
        }

        if (!emailPattern.test(form.email.trim())) {
            errors.email = t("auth.validation.emailInvalid");
        }

        if (form.password.length < MIN_PASSWORD_LENGTH) {
            errors.password = t("auth.validation.passwordMin", {
                min: MIN_PASSWORD_LENGTH,
            });
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setGeneralError("");

        const errors = validate();
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        setSubmitting(true);

        try {
            await registerRequest({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
            });

            // Registro OK: mostramos el mensaje de éxito y redirigimos al login.
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            // 400: el backend manda errores por campo en details.
            if (err.details && err.details.length > 0) {
                const backendErrors = {};

                err.details.forEach((detail) => {
                    backendErrors[detail.field] = detail.message;
                });

                setFieldErrors(backendErrors);
            } else {
                // 409 u otros: mensaje general (email o nombre ya en uso).
                setGeneralError(err.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const inputClassName =
        "mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-white/30 focus:bg-white/10";

    return (
        <section className="mx-auto w-full max-w-md px-4 py-12">
            <h1 className="mb-6 font-display text-3xl uppercase tracking-wide text-white">
                {t("auth.register.title")}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
                {success && (
                    <p className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
                        {t("auth.register.success")}
                    </p>
                )}

                {generalError && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                        {generalError}
                    </p>
                )}

                <label className="block text-sm font-medium text-slate-300">
                    {t("auth.fields.name")}
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className={inputClassName}
                    />
                    {fieldErrors.name && (
                        <span className="mt-1 block text-sm text-red-400">
                            {fieldErrors.name}
                        </span>
                    )}
                </label>

                <label className="block text-sm font-medium text-slate-300">
                    {t("auth.fields.email")}
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className={inputClassName}
                    />
                    {fieldErrors.email && (
                        <span className="mt-1 block text-sm text-red-400">
                            {fieldErrors.email}
                        </span>
                    )}
                </label>

                <label className="block text-sm font-medium text-slate-300">
                    {t("auth.fields.password")}
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className={inputClassName}
                    />
                    {fieldErrors.password && (
                        <span className="mt-1 block text-sm text-red-400">
                            {fieldErrors.password}
                        </span>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={submitting || success}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting
                        ? t("auth.register.submitting")
                        : t("auth.register.submit")}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                {t("auth.register.haveAccount")}{" "}
                <Link to="/login" className="font-semibold text-white underline">
                    {t("auth.register.loginLink")}
                </Link>
            </p>
        </section>
    );
}

export default Register;
