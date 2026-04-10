'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft, Package, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { Spinner } from '@/components/ui/Spinner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading, loadProductById, selectedProduct, isLoadingDetail } = useProducts();
  const { addItem, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    if (!products.find((p) => p.id === id)) {
      loadProductById(id);
    }
  }, [id, products, loadProductById]);

  const product = products.find((p) => p.id === id) || (selectedProduct?.id === id ? selectedProduct : null);

  if (isLoading || isLoadingDetail) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-white/20" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-white/40 mb-8 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link href={ROUTES.PRODUCTS}><Button>Back to Products</Button></Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/40 mb-8 overflow-hidden">
        <Link href={ROUTES.HOME} className="hover:text-white transition-colors flex-shrink-0">Home</Link>
        <span>/</span>
        <Link href={ROUTES.PRODUCTS} className="hover:text-white transition-colors flex-shrink-0">Products</Link>
        <span>/</span>
        <span className="text-white/70 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
            <Image 
              src={product.thumbnail} 
              alt={product.name} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700" 
              priority
            />
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-6 left-6">
                <Badge variant="danger">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary">{product.category}</Badge>
              {product.isFeatured && <Badge variant="warning">Featured</Badge>}
            </div>
            <p className="text-sm text-amber-400 font-bold tracking-widest uppercase mb-2">{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-2" />
              <span className="text-white font-bold">{product.rating}</span>
            </div>
            <span className="text-white/40 text-sm">{product.reviewCount} verified reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-2xl text-white/30 line-through font-medium">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Description</h3>
            <p className="text-white/60 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
            <Button
              size="xl"
              className="flex-1 shadow-lg shadow-amber-500/20"
              leftIcon={<ShoppingCart className="h-5 w-5" />}
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              variant={inCart ? 'success' : 'primary'}
            >
              {inCart ? `Add More (${cartQty})` : 'Add to Cart'}
            </Button>
            <Button size="xl" variant="secondary" className="px-6 border-white/20">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'On orders $100+' },
              { icon: Shield, label: 'Secure Payment', sub: '256-bit AES' },
              { icon: Package, label: 'Easy Returns', sub: '30-day window' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="p-4 rounded-2xl bg-white/3 border border-white/5">
                <Icon className="h-5 w-5 text-amber-400 mb-2" />
                <p className="text-xs font-bold text-white mb-0.5">{label}</p>
                <p className="text-[10px] text-white/40 uppercase font-medium">{sub}</p>
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-[10px] text-white/20 font-mono pt-4 border-t border-white/5">
            <span>SKU: {product.sku}</span>
            <span>STOCK: {product.stock > 0 ? product.stock : 'OUT'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
