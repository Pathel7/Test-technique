import { Calendar, Clock, MapPin, Plus, LogOut } from "lucide-react";
import { useEventStore } from "../stores/eventStore";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { events, fetchEvents } = useEventStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (!events.length) {
      fetchEvents();
    }
  }, [events, fetchEvents]);

  const primaryButton =
    "inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-[0_20px_45px_rgba(16,185,129,0.45)] transition hover:brightness-110";
  const secondaryButton =
    "inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/20";

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-600/60 via-slate-900/70 to-slate-900/70 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.65)]">
          <div className="pointer-events-none absolute -right-16 top-10 h-32 w-32 rounded-full bg-emerald-400/40 blur-[80px]"></div>
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-[120px]"></div>
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Gestion
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white">
                Mes événements
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/70">
                Maintenez vos invitations sous controlé, analysez les retours et
                créez des expériences mémorables pour vos invités.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/create-event")}
                className={primaryButton}
              >
                <Plus className="h-4 w-4" />
                Créer un événement
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className={secondaryButton}
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </section>

        {events.length === 0 ? (
          <section className="relative group overflow-hidden rounded-[28px] border border-dashed border-white/40 bg-white/5 p-10 text-center text-white shadow-[0_25px_60px_rgba(15,23,42,0.6)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900 opacity-0 transition duration-700 group-hover:opacity-100"></div>
            <div className="relative z-10 space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                <Calendar className="h-8 w-8 text-white/70" />
              </div>
              <h2 className="text-2xl font-bold">Aucun événement</h2>
              <p className="text-sm text-white/60">
                Commencez par créer un moment, nous nous chargeons du reste.
              </p>
              <button
                onClick={() => navigate("/create-event")}
                className={primaryButton}
              >
                <Plus className="h-4 w-4" />
                Créer mon premier événement
              </button>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="relative flex flex-col gap-5 overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-purple-900/70 p-6 text-white shadow-[0_25px_60px_rgba(15,23,42,0.65)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold leading-tight tracking-tight">
                    {event.title}
                  </h2>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    ACTIF
                  </span>
                </div>

                <p className="text-sm text-white/60 line-clamp-2">
                  {event.description || "Aucune description fournie."}
                </p>

                <div className="h-px w-full bg-white/10" />

                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-indigo-300" />
                    <span>
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-cyan-300" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-rose-300" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
                  <button className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-white transition hover:border-white/40 hover:bg-white/20">
                    Détails
                  </button>
                  <button className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 font-semibold text-white transition hover:brightness-110">
                    Invités
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
