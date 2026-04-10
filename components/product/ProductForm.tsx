'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Product } from '@/types/product';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const ProductForm = ({ initialData, onSubmit, isLoading }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    category: initialData?.category || PRODUCT_CATEGORIES[0],
    price: initialData?.price?.toString() || '',
    originalPrice: initialData?.originalPrice?.toString() || '',
    stock: initialData?.stock?.toString() || '',
    description: initialData?.description || '',
    thumbnail: initialData?.thumbnail || '',
    sku: initialData?.sku || `BEE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured !== undefined ? initialData.isFeatured : false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in required fields');
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Product Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Headphones"
          required
        />
        <Input
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="e.g. Sony"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="SKU (Auto-generated)"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="BEE-XXXXXX"
          required
        />
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/40 uppercase ml-1">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
            required
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0D1428]">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Stock Quantity *"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Sale Price ($) *"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
        <Input
          label="Original Price ($)"
          name="originalPrice"
          type="number"
          step="0.01"
          value={formData.originalPrice}
          onChange={handleChange}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-white/40 uppercase ml-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
          placeholder="Describe the product..."
        />
      </div>

      <div className="flex gap-6 py-2 px-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500/50 transition-all cursor-pointer"
          />
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Visible in Store</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500/50 transition-all cursor-pointer"
          />
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Featured Product</span>
        </label>
      </div>

      <Input
        label="Thumbnail URL"
        name="thumbnail"
        value={formData.thumbnail}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />

      <div className="pt-4 flex gap-3">
        <Button type="submit" className="flex-1" isLoading={isLoading}>
          {initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};
