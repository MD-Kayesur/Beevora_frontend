'use client';
import { Search, Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { formatDate, getInitials } from '@/lib/utils';
import { useState } from 'react';
import { useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/redux/features/user/userApi';

export default function AdminUsersPage() {
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState('');

  const users = usersData?.data || [];
  
  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const toggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    updateUser({ id, data: { role: newRole } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-white/50 mt-0.5">{users.length} total users</p>
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

      <div className="bg-[#0D1428] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-white/40">
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">User</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Role</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px]">Joined</th>
                <th className="px-5 py-4 uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user: any) => (
                <tr key={user.id || user._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold flex-shrink-0 transition-transform">
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
                      onClick={() => toggleRole(user.id || user._id, user.role)}
                      className={user.role === 'admin' ? 'flex items-center gap-1.5 text-amber-500' : 'flex items-center gap-1.5 text-white/40'}
                    >
                      {user.role === 'admin' ? <ShieldCheck className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                      <span className="text-xs font-bold uppercase tracking-wide">{user.role}</span>
                    </button>
                  </td>
                  <td className="px-5 py-4 text-white/40">{formatDate(user.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDelete(user.id || user._id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10">
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
