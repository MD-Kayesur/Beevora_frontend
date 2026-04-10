import { useAppDispatch, useAppSelector } from './useRedux';
import { login, register, logout, clearError, getProfile } from '@/store/slices/authSlice';
import { LoginCredentials, RegisterCredentials } from '@/types/user';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    return dispatch(login(credentials));
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    return dispatch(register(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleGetProfile = () => {
    dispatch(getProfile());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isAdmin: user?.role === 'admin',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    getProfile: handleGetProfile,
    clearError: handleClearError,
  };
};
