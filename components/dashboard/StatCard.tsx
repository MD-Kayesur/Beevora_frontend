import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  subtitle?: string;
  color?: 'amber' | 'blue' | 'green' | 'purple' | 'red';
  isLoading?: boolean;
}

const colorMap = {
  amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400',
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
  green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
  red: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400',
};

export const StatCard = ({ title, value, icon: Icon, change, subtitle, color = 'amber', isLoading = false }: StatCardProps) => {
  const colors = colorMap[color];
  const isPositive = change !== undefined && change >= 0;

  if (isLoading) {
    return (
      <div className={cn('rounded-2xl border p-5 bg-[#0D1428] border-white/10 animate-pulse')}>
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-8 w-24 bg-white/10 rounded" />
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 w-11 h-11" />
        </div>
        <div className="h-4 w-32 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl bg-gradient-to-br border p-5', colors)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
        </div>
        <div className={cn('p-2.5 rounded-xl bg-current/10')}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', isPositive ? 'text-green-400' : 'text-red-400')}>
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{Math.abs(change)}% vs last month</span>
        </div>
      )}
    </div>
  );
};

interface RecentActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  status?: string;
}

export const RecentActivity = ({ items, title = 'Recent Activity' }: { items: RecentActivityItem[]; title?: string }) => {
  return (
    <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
              {item.title[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.title}</p>
              <p className="text-xs text-white/40 truncate">{item.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40">{item.time}</p>
              {item.status && <p className="text-xs text-amber-400 mt-0.5">{item.status}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
