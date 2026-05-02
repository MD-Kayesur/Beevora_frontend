import React from 'react';

interface StatusBadgeProps {
  isConnected: boolean;
  onlineLabel?: string;
  offlineLabel?: string;
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  isConnected, 
  onlineLabel = 'Live', 
  offlineLabel = 'Offline',
  showDot = true,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
      isConnected 
      ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.1)]' 
      : 'bg-red-500/10 border-red-500/20 text-red-400'
    } ${className}`}>
      {showDot && (
        <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
      )}
      {isConnected ? onlineLabel : offlineLabel}
    </div>
  );
};
