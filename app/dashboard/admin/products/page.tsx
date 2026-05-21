'use client';
import { Plus, Search, Star, Eye, Edit2, Trash2, Package, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, cn } from '@/lib/utils';
import Image from 'next/image';
import { useProducts } from '@/hooks/useProducts';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/product/ProductForm';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActionDropdown } from '@/components/ui/ActionDropdown';

export default function AdminProductsPage() {
  const {
    products,
    isLoading,
    isCreating,
    isUpdating,
    createProduct,
    updateProduct,
    deleteProduct,
    params,
    setParams
  } = useProducts({ showInactive: true });

  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  const stats = {
    total: products?.length || 0,
    active: products?.filter(p => p.isActive).length || 0,
    outOfStock: products?.filter(p => p.stock === 0).length || 0,
  };

  const handleAddProduct = async (data: any) => {
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, updates: data }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      setIsAddModalOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to save product');
    }
  };

  const onModalClose = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const categories = ['All', ...Array.from(new Set((products || []).map(p => p.category).filter(Boolean)))];

  const PRICE_RANGES = [
    { label: 'All Prices',   value: 'All' },
    { label: '$0 – $25',     value: '0-25' },
    { label: '$25 – $50',    value: '25-50' },
    { label: '$50 – $100',   value: '50-100' },
    { label: '$100+',        value: '100-999999' },
  ];

  const RATING_OPTIONS = [
    { label: 'All Ratings', value: 'All' },
    { label: '4★ & above',  value: '4' },
    { label: '3★ & above',  value: '3' },
    { label: '2★ & above',  value: '2' },
    { label: '1★ & above',  value: '1' },
  ];

  const filteredProducts = (products || []).filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesRating  = selectedRating === 'All' || p.rating >= parseFloat(selectedRating);
    const [prMin, prMax] = selectedPriceRange === 'All' ? [0, Infinity] : selectedPriceRange.split('-').map(Number);
    const matchesPrice   = p.price >= prMin && p.price <= prMax;
    return matchesSearch && matchesCategory && matchesRating && matchesPrice;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-7 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products Management</h1>
          <p className="text-white/50 mt-0.5">Create and manage your store catalog</p>
        </div>
        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={stats.total} icon={Package} color="blue" isLoading={isLoading} />
        <StatCard title="Active Products" value={stats.active} icon={CheckCircle2} color="green" isLoading={isLoading} />
        <StatCard title="Out of Stock" value={stats.outOfStock} icon={AlertCircle} color="red" isLoading={isLoading} />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={onModalClose}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleAddProduct}
          isLoading={isCreating || isUpdating}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search products by name or category..."
            leftIcon={<Search className="h-4 w-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-52 flex-shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-[46px] bg-[#0D1428] text-white/80 border border-white/10 rounded-xl px-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all cursor-pointer hover:border-white/25 hover:bg-white/[0.02]"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-[#0D1428] text-white">
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-44 flex-shrink-0">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="w-full h-[46px] bg-[#0D1428] text-white/80 border border-white/10 rounded-xl px-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all cursor-pointer hover:border-white/25 hover:bg-white/[0.02]"
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0D1428] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-44 flex-shrink-0">
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="w-full h-[46px] bg-[#0D1428] text-white/80 border border-white/10 rounded-xl px-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all cursor-pointer hover:border-white/25 hover:bg-white/[0.02]"
          >
            {PRICE_RANGES.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0D1428] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr className="text-left text-white/40">
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Product Information</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Category</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Pricing</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Inventory</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Rating</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <p className="text-white/20 italic">No products found matching your criteria</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product?.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                          <Image src={product.thumbnail || '/placeholder-product.jpg'} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate max-w-[220px] group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                            {product.name}
                          </p>
                          {/* <p className="text-[10px] text-white/20 font-mono mt-0.5 tracking-tighter">
                            ID: {product.id.split('-').pop()?.toUpperCase()} • {product.brand}
                          </p> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="primary" className="text-[10px]">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-base">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-[10px] text-white/30 line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                            product.stock === 0 ? "text-red-500 bg-red-500" :
                              product.stock < 10 ? "text-amber-500 bg-amber-500" :
                                "text-green-500 bg-green-500"
                          )} />
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-wider",
                            product.stock === 0 ? "text-red-400" :
                              product.stock < 10 ? "text-amber-400" :
                                "text-white/60"
                          )}>
                            {product.stock === 0 ? 'Out of Stock' : `${product.stock} Available`}
                          </span>
                        </div>
                        {!product.isActive && (
                          <Badge variant="danger" className="text-[8px] py-0 px-1 border-none bg-red-500/10">Disabled</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-white">{product.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-white/30">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionDropdown
                        actions={[
                          { label: 'View Page', icon: Eye, onClick: () => window.open(`/products/${product.id}`, '_blank') },
                          { label: 'Edit Details', icon: Edit2, onClick: () => handleEdit(product) },
                          { label: 'Delete Product', icon: Trash2, variant: 'danger', onClick: () => handleDelete(product.id) },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
