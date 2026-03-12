import { Calendar, Clock, MapPin, Plus, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { useEventStore } from "../stores/eventStore";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { events, fetchEvents } = useEventStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    if(!events.length){
      fetchEvents();
    }
  },[events])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-10 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Mes Événements</h1>
          <p className="text-base-content/60 mt-2">
            Gérez vos invitations et suivez vos événements.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create-event")}
            className="btn btn-primary gap-2 shadow-md"
          >
            <Plus size={18} />
            Créer un événement
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-secondary gap-2 shadow-md"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="hero bg-gray-100 rounded-3xl p-12 border-2 border-dashed border-base-300">
          <div className="text-center max-w-md">
            <div className="bg-base-200 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Calendar size={42} className="text-base-content/20" />
            </div>

            <h2 className="text-2xl font-bold">Aucun événement</h2>

            <p className="py-4 text-base-content/60">
              Vous n'avez pas encore créé d'événement.
            </p>

            <button
              onClick={() => navigate("/create-event")}
              className="btn btn-primary"
            >
              Créer mon premier événement
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -6 }}
              className="card bg-gray-100 border border-base-300 shadow-lg hover:shadow-xl transition"
            >
              <div className="card-body space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="card-title text-lg font-bold leading-tight">
                    {event.title}
                  </h2>

                  <div className="badge badge-primary badge-sm">ACTIF</div>
                </div>

                <p className="text-sm text-base-content/60 line-clamp-2">
                  {event.description || "Aucune description fournie."}
                </p>

                <div className="divider my-1"></div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary" />
                    <span>
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-secondary" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-accent" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="card-actions justify-end pt-4">
                  <button className="btn btn-ghost btn-sm">Détails</button>

                  <button className="btn btn-primary btn-sm">Invités</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
