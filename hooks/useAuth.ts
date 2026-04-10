import { useAppDispatch, useAppSelector } from './useRedux';
import { logout, setCredentials } from '@/redux/features/auth/authSlice';
import { useLoginMutation, useRegisterMutation, useGetMeQuery } from '@/redux/features/auth/authApi';
import { LoginCredentials, RegisterCredentials } from '@/types/user';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      if (result.success) {
        dispatch(setCredentials({ 
          user: result.data.user, 
          token: result.data.accessToken 
        }));
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err: any) {
      return { success: false, error: err.data?.message || 'Login failed' };
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      const result = await registerMutation(credentials).unwrap();
      if (result.success) {
        // Handle post-registration logic (e.g. login or message)
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err: any) {
      return { success: false, error: err.data?.message || 'Registration failed' };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoginLoading || isRegisterLoading,
    error: (loginError as any)?.data?.message || (registerError as any)?.data?.message || null,
    isAdmin: user?.role === 'admin',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
