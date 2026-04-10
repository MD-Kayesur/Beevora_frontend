'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const { register, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push(ROUTES.ADMIN_DASHBOARD);
      } else {
        router.push(ROUTES.USER_DASHBOARD);
      }
    }
  }, [isAuthenticated, user, router]);
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const errors: Partial<typeof formData> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const { confirmPassword, ...payload } = formData;
    void confirmPassword;
    await register(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
      )}

      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        error={formErrors.name}
        leftIcon={<User className="h-4 w-4" />}
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
        leftIcon={<Mail className="h-4 w-4" />}
      />

      <Input
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Min. 8 characters"
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
        leftIcon={<Lock className="h-4 w-4" />}
        hint="Use uppercase, lowercase, and numbers"
        rightIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70 transition-colors">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={formErrors.confirmPassword}
        leftIcon={<Lock className="h-4 w-4" />}
      />

      <p className="text-xs text-white/40">
        By registering you agree to our{' '}
        <a href="#" className="text-amber-400 hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>.
      </p>

      <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-white/50">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
};
