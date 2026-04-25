import type { Metadata } from 'next';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Beevora',
  description: 'Learn how Beevora collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 25, 2026';

  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email address, shipping address, and payment information.',
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process your transactions, send you technical notices, and provide customer support.',
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: 'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.',
    },
    {
      icon: FileText,
      title: 'Your Choices',
      content: 'You may update or correct your account information at any time by logging into your account settings. You may also opt out of receiving promotional communications from us.',
    },
  ];

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Shield className="h-4 w-4" />
          <span>Trust & Safety</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy <span className="text-gradient">Policy</span></h1>
        <p className="text-white/40">Last Updated: {lastUpdated}</p>
      </div>

      <div className="space-y-12">
        <div className="glass p-8 rounded-[32px] border-white/10">
          <p className="text-white/60 leading-relaxed mb-6">
            At Beevora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p className="text-white/60 leading-relaxed">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="relative group">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full opacity-50" />
            <div className="pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <section.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-white/50 leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        ))}

        <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-white/50 leading-relaxed mb-8">
            If you have any questions or concerns about this Privacy Policy, please contact our data protection officer:
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-white/70">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ChevronRight className="h-5 w-5" />
              </div>
              <span>Email: privacy@beevora.com</span>
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ChevronRight className="h-5 w-5" />
              </div>
              <span>Support: rmdkayesur@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
