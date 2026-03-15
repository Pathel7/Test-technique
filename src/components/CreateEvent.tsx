import {
  CheckCircle2,
  FileSpreadsheet,
  Mail,
  MapPin,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { useEventStore } from "../stores/eventStore";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { createEvent, loading } = useEventStore();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const created = await createEvent(
        { title, description, location, date, time },
        file || undefined,
      );
      console.log("event created", created);
      setSuccess(true);
      setError(false);
    } catch (err: any) {
      console.error("failed to create event", err.response ?? err);
      setError(true);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50";
  const secondaryButton =
    "inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/40 hover:bg-white/10";
  const primaryButton =
    "flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_45px_rgba(79,70,229,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:brightness-90";

  if (success) {
    return (
      <div className="min-h-screen px-4 py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 rounded-[32px] border border-white/10 bg-white/5 p-10 text-center text-white shadow-[0_30px_80px_rgba(15,23,42,0.75)] backdrop-blur-3xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 size={48} className="text-emerald-300" />
          </div>
          <h1 className="text-3xl font-bold">Événement créé !</h1>
          <p className="text-sm text-white/70">
            Les invitations ont été envoyées et tout est prêt.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className={primaryButton}
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition hover:border-white/40 hover:bg-white/10"
            aria-label="Retour au dashboard"
          >
            <Plus className="h-5 w-5 rotate-45" />
          </button>
          <h1 className="text-3xl font-bold">Nouvel événement</h1>
        </div>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.7)] backdrop-blur-3xl">
          <div className="pointer-events-none absolute -right-16 top-6 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-[100px]"></div>
          <div className="relative space-y-8 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Créez
              </p>
              <h2 className="text-2xl font-bold">
                Préparez votre prochain moment
              </h2>
              <p className="text-sm text-white/70">
                Renseignez les détails et partagez votre événement en quelques
                clics.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 text-white md:grid-cols-2"
            >
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  placeholder="Titre ..."
                  className={inputClass}
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Description
                </label>
                <textarea
                  placeholder="Décrivez votre événement..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/60 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Lieu
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                  <input
                    type="text"
                    placeholder="Adresse ou nom du lieu"
                    className={`${inputClass} pl-12`}
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Date
                </label>
                <input
                  type="date"
                  className={inputClass}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Heure
                </label>
                <input
                  type="time"
                  className={inputClass}
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-white/80">
                  Fichier invités
                </label>
                <label className="relative block rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center text-sm text-white/60 transition hover:border-white/50 hover:bg-white/10">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <FileSpreadsheet className="mx-auto mb-2 h-10 w-10 text-cyan-300" />
                  <p className="font-semibold text-white">
                    Importer un fichier Excel
                  </p>
                  <p className="text-xs text-white/60">
                    Colonnes requises: Nom, Email
                  </p>
                  {file && (
                    <p className="mt-2 text-xs text-white/70">{file.name}</p>
                  )}
                </label>
              </div>

              {error && (
                <p className="md:col-span-2 rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  Échec de la création de l'événement.
                </p>
              )}

              <div className="md:col-span-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className={secondaryButton}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${primaryButton} ${loading ? "cursor-not-allowed" : ""}`}
                >
                  <Mail className="h-4 w-4" />
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Chargement...
                    </span>
                  ) : (
                    "Créer et envoyer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
