'use client';

import React from 'react';
import { useGetHoneyQuery, useGetClothingQuery } from '@/redux/features/product/productApi';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowRight, Sparkles, Shirt } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export const FeaturedSections = () => {
  const { data: honeyData, isLoading: honeyLoading } = useGetHoneyQuery({ limit: 6 });
  const { data: clothingData, isLoading: clothingLoading } = useGetClothingQuery({ limit: 6 });

  return (
    <div className="space-y-24 py-10">
      {/* Honey Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold tracking-widest uppercase text-xs mb-3">
              <Sparkles className="h-4 w-4" />
              <span>Pure & Organic</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Premium <span className="text-gradient">Honey</span>
            </h2>
          </div>
          <Link href="/products/honey" className="group flex items-center gap-2 text-sm font-bold text-white/50 hover:text-amber-400 transition-colors">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {honeyLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {honeyData?.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Clothing Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-3">
              <Shirt className="h-4 w-4" />
              <span>Modern Style</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Latest <span className="text-gradient">Clothing</span>
            </h2>
          </div>
          <Link href="/products/clothing" className="group flex items-center gap-2 text-sm font-bold text-white/50 hover:text-blue-400 transition-colors">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {clothingLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {clothingData?.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
