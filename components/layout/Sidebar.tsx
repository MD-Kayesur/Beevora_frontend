'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
}

export const Sidebar = ({ items, title }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0D1428] border-r border-white/10 p-5">
      {title && (
        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5 px-2">{title}</h2>
      )}
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-amber-400' : 'text-white/40')} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
