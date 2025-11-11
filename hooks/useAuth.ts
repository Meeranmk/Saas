
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  } = useAuthStore();

  return { user, token, isAuthenticated, isAdmin, login, register, logout };
};
