'use client';
import { Plus, Search, Edit2, Trash2, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useProducts } from '@/hooks/useProducts';
import { useAppDispatch } from '@/hooks/useRedux';
import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/product/ProductForm';
import { createProduct, deleteProduct, updateProduct } from '@/store/slices/productSlice';

export default function AdminProductsPage() {
  const { products, total, isLoading } = useProducts();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = async (data: any) => {
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct.id, updates: data })).unwrap();
      } else {
        await dispatch(createProduct(data)).unwrap();
      }
      setIsAddModalOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      alert(error || 'Failed to save product');
    }
  };

  const onModalClose = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-white/50 mt-0.5">{total} products in catalog</p>
        </div>
        <Button 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Product
        </Button>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={onModalClose}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm 
          initialData={editingProduct || undefined} 
          onSubmit={handleAddProduct} 
          isLoading={isLoading} 
        />
      </Modal>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input 
            placeholder="Search products..." 
            leftIcon={<Search className="h-4 w-4" />} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-white/40">
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Product</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Category</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Price</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Stock</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Rating</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                        <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate max-w-[200px] group-hover:text-amber-400 transition-colors">{product.name}</p>
                        <p className="text-[10px] text-white/20 font-mono tracking-tighter">{product.id.split('-').pop()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/60">{product.category}</td>
                  <td className="px-5 py-4 font-bold text-white">{formatPrice(product.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase ${product.stock === 0 ? 'text-red-400' : product.stock < 10 ? 'text-amber-400' : 'text-green-400/70'}`}>
                      {product.stock === 0 ? 'Sold Out' : `${product.stock} in Stock`}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="text-[11px] font-bold text-white/50">{product.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/products/${product.id}`}>
                        <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-white/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
