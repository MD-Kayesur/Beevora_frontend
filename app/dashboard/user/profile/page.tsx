'use client';
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@/lib/utils';
import { useAppSelector } from '@/hooks/useRedux';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';

export default function UserProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfileMutation(profile).unwrap();
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-white/50 mt-0.5">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#0D1428] border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black text-xl font-bold flex-shrink-0">
          {getInitials(profile.name)}
        </div>
        <div>
          <p className="font-bold text-white text-lg">{profile.name}</p>
          <p className="text-sm text-white/50">{profile.email}</p>
        </div>
        <Button variant="secondary" size="sm" className="ml-auto">Change Photo</Button>
      </div>

      {/* Personal Info */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-amber-400" />
          <h2 className="font-bold text-white">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" value={profile.name} onChange={handleChange('name')} leftIcon={<User className="h-4 w-4" />} />
          <Input label="Email" value={profile.email} onChange={handleChange('email')} leftIcon={<Mail className="h-4 w-4" />} type="email" />
          <Input label="Phone" value={profile.phone} onChange={handleChange('phone')} leftIcon={<Phone className="h-4 w-4" />} />
        </div>
      </div>

      {/* Address */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-amber-400" />
          <h2 className="font-bold text-white">Default Address</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Street" value={profile.street} onChange={handleChange('street')} className="sm:col-span-2" />
          <Input label="City" value={profile.city} onChange={handleChange('city')} />
          <Input label="State" value={profile.state} onChange={handleChange('state')} />
          <Input label="ZIP Code" value={profile.zipCode} onChange={handleChange('zipCode')} />
          <Input label="Country" value={profile.country} onChange={handleChange('country')} />
        </div>
      </div>

      <Button size="lg" leftIcon={<Save className="h-5 w-5" />} onClick={handleSave} isLoading={isSaving}>
        Save Changes
      </Button>
    </div>
  );
}
