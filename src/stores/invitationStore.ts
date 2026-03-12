import { create } from "zustand"
import type { Guest } from "../types/guest"
import api from "../services/api"


interface InvitationState {
  guests: Guest[]

  fetchEventGuests: (eventId: string) => Promise<void>

  inviteGuests: (eventId: string, guestIds: string[]) => Promise<void>

  importGuests: (eventId: string, file: File) => Promise<void>

  acceptInvitation: (eventId: string, guestId: string) => Promise<void>

  declineInvitation: (eventId: string, guestId: string) => Promise<void>
}

export const useInvitationStore = create<InvitationState>((set) => ({
  guests: [],

  fetchEventGuests: async (eventId) => {
    const res = await api.get(`/events/${eventId}/guests`)
    set({ guests: res.data })
  },

  inviteGuests: async (eventId, guestIds) => {
    await api.post(`/events/${eventId}/invite`, {
      guest_ids: guestIds,
    })
  },

  importGuests: async (eventId, file) => {
    const formData = new FormData()

    formData.append("file", file)

    await api.post(`/events/${eventId}/import-invitations`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  acceptInvitation: async (eventId, guestId) => {
    await api.post(`/events/${eventId}/guests/${guestId}/accept`)
  },

  declineInvitation: async (eventId, guestId) => {
    await api.post(`/events/${eventId}/guests/${guestId}/decline`)
  },
}))