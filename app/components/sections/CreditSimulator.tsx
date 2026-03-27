'use client';
import { useState, useRef, useEffect } from 'react';

interface CreditSimulatorProps {
  variant?: 'a' | 'b';
}

export default function CreditSimulator({ variant = 'b' }: CreditSimulatorProps) {
  const [value, setValue] = useState(5000);
  const [months, setMonths] = useState(24);
  const sliderRef = useRef<HTMLInputElement>(null);

  const accent = variant === 'a' ? '#0066FF' : '#00C46A';
  const sliderClass = variant === 'a' ? 'slider-a' : 'slider-b';

  // Monthly rate ~1.8% (consignado CLT)
  const rate = 0.018;
  const monthly = value * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  const total = monthly * months;
  const formatted = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  // Update CSS variable for slider fill
  useEffect(() => {
    if (sliderRef.current) {
      const pct = ((value - 1000) / (10000 - 1000)) * 100;
      sliderRef.current.style.setProperty('--val', `${pct}%`);
    }
  }, [value]);

  const monthOptions = [6, 12, 18, 24, 30, 36];

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80"/>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"/>
          <span className="w-3 h-3 rounded-full bg-green-500/80"/>
        </div>
        <span className="text-[11px] text-white/30 ml-2 font-mono">simulador_credito.exe</span>
      </div>

      {/* Resultado principal */}
      <div className="text-center mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Parcela estimada
        </p>
        <div
          className="font-extrabold"
          style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '-0.04em', color: accent }}
        >
          {months}× {formatted(monthly)}
        </div>
        <p className="text-[12px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Total {formatted(total)} · Taxa ~1.8%/mês
        </p>
      </div>

      {/* Slider de valor */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Valor solicitado</span>
          <span className="text-[14px] font-bold text-white">{formatted(value)}</span>
        </div>
        <input
          ref={sliderRef}
          type="range"
          className={`w-full ${sliderClass}`}
          min={1000} max={10000} step={500}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>R$ 1.000</span>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>R$ 10.000</span>
        </div>
      </div>

      {/* Prazo */}
      <div className="mb-6">
        <p className="text-[12px] font-medium mb-2.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Prazo</p>
        <div className="grid grid-cols-6 gap-1.5">
          {monthOptions.map(m => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className="py-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
              style={months === m
                ? { background: accent, color: '#fff', boxShadow: `0 2px 8px ${accent}50` }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {m}x
            </button>
          ))}
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {[
          { label: 'Aprovação', value: 'Até 48h' },
          { label: 'Desconto', value: 'Em folha' },
          { label: 'Consulta SPC', value: 'Não precisa' },
          { label: 'Contratação', value: '100% digital' },
        ].map(item => (
          <div key={item.label} className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</p>
            <p className="text-[13px] font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#credito"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-[14px] text-white transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: accent,
          boxShadow: `0 2px 4px ${accent}40, 0 8px 24px ${accent}35`,
        }}
      >
        Solicitar {formatted(value)} agora
        <svg className="w-4 h-4 animate-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
      <p className="text-center text-[11px] mt-2.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
        *Simulação ilustrativa. Sujeito à análise de crédito.
      </p>
    </div>
  );
}
