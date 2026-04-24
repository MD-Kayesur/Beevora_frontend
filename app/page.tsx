import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, Truck, Star, Zap, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { FeaturedSections } from '@/components/product/FeaturedSections';
import { ContactForm } from '@/components/contact/ContactForm';


export const metadata: Metadata = {
  title: 'Beevora – Premium Business eCommerce',
};

const features = [
  { icon: Shield, title: 'Secure Payments', desc: 'Bank-level encryption on every transaction.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Free shipping on orders over $100.' },
  { icon: Star, title: 'Top Quality', desc: 'Curated products from trusted brands.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and performance.' },
];

const stats = [
  { value: '50K+', label: 'Products' },
  { value: '120K+', label: 'Customers' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Coupon Banner */}
      <div className="bg-amber-500 py-2.5 px-4 text-center">
        <p className="text-xs font-bold text-black uppercase tracking-[0.2em]">
          🎉 Limited Time: Use code <span className="underline decoration-2 underline-offset-4">BEEVORA25</span> for 25% off your first order!
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-28 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl" />
        </div>

        <div className="text-center animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            <span>The Future of Business Commerce</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Commerce Built for{' '}
            <span className="text-gradient">Business Scale</span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Beevora is your all-in-one B2B & B2C eCommerce platform. Discover premium products,
            manage orders, and grow your business — all in one beautiful place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Browse Products
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button size="xl" variant="secondary" leftIcon={<ShoppingBag className="h-5 w-5" />}>
                Start for Free
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 p-8 rounded-3xl glass">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedSections />


      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-gradient">Beevora</span>?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            We combine the best of modern tech with business-grade features to deliver an unmatched commerce experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Join over 120,000 businesses already growing with Beevora. Set up your store in minutes.
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button size="xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed text-lg max-w-lg">
              Have questions about our products or partnership opportunities? Our team is here to help you scale your business.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email Us', value: 'support@beevora.com' },
                { icon: Phone, label: 'Call Us', value: '+880 1926-360430' },
                { icon: MapPin, label: 'Visit Us', value: 'Dhaka, Bangladesh' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-5 p-4 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
