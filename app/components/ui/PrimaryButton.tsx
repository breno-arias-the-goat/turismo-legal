import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  variant?: 'a' | 'b' | 'gold' | 'outline-a' | 'outline-b' | 'outline-white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  arrow?: boolean;
}

export default function PrimaryButton({
  children,
  variant = 'a',
  size = 'md',
  href = '#',
  className = '',
  arrow = false,
}: PrimaryButtonProps) {
  const sizes = {
    sm:  'px-5  py-2.5  text-[13px] rounded-xl',
    md:  'px-6  py-3.5  text-[14px] rounded-xl',
    lg:  'px-8  py-4    text-[15px] rounded-xl',
    xl:  'px-10 py-5    text-[17px] rounded-2xl',
  };

  const variants: Record<string, string> = {
    a: [
      'bg-[#0066FF] text-white font-semibold',
      'shadow-[0_2px_4px_rgba(0,102,255,.3),0_8px_24px_rgba(0,102,255,.35)]',
      'hover:shadow-[0_4px_8px_rgba(0,102,255,.4),0_16px_40px_rgba(0,102,255,.5)]',
      'hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),

    b: [
      'bg-[#00C46A] text-white font-semibold',
      'shadow-[0_2px_4px_rgba(0,196,106,.3),0_8px_24px_rgba(0,196,106,.35)]',
      'hover:shadow-[0_4px_8px_rgba(0,196,106,.4),0_16px_40px_rgba(0,196,106,.5)]',
      'hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),

    gold: [
      'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0A0A0A] font-bold',
      'shadow-[0_2px_4px_rgba(212,175,55,.3),0_8px_24px_rgba(212,175,55,.4)]',
      'hover:shadow-[0_4px_8px_rgba(212,175,55,.5),0_16px_40px_rgba(212,175,55,.5)]',
      'hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),

    'outline-a': [
      'border border-[#0066FF] text-[#0066FF] font-semibold bg-transparent',
      'hover:bg-[#0066FF]/5 hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),

    'outline-b': [
      'border border-[#00C46A] text-[#00C46A] font-semibold bg-transparent',
      'hover:bg-[#00C46A]/5 hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),

    'outline-white': [
      'border border-white/25 text-white font-semibold bg-transparent',
      'hover:bg-white/8 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <svg
          className="w-4 h-4 animate-arrow"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      )}
    </a>
  );
}
