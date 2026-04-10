'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { PageSpinner } from '@/components/ui/Spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { isAuthenticated, isAdmin, isLoading, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated && !token) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${ROUTES.LOGIN}?returnUrl=${returnUrl}`);
    }

    // If admin is required but user is not admin
    if (!isLoading && isAuthenticated && requireAdmin && !isAdmin) {
      router.push(ROUTES.USER_DASHBOARD);
    }
  }, [isLoading, isAuthenticated, isAdmin, token, requireAdmin, router, pathname]);

  // While checking auth status
  if (isLoading || (!isAuthenticated && token)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <PageSpinner label="Verifying access..." />
      </div>
    );
  }

  // If not authenticated, wait for effect to redirect
  if (!isAuthenticated && !token) {
    return null;
  }

  // If admin is required but not admin
  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
