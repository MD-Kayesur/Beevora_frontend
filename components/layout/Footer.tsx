import Link from 'next/link';
import { Package, Globe, User2, Code, Mail } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: 'All Products', href: ROUTES.PRODUCTS },
      { label: 'Cart', href: ROUTES.CART },
    ],
    Account: [
      { label: 'Login', href: ROUTES.LOGIN },
      { label: 'Register', href: ROUTES.REGISTER },
      { label: 'Dashboard', href: ROUTES.USER_DASHBOARD },
      { label: 'My Orders', href: ROUTES.USER_ORDERS },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#07091A] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Package className="h-5 w-5 text-black" />
              </div>
              <span className="text-2xl font-bold text-white">
                Bee<span className="text-amber-400">vora</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5 max-w-xs">
              The premium B2B & B2C commerce platform. Discover, shop, and grow your business with confidence.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, User2, Code, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/30">© {year} Beevora. All rights reserved.</p>
          <p className="text-sm text-white/30">
            Built with <span className="text-amber-400">♥</span> using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};
