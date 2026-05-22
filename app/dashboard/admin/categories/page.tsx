'use client';
import { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  ICategory,
} from '@/redux/features/category/categoryApi';
import { toast } from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🏷️');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) { toast.error('Category name is required'); return; }
    try {
      await createCategory({ name: name.trim(), description: description.trim(), icon: icon.trim() || '🏷️' }).unwrap();
      toast.success('Category created!');
      setName(''); setDescription(''); setIcon('🏷️');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create category');
    }
  };

  const startEdit = (cat: ICategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || '');
    setEditIcon(cat.icon || '🏷️');
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory({ id, updates: { name: editName, description: editDescription, icon: editIcon } }).unwrap();
      toast.success('Category updated!');
      setEditingId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update category');
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Delete category "${catName}"? Products using this category will not be deleted.`)) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success('Category deleted!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete category');
    }
  };

  const EMOJI_PRESETS = ['🏷️', '🍯', '👗', '📦', '💄', '🌿', '⚽', '📚', '🏠', '🎮', '🚗', '💎'];

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Categories Management</h1>
        <p className="text-white/50 mt-0.5">Create and manage product categories shown in the navbar</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard title="Total Categories" value={categories.length} icon={Tag} color="blue" isLoading={isLoading} />
        <StatCard title="Active Categories" value={categories.filter(c => c.isActive).length} icon={Tag} color="green" isLoading={isLoading} />
      </div>

      {/* Add Category Form */}
      <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-amber-400" />
          Add New Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Category Name *"
            placeholder="e.g. Organic Honey"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Description (optional)"
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Icon</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {EMOJI_PRESETS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setIcon(emoji)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${icon === emoji ? 'border-amber-500 bg-amber-500/20' : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
              >
                {emoji}
              </button>
            ))}
            <Input
              placeholder="Custom emoji"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-24"
            />
          </div>
        </div>
        <Button
          leftIcon={isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          onClick={handleCreate}
          disabled={isCreating || !name.trim()}
        >
          {isCreating ? 'Creating...' : 'Create Category'}
        </Button>
      </div>

      {/* Categories Table */}
      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr className="text-left text-white/40">
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Icon</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Name</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Slug</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Description</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-amber-400 mx-auto" />
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <p className="text-white/20 italic">No categories yet. Create one above!</p>
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors group">
                    {editingId === cat.id ? (
                      <>
                        <td className="px-6 py-4">
                          <Input value={editIcon} onChange={(e) => setEditIcon(e.target.value)} className="w-16 text-center" />
                        </td>
                        <td className="px-6 py-4">
                          <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white/30 text-xs font-mono">{cat.slug}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description..." />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(cat.id)}
                              disabled={isUpdating}
                              className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
                            >
                              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-all"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-white group-hover:text-amber-400 transition-colors">{cat.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white/40 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">{cat.slug}</span>
                        </td>
                        <td className="px-6 py-4 text-white/50 text-xs max-w-xs truncate">{cat.description || '—'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEdit(cat)}
                              className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cat.id, cat.name)}
                              className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
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
