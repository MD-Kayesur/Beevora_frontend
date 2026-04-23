import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Shield, Users, Leaf, Target, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | Beevora',
  description: 'Learn more about Beevora – our story, mission, and commitment to premium quality products.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl animate-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Package className="h-3.5 w-3.5" />
            <span>Our Journey</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] mb-8">
            Empowering Businesses through <span className="text-gradient">Pure Excellence</span>
          </h1>
          <p className="text-lg text-white/50 leading-relaxed mb-10">
            Founded with a vision to bridge the gap between quality and commerce, Beevora has evolved into the leading platform for premium B2B and B2C logistics and product sourcing. We believe that every transaction is an opportunity to build trust.
          </p>
          <Link href={ROUTES.PRODUCTS}>
            <Button size="xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Explore Our Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Beevora <span className="text-gradient">DNA</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto">Our values are the foundation of everything we build and every product we source.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Uncompromising Quality', 
                desc: 'Every item in our honey and clothing collections undergoes rigorous testing to meet global standards.',
                color: 'text-amber-400',
                bg: 'bg-amber-400/10'
              },
              { 
                icon: Leaf, 
                title: 'Sustainability', 
                desc: 'From organic harvesting to eco-friendly packaging, we prioritize the health of our planet in every step.',
                color: 'text-green-400',
                bg: 'bg-green-400/10'
              },
              { 
                icon: Users, 
                title: 'Customer First', 
                desc: 'Our dedicated support team and intuitive tools are designed to make your commerce experience seamless.',
                color: 'text-blue-400',
                bg: 'bg-blue-400/10'
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden bg-white/5 border border-white/10 p-2">
                <div className="w-full h-full rounded-[32px] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white/5 font-bold text-8xl italic select-none">
                  BEEVORA
                </div>
             </div>
          </div>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-white/50 leading-relaxed">
                  To provide a world-class commerce ecosystem where high-quality products are accessible to everyone, backed by efficient logistics and innovative technology.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-white/50 leading-relaxed">
                  To become the most trusted global destination for premium goods, fostering a community of satisfied customers and successful business partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32 pt-10">
        <div className="max-w-4xl mx-auto p-12 rounded-[32px] glass border-white/10 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-bold text-white mb-4">Be Part of the Story</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Join thousands of others who choose Beevora for premium products and reliable service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href={ROUTES.REGISTER}>
               <Button size="xl">Join as Member</Button>
             </Link>
             <Link href={ROUTES.PRODUCTS}>
               <Button size="xl" variant="secondary">Start Shopping</Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
