import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className, hover = false, glass = false, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-white/10 p-5',
        glass ? 'bg-white/5 backdrop-blur-sm' : 'bg-[#0D1428]',
        hover && 'cursor-pointer transition-all duration-200 hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('text-lg font-bold text-white', className)}>{children}</h3>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('text-white/70', className)}>{children}</div>
);
