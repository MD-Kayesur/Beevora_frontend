'use client';
import { formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ORDER_STATUS_COLORS } from '@/lib/constants';
import { Eye, MapPin, Package, ShoppingBag } from 'lucide-react';
import { useGetMyOrdersQuery } from '@/redux/features/order/orderApi';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import Image from 'next/image';
 
export default function UserOrdersPage() {
  const { data } = useGetMyOrdersQuery({});
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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
                <Button 
                  onClick={() => setSelectedOrder(order)}
                  variant="secondary" 
                  size="sm" 
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details: #${(selectedOrder?._id || '').substring(0, 8).toUpperCase()}`}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Shipping Address</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 leading-relaxed">
                  {selectedOrder.shippingAddress}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <Package className="h-4 w-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Order Status</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                   <span className="text-sm font-medium text-white/70">Order Status</span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${ORDER_STATUS_COLORS[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                   <span className="text-sm font-medium text-white/70">Payment</span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${selectedOrder.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
               <div className="flex items-center gap-2 text-white/50 mb-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Order Items</span>
                </div>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                        {item.product?.thumbnail && <Image src={item?.product?.thumbnail} alt={item?.product?.name} fill className="object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white line-clamp-1">{item?.product?.name || 'Product Details'}</p>
                        <p className="text-xs text-white/40">{formatPrice(item?.price)} × {item?.quantity}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-amber-400">{formatPrice(item?.price * item?.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center">
               <span className="font-bold text-white">Total Amount Paid</span>
               <span className="text-xl font-bold text-amber-400">{formatPrice(selectedOrder?.totalAmount || selectedOrder?.total)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

