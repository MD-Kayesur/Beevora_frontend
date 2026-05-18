'use client';
import Link from 'next/link';
import { Tag, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { ROUTES, SHIPPING_THRESHOLD } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export const CartSummary = ({ showCheckoutButton = true }: CartSummaryProps) => {
  const { summary, couponCode } = useCart();
  const { subtotal, discount } = summary;
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 10;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax - discount;
  const freeShippingProgress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-5 space-y-4">
      <h3 className="text-base font-bold text-white">Order Summary</h3>

      {/* Free Shipping Progress */}
      {subtotal < SHIPPING_THRESHOLD && (
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-blue-400" />
            <p className="text-xs text-blue-300">
              Add <strong>{formatPrice(SHIPPING_THRESHOLD - subtotal)}</strong> more for free shipping!
            </p>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Price Rows */}
      <div className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Subtotal</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Shipping</span>
          <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white'}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Tax (8%)</span>
          <span className="text-white">{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-400 flex items-center gap-1.5">
              <Tag className="h-3 w-3" />{couponCode}
            </span>
            <span className="text-green-400">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 pt-3 flex justify-between items-center">
        <span className="font-bold text-white">Total</span>
        <span className="text-xl font-bold text-amber-400">{formatPrice(total)}</span>
      </div>

      {showCheckoutButton && (
        <Link href={ROUTES.CHECKOUT} className="block w-full">
          <Button className="w-full" size="lg">Proceed to Checkout</Button>
        </Link>
      )}
    </div>
  );
};
