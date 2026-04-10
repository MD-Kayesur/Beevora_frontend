'use client';
import { Search, Edit2, Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getInitials } from '@/lib/utils';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { adminDeleteUser, adminUpdateUserRole } from '@/store/slices/authSlice';
import { useState } from 'react';

export default function AdminUsersPage() {
  const { mockUsers } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(adminDeleteUser(id));
    }
  };

  const toggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    dispatch(adminUpdateUserRole({ id, role: newRole as any }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-white/50 mt-0.5">{mockUsers.length} total users</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input 
            placeholder="Search users..." 
            leftIcon={<Search className="h-4 w-4" />} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-white/40">
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">User</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Role</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px]">Joined</th>
                <th className="px-5 py-4 font-medium uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-amber-400 transition-colors">{user.name}</p>
                        <p className="text-xs text-white/30">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button 
                      onClick={() => toggleRole(user.id, user.role)}
                      className={user.role === 'admin' ? 'flex items-center gap-1.5 text-amber-500 hover:text-amber-400 transition-colors' : 'flex items-center gap-1.5 text-white/40 hover:text-white transition-colors'}
                    >
                      {user.role === 'admin' ? <ShieldCheck className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                      <span className="text-xs font-bold uppercase tracking-wide">{user.role}</span>
                    </button>
                  </td>
                  <td className="px-5 py-4 text-white/40">{formatDate(user.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
