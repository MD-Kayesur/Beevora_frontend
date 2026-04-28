'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, truncate, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : null;

  return (
    <div className="group relative rounded-2xl bg-[#0D1428] border border-white/10 overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5">
      {/* Image */}
      <Link href={ROUTES.PRODUCT_DETAIL(product?.id)}>
        <div className="relative h-52 bg-white/5 [perspective:1000px]">
          <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* Front Image */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <Image
                src={product?.thumbnail || '/images/placeholder.jpg'}
                alt={product?.name}
                fill
                className="object-contain"
              />
            </div>
            {/* Back Image */}
            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <Image
                src={product?.hoverImage || product?.images?.[1] || product?.images?.[0] || product?.thumbnail || '/images/placeholder.jpg'}
                alt={`${product?.name} - Back`}
                fill
                className="object-contain"
              />
            </div>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount && <Badge variant="danger">-{discount}%</Badge>}
            {product?.isFeatured && <Badge variant="primary">Featured</Badge>}
            {product?.stock === 0 && <Badge variant="default">Out of Stock</Badge>}
          </div>
          {/* Wishlist */}
          <button className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 text-white/60 hover:text-red-400 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-amber-400/70 font-medium mb-1">{product?.brand}</p>
        <Link href={ROUTES.PRODUCT_DETAIL(product?.id)}>
          <h3 className="text-sm font-semibold text-white mb-2 hover:text-amber-400 transition-colors leading-snug">
            {truncate(product?.name, 52)}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)]?.map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product?.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
              />
            ))}
          </div>
          <span className="text-xs text-white/40">({product?.reviewCount})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-white">{formatPrice(product?.price)}</span>
            {product?.originalPrice && (
              <span className="ml-2 text-xs text-white/40 line-through">{formatPrice(product?.originalPrice)}</span>
            )}
          </div>
          <Button
            size="icon"
            variant={inCart ? 'success' : 'secondary'}
            onClick={() => addItem(product)}
            disabled={product?.stock === 0}
            className="h-9 w-9"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
