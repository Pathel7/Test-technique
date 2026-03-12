import { create } from 'zustand';
import type { AuthResponse, AuthState, User } from '../types/auth';
import api from '../services/api';


interface AuthActions {
    register: (data: any) => Promise<void>;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    // State initial
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
    loading: false,
    error: null,

    clearError: () => set({ error: null }),

    // Inscription
    register: async (data) => {
        set({ loading: true, error: null });
        try {
            await api.post('/auth/register', data);
            set({ loading: false });
        } catch (err: any) {
            set({ 
                error: err.response?.data?.message || "Erreur lors de l'inscription", 
                loading: false 
            });
            throw err;
        }
    },

    // Connexion
    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            const { access_token, user } = response.data;

            localStorage.setItem('auth_token', access_token);
            
            set({ 
                token: access_token, 
                user: user, 
                isAuthenticated: true, 
                loading: false 
            });
        } catch (err: any) {
            set({ 
                error: err.response?.data?.error || "Identifiants invalides", 
                loading: false 
            });
            throw err;
        }
    },

    // Récupérer les infos de l'utilisateur (utile au refresh de la page)
    fetchUser: async () => {
        if (!localStorage.getItem('auth_token')) return;
        
        set({ loading: true });
        try {
            const response = await api.get<User>('/auth/user');
            set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (err) {
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isAuthenticated: false, loading: false });
        }
    },

    // Déconnexion
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isAuthenticated: false });
        }
    }
}));