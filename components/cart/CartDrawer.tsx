'use client';
import { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import Image from 'next/image';

export const CartDrawer = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, subtotal, itemCount, applyCoupon, couponCode, summary } = useCart();
  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={toggleCart} 
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[#0A0F1E] border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Your Cart</h2>
            {itemCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={toggleCart} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white/20" />
              </div>
              <div>
                <p className="text-white font-medium">Your cart is empty</p>
                <p className="text-sm text-white/40 max-w-[200px] mx-auto mt-1">Add some items to get started!</p>
              </div>
              <Button onClick={toggleCart} size="sm">Browse Products</Button>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={item._id} className="flex gap-4 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                  <Image src={item?.product?.thumbnail} alt={item?.product?.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item?.product?.name}</p>
                  <p className="text-xs text-white/40 mb-2">{item?.product?.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => updateQuantity(item._id, Math.max(1, item?.quantity - 1))}
                        className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-white/60 flex items-center justify-center hover:bg-white/10 transition-all text-xs"
                       >-</button>
                       <span className="text-xs font-bold text-white w-4 text-center">{item?.quantity}</span>
                       <button 
                        onClick={() => updateQuantity(item._id, item?.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-white/60 flex items-center justify-center hover:bg-white/10 transition-all text-xs"
                       >+</button>
                    </div>
                    <span className="text-sm font-bold text-amber-400">{formatPrice(item?.product?.price * item?.quantity)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item._id)}
                  className="p-1 text-white/20 hover:text-red-400 transition-colors self-start"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-white/3 border-t border-white/10 space-y-4">
            {/* Coupon */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="COUPON CODE"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500/50 transition-colors uppercase"
                />
                <Button size="sm" onClick={() => applyCoupon(couponInput)}>Apply</Button>
              </div>
              {couponCode && (
                <div className="flex items-center justify-between text-[10px] bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-xl text-green-400">
                  <span className="font-bold flex items-center gap-1 uppercase tracking-widest"><CheckCircle className="h-3 w-3" /> {couponCode} applied!</span>
                  <span className="font-bold">-{formatPrice(summary.discount)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Subtotal</span>
                <span className="text-sm font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              {summary?.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-green-500 text-xs font-medium uppercase tracking-wider">Discount</span>
                  <span className="text-sm font-bold text-green-500">-{formatPrice(summary.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-white text-sm font-bold uppercase tracking-wider">Total</span>
                <span className="text-xl font-bold text-amber-400">{formatPrice(summary.total)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={ROUTES.CART} onClick={toggleCart}>
                <Button variant="secondary" className="w-full">View Cart</Button>
              </Link>
              <Link href={ROUTES.CHECKOUT} onClick={toggleCart}>
                <Button className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>Checkout</Button>
              </Link>
            </div>
            <p className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold">
              Secure Checkout • 256-bit SSL
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
