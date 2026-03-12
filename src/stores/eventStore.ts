import { create } from "zustand";
import api from "../services/api";
import type { Event, EventFormData } from "../types/event";

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;

  // Actions Événements
  fetchEvents: () => Promise<void>;
  fetchEventDetails: (id: string) => Promise<void>;
  createEvent: (data: EventFormData, file?: File) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;

  // Actions Invitations & Guests
  importAndInvite: (eventId: string, file: File) => Promise<void>;
  inviteMultipleGuests: (eventId: string, guestIds: string[]) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  currentEvent: null,
  loading: false,

  fetchEvents: async () => {
    set({ loading: true });
    const res = await api.get("/events");
    set({ events: res.data, loading: false });
  },

  fetchEventDetails: async (id) => {
    set({ loading: true });
    const res = await api.get(`/events/${id}`);
    set({ currentEvent: res.data, loading: false });
  },

  createEvent: async (data: EventFormData, file?: File) => {
    set({ loading: true });
    const res = await api.post("/events", data);
    const event: Event = res.data;
    set((state) => ({ events: [...state.events, event], loading: false }));

    // if a spreadsheet is provided, import & send invitations
    if (file) {
      await get().importAndInvite(event.id, file);
    }

    return event;
  },

  deleteEvent: async (id: string) => {
    await api.delete(`/events/${id}`);
    set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
  },

  importAndInvite: async (eventId, file) => {
    set({ loading: true });
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/events/${eventId}/import-invitations`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      get().fetchEventDetails(eventId);
    } finally {
      set({ loading: false });
    }
  },

  inviteMultipleGuests: async (eventId, guestIds) => {
    set({ loading: true });
    await api.post(`/events/${eventId}/invite`, { guest_ids: guestIds });
    get().fetchEventDetails(eventId);
    set({ loading: false });
  },
}));
