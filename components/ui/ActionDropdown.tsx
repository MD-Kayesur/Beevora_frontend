'use client';
import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownAction {
  label: string;
  icon: any;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionDropdownProps {
  actions: DropdownAction[];
}

export const ActionDropdown = ({ actions }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[#0D1428] border border-white/10 shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors",
                  action.variant === 'danger' 
                    ? "text-red-400 hover:bg-red-500/10" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
