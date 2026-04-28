'use client';
import { Shield, FileText, Lock, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function TermsOfServicePage() {
  const lastUpdated = "April 29, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 mb-6">
          <FileText className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-white/50 text-lg">
          Please read these terms carefully before using our platform.
        </p>
        <p className="text-sm text-white/30 mt-4">Last Updated: {lastUpdated}</p>
      </div>

      {/* Content Content */}
      <div className="space-y-12 bg-[#0A0D22]/50 border border-white/5 rounded-3xl p-8 md:p-12">
        
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            By accessing and using Beevora (the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service. We reserve the right to update these terms at any time without notice.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. User Accounts</h2>
          </div>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              To use certain features of the Platform, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information during the registration process.</li>
              <li>Maintain and promptly update your account information to keep it accurate.</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
              <li>Notify us immediately if you discover or suspect any security breaches related to the Platform.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. Product Information & Pricing</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            We strive to display our products, including Honey and Clothing lines, as accurately as possible. However, we do not guarantee that the product descriptions, colors, or other content available on the Platform are entirely accurate, complete, reliable, current, or error-free. Prices for our products are subject to change without notice.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            In no event shall Beevora, its directors, employees, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

      </div>

      {/* Footer Navigation */}
      <div className="mt-12 text-center border-t border-white/10 pt-8">
        <p className="text-white/50 mb-6">
          Have questions about our Terms of Service?
        </p>
        <Link 
          href="/#contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-amber-500/50 hover:bg-amber-500/10 text-white font-medium rounded-xl transition-all duration-200"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
