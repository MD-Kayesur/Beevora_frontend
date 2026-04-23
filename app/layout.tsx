import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ChatWidget } from '@/components/layout/ChatWidget';
import ReduxProvider from '@/context/ReduxProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: { default: 'Beevora – Premium Business eCommerce', template: '%s | Beevora' },
  description: 'The premium B2B & B2C commerce platform. Discover, shop, and grow your business with confidence.',
  keywords: ['ecommerce', 'business', 'products', 'b2b', 'b2c', 'beevora'],
  openGraph: {
    title: 'Beevora – Premium Business eCommerce',
    description: 'Discover, shop, and grow your business with confidence.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ReduxProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1 page-gradient">{children}</main>
          <Footer />
          <ChatWidget />
        </ReduxProvider>
      </body>
    </html>
  );
}
