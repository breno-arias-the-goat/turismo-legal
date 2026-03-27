'use client';
import { useState, useEffect } from 'react';

interface HeaderProps {
  variant?: 'a' | 'b';
}

export default function Header({ variant = 'a' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const accent = variant === 'a' ? '#0066FF' : '#00C46A';
  const accentShadow = variant === 'a'
    ? '0 2px 8px rgba(0,102,255,.4)'
    : '0 2px 8px rgba(0,196,106,.4)';
  const ctaText = variant === 'a' ? 'Assinar Agora' : 'Começar Grátis';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(6,12,26,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)',
      } : {
        background: 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${variant === 'a' ? '#3B82F6' : '#059669'})`,
              boxShadow: accentShadow,
            }}
          >
            <span className="text-white font-bold text-[13px] tracking-tight">TL</span>
          </div>
          <span className="font-bold text-[17px] text-white/90 tracking-tight">Turismo Legal</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {['Planos', 'Vantagens', 'FAQ', 'Contato'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-medium text-white/55 hover:text-white/90 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-[13px] font-medium text-white/55 hover:text-white/90 transition-colors px-3 py-2"
          >
            Entrar
          </a>
          <a
            href="#planos"
            className="px-4 py-2 text-[13px] font-semibold rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: accent,
              boxShadow: accentShadow,
            }}
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 space-y-1.5">
            <span
              className={`block h-0.5 bg-white/70 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 bg-white/70 rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-white/70 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-1"
          style={{
            background: 'rgba(6,12,26,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {['Planos', 'Vantagens', 'FAQ', 'Contato'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="py-3 text-[15px] font-medium text-white/60 hover:text-white transition-colors border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a href="#" className="text-center py-3 text-sm font-medium text-white/60 border border-white/15 rounded-xl hover:bg-white/5 transition-colors">
              Entrar
            </a>
            <a
              href="#planos"
              className="text-center py-3 text-sm font-semibold text-white rounded-xl"
              style={{ background: accent }}
            >
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
