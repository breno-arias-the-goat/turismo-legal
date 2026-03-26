'use client';
import { useState, useEffect } from 'react';

interface HeaderProps {
  variant?: 'a' | 'b';
}

export default function Header({ variant = 'a' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0066FF' }}>
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <span className="font-bold text-xl" style={{ color: '#111827' }}>Turismo Legal</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#planos" className="text-sm font-medium hover:text-blue-600 transition-colors" style={{ color: '#374151' }}>Planos</a>
          <a href="#vantagens" className="text-sm font-medium hover:text-blue-600 transition-colors" style={{ color: '#374151' }}>Vantagens</a>
          <a href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors" style={{ color: '#374151' }}>FAQ</a>
          <a href="#contato" className="text-sm font-medium hover:text-blue-600 transition-colors" style={{ color: '#374151' }}>Contato</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#0066FF', color: '#0066FF' }}
          >
            Entrar
          </button>
          {variant === 'b' && (
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors"
              style={{ background: '#10B981' }}
            >
              Começar Grátis
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-gray-800 transition-all"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <a href="#planos" className="text-sm font-medium text-gray-700">Planos</a>
          <a href="#vantagens" className="text-sm font-medium text-gray-700">Vantagens</a>
          <a href="#faq" className="text-sm font-medium text-gray-700">FAQ</a>
          <a href="#contato" className="text-sm font-medium text-gray-700">Contato</a>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-lg border-2 text-center"
            style={{ borderColor: '#0066FF', color: '#0066FF' }}
          >
            Entrar
          </button>
        </div>
      )}
    </header>
  );
}
