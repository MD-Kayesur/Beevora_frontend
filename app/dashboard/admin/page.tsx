'use client';
import { ShoppingBag, DollarSign, Users, Package, TrendingUp, ArrowRight, Ticket, Plus, Trash2, Tag } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ROUTES, ORDER_STATUS_COLORS } from '@/lib/constants';
import { useState } from 'react';
import { useGetDashboardStatsQuery } from '@/redux/features/admin/adminApi';
import { useGetAllCouponsQuery, useCreateCouponMutation, useDeleteCouponMutation } from '@/redux/features/coupon/couponApi';

export default function AdminDashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: couponsData } = useGetAllCouponsQuery();
  const [createCoupon] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10, minAmount: 0 });

  const handleAddCoupon = async () => {
    if (!newCoupon.code) return;
    try {
      await createCoupon({
        code: newCoupon.code.toUpperCase(),
        discount: Number(newCoupon.discount),
        minAmount: Number(newCoupon.minAmount)
      }).unwrap();
      setNewCoupon({ code: '', discount: 10, minAmount: 0 });
    } catch (err) {
      alert('Failed to create coupon');
    }
  };

  const stats = statsData?.data || {};
  const validCoupons = couponsData?.data || [];
  
  const revenue = stats?.revenue || 0;
  const totalOrders = stats?.orders || 0;
  const totalCustomers = stats?.customers || 0;
  const totalProducts = stats?.products || 0;
  const recentOrdersList = stats?.recentOrders || [];
  const salesTrend = stats?.salesTrend || [];
  const categoryStats = stats?.categoryStats || [];
  const topProducts = stats?.topProducts || [];

  return (
    <div className="space-y-7 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/50 mt-0.5">Business overview at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={formatPrice(revenue)} icon={DollarSign} change={12.5} color="amber" isLoading={statsLoading} />
        <StatCard title="Total Orders" value={totalOrders.toString()} icon={ShoppingBag} change={8.2} color="blue" isLoading={statsLoading} />
        <StatCard title="Total Customers" value={totalCustomers.toLocaleString()} icon={Users} change={15.3} color="green" isLoading={statsLoading} />
        <StatCard title="Products" value={totalProducts.toString()} icon={Package} change={3.1} color="purple" isLoading={statsLoading} />
      </div>

      {!statsLoading && (
        <AnalyticsCharts salesTrend={salesTrend} categoryStats={categoryStats} />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-white flex items-center gap-2">Recent Orders</h2>
              <Link href={ROUTES.ADMIN_ORDERS}><Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>View All</Button></Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-white/40 border-b border-white/10">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentOrdersList.map((order: any) => (
                    <tr key={order._id} className="text-white/70">
                      <td className="py-3 font-mono text-xs text-amber-400 font-bold">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                      <td className="py-3">{order.user?.name || 'Customer'}</td>
                      <td className="py-3 font-bold text-white">{formatPrice(order.totalAmount)}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${ORDER_STATUS_COLORS[order.status] || 'border-white/20'}`}>
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

        <div className="space-y-6">
          <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/[0.03] to-transparent">
            <h2 className="font-bold text-white flex items-center gap-2 mb-5">
              <Ticket className="h-4 w-4 text-amber-400" /> Active Coupons
            </h2>
            <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar text-xs">
              {validCoupons.length === 0 ? (
                <p className="text-white/20 text-center py-4 italic">No active coupons</p>
              ) : (
                validCoupons.map((coupon: any) => (
                  <div key={coupon.id || coupon._id} className="group p-3 rounded-xl bg-white/3 border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500"><Tag className="h-4 w-4" /></div>
                      <div>
                        <p className="font-mono font-bold text-white uppercase tracking-widest">{coupon.code}</p>
                        <p className="text-[10px] text-white/40">{coupon.discount}% OFF • Min {formatPrice(coupon.minAmount)}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteCoupon(coupon.id || coupon._id)} className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all font-bold">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="pt-4 border-t border-white/5 space-y-3">
              <input type="text" placeholder="PROMO CODE" value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none" />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({...newCoupon, discount: Number(e.target.value)})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
                <input type="number" value={newCoupon.minAmount} onChange={(e) => setNewCoupon({...newCoupon, minAmount: Number(e.target.value)})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
              </div>
              <Button size="sm" className="w-full" onClick={handleAddCoupon} leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Coupon</Button>
            </div>
          </Card>

          <Card>
            <h2 className="font-bold text-white mb-5">Top Performance</h2>
            <div className="space-y-4">
              {topProducts.map((p: any, i: number) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-white/40 uppercase font-bold">{p.sales} sales</p>
                  </div>
                  <p className="text-sm font-bold text-amber-400">{formatPrice(p.revenue)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
