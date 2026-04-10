'use client';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-white/10 last:border-0">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
        <Image
          src={item.product.thumbnail || '/images/placeholder.jpg'}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-amber-400/70 mb-0.5">{item.product.brand}</p>
        <p className="text-sm font-semibold text-white leading-snug truncate">{item.product.name}</p>
        <p className="text-sm font-bold text-white mt-2">{formatPrice(item.product.price)}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.product.id)}
          className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-7 text-center text-sm font-semibold text-white">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
            className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-40"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        <p className="text-sm font-bold text-amber-400">{formatPrice(item.subtotal)}</p>
      </div>
    </div>
  );
};
