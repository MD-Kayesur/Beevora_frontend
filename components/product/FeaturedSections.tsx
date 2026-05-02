'use client';

import React from 'react';
import { useGetHoneyQuery, useGetClothingQuery } from '@/redux/features/product/productApi';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowRight, Sparkles, Shirt } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const FeaturedSections = () => {
  const { data: honeyData, isLoading: honeyLoading } = useGetHoneyQuery({ limit: 6 });
  const { data: clothingData, isLoading: clothingLoading } = useGetClothingQuery({ limit: 6 });

  return (
    <div className="space-y-24 py-10">
      {/* Honey Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader 
          title="Our Premium"
          highlightText="Honey"
          subtitle="Pure & Organic"
          icon={Sparkles}
          viewAllHref="/products/honey"
        />

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
        <SectionHeader 
          title="Latest"
          highlightText="Clothing"
          subtitle="Modern Style"
          icon={Shirt}
          iconColorClass="text-blue-400"
          viewAllHref="/products/clothing"
        />

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
