'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import GrowthProjection from './components/GrowthProjection';

/* ─── Intersection Observer Hook ──────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated Counter ────────────────────────────────────────── */
function Counter({ end, prefix = '', suffix = '', duration = 1800, decimals = 0 }: { end: number; prefix?: string; suffix?: string; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * end).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, end, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? val.toFixed(decimals).replace('.', ',') : Math.round(val).toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

/* ─── Section Wrapper ─────────────────────────────────────────── */
function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Metric Card ─────────────────────────────────────────────── */
function MetricCard({ label, value, sub, accent = 'blue', delay = 0 }: { label: string; value: string | React.ReactNode; sub?: string; accent?: 'blue' | 'gold' | 'green' | 'red'; delay?: number }) {
  const colors = {
    blue: { border: 'rgba(59,130,246,0.3)', glow: 'rgba(59,130,246,0.1)', text: '#60A5FA' },
    gold: { border: 'rgba(212,175,55,0.3)', glow: 'rgba(212,175,55,0.1)', text: '#F59E0B' },
    green: { border: 'rgba(0,196,106,0.3)', glow: 'rgba(0,196,106,0.1)', text: '#34D399' },
    red: { border: 'rgba(239,68,68,0.3)', glow: 'rgba(239,68,68,0.1)', text: '#F87171' },
  };
  const c = colors[accent];
  return (
    <FadeSection delay={delay}>
      <div
        className="rounded-2xl p-6 flex flex-col gap-2 h-full"
        style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`, border: `1px solid ${c.border}`, boxShadow: `0 0 30px ${c.glow}` }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: c.text }}>{label}</p>
        <div className="text-3xl font-black" style={{ color: '#FFFFFF' }}>{value}</div>
        {sub && <p className="text-sm" style={{ color: '#64748B' }}>{sub}</p>}
      </div>
    </FadeSection>
  );
}

/* ─── Pillar Card ─────────────────────────────────────────────── */
function PillarCard({ icon, title, desc, detail, delay = 0 }: { icon: string; title: string; desc: string; detail: string; delay?: number }) {
  return (
    <FadeSection delay={delay}>
      <div className="glass rounded-3xl p-8 h-full flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300">
        <div className="text-5xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
        <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="text-sm font-semibold gradient-text-gold">{detail}</span>
        </div>
      </div>
    </FadeSection>
  );
}

/* ─── Phase Card ──────────────────────────────────────────────── */
function PhaseCard({ num, period, title, items, accent, delay = 0 }: { num: string; period: string; title: string; items: string[]; accent: string; delay?: number }) {
  return (
    <FadeSection delay={delay}>
      <div className="relative glass rounded-3xl p-8 h-full">
        <div className="absolute -top-5 left-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white" style={{ background: accent }}>
            {num}
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 mt-4" style={{ color: accent }}>{period}</p>
        <h3 className="text-lg font-bold text-white mb-5">{title}</h3>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#94A3B8' }}>
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeSection>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Apresentacao() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#060C1A', color: '#ffffff', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6,12,26,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white animate-glow-gold" style={{ background: 'linear-gradient(135deg, #D4AF37, #F59E0B)' }}>TL</div>
            <span className="font-bold text-lg text-white">Turismo Legal</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>Executivo</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Diagnóstico', 'Solução', 'Estratégia', 'Projeção', 'Roadmap', 'KPIs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} className="text-sm transition-colors hover:text-white" style={{ color: '#64748B' }}>
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className="block h-0.5 rounded transition-all" style={{ background: '#94A3B8', width: menuOpen ? '100%' : '100%' }} />
            <span className="block h-0.5 rounded transition-all" style={{ background: '#94A3B8', opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-0.5 rounded transition-all" style={{ background: '#94A3B8', width: menuOpen ? '100%' : '70%' }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ background: 'rgba(6,12,26,0.98)' }}>
            {['Diagnóstico', 'Solução', 'Estratégia', 'Projeção', 'Roadmap', 'KPIs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} onClick={() => setMenuOpen(false)} className="text-sm py-2" style={{ color: '#94A3B8' }}>
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid bg-dark-a">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float-delay" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-32 text-center">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-3 mb-8">
            <span className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)' }}>
              Apresentação Executiva Confidencial
            </span>
          </div>

          {/* Headline */}
          <h1 className="display-xl animate-fade-up delay-100 mb-4">
            <span className="gradient-text-gold">Turismo</span>{' '}
            <span style={{ color: '#ffffff' }}>Legal</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#94A3B8' }}>
            Estratégia de Reposicionamento e Escala · Plano de 12 meses para transformação completa da operação
          </p>

          {/* Hero Metric */}
          <div className="animate-fade-up delay-300 inline-block mb-12">
            <div
              className="rounded-3xl px-8 py-6 animate-glow-gold"
              style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(245,158,11,0.06) 100%)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#D4AF37' }}>Objetivo Central</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-black" style={{ color: '#64748B' }}>R$ 8 mil</div>
                  <div className="text-xs" style={{ color: '#475569' }}>receita atual/mês</div>
                </div>
                <div className="text-3xl md:text-5xl font-black gradient-text-gold">→</div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-black gradient-text-gold">R$ 5 Milhões</div>
                  <div className="text-xs" style={{ color: '#D4AF37' }}>receita alvo/mês</div>
                </div>
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}>
                <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>625× crescimento · em 12 meses</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#diagnostico"
              className="group px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F59E0B)', color: '#000000', boxShadow: '0 4px 20px rgba(212,175,55,0.4)' }}
            >
              Explorar Estratégia
              <span className="inline-block ml-2 animate-arrow">↓</span>
            </a>
            <Link
              href="/vendas/teste-a"
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Ver Páginas de Vendas →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-12 rounded-full" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
        </div>
      </section>

      {/* ── DIAGNÓSTICO ──────────────────────────────────────── */}
      <section id="diagnostico" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="section-label" style={{ color: '#F87171' }}>Fase 01</span>
              <h2 className="display-md text-white mt-3 mb-4">Diagnóstico da Operação</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                Os dados reais do primeiro ciclo revelam um produto sólido com posicionamento errado — não um produto ruim.
              </p>
            </div>
          </FadeSection>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <MetricCard label="Clientes Captados" value={<Counter end={512} />} sub="1º lançamento" accent="blue" delay={0} />
            <MetricCard label="Investimento em Mídia" value={<><Counter end={94363} prefix="R$ " /></>} sub="total investido" accent="gold" delay={80} />
            <MetricCard label="CAC" value={<Counter end={184} prefix="R$ " suffix=",31" />} sub="custo por cliente" accent="blue" delay={160} />
            <MetricCard label="CPL" value={<Counter end={3} prefix="R$ " suffix=",55" />} sub="custo por lead" accent="green" delay={240} />
            <MetricCard label="Taxa de Conversão" value={<Counter end={2.08} suffix="%" decimals={2} />} sub="leads → clientes" accent="gold" delay={320} />
            <MetricCard label="Churn Atual" value={<Counter end={86.7} suffix="%" decimals={1} />} sub="80 de 600 ativos" accent="red" delay={400} />
          </div>

          {/* Insight card */}
          <FadeSection delay={200}>
            <div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(212,175,55,0.05) 100%)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #EF4444, transparent)', filter: 'blur(50px)' }} />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#F87171' }}>Análise do Problema</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    O produto não era o problema.<br />
                    <span className="gradient-text-gold">O posicionamento era.</span>
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                    O Turismo Legal foi apresentado como um "passaporte para parque aquático", captando a base de clientes do parque — pessoas com expectativas completamente diferentes do valor real da plataforma.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: 'rgba(239,68,68,0.2)', color: '#F87171' }}>✗</div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">Posicionamento Antigo</p>
                        <p className="text-sm" style={{ color: '#64748B' }}>"Passaporte para o parque aquático" — audiência errada, expectativa errada, churn massivo.</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-5" style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}>✓</div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">Dado Positivo Escondido</p>
                        <p className="text-sm" style={{ color: '#64748B' }}>77% de retenção imediata entre clientes que entenderam o produto. A prova de que o produto funciona.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── SOLUÇÃO / NOVO POSICIONAMENTO ────────────────────── */}
      <section id="solucao" className="relative py-24 overflow-hidden bg-dark-a-2">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="section-label" style={{ color: '#D4AF37' }}>Fase 02</span>
              <h2 className="display-md text-white mt-3 mb-4">Novo Posicionamento</h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748B' }}>
                Reposicionado como <strong className="text-white">Programa de Turismo Acessível para o Trabalhador CLT</strong> — estética institucional que transmite segurança, transparência e lazer como um direito.
              </p>
            </div>
          </FadeSection>

          {/* Repositioning badge */}
          <FadeSection delay={100}>
            <div className="flex justify-center mb-14">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}>
                <span className="text-sm" style={{ color: '#64748B' }}>Posicionamento antigo</span>
                <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(239,68,68,0.2)', color: '#F87171' }}>Passaporte de parque</span>
                <span style={{ color: '#D4AF37' }}>→</span>
                <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}>Programa CLT</span>
                <span className="text-sm" style={{ color: '#D4AF37' }}>Novo posicionamento</span>
              </div>
            </div>
          </FadeSection>

          {/* 3 Pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            <PillarCard
              icon="🏨"
              title="Hotéis com Desconto Real"
              desc="Acesso a uma rede de hotéis e pousadas com descontos exclusivos de 30% a 70% em comparação com plataformas abertas como Booking.com e Decolar."
              detail="30% a 70% de economia garantida"
              delay={0}
            />
            <PillarCard
              icon="⭐"
              title="Sistema de Pontos Cumulativos"
              desc="50% do valor da mensalidade é convertido automaticamente em pontos de viagem, criando uma poupança de férias programada e incentivando a fidelização."
              detail="50% da mensalidade vira pontos"
              delay={120}
            />
            <PillarCard
              icon="💳"
              title="Crédito Consignado Integrado"
              desc="Crédito de baixo custo integrado diretamente à plataforma, com desconto em folha para financiamento de viagens — exclusivo para trabalhadores CLT."
              detail="Juros baixos · Desconto em folha"
              delay={240}
            />
          </div>
        </div>
      </section>

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── ICP ──────────────────────────────────────────────── */}
      <section id="icp" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="section-label" style={{ color: '#3B82F6' }}>ICP</span>
              <h2 className="display-md text-white mt-3 mb-4">Perfil do Cliente Ideal</h2>
              <p className="text-lg" style={{ color: '#64748B' }}>
                Definição precisa do público para máxima eficiência nos investimentos em mídia.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeSection delay={0}>
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(0,102,255,0.05) 100%)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)', filter: 'blur(30px)' }} />
                <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#3B82F6' }}>Persona Primária</p>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(59,130,246,0.2)' }}>👨‍👩‍👧‍👦</div>
                  <div>
                    <p className="text-lg font-bold text-white">O Trabalhador CLT</p>
                    <p className="text-sm" style={{ color: '#64748B' }}>Classe Média · Família Pequena</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '💼', label: 'Emprego', value: 'CLT Formal' },
                    { icon: '💰', label: 'Renda Familiar', value: 'R$ 4k–8k/mês' },
                    { icon: '🎂', label: 'Faixa Etária', value: '28 a 45 anos' },
                    { icon: '💍', label: 'Estado Civil', value: 'Casado c/ filhos' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="glass rounded-xl p-4">
                      <div className="text-xl mb-2">{icon}</div>
                      <p className="text-xs" style={{ color: '#475569' }}>{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-white">Por que este perfil é o ideal?</h3>

                {[
                  { icon: '🔒', title: 'Crédito Consignado Elegível', desc: 'Trabalhadores CLT têm acesso ao desconto em folha — nosso diferencial de monetização mais poderoso.' },
                  { icon: '📅', title: 'Renda Recorrente e Estável', desc: 'Salário fixo mensal garante alta capacidade de pagamento de assinatura sem risco de inadimplência.' },
                  { icon: '✈️', title: 'Desejo Real de Viajar', desc: 'A classe média CLT deseja viajar mas enfrenta barreiras de custo — nosso produto resolve exatamente isso.' },
                  { icon: '👨‍👩‍👦', title: 'Família como Motivador', desc: 'Casados com filhos têm motivação emocional forte para planejar viagens em família, aumentando o LTV.' },
                ].map(({ icon, title, desc }, i) => (
                  <div key={title} className="flex items-start gap-4 glass rounded-2xl p-5" style={{ opacity: 0, animation: `fade-up 0.5s ease forwards ${300 + i * 80}ms` }}>
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── ESTRATÉGIA A/B ────────────────────────────────────── */}
      <section id="estrategia" className="relative py-24 bg-dark-a-2">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="section-label" style={{ color: '#D4AF37' }}>Fase 03</span>
              <h2 className="display-md text-white mt-3 mb-4">Estratégia A/B Test</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                90 dias de teste científico para validar o modelo de maior escala antes de alocar o orçamento total.
              </p>
            </div>
          </FadeSection>

          {/* Budget banner */}
          <FadeSection delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <span className="text-2xl font-black gradient-text-gold">R$ 150.000</span>
                <span style={{ color: '#64748B' }}>/ mês · orçamento total de teste</span>
                <span className="text-sm px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>90 dias</span>
              </div>
            </div>
          </FadeSection>

          {/* A vs B */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Grupo A */}
            <FadeSection delay={0}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.1) 0%, rgba(59,130,246,0.05) 100%)', border: '1px solid rgba(0,102,255,0.3)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(0,102,255,0.2)', color: '#60A5FA' }}>Grupo A</span>
                    <h3 className="text-xl font-bold text-white mt-3">Modelo 100% Pago</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: '#60A5FA' }}>R$ 75k</div>
                    <div className="text-xs" style={{ color: '#475569' }}>por mês</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: 'Foco', value: 'Venda direta de assinatura' },
                    { label: 'Preço', value: 'R$ 1.990 / ano' },
                    { label: 'CTA Principal', value: '"Assinar Agora"' },
                    { label: 'Captação de Assinantes', value: 'R$ 50.000 / mês' },
                    { label: 'Oferta de Crédito', value: 'R$ 25.000 / mês' },
                    { label: 'CPA Target', value: 'R$ 50 a R$ 100' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2.5 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <Link href="/vendas/teste-a" className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0066FF, #3B82F6)', color: '#fff' }}>
                  Ver Página de Vendas A →
                </Link>
              </div>
            </FadeSection>

            {/* Grupo B */}
            <FadeSection delay={150}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'linear-gradient(135deg, rgba(0,196,106,0.1) 0%, rgba(16,185,129,0.05) 100%)', border: '1px solid rgba(0,196,106,0.3)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(0,196,106,0.2)', color: '#34D399' }}>Grupo B</span>
                    <h3 className="text-xl font-bold text-white mt-3">Modelo Freemium</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: '#34D399' }}>R$ 75k</div>
                    <div className="text-xs" style={{ color: '#475569' }}>por mês</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: 'Foco', value: 'Captura massiva de leads' },
                    { label: 'Acesso', value: 'Gratuito (freemium)' },
                    { label: 'CTA Principal', value: '"Começar Grátis"' },
                    { label: 'CPL Estimado', value: 'R$ 5 a R$ 10' },
                    { label: 'Geração de Leads', value: 'R$ 50.000 / mês' },
                    { label: 'Oferta de Crédito', value: 'R$ 25.000 / mês' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2.5 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <Link href="/vendas/teste-b" className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #00C46A, #10B981)', color: '#fff' }}>
                  Ver Página de Vendas B →
                </Link>
              </div>
            </FadeSection>
          </div>

          {/* Test goal */}
          <FadeSection delay={200}>
            <div className="glass rounded-2xl p-6 text-center">
              <p className="text-sm" style={{ color: '#64748B' }}>
                <strong className="text-white">Objetivo do Teste:</strong> Validar o equilíbrio ideal entre fluxo de caixa imediato e monetização via crédito consignado — dados em mãos, escalamos o modelo vencedor com o orçamento total.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── PROJEÇÃO DE CRESCIMENTO ───────────────────────────── */}
      <GrowthProjection />

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── ROADMAP ───────────────────────────────────────────── */}
      <section id="roadmap" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-20">
              <span className="section-label" style={{ color: '#D4AF37' }}>Fase 04</span>
              <h2 className="display-md text-white mt-3 mb-4">Plano de 12 Meses</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                Três fases sequenciais e interdependentes, do setup à escala massiva.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-5 left-[calc(16.7%+20px)] right-[calc(16.7%+20px)] h-px" style={{ background: 'linear-gradient(to right, #3B82F6, #D4AF37, #10B981)' }} />

            <PhaseCard
              num="1"
              period="Mês 1"
              title="Setup e Lançamento"
              items={[
                'Configuração completa da infraestrutura',
                'Criação das landing pages A e B',
                'Configuração dos píxeis e tracking',
                'Lançamento simultâneo dos grupos A/B',
                'Monitoramento diário de KPIs',
              ]}
              accent="#3B82F6"
              delay={0}
            />
            <PhaseCard
              num="2"
              period="Meses 2 e 3"
              title="Operação e Coleta de Dados"
              items={[
                'Operação contínua dos dois grupos',
                'Otimização semanal de criativos',
                'Análise de CAC, LTV e churn por grupo',
                'Ajustes de audiência e segmentação',
                'Relatórios quinzenais de performance',
              ]}
              accent="#D4AF37"
              delay={150}
            />
            <PhaseCard
              num="3"
              period="Mês 4 em diante"
              title="Análise e Escala Massiva"
              items={[
                'Declaração do modelo vencedor',
                'Realocação total do budget para o vencedor',
                'Escala progressiva até R$ 5M/mês',
                'Expansão geográfica e de audiência',
                'Estrutura de time e operação para escala',
              ]}
              accent="#10B981"
              delay={300}
            />
          </div>
        </div>
      </section>

      <div className="divider-glow max-w-7xl mx-auto" />

      {/* ── KPIs ─────────────────────────────────────────────── */}
      <section id="kpis" className="relative py-24 bg-dark-a-2">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="section-label" style={{ color: '#D4AF37' }}>Resultados Esperados</span>
              <h2 className="display-md text-white mt-3 mb-4">Métricas de Sucesso</h2>
              <p className="text-lg" style={{ color: '#64748B' }}>Os números que definem o sucesso da estratégia.</p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Fator de Crescimento', value: '625×', sub: 'De R$8k → R$5M/mês', accent: 'gold' as const },
              { label: 'ROI Esperado (Pago)', value: '38.8×', sub: 'Retorno sobre investimento', accent: 'green' as const },
              { label: 'CPA Target', value: 'R$50–100', sub: 'Custo por assinante', accent: 'blue' as const },
              { label: 'Duração do Teste', value: '90 dias', sub: 'Para validação do modelo', accent: 'gold' as const },
            ].map(({ label, value, sub, accent }, i) => (
              <MetricCard key={label} label={label} value={value} sub={sub} accent={accent} delay={i * 80} />
            ))}
          </div>

          {/* Progress to goal */}
          <FadeSection delay={200}>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(245,158,11,0.04) 100%)', border: '1px solid rgba(212,175,55,0.2)' }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Trajetória de Crescimento</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    De <span className="gradient-text-gold">R$ 8 mil</span> para{' '}
                    <span className="gradient-text-gold">R$ 5 Milhões</span>{' '}
                    em 12 meses
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                    Com orçamento de mídia de R$ 150k/mês no período de teste e escala progressiva a partir do mês 4, a projeção de R$ 5M/mês é conservadora dado o tamanho do mercado CLT brasileiro.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Mercado CLT', value: '34M+ trabalhadores', pct: 90 },
                    { label: 'Budget de Teste', value: 'R$ 150k/mês', pct: 40 },
                    { label: 'Meta 12 meses', value: 'R$ 5.000.000/mês', pct: 100 },
                  ].map(({ label, value, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: '#94A3B8' }}>{label}</span>
                        <span className="font-semibold text-white">{value}</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: 'linear-gradient(to right, #D4AF37, #F59E0B)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="relative py-16" style={{ background: '#040810', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-black" style={{ background: 'linear-gradient(135deg, #D4AF37, #F59E0B)' }}>TL</div>
              <div>
                <div className="font-bold text-white">Turismo Legal</div>
                <div className="text-xs" style={{ color: '#475569' }}>Programa de Turismo Acessível</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm" style={{ color: '#475569' }}>Turismo Legal © 2026</p>
              <p className="text-xs mt-1" style={{ color: '#334155' }}>Estratégia de Crescimento Executiva · Documento Confidencial</p>
            </div>

            <div className="flex justify-center md:justify-end gap-4">
              <Link href="/vendas/teste-a" className="text-xs px-4 py-2 rounded-lg transition-colors hover:text-white" style={{ color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Página A
              </Link>
              <Link href="/vendas/teste-b" className="text-xs px-4 py-2 rounded-lg transition-colors hover:text-white" style={{ color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Página B
              </Link>
              <a href="#" className="text-xs px-4 py-2 rounded-lg transition-colors hover:text-white" style={{ color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Topo ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
