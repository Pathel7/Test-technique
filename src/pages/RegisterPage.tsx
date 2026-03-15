import React, { useState } from "react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  User,
  UserPlus,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/authStore";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false);

  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    passwordConfirm.trim() !== "" &&
    password === passwordConfirm;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    if (!isFormValid) {
      toast.error("Veuillez remplir tous les champs correctement");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      toast.error("Erreur lors de la création du compte");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50";
  const buttonClass =
    "flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(79,70,229,0.45)] transition hover:brightness-110 disabled:brightness-90 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="relative isolate mx-auto flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-[38px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.75)] backdrop-blur-3xl lg:flex-row">
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-sky-500/10"></span>
        <div className="pointer-events-none absolute -right-24 top-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-[80px]"></div>
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]"></div>

        <div className="relative z-10 flex flex-1 flex-col gap-5 px-6 py-8 text-white md:px-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Rejoignez la communauté
          </p>
          <h1 className="text-3xl font-black leading-tight text-white">
            Créez un compte et lancez vos invitations.
          </h1>
          <p className="text-sm text-white/70">
            Un espace sécurisé pour gérer vos listes, vos invités et vos
            chronologies d’événements.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Confidentialité
            </span>
            <span className="rounded-2xl border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Notifications
            </span>
          </div>
        </div>

        <div className="relative z-10 flex-1 space-y-6 px-6 py-8 text-white md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/40">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase text-white/60">Inscription</p>
              <h2 className="text-2xl font-semibold text-white">
                Créez votre compte
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-white/80"
              >
                Nom complet
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom complet ..."
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-white/80"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ..."
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-white/80"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe ..."
                  className={`${inputClass} pr-12 pl-12`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white/90"
                  onClick={() => setShow((prev) => !prev)}
                  aria-label="Afficher ou masquer le mot de passe"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-semibold text-white/80"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  id="passwordConfirm"
                  type={showConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    if (passwordMismatch && e.target.value === password) {
                      setPasswordMismatch(false);
                    }
                  }}
                  placeholder="Confirmez le mot de passe ..."
                  className={`${inputClass} pr-12 pl-12`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white/90"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label="Afficher ou masquer la confirmation"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {passwordMismatch && (
              <div className="flex items-center gap-2 rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                <AlertCircle className="h-4 w-4 text-rose-200" />
                Les mots de passe doivent correspondre.
              </div>
            )}

            {error && (
              <p className="rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            )}

            <button type="submit" className={buttonClass} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Chargement...
                </span>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>
          <p className="text-center text-sm text-white/60">
            Déjà un compte ?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-white underline decoration-white/40"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
