'use client';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Package, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@/lib/utils';

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: ROUTES.HOME, label: 'Home' },
    { href: ROUTES.PRODUCTS, label: 'Products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0F1E]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Package className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">
              Bee<span className="text-amber-400">vora</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10 transition-all">
              <Search className="h-4 w-4" />
              <span>Search...</span>
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {mounted && (
              isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black text-xs font-bold">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-sm text-white/80 hidden sm:block">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-[#0D1428] border border-white/10 shadow-2xl py-1 overflow-hidden">
                      <Link href={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <LayoutDashboard className="h-4 w-4" />Dashboard
                      </Link>
                      <Link href={ROUTES.USER_ORDERS}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <Package className="h-4 w-4" />My Orders
                      </Link>
                      <Link href={ROUTES.USER_PROFILE}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <User className="h-4 w-4" />Profile
                      </Link>
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut className="h-4 w-4" />Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={ROUTES.LOGIN}>
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link href={ROUTES.REGISTER}>
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center py-2.5 px-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
