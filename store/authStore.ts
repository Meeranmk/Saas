
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';
import { login as apiLogin, register as apiRegister } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  init: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (credentials) => {
        const { user, token } = await apiLogin(credentials);
        set({ user, token, isAuthenticated: true, isAdmin: user.role === Role.ADMIN });
      },

      register: async (userData) => {
        const { user, token } = await apiRegister(userData);
        set({ user, token, isAuthenticated: true, isAdmin: user.role === Role.ADMIN });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, isAdmin: false });
      },

      init: () => {
        const state = get();
        if (state.token && state.user) {
          set({ isAuthenticated: true, isAdmin: state.user.role === Role.ADMIN });
        }
        // Apply theme from localStorage on init
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);
