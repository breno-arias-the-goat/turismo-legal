'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Premissas do Modelo ──────────────────────────────────────────
  PLANO A – 100% Pago
  - Meses 1-3 (teste): R$75k → R$50k aquisição subs + R$25k crédito
  - Meses 4-12 (escala): R$150k → R$100k aquisição subs + R$50k crédito
  - CPA médio: R$75 (intervalo R$50-100)
  - Novos subs/mês: 667 (teste) → 1.333 (escala)
  - Preço assinatura: R$166/mês (R$1.990/ano)
  - Churn mensal: 5%
  - Aprovações crédito: 50/mês (teste) → 100/mês (escala)
  - Comissão por aprovação: R$350 (ticket médio R$5k × 7%)

  PLANO B – Freemium
  - Meses 1-3 (teste): R$75k → R$50k leads + R$25k crédito direto
  - Meses 4-12 (escala): R$150k → R$100k leads + R$50k crédito direto
  - CPL free: R$7
  - Usuários free/mês: 7.143 (teste) → 14.286 (escala)
  - Conversão free→crédito: 6% (CLT com dados validados)
  - Leads crédito direto (R$15 CPL × 12% conv): 200/mês → 400/mês
  - Total aprovações/mês: 629 (teste) → 1.257 (escala)
  - Comissão crédito: R$350/aprovação
  - Conversão free→pago: 2%
  - Churn pago: 3%/mês
─────────────────────────────────────────────────────────────────── */

/* ─── DADOS CALCULADOS (valores em R$ mil) ─────────────────────── */

// Plano A: subscription MRR + crédito
const planAData = {
  labels: ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],
  subscription: [111, 216, 316, 521, 716, 902, 1078, 1245, 1405, 1556, 1699, 1835],
  credit:       [ 18,  18,  18,  35,  35,  35,   35,   35,   35,   35,   35,   35],
  total:        [129, 234, 334, 556, 751, 937, 1113, 1280, 1440, 1591, 1734, 1870],
  subscribers:  [667, 1300, 1902, 3140, 4316, 5433, 6495, 7503, 8461, 9371, 10236, 11057],
};

// Plano B: crédito (dominante) + assinatura crescente
const planBData = {
  labels: ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],
  credit:       [220, 220, 220, 440, 440, 440, 440, 440, 440, 440, 440, 440],
  subscription: [ 24,  47,  69, 115, 159, 201, 243, 283, 322, 360, 396, 431],
  total:        [244, 267, 289, 555, 599, 641, 683, 723, 762, 800, 836, 871],
  freeUsers:    [7143, 14286, 21429, 35715, 50001, 64287, 78573, 92859, 107145, 121431, 135717, 150003],
};

const maxY = 1900; // teto do gráfico em R$ mil

/* ─── SVG Line Chart ────────────────────────────────────────────── */
function LineChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 800;
  const H = 320;
  const PAD = { top: 20, right: 24, bottom: 40, left: 72 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const months = 12;

  function xPos(i: number) {
    return PAD.left + (i / (months - 1)) * chartW;
  }
  function yPos(val: number) {
    return PAD.top + chartH - (val / maxY) * chartH;
  }

  function makePath(data: number[]) {
    return data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ');
  }

  function makeArea(data: number[]) {
    const line = makePath(data);
    const lastX = xPos(months - 1).toFixed(1);
    const firstX = xPos(0).toFixed(1);
    const baseY = (PAD.top + chartH).toFixed(1);
    return `${line} L${lastX},${baseY} L${firstX},${baseY} Z`;
  }

  const yGridValues = [0, 400, 800, 1200, 1600, maxY];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Area gradients */}
        <linearGradient id="areaA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="areaB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
        </linearGradient>
        {/* Clip masks for draw animation */}
        <clipPath id="clipA">
          <rect
            x={PAD.left}
            y={PAD.top}
            width={animated ? chartW : 0}
            height={chartH + 10}
            style={{ transition: 'width 2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </clipPath>
        <clipPath id="clipB">
          <rect
            x={PAD.left}
            y={PAD.top}
            width={animated ? chartW : 0}
            height={chartH + 10}
            style={{ transition: 'width 2.2s cubic-bezier(0.4,0,0.2,1) 0.1s' }}
          />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {yGridValues.map((v) => {
        const y = yPos(v);
        return (
          <g key={v}>
            <line
              x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"
            />
            <text
              x={PAD.left - 8} y={y + 4}
              textAnchor="end" fontSize="11"
              fill="rgba(148,163,184,0.7)"
            >
              {v === 0 ? '' : v >= 1000 ? `R$${(v / 1000).toFixed(1)}M` : `R$${v}k`}
            </text>
          </g>
        );
      })}

      {/* Vertical grid + month labels */}
      {planAData.labels.map((label, i) => {
        const x = xPos(i);
        return (
          <g key={label}>
            <line
              x1={x} y1={PAD.top} x2={x} y2={PAD.top + chartH}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1"
            />
            <text
              x={x} y={H - 8}
              textAnchor="middle" fontSize="11"
              fill="rgba(148,163,184,0.6)"
            >
              {label}
            </text>
            {i === 2 && (
              <text x={x} y={PAD.top - 8} textAnchor="middle" fontSize="9" fill="rgba(212,175,55,0.7)">
                ← teste A/B →
              </text>
            )}
          </g>
        );
      })}

      {/* Scale indicator at month 4 */}
      {(() => {
        const x = xPos(3);
        return (
          <line
            x1={x} y1={PAD.top} x2={x} y2={PAD.top + chartH}
            stroke="rgba(212,175,55,0.35)" strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        );
      })()}

      {/* Plan A area */}
      <path
        d={makeArea(planAData.total)}
        fill="url(#areaA)"
        clipPath="url(#clipA)"
      />
      {/* Plan B area */}
      <path
        d={makeArea(planBData.total)}
        fill="url(#areaB)"
        clipPath="url(#clipB)"
      />

      {/* Plan A line */}
      <path
        d={makePath(planAData.total)}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clipA)"
      />
      {/* Plan B line */}
      <path
        d={makePath(planBData.total)}
        fill="none"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clipB)"
      />

      {/* Plan A dots */}
      {animated && planAData.total.map((v, i) => (
        <circle
          key={i}
          cx={xPos(i)} cy={yPos(v)}
          r="4" fill="#3B82F6" stroke="#060C1A" strokeWidth="2"
          style={{ opacity: 0, animation: `fade-in 0.3s ease forwards ${0.2 + i * 0.12}s` }}
        />
      ))}
      {/* Plan B dots */}
      {animated && planBData.total.map((v, i) => (
        <circle
          key={i}
          cx={xPos(i)} cy={yPos(v)}
          r="4" fill="#10B981" stroke="#060C1A" strokeWidth="2"
          style={{ opacity: 0, animation: `fade-in 0.3s ease forwards ${0.3 + i * 0.12}s` }}
        />
      ))}

      {/* Tooltip labels on last month */}
      {animated && (
        <>
          <rect
            x={xPos(11) - 52} y={yPos(planAData.total[11]) - 28}
            width={56} height={22} rx={6}
            fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.5)" strokeWidth="1"
            style={{ opacity: 0, animation: 'fade-in 0.4s ease forwards 1.8s' }}
          />
          <text
            x={xPos(11) - 24} y={yPos(planAData.total[11]) - 13}
            textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#93C5FD"
            style={{ opacity: 0, animation: 'fade-in 0.4s ease forwards 1.8s' }}
          >
            R$ 1,87M
          </text>
          <rect
            x={xPos(11) - 52} y={yPos(planBData.total[11]) + 8}
            width={56} height={22} rx={6}
            fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"
            style={{ opacity: 0, animation: 'fade-in 0.4s ease forwards 1.8s' }}
          />
          <text
            x={xPos(11) - 24} y={yPos(planBData.total[11]) + 23}
            textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6EE7B7"
            style={{ opacity: 0, animation: 'fade-in 0.4s ease forwards 1.8s' }}
          >
            R$ 871k
          </text>
        </>
      )}
    </svg>
  );
}

/* ─── Stacked Bar per month ─────────────────────────────────────── */
function StackedBars({ plan }: { plan: 'A' | 'B' }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const data = plan === 'A' ? planAData : planBData;
  const primaryColor = plan === 'A' ? '#3B82F6' : '#10B981';
  const secondaryColor = plan === 'A' ? '#D4AF37' : '#3B82F6';
  const primaryLabel = plan === 'A' ? 'Assinatura' : 'Crédito';
  const secondaryLabel = plan === 'A' ? 'Crédito' : 'Assinatura';
  const maxVal = Math.max(...data.total);

  const selectedMonths = [0, 2, 3, 5, 8, 11];

  return (
    <div ref={ref}>
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: primaryColor }} />
          <span className="text-xs" style={{ color: '#94A3B8' }}>{primaryLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: secondaryColor }} />
          <span className="text-xs" style={{ color: '#94A3B8' }}>{secondaryLabel}</span>
        </div>
      </div>

      <div className="flex items-end gap-2 h-40">
        {selectedMonths.map((mi, barIdx) => {
          const primary = plan === 'A' ? data.subscription[mi] : (data as typeof planBData).credit[mi];
          const secondary = plan === 'A' ? (data as typeof planAData).credit[mi] : data.subscription[mi];
          const total = data.total[mi];
          const pctPrimary = (primary / maxVal) * 100;
          const pctSecondary = (secondary / maxVal) * 100;

          return (
            <div key={mi} className="flex-1 flex flex-col items-center gap-1">
              {/* Total label */}
              <div className="text-xs font-bold text-center" style={{
                color: primary > secondary ? primaryColor : secondaryColor,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.4s ease ${barIdx * 0.1}s, transform 0.4s ease ${barIdx * 0.1}s`,
                fontSize: '9px',
                lineHeight: '1.2',
              }}>
                {total >= 1000 ? `R$${(total/1000).toFixed(1)}M` : `R$${total}k`}
              </div>

              {/* Bar stack */}
              <div className="w-full flex flex-col-reverse rounded overflow-hidden" style={{ height: '80%', background: 'rgba(255,255,255,0.04)' }}>
                <div
                  style={{
                    height: visible ? `${pctPrimary}%` : '0%',
                    background: primaryColor,
                    transition: `height 0.8s cubic-bezier(0.4,0,0.2,1) ${barIdx * 0.1}s`,
                    opacity: 0.9,
                  }}
                />
                <div
                  style={{
                    height: visible ? `${pctSecondary}%` : '0%',
                    background: secondaryColor,
                    transition: `height 0.8s cubic-bezier(0.4,0,0.2,1) ${barIdx * 0.1 + 0.05}s`,
                    opacity: 0.7,
                  }}
                />
              </div>

              {/* Month label */}
              <div className="text-xs text-center" style={{ color: '#475569', fontSize: '10px' }}>
                {data.labels[mi]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Assumptions Table ─────────────────────────────────────────── */
function AssumptionsTable() {
  const rows = [
    { label: 'Orçamento de Teste (M1-M3)', a: 'R$ 75k/mês', b: 'R$ 75k/mês' },
    { label: 'Orçamento de Escala (M4+)', a: 'R$ 150k/mês', b: 'R$ 150k/mês' },
    { label: 'CPA / CPL', a: 'CPA R$ 75 (intervalo R$50-100)', b: 'CPL R$ 7 (free)' },
    { label: 'Novos Clientes/mês (teste)', a: '667 assinantes', b: '7.143 usuários free' },
    { label: 'Novos Clientes/mês (escala)', a: '1.333 assinantes', b: '14.286 usuários free' },
    { label: 'Receita de Assinatura', a: 'R$ 166/mês (R$1.990/ano)', b: 'R$ 166/mês (2% dos free)' },
    { label: 'Churn Mensal', a: '5%', b: '3% (pago) / alto (free)' },
    { label: 'Conversão Free → Crédito', a: 'N/A', b: '6% dos usuários free' },
    { label: 'Aprovações de Crédito', a: '50/mês → 100/mês', b: '629/mês → 1.257/mês' },
    { label: 'Comissão por Crédito', a: 'R$ 350 (ticket R$5k × 7%)', b: 'R$ 350 (ticket R$5k × 7%)' },
    { label: 'Taxa de Aprovação Crédito', a: '12% dos leads', b: '6% (free) + 12% (direto)' },
    { label: 'Receita no Mês 12', a: '~R$ 1,87M/mês', b: '~R$ 871k/mês' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Premissa</th>
            <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#60A5FA', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Plano A</th>
            <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#34D399', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Plano B</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              <td className="py-3 px-4 text-xs" style={{ color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{row.label}</td>
              <td className="py-3 px-4 text-xs font-medium text-white" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{row.a}</td>
              <td className="py-3 px-4 text-xs font-medium text-white" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Crossover Insight ─────────────────────────────────────────── */
function CrossoverInsight() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {[
        {
          icon: '📈',
          title: 'Plano A vence no longo prazo',
          desc: 'O MRR de assinaturas é cumulativo. A partir do Mês 4 com escala, Plano A ultrapassa Plano B e continua crescendo.',
          color: '#3B82F6',
        },
        {
          icon: '⚡',
          title: 'Plano B gera caixa imediato',
          desc: 'No Mês 1, Plano B já gera R$244k vs R$128k do Plano A. Crédito consignado monetiza rápido, sem esperar acúmulo de base.',
          color: '#10B981',
        },
        {
          icon: '🎯',
          title: 'Crédito escala com free users',
          desc: 'Plano B captura 6% dos usuários free para crédito. Cada R$1 investido em lead gera R$3 em comissão de crédito no mesmo mês.',
          color: '#D4AF37',
        },
      ].map(({ icon, title, desc, color }) => (
        <div
          key={title}
          className="rounded-2xl p-5"
          style={{ background: `rgba(${color === '#3B82F6' ? '59,130,246' : color === '#10B981' ? '16,185,129' : '212,175,55'},0.07)`, border: `1px solid ${color}33` }}
        >
          <div className="text-2xl mb-3">{icon}</div>
          <p className="text-sm font-semibold text-white mb-2">{title}</p>
          <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export default function GrowthProjection() {
  const [activeTab, setActiveTab] = useState<'grafico' | 'breakdown' | 'premissas'>('grafico');

  return (
    <section id="projecao" className="relative py-24">
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            Modelagem Financeira Realista
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Previsibilidade de Crescimento
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748B' }}>
            Projeção mês a mês baseada em CPA R$50-100, CPL R$7, comissão de crédito 7% sobre ticket médio de R$5k — sem otimismo, só matemática.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {([
              { key: 'grafico', label: 'Curvas de Receita' },
              { key: 'breakdown', label: 'Receita por Origem' },
              { key: 'premissas', label: 'Premissas' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeTab === key ? '#ffffff' : '#64748B',
                  border: activeTab === key ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Gráfico de Curvas */}
        {activeTab === 'grafico' && (
          <div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 rounded" style={{ background: '#3B82F6' }} />
                <span className="text-sm text-white font-medium">Plano A — 100% Pago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 rounded" style={{ background: '#10B981' }} />
                <span className="text-sm text-white font-medium">Plano B — Freemium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-px" style={{ borderTop: '1.5px dashed rgba(212,175,55,0.5)' }} />
                <span className="text-xs" style={{ color: '#D4AF37' }}>Início da Escala</span>
              </div>
            </div>

            {/* Chart */}
            <div
              className="rounded-3xl p-6 md:p-8 mb-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <LineChart />
            </div>

            {/* Monthly highlights table */}
            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>Mês</th>
                      {[0,2,3,5,8,11].map(i => (
                        <th key={i} className="text-center py-3 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>
                          M{i+1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#60A5FA' }}>Plano A</td>
                      {[0,2,3,5,8,11].map(i => (
                        <td key={i} className="py-3 px-3 text-center text-xs font-semibold text-white" style={{ borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
                          {planAData.total[i] >= 1000
                            ? `R$${(planAData.total[i]/1000).toFixed(2)}M`
                            : `R$${planAData.total[i]}k`}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#34D399' }}>Plano B</td>
                      {[0,2,3,5,8,11].map(i => (
                        <td key={i} className="py-3 px-3 text-center text-xs font-semibold text-white" style={{ borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
                          {planBData.total[i] >= 1000
                            ? `R$${(planBData.total[i]/1000).toFixed(2)}M`
                            : `R$${planBData.total[i]}k`}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-3 px-4 text-xs" style={{ color: '#475569' }}>Assinantes A</td>
                      {[0,2,3,5,8,11].map(i => (
                        <td key={i} className="py-3 px-3 text-center text-xs" style={{ color: '#94A3B8', borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
                          {planAData.subscribers[i].toLocaleString('pt-BR')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Scale callout */}
              <div className="px-4 py-3" style={{ background: 'rgba(212,175,55,0.06)', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
                <p className="text-xs" style={{ color: '#D4AF37' }}>
                  <strong>↑ Mês 4:</strong> Escala para R$150k/mês. Plano A cresce aceleradamente com MRR composto. Plano B mantém crédito alto mas cresce de forma mais linear.
                </p>
              </div>
            </div>

            <CrossoverInsight />
          </div>
        )}

        {/* Tab: Breakdown por Origem */}
        {activeTab === 'breakdown' && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Plano A */}
            <div
              className="rounded-3xl p-7"
              style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>Plano A</span>
                  <h3 className="text-lg font-bold text-white mt-3">100% Pago — Origens de Receita</h3>
                </div>
              </div>

              <StackedBars plan="A" />

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(59,130,246,0.1)' }}>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Assinatura M12 (98%)</span>
                  <span className="text-xs font-bold" style={{ color: '#60A5FA' }}>R$ 1.835k MRR</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Crédito M12 (2%)</span>
                  <span className="text-xs font-bold" style={{ color: '#D4AF37' }}>R$ 35k/mês</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-xs font-semibold text-white">Total M12</span>
                  <span className="text-sm font-black" style={{ color: '#60A5FA' }}>R$ 1,87M/mês</span>
                </div>
              </div>

              <p className="text-xs mt-4 leading-relaxed" style={{ color: '#475569' }}>
                ★ MRR cumulativo é o ativo mais valioso — cada assinante retido aumenta a base permanentemente.
              </p>
            </div>

            {/* Plano B */}
            <div
              className="rounded-3xl p-7"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399' }}>Plano B</span>
                  <h3 className="text-lg font-bold text-white mt-3">Freemium — Origens de Receita</h3>
                </div>
              </div>

              <StackedBars plan="B" />

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)' }}>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Crédito M12 (51%)</span>
                  <span className="text-xs font-bold" style={{ color: '#34D399' }}>R$ 440k/mês</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)' }}>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Assinatura M12 (49%)</span>
                  <span className="text-xs font-bold" style={{ color: '#60A5FA' }}>R$ 431k MRR</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-xs font-semibold text-white">Total M12</span>
                  <span className="text-sm font-black" style={{ color: '#34D399' }}>R$ 871k/mês</span>
                </div>
              </div>

              <p className="text-xs mt-4 leading-relaxed" style={{ color: '#475569' }}>
                ★ Base gratuita acumulada (~150k usuários) é um ativo estratégico com múltiplos produtos futuros.
              </p>
            </div>

            {/* Comparativo final */}
            <div
              className="md:col-span-2 rounded-3xl p-7"
              style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
            >
              <h3 className="text-base font-bold text-white mb-5">Comparativo de Ativos Gerados em 12 meses</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'MRR Plano A', value: 'R$ 1,87M', sub: 'Receita mensal recorrente', color: '#3B82F6' },
                  { label: 'MRR Plano B', value: 'R$ 871k', sub: 'Receita mensal recorrente', color: '#10B981' },
                  { label: 'Assinantes (A)', value: '11.057', sub: 'Base paga consolidada', color: '#3B82F6' },
                  { label: 'Base Free (B)', value: '~150k', sub: 'Usuários no ecossistema', color: '#10B981' },
                ].map(({ label, value, sub, color }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: `rgba(${color === '#3B82F6' ? '59,130,246' : '16,185,129'},0.08)`, border: `1px solid ${color}25` }}
                  >
                    <p className="text-xs mb-2" style={{ color: '#64748B' }}>{label}</p>
                    <p className="text-xl font-black text-white">{value}</p>
                    <p className="text-xs mt-1" style={{ color: '#475569' }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Premissas */}
        {activeTab === 'premissas' && (
          <div>
            <div
              className="rounded-3xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <AssumptionsTable />
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Sobre as Premissas</p>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                  O CPA de R$75 é a média do intervalo declarado (R$50-100) e compatível com o CPL histórico de R$3,55 e taxa de conversão de 2,08% da operação anterior.
                  A comissão de crédito de 7% é conservadora — plataformas de originação consignada CLT operam entre 5-12%.
                  A taxa de churn de 5% (Plano A) está alinhada com benchmarks SaaS B2C.
                  Os dados validam o potencial — a escala para R$5M depende de reinvestimento acelerado de receita a partir do mês 6-8.
                </p>
              </div>
            </div>

            {/* Scale to 5M note */}
            <div
              className="rounded-2xl p-6 mt-4"
              style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}
            >
              <p className="text-sm font-bold text-white mb-3">📌 Para chegar a R$5M/mês com Plano A</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Budget necessário', value: 'R$ 600k/mês', desc: 'CPA R$75 → 8.000 novos subs/mês' },
                  { label: 'Assinantes necessários', value: '~30.000', desc: 'Steady-state com 5% churn' },
                  { label: 'Timeline realista', value: '18-24 meses', desc: 'Com reinvestimento da receita' },
                ].map(({ label, value, desc }) => (
                  <div key={label} className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#64748B' }}>{label}</p>
                    <p className="text-lg font-black text-white">{value}</p>
                    <p className="text-xs" style={{ color: '#475569' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
