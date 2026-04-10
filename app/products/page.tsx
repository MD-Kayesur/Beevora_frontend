'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Package } from 'lucide-react';
import { ProductList } from '@/components/product/ProductList';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/hooks/useProducts';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { debounce } from '@/lib/utils';

export default function ProductsPage() {
  const { 
    products, 
    isLoading, 
    error, 
    filters, 
    loadProducts, 
    updateFilters, 
    resetFilters 
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts(filters);
  }, [filters, loadProducts]);

  const handleSearchChange = useMemo(
    () => debounce((value: string) => {
      updateFilters({ search: value || undefined });
    }, 500),
    [updateFilters]
  );

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearchChange(value);
  };

  const clearCategory = () => updateFilters({ category: undefined });
  const onCategoryChange = (cat: string) => {
    updateFilters({ category: filters.category === cat ? undefined : cat });
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortBy: e.target.value as any });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
        <p className="text-white/50">Discover premium goods for your business</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            leftIcon={<Search className="h-4 w-4" />}
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>
        <Button
          variant="secondary"
          leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
        <div className="relative">
          <select
            value={filters.sortBy || 'newest'}
            onChange={onSortChange}
            className="appearance-none h-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 pr-9 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0D1428]">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6 p-5 rounded-2xl bg-[#0D1428] border border-white/10 animate-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Filter by Category</h3>
            <button onClick={resetFilters} className="text-xs text-amber-400 hover:underline">
              Reset All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  filters.category === cat
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(filters.category || filters.search) && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-sm text-white/40">Active filters:</span>
          {filters.category && (
            <Badge variant="primary">
              {filters.category}
              <button onClick={clearCategory}><X className="h-3 w-3 ml-1" /></button>
            </Badge>
          )}
          {filters.search && (
            <Badge variant="default">
              &quot;{filters.search}&quot;
              <button onClick={() => { updateFilters({ search: undefined }); setSearchQuery(''); }}><X className="h-3 w-3 ml-1" /></button>
            </Badge>
          )}
        </div>
      )}

      {/* Product Feed */}
      {isLoading && products.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : error && products.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-2xl bg-red-500/5 border border-red-500/10">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <Button onClick={() => loadProducts(filters)}>Try Again</Button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-white/20" />
          </div>
          <p className="text-white font-medium">No products found</p>
          <p className="text-sm text-white/40 mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              Note: Could not refresh products from server. Showing cached/local data.
            </div>
          )}
          <ProductList products={products} />
        </>
      )}
    </div>
  );
}
