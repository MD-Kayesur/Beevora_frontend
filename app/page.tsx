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

      {/* Why Choose Us Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white/2 border-y border-white/5 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Star className="h-3.5 w-3.5" />
                <span>Our Promise</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Why <span className="text-gradient">Choose Us</span> for Your Needs?
              </h2>
              
              <p className="text-lg text-white/60 leading-relaxed">
                We are committed to providing the highest quality products. From 100% pure organic honey to premium clothing, every item in our store is carefully curated to meet the highest standards of excellence.
              </p>

              <div className="space-y-6 pt-4">
                {[
                  { title: '100% Authentic Products', desc: 'Sourced directly from trusted manufacturers and beekeepers.' },
                  { title: 'Sustainable Practices', desc: 'Committed to environmentally friendly sourcing and packaging.' },
                  { title: 'Dedicated Support', desc: 'Our team is always here to ensure your complete satisfaction.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images Grid */}
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img src="https://images.unsplash.com/photo-1587049352847-4d4b126a31fc?auto=format&fit=crop&q=80&w=600" alt="Pure Honey" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <p className="text-white font-bold text-lg">Pure Honey</p>
                      <p className="text-white/70 text-sm">Organically sourced</p>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" alt="Premium Clothing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <p className="text-white font-bold text-lg">Premium Clothing</p>
                      <p className="text-white/70 text-sm">Latest fashion trends</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600" alt="Quality Assurance" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <p className="text-white font-bold text-lg">Quality Assured</p>
                      <p className="text-white/70 text-sm">Tested for excellence</p>
                    </div>
                  </div>
                  <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" alt="Fast Delivery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <p className="text-white font-bold text-lg">Global Shipping</p>
                      <p className="text-white/70 text-sm">Fast and reliable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
