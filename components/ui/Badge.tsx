import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border-white/20',
        primary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        success: 'bg-green-500/20 text-green-400 border-green-500/30',
        danger: 'bg-red-500/20 text-red-400 border-red-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant, children, className }: BadgeProps) => {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
};
