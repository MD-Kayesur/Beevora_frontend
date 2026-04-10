'use client';
import { LayoutDashboard, ShoppingBag, User } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROUTES } from '@/lib/constants';
import AuthGuard from '@/middleware/authGuard';

const userSidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: ROUTES.USER_DASHBOARD },
  { icon: ShoppingBag, label: 'My Orders', href: ROUTES.USER_ORDERS },
  { icon: User, label: 'Profile', href: ROUTES.USER_PROFILE },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block">
          <Sidebar items={userSidebarItems} title="User Menu" />
        </div>
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
