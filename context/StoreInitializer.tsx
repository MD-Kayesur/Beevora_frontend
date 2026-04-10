'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getProfile } from '@/store/slices/authSlice';
import { TOKEN_KEY } from '@/lib/constants';
import Cookies from 'js-cookie';

export default function StoreInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but aren't authenticated in state, fetch the profile
    const cookieToken = Cookies.get(TOKEN_KEY);
    
    if ((token || cookieToken) && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, token, isAuthenticated]);

  return <>{children}</>;
}
