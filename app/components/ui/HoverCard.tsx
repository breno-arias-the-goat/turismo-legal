'use client';

import { useRef } from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverBorderColor?: string;
  hoverShadow?: string;
}

export default function HoverCard({ children, className = '', style = {}, hoverBorderColor = 'rgba(0,102,255,0.2)', hoverShadow = '0 4px 8px rgba(0,0,0,.04), 0 12px 32px rgba(0,102,255,.1), 0 24px 48px rgba(0,0,0,.06)' }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s', cursor: 'default' }}
      onMouseEnter={() => {
        if (!ref.current) return;
        ref.current.style.borderColor = hoverBorderColor;
        ref.current.style.transform = 'translateY(-4px)';
        ref.current.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.borderColor = (style.borderColor as string) || '#F3F4F6';
        ref.current.style.transform = 'translateY(0)';
        ref.current.style.boxShadow = (style.boxShadow as string) || 'var(--shadow-card)';
      }}
    >
      {children}
    </div>
  );
}
