'use client';
import { LayoutDashboard, ShoppingBag, Package, Users, Plus } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROUTES } from '@/lib/constants';
import AuthGuard from '@/middleware/authGuard';

const adminSidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: ROUTES.ADMIN_DASHBOARD },
  { icon: Package, label: 'Products', href: ROUTES.ADMIN_PRODUCTS },
  { icon: Plus, label: 'Add Product', href: `${ROUTES.ADMIN_PRODUCTS}?action=new` },
  { icon: ShoppingBag, label: 'Orders', href: ROUTES.ADMIN_ORDERS },
  { icon: Users, label: 'Users', href: ROUTES.ADMIN_USERS },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block">
          <Sidebar items={adminSidebarItems} title="Admin Panel" />
        </div>
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
