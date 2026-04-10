import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md animate-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Package className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white">Bee<span className="text-amber-400">vora</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-white/50 mt-1">Sign in to your Beevora account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-7 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
