'use client';
import { useGetHoneyQuery } from '@/redux/features/product/productApi';
import { ProductList } from '@/components/product/ProductList';
import { Spinner } from '@/components/ui/Spinner';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function HoneyPage() {
  const { data, isLoading } = useGetHoneyQuery();
  const products = data?.products || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href={ROUTES.PRODUCTS} className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to all products
      </Link>
      
      <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
        <h1 className="text-4xl font-bold text-white mb-2">Pure Honey Collection</h1>
        <p className="text-white/60 max-w-2xl">Discover our selection of 100% natural, premium honey harvested from the finest blossoms.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white/3 border border-white/10 rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-white/20" />
          </div>
          <p className="text-white font-medium">No honey products found</p>
          <p className="text-sm text-white/40 mt-1">Check back soon for our new harvest.</p>
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
