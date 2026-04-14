'use client';
import { formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ORDER_STATUS_COLORS } from '@/lib/constants';
import { Eye } from 'lucide-react';
import { useGetMyOrdersQuery } from '@/redux/features/order/orderApi';
 
export default function UserOrdersPage() {
  const { data } = useGetMyOrdersQuery({});
  const orders = data?.data || [];
  const total = data?.meta?.total || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <p className="text-white/50 mt-0.5">{total} orders total</p>
      </div>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id || order.id} className="bg-[#0D1428] border border-white/10 rounded-2xl p-5 hover:border-amber-500/20 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-amber-400">{(order.id || order._id).substring(0, 8).toUpperCase()}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${ORDER_STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${order.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-white/50">{order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'} · Placed {formatDate(order.createdAt)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{formatPrice(order.totalAmount || order.total)}</p>
                </div>
                <Button variant="secondary" size="sm" leftIcon={<Eye className="h-4 w-4" />}>
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
