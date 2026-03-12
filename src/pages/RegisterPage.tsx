import React, { useState } from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  User,
  UserPlus,
  Lock,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
    } catch (error) {
      toast.error("Erreur lors de la création du compte");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-center items-center py-12"
    >
      <div className="card w-full max-w-md bg-gray-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4 flex items-center gap-2">
            <UserPlus className="text-primary" /> Création de compte
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mt-4">
              <label
                htmlFor="name"
                className="text-[#3B5266] [font-feature-settings:'liga'_off,'clig'_off] font-lato text-[0.9375rem] font-normal leading-[1.25rem]"
              >
                Nom
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-secondary-light" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-[#E1E9F0] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nom complet ..."
                  required
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 rounded-md sm:text-sm"  
                  placeholder="Email ..."
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-[#3B5266] font-lato text-[0.9375rem] leading-[1.25rem]"
              >
                Mot de passe
              </label>

              <div className="flex items-center mt-2 space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-secondary-light" />
                  </div>
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`
                        block w-full pl-10 pr-3 py-3 border rounded-md sm:text-sm
                        ${
                          passwordMismatch
                            ? "border border-[#F04438] bg-[#FEE4E2]"
                            : "border-gray-300 bg-[#E1E9F0] focus:ring-blue-500 focus:border-blue-500"
                        }
                      `}
                    placeholder="mot de passe ..."
                    required
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

                {passwordMismatch && (
                  <AlertCircle className="text-red-500 w-5 h-5 shrink-0" />
                )}
              </div>

              {passwordMismatch && (
                <p className="mt-2 text-sm text-red-600">
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="passwordConfirm"
                className="text-[#3B5266] font-lato text-[0.9375rem] leading-[1.25rem]"
              >
                confirmer le mot de passe
              </label>

              <div className="flex items-center mt-2 space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-secondary-light" />
                  </div>
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
                    className={`
                        block w-full pl-10 pr-3 py-3 border rounded-md sm:text-sm
                        ${
                          passwordMismatch
                            ? "border border-[#F04438] bg-[#FEE4E2]"
                            : "border-gray-300 bg-[#E1E9F0] focus:ring-blue-500 focus:border-blue-500"
                        }
                      `}
                    placeholder="confirmer le mot de passe ..."
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-light"
                    onClick={() => setShowConfirm((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {passwordMismatch && (
                  <AlertCircle className="text-red-500 w-5 h-5 shrink-0" />
                )}
              </div>

              {passwordMismatch && (
                <p className="mt-2 text-sm text-red-600">
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>

            {error && (
              <div className="alert alert-error text-sm py-2">{error}</div>
            )}

            <button
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              S'inscrire
            </button>
          </form>
          <div className="divider">OU</div>
          <p className="text-center text-sm">
            Déjà un compte ?{" "}
            <a
              onClick={() => navigate("/login")}
              className="link link-primary font-semibold cursor-pointer"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
