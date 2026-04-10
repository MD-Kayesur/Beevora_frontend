import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { PageSpinner } from '@/components/ui/Spinner';
import { PackageX } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const ProductList = ({ products, isLoading, emptyMessage = 'No products found.' }: ProductListProps) => {
  if (isLoading) {
    return <PageSpinner label="Loading products..." />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <PackageX className="h-16 w-16 text-white/20" />
        <p className="text-white/50 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
