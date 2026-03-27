import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: 'default' | 'gold' | 'green' | 'light';
  hover?: boolean;
  featured?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  style,
  variant = 'default',
  hover = false,
  featured = false,
}: GlassCardProps) {
  const base = 'rounded-2xl backdrop-blur-xl transition-all duration-300';

  const variants = {
    default: 'bg-white/5 border border-white/10',
    gold:    'bg-gradient-to-br from-[#1A1500] to-[#0D0D0D] border border-[#D4AF37]/30',
    green:   'bg-white/5 border border-[#00C46A]/20',
    light:   'bg-white border border-gray-100/80',
  };

  const hoverStyles = hover ? 'hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 cursor-pointer' : '';
  const featuredStyles = featured ? 'scale-[1.03] z-10' : '';

  return (
    <div
      className={`${base} ${variants[variant]} ${hoverStyles} ${featuredStyles} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
