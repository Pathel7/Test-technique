import {
  CheckCircle2,
  FileSpreadsheet,
  Mail,
  MapPin,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
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

  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="bg-success/20 p-8 rounded-full mb-6">
          <CheckCircle2 size={80} className="text-success" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Événement Créé !</h2>
        <p className="text-base-content/60">
          Les invitations ont été envoyées avec succès.
        </p>
        <p className="text-sm mt-4 animate-pulse">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary ml-2"
          >
            Aller au dashboard
          </button>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-ghost btn-circle"
        >
          <Plus className="rotate-45" />
        </button>
        <h1 className="text-3xl font-bold">Nouvel Événement</h1>
      </div>

      <div className="card bg-gray-100 shadow-xl overflow-hidden">
        <div className="bg-primary h-2 w-full"></div>
        <div className="card-body">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="form-control flex flex-col md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold mb-1">
                  Titre de l'événement
                </span>
              </label>
              <input
                type="text"
                placeholder="Titre ..."
                className="input input-bordered w-full"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control flex flex-col my-1 md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold mb-1">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Décrivez votre événement..."
                className="textarea textarea-bordered h-24 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control flex flex-col md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold mb-1">Lieu</span>
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-base-content/40"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Adresse ou nom du lieu"
                  className="input input-bordered w-full"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold mb-1">Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold mb-1">Heure</span>
              </label>
              <input
                type="time"
                className="input input-bordered w-full"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-control flex flex-col md:col-span-2">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-xl p-8 bg-base-200/50 hover:bg-base-200 transition-colors cursor-pointer relative group">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="text-center">
                  <FileSpreadsheet
                    size={40}
                    className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform"
                  />
                  <p className="font-medium">
                    {file
                      ? file.name
                      : "Cliquez ou glissez votre fichier Excel"}
                  </p>
                  <p className="text-xs text-base-content/50 mt-1">
                    Colonnes requises: Nom, Email
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-error md:col-span-2">
                Echec de la création de l'événement
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6 md:col-span-2">
              <button type="button" className="btn btn-ghost">
                Annuler
              </button>

              <button
                type="submit"
                className={`btn btn-primary gap-2 px-8 ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                <Mail size={16} />
                Créer et envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
