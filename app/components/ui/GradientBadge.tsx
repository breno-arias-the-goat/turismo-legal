import { ReactNode } from 'react';

interface GradientBadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'gold' | 'green' | 'glass' | 'blue-light' | 'green-light';
  className?: string;
  dot?: boolean;
}

export default function GradientBadge({
  children,
  variant = 'blue',
  className = '',
  dot = false,
}: GradientBadgeProps) {
  const variants = {
    blue:        'bg-[#0066FF]/15 border border-[#0066FF]/25 text-[#60A5FA]',
    gold:        'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0A0A0A] border-0',
    green:       'bg-[#00C46A]/15 border border-[#00C46A]/25 text-[#34D399]',
    glass:       'glass text-white/70 border-white/10',
    'blue-light':'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]',
    'green-light':'bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]',
  };

  const dotColors = {
    blue:        'bg-[#60A5FA]',
    gold:        'bg-[#0A0A0A]',
    green:       'bg-[#34D399]',
    glass:       'bg-white/60',
    'blue-light':'bg-[#3B82F6]',
    'green-light':'bg-[#10B981]',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1.5 rounded-full
        text-[11px] font-semibold tracking-[0.06em] uppercase
        ${variants[variant]} ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
