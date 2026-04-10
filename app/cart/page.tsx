'use client';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/lib/constants';

export default function CartPage() {
  const { items, clearCart, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Your cart is empty</h1>
          <p className="text-white/50 mb-8">Looks like you haven&apos;t added anything yet. Start shopping!</p>
          <Link href={ROUTES.PRODUCTS}>
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Cart</h1>
          <p className="text-white/50 mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 className="h-4 w-4" />}
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Cart Items */}
        <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-5 h-fit">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="mt-5 pt-4 border-t border-white/10">
            <Link href={ROUTES.PRODUCTS} className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <CartSummary />
      </div>
    </div>
  );
}
