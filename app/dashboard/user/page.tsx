'use client';
import { ShoppingBag, DollarSign, Package, Heart, ArrowRight } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { ROUTES, ORDER_STATUS_COLORS } from '@/lib/constants';
import { useGetMyOrdersQuery } from '@/redux/features/order/orderApi';
 
export default function UserDashboardPage() {
  const { data, isLoading } = useGetMyOrdersQuery({});
  const orders = data?.data || [];
  const total = data?.meta?.total || 0;

  const totalSpent = orders.reduce((acc:any, order:any) => acc + (order.total || 0), 0);
  const inProgress = orders.filter((o:any) => ['pending', 'processing', 'shipped'].includes(o.status)).length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 mt-0.5">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={total.toString()} icon={ShoppingBag} change={20} color="amber" isLoading={isLoading} />
        <StatCard title="Total Spent" value={formatPrice(totalSpent)} icon={DollarSign} change={-5} color="blue" isLoading={isLoading} />
        <StatCard title="In Progress" value={inProgress.toString()} icon={Package} subtitle="Orders being processed" color="purple" isLoading={isLoading} />
        <StatCard title="Wishlist" value="0" icon={Heart} color="red" />
      </div>

      {/* Recent Orders */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Recent Orders</h2>
          <Link href={ROUTES.USER_ORDERS}><Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>View All</Button></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 border-b border-white/10">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((order: any) => (
                <tr key={order._id || order.id} className="text-white/70">
                  <td className="py-3 font-mono text-xs text-amber-400">{(order.id || order._id).substring(0, 8).toUpperCase()}</td>
                  <td className="py-3 max-w-[180px] truncate">{order.items?.[0]?.product?.name || 'Multiple Items'}</td>
                  <td className="py-3 text-white/40">{formatDate(order.createdAt)}</td>
                  <td className="py-3 font-semibold text-white">{formatPrice(order.totalAmount || order.total)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${ORDER_STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
