import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md animate-in">
        <div className="text-center mb-8">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Package className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white">Bee<span className="text-amber-400">vora</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-white/50 mt-1">Join 120k+ businesses on Beevora</p>
        </div>

        <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-7 shadow-2xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
