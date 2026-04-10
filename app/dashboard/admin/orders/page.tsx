'use client';
import { Search, Eye, Trash2, CheckCircle2, Clock, Truck, Ban } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice, formatDate } from '@/lib/utils';
import { ORDER_STATUS_COLORS } from '@/lib/constants';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { adminDeleteOrder, updateOrderStatus, fetchAllOrders } from '@/store/slices/orderSlice';
import { useState, useEffect } from 'react';
import { OrderStatus } from '@/types/order';

export default function AdminOrdersPage() {
  const { orders, total } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter(o => 
    (o.orderNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (o.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      dispatch(adminDeleteOrder(id));
    }
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-white/50 mt-0.5">{total} orders in system</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input 
            placeholder="Search order # or customer..." 
            leftIcon={<Search className="h-4 w-4" />} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-white/40">
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Order #</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Customer</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Total</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4 font-mono text-[11px] font-bold text-amber-500">{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{order.user.name}</p>
                    <p className="text-[10px] text-white/30">{order.user.email}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`appearance-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer hover:scale-105 transition-transform ${ORDER_STATUS_COLORS[order.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-white/40 text-[11px]">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
