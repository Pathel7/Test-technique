import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { login, loading, error } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } catch (err) {
      toast.error(error || "Erreur lors de la connexion");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50";
  const gradientButtonClass =
    "flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold tracking-[0.2em] uppercase text-white shadow-[0_20px_40px_rgba(79,70,229,0.45)] transition hover:brightness-110 disabled:brightness-90 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="relative isolate mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_80px_rgba(15,23,42,0.85)] backdrop-blur-3xl md:flex-row">
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-sky-500/10" />
        <div className="pointer-events-none absolute -right-24 top-10 h-52 w-52 rounded-full bg-indigo-500/40 blur-[80px]"></div>
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]"></div>
        <div className="relative z-10 flex flex-1 flex-col gap-5 px-6 py-6 text-white md:px-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Bienvenue
          </p>
          <h1 className="text-3xl font-black leading-tight text-white">
            Confort, rythme et invitations maîtrisées.
          </h1>
          <p className="text-sm text-white/70">
            Gardez vos événements organisés, envoyez vos invitations et
            visualisez les retours depuis un tableau de bord pensé pour vous.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Rapide
            </span>
            <span className="rounded-2xl border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Collaboratif
            </span>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-md space-y-6 px-6 py-8 text-white md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/40">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase text-white/60">Connexion</p>
              <h2 className="text-2xl font-semibold text-white">
                Connectez-vous
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="email@exemple.com"
                  className={`${inputClass} pl-12`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Mot de passe"
                  className={`${inputClass} pr-12 pl-12`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white/90"
                  onClick={() => setShow((value) => !value)}
                  aria-label="Afficher ou masquer le mot de passe"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={gradientButtonClass}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Chargement...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
          <p className="text-center text-sm text-white/60">
            Pas encore de compte ?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-1 font-semibold text-white underline decoration-white/40"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
