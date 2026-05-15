import { Search, Eye, Trash2, FileText, Download } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { formatPrice, formatDate } from '@/lib/utils';
import { ORDER_STATUS_COLORS, API_BASE_URL, TOKEN_KEY } from '@/lib/constants';
import { useState } from 'react';
import { OrderStatus } from '@/types/order';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from '@/redux/features/order/orderApi';
import Cookies from 'js-cookie';

export default function AdminOrdersPage() {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [searchTerm, setSearchTerm] = useState('');

  const orders = ordersData?.data || [];
  const total = orders.length;

  const filteredOrders = orders.filter((o: any) => 
    (o.orderNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (o.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
    }
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateStatus({ id, status });
  };

  const handleDownloadInvoice = async (id: string) => {
    try {
      const token = Cookies.get(TOKEN_KEY);
      const response = await fetch(`${API_BASE_URL}/orders/${id}/invoice`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download invoice');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err: any) {
      alert(err.message || 'Failed to download invoice');
    }
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

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-white/40">
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Order #</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Customer</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Total</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order: any) => (
                <tr key={order.id || order._id} className="hover:bg-white/[0.02] transition-colors group text-white/70">
                  <td className="px-5 py-4 font-mono text-[11px] font-bold text-amber-500">{order.orderNumber || order._id.substring(order._id.length - 8).toUpperCase()}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{order.user?.name || 'Customer'}</p>
                    <p className="text-[10px] text-white/30">{order.user?.email}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{formatPrice(order.totalAmount || order.total)}</td>
                  <td className="px-5 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id || order._id, e.target.value as OrderStatus)}
                      className={`appearance-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer transition-transform ${ORDER_STATUS_COLORS[order.status] || 'border-white/20'}`}
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
                        onClick={() => handleDownloadInvoice(order.id || order._id)} 
                        title="Download Invoice"
                        className="p-2 rounded-lg text-white/40 hover:text-amber-400 hover:bg-amber-500/10"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(order.id || order._id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10">
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
