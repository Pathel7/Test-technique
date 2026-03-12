import { motion } from "motion/react";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { LogIn, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  className="min-h-[70vh] flex items-center justify-center px-6"
>
  <div className="card w-full max-w-md bg-gray-100 shadow-xl border border-base-300">

    <div className="card-body space-y-4">

      <h2 className="card-title text-2xl font-bold flex items-center gap-2">
        <LogIn className="text-primary" />
        Connexion
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="mt-4">
          <label
            htmlFor="email"
            className="text-[#3B5266] [font-feature-settings:'liga'_off,'clig'_off] font-lato text-[0.9375rem] font-normal leading-[1.25rem]"
          >
            Email
          </label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-secondary-light" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="email@exemple.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-[#E1E9F0] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="text-[#3B5266] [font-feature-settings:'liga'_off,'clig'_off] font-lato text-[0.9375rem] font-normal leading-[1.25rem]"
          >
            Mot de passe
          </label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-secondary-light" />
            </div>
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder="Mot de passe"
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md bg-[#E1E9F0] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-light"
              onClick={() => setShow((v) => !v)}
              tabIndex={-1}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error text-sm">Une érreur s'est produite</div>
        )}

        <button
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Se connecter
        </button>
      </form>

      <div className="divider">OU</div>

      <p className="text-center text-sm">
        Pas encore de compte ?
        <span
          onClick={() => navigate("/register")}
          className="link link-primary ml-1 cursor-pointer"
        >
          S'inscrire
        </span>
      </p>

    </div>
  </div>
</motion.div>
  );
}

export default LoginPage;
