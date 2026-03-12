import { create } from "zustand"
import type { Guest } from "../types/guest";
import api from "../services/api";


interface GuestState {
  guests: Guest[]

  fetchGuests: () => Promise<void>
  createGuest: (data: { name: string; email: string }) => Promise<void>
  deleteGuest: (id: string) => Promise<void>
}

export const useGuestStore = create<GuestState>((set) => ({
  guests: [],

  fetchGuests: async () => {
    const res = await api.get("/guests")
    set({ guests: res.data })
  },

  createGuest: async (data) => {
    const res = await api.post("/guests", data)

    set((state) => ({
      guests: [...state.guests, res.data],
    }))
  },

  deleteGuest: async (id : string) => {
    await api.delete(`/guests/${id}`)

    set((state) => ({
      guests: state.guests.filter((g) => g.id !== id),
    }))
  },
}))