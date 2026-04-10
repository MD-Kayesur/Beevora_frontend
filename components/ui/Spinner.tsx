import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

export const Spinner = ({ size = 'md', className, label }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-amber-500', sizes[size], className)} />
      {label && <p className="text-sm text-white/50">{label}</p>}
    </div>
  );
};

export const PageSpinner = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Spinner size="lg" label={label} />
  </div>
);
