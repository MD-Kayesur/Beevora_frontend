import React from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  highlightText?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColorClass?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightText,
  subtitle,
  icon: Icon,
  iconColorClass = "text-amber-400",
  viewAllHref,
  viewAllLabel = "View All"
}) => {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        {subtitle && (
          <div className={`flex items-center gap-2 ${iconColorClass} font-bold tracking-widest uppercase text-xs mb-3`}>
            {Icon && <Icon className="h-4 w-4" />}
            <span>{subtitle}</span>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          {title} {highlightText && <span className="text-gradient">{highlightText}</span>}
        </h2>
      </div>
      {viewAllHref && (
        <Link 
          href={viewAllHref} 
          className={`group flex items-center gap-2 text-sm font-bold text-white/50 hover:${iconColorClass.replace('text-', 'text-')} transition-colors`}
        >
          {viewAllLabel} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
