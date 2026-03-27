'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── MODELO DE CUSTOS ─────────────────────────────────────────────
  Investimento fixo (usuário): R$ 75.000/mês

  CUSTOS OPERACIONAIS FIXOS (estimativa conservadora):
  - Tecnologia (hosting, APIs, plataforma):  R$ 4.000
  - Equipe (2 suporte + 1 operações):       R$ 12.000
  - Jurídico/compliance/contabilidade:      R$ 4.000
  - Outros (ferramentas, misc):              R$ 2.000
  TOTAL FIXO OPS:                           R$ 22.000/mês

  CUSTOS VARIÁVEIS:
  - Processamento de pagamentos:  2,5% da receita de assinatura
  - Chargebacks/estornos:         1,0% da receita total
  TOTAL VARIÁVEL:                 ~3,5% da receita

  TOTAL CUSTOS = R$75k (marketing) + R$22k (ops) + 3,5% × receita

  PLANO A — Budget split: R$50k aquisição + R$25k crédito
  CPA R$75 → 667 novos assinantes/mês, churn 5%
  50 aprovações crédito/mês × R$350 comissão

  PLANO B — Budget split: R$50k leads + R$25k crédito
  CPL R$7 → 7.143 free users/mês, conv. crédito 6%
  629 aprovações crédito/mês × R$350 comissão
  Free→pago 2%, churn 3%
─────────────────────────────────────────────────────────────────── */

/* ─── DADOS CALCULADOS (R$ mil) ───────────────────────────────── */

const MONTHS = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];

const planA = {
  revenue:  [128, 233, 333, 428, 518, 604, 685, 763, 836, 906, 972, 1035],
  costs:    [102, 105, 109, 112, 115, 118, 121, 124, 127, 129, 131, 133],
  profit:   [ 26, 128, 224, 316, 403, 486, 564, 639, 709, 777, 841,  902],
  margin:   [ 20,  55,  67,  74,  78,  80,  82,  84,  85,  86,  87,   87],
  // breakdown de custos no M12: marketing=75, ops=22, variable=36
  costBreakdown: { marketing: 75, ops: 22, variable: 36 },
};

const planB = {
  revenue:  [244, 267, 289, 311, 332, 352, 372, 392, 410, 428, 446, 463],
  costs:    [106, 106, 107, 108, 109, 110, 110, 111, 112, 112, 113, 113],
  profit:   [138, 161, 182, 203, 223, 242, 262, 281, 298, 316, 333, 350],
  margin:   [ 57,  60,  63,  65,  67,  69,  70,  72,  73,  74,  75,  76],
  costBreakdown: { marketing: 75, ops: 22, variable: 16 },
};

// Lucro acumulado
const cumulative = (arr: number[]) => arr.reduce<number[]>((acc, v, i) => [...acc, (acc[i-1] ?? 0) + v], []);
const planACumProfit = cumulative(planA.profit);
const planBCumProfit = cumulative(planB.profit);

// Reinvestimento potencial: lucro do mês anterior → quanto de budget adicional
const reinvest = (profits: number[]) => profits.map((p, i) => {
  const prevProfit = i === 0 ? 0 : profits[i - 1];
  const additionalBudget = prevProfit; // tudo do mês anterior
  const totalBudget = 75 + additionalBudget;
  return { additionalBudget, totalBudget };
});
const planAReinvest = reinvest(planA.profit);
const planBReinvest = reinvest(planB.profit);

/* ─── Helpers ─────────────────────────────────────────────────── */
function fmt(v: number, prefix = 'R$ ', suffix = 'k') {
  if (v >= 1000) return `${prefix}${(v / 1000).toFixed(2)}M`;
  return `${prefix}${v}${suffix}`;
}

/* ─── SVG Profit Chart ────────────────────────────────────────── */
function ProfitChart({ plan }: { plan: 'A' | 'B' }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const data = plan === 'A' ? planA : planB;
  const color = plan === 'A' ? '#3B82F6' : '#10B981';
  const profitColor = '#D4AF37';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 700, H = 260;
  const PAD = { top: 16, right: 16, bottom: 36, left: 64 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const maxV = Math.max(...data.revenue) * 1.05;

  const xP = (i: number) => PAD.left + (i / 11) * cW;
  const yP = (v: number) => PAD.top + cH - (v / maxV) * cH;

  const linePath = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xP(i).toFixed(1)},${yP(v).toFixed(1)}`).join(' ');

  const areaPath = (arr: number[]) => {
    const line = linePath(arr);
    return `${line} L${xP(11).toFixed(1)},${(PAD.top + cH).toFixed(1)} L${xP(0).toFixed(1)},${(PAD.top + cH).toFixed(1)} Z`;
  };

  const yTicks = [0, 200, 400, 600, 800, 1000].filter(v => v <= maxV * 1.1);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`revGrad${plan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`profitGrad${plan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={profitColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={profitColor} stopOpacity="0.04" />
        </linearGradient>
        <clipPath id={`clip${plan}`}>
          <rect x={PAD.left} y={0} height={H}
            width={animated ? cW : 0}
            style={{ transition: 'width 2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </clipPath>
      </defs>

      {/* Grid */}
      {yTicks.map(v => (
        <g key={v}>
          <line x1={PAD.left} y1={yP(v)} x2={PAD.left + cW} y2={yP(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PAD.left - 8} y={yP(v) + 4} textAnchor="end" fontSize="10" fill="rgba(148,163,184,0.65)">
            {v === 0 ? '' : v >= 1000 ? `R$${v/1000}M` : `R$${v}k`}
          </text>
        </g>
      ))}

      {/* Month labels */}
      {MONTHS.map((m, i) => (
        <text key={m} x={xP(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(148,163,184,0.55)">{m}</text>
      ))}

      {/* Revenue area + line */}
      <path d={areaPath(data.revenue)} fill={`url(#revGrad${plan})`} clipPath={`url(#clip${plan})`} />
      <path d={linePath(data.revenue)} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" clipPath={`url(#clip${plan})`} />

      {/* Profit area + line */}
      <path d={areaPath(data.profit)} fill={`url(#profitGrad${plan})`} clipPath={`url(#clip${plan})`} />
      <path d={linePath(data.profit)} fill="none" stroke={profitColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0" clipPath={`url(#clip${plan})`} />

      {/* Costs line */}
      <path d={linePath(data.costs)} fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="1.5" strokeDasharray="4 3" clipPath={`url(#clip${plan})`} />

      {/* Profit shading between profit line and costs line */}
      {/* (gap between revenue and costs = profit) shown via areas above */}

      {/* Dots profit */}
      {animated && data.profit.map((v, i) => (
        <circle key={i} cx={xP(i)} cy={yP(v)} r="3.5" fill={profitColor} stroke="#060C1A" strokeWidth="1.5"
          style={{ opacity: 0, animation: `fade-in 0.3s ease forwards ${0.1 + i * 0.1}s` }} />
      ))}

      {/* M12 labels */}
      {animated && (
        <>
          <text x={xP(11) + 6} y={yP(data.revenue[11]) + 4} fontSize="10" fontWeight="700" fill={color}
            style={{ opacity: 0, animation: 'fade-in 0.5s ease forwards 1.5s' }}>
            {fmt(data.revenue[11])}
          </text>
          <text x={xP(11) + 6} y={yP(data.profit[11]) + 4} fontSize="10" fontWeight="700" fill={profitColor}
            style={{ opacity: 0, animation: 'fade-in 0.5s ease forwards 1.6s' }}>
            {fmt(data.profit[11])}
          </text>
        </>
      )}
    </svg>
  );
}

/* ─── Margin Pill ─────────────────────────────────────────────── */
function MarginBadge({ margin }: { margin: number }) {
  const color = margin >= 80 ? '#22C55E' : margin >= 65 ? '#D4AF37' : margin >= 50 ? '#3B82F6' : '#94A3B8';
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${color}20`, color }}>
      {margin}%
    </span>
  );
}

/* ─── Component ───────────────────────────────────────────────── */
export default function ProfitProjection() {
  const [activePlan, setActivePlan] = useState<'A' | 'B' | 'compare'>('A');

  const data = activePlan === 'A' ? planA : planB;
  const color = activePlan === 'A' ? '#3B82F6' : '#10B981';
  const cumProfit = activePlan === 'A' ? planACumProfit : planBCumProfit;
  const reinvestData = activePlan === 'A' ? planAReinvest : planBReinvest;

  return (
    <section id="lucros" className="relative py-24 bg-dark-a-2">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)' }}>
            Previsão de Lucro · R$75k/mês fixo
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
            Quanto Sobra para Reinvestir?
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748B' }}>
            Receita menos todos os custos operacionais reais — equipe, tecnologia, pagamentos, compliance. Só o que entra no bolso.
          </p>
        </div>

        {/* Plan selector */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {([
              { key: 'A', label: 'Plano A — 100% Pago' },
              { key: 'B', label: 'Plano B — Freemium' },
              { key: 'compare', label: 'Comparativo' },
            ] as const).map(({ key, label }) => (
              <button key={key} onClick={() => setActivePlan(key)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activePlan === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activePlan === key ? '#ffffff' : '#64748B',
                  border: activePlan === key ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PLANO A ou B ──────────────────────────────────── */}
        {activePlan !== 'compare' && (
          <>
            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Lucro no Mês 1', value: fmt(data.profit[0]), sub: `Margem ${data.margin[0]}%`, good: false },
                { label: 'Lucro no Mês 6', value: fmt(data.profit[5]), sub: `Margem ${data.margin[5]}%`, good: true },
                { label: 'Lucro no Mês 12', value: fmt(data.profit[11]), sub: `Margem ${data.margin[11]}%`, good: true },
                { label: 'Lucro Acumulado 12m', value: fmt(cumProfit[11]), sub: 'Total líquido', good: true },
              ].map(({ label, value, sub, good }) => (
                <div key={label} className="rounded-2xl p-5 text-center"
                  style={{ background: good ? `${color}0d` : 'rgba(255,255,255,0.03)', border: `1px solid ${good ? color : 'rgba(255,255,255,0.06)'}33` }}>
                  <p className="text-xs mb-2" style={{ color: '#64748B' }}>{label}</p>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs mt-1" style={{ color: good ? color : '#475569' }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-3xl p-6 md:p-8 mb-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-5 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 rounded" style={{ background: color }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Receita Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 rounded" style={{ background: '#D4AF37' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Lucro Líquido</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6" style={{ borderTop: '1.5px dashed rgba(239,68,68,0.6)' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Custos Totais</span>
                </div>
              </div>
              <ProfitChart plan={activePlan} />
            </div>

            {/* Full monthly table */}
            <div className="rounded-2xl overflow-hidden mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {['Mês','Receita','Custos','Lucro Líquido','Margem','Lucro Acumulado','Budget Reinvestível'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                          style={{ color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS.map((m, i) => {
                      const isScale = i === 3;
                      return (
                        <tr key={m}
                          style={{
                            background: isScale ? `${color}08` : i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                            borderTop: isScale ? `1px solid ${color}30` : '1px solid rgba(255,255,255,0.03)',
                          }}>
                          <td className="py-3 px-4 font-semibold text-white text-xs">{m}</td>
                          <td className="py-3 px-4 text-xs font-medium" style={{ color: color }}>{fmt(data.revenue[i])}</td>
                          <td className="py-3 px-4 text-xs" style={{ color: '#F87171' }}>{fmt(data.costs[i])}</td>
                          <td className="py-3 px-4 text-xs font-bold" style={{ color: '#D4AF37' }}>{fmt(data.profit[i])}</td>
                          <td className="py-3 px-4"><MarginBadge margin={data.margin[i]} /></td>
                          <td className="py-3 px-4 text-xs font-medium text-white">{fmt(cumProfit[i])}</td>
                          <td className="py-3 px-4 text-xs font-bold" style={{ color: '#22C55E' }}>
                            {i === 0 ? '—' : `+${fmt(data.profit[i - 1])}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* Totals row */}
                  <tfoot>
                    <tr style={{ background: 'rgba(212,175,55,0.06)', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
                      <td className="py-4 px-4 text-xs font-black text-white">TOTAL 12M</td>
                      <td className="py-4 px-4 text-xs font-black" style={{ color: color }}>
                        {fmt(data.revenue.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-4 text-xs font-black" style={{ color: '#F87171' }}>
                        {fmt(data.costs.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-4 text-xs font-black" style={{ color: '#D4AF37' }}>
                        {fmt(cumProfit[11])}
                      </td>
                      <td className="py-4 px-4">
                        <MarginBadge margin={Math.round(cumProfit[11] / data.revenue.reduce((a, b) => a + b, 0) * 100)} />
                      </td>
                      <td className="py-4 px-4 text-xs font-black text-white">{fmt(cumProfit[11])}</td>
                      <td className="py-4 px-4 text-xs font-black" style={{ color: '#22C55E' }}>
                        {fmt(data.profit[11])} no M12
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Reinvestment scenarios */}
            <div className="rounded-3xl p-7 mb-6"
              style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="text-base font-bold text-white mb-2">
                💰 Quanto posso reinvestir a cada mês?
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                O lucro do mês anterior vira budget adicional. Abaixo, o orçamento total disponível se você reinvestir 100% do lucro líquido.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {['Mês','Lucro do mês','Lucro anterior (reinvestível)','Budget total disponível','Novos subs possíveis (extra)'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                          style={{ color: '#64748B', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 2, 5, 8, 11].map(i => {
                      const ri = reinvestData[i];
                      const extraSubs = activePlan === 'A'
                        ? Math.round(ri.additionalBudget / 75 * (2/3)) // 2/3 budget for subs at CPA 75
                        : Math.round(ri.additionalBudget / 7 * 1000 * 0.02); // free users at CPL 7 × 2% paid conv
                      return (
                        <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                          <td className="py-3 px-3 text-xs font-bold text-white">{MONTHS[i]}</td>
                          <td className="py-3 px-3 text-xs font-bold" style={{ color: '#D4AF37' }}>{fmt(data.profit[i])}</td>
                          <td className="py-3 px-3 text-xs" style={{ color: '#22C55E' }}>
                            {i === 0 ? '— (mês 1)' : `+${fmt(ri.additionalBudget)}`}
                          </td>
                          <td className="py-3 px-3 text-xs font-black text-white">
                            {i === 0 ? 'R$ 75k' : fmt(ri.totalBudget)}
                          </td>
                          <td className="py-3 px-3 text-xs font-semibold" style={{ color: color }}>
                            {i === 0 ? '667 (base)' : `+${extraSubs.toLocaleString('pt-BR')} extras`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-4" style={{ color: '#475569' }}>
                ★ Se reinvestir apenas 50% do lucro, mantenha metade como reserva e dobre progressivamente o budget de mídia até a escala desejada.
              </p>
            </div>

            {/* Cost breakdown */}
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <h3 className="text-sm font-bold text-white mb-4">Composição dos Custos no Mês 12</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Marketing / Mídia Paga', value: 75, pct: Math.round(75 / data.costs[11] * 100), color: '#F87171' },
                  { label: 'Equipe + Operações', value: 22, pct: Math.round(22 / data.costs[11] * 100), color: '#FB923C' },
                  { label: 'Variável (pagamentos, estornos)', value: data.costBreakdown.variable, pct: Math.round(data.costBreakdown.variable / data.costs[11] * 100), color: '#FBBF24' },
                ].map(({ label, value, pct, color: c }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: '#94A3B8' }}>{label}</span>
                      <span className="font-semibold text-white">R$ {value}k ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: c, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── COMPARATIVO ───────────────────────────────────── */}
        {activePlan === 'compare' && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Lucro acumulado */}
              {(['A','B'] as const).map(p => {
                const d = p === 'A' ? planA : planB;
                const cp = p === 'A' ? planACumProfit : planBCumProfit;
                const c = p === 'A' ? '#3B82F6' : '#10B981';
                return (
                  <div key={p} className="rounded-3xl p-7"
                    style={{ background: `${c}0d`, border: `1px solid ${c}33` }}>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: `${c}25`, color: c }}>Plano {p}</span>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      {[
                        { label: 'Lucro Mês 1', value: fmt(d.profit[0]), margin: d.margin[0] },
                        { label: 'Lucro Mês 3', value: fmt(d.profit[2]), margin: d.margin[2] },
                        { label: 'Lucro Mês 6', value: fmt(d.profit[5]), margin: d.margin[5] },
                        { label: 'Lucro Mês 12', value: fmt(d.profit[11]), margin: d.margin[11] },
                      ].map(({ label, value, margin }) => (
                        <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <p className="text-xs mb-1" style={{ color: '#475569' }}>{label}</p>
                          <p className="text-lg font-black text-white">{value}</p>
                          <MarginBadge margin={margin} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: '#64748B' }}>Lucro acumulado 12 meses</span>
                        <span className="text-2xl font-black" style={{ color: '#D4AF37' }}>{fmt(cp[11])}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm" style={{ color: '#64748B' }}>Margem média 12 meses</span>
                        <MarginBadge margin={Math.round(d.margin.reduce((a, b) => a + b, 0) / 12)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Side by side monthly table */}
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: '#64748B' }}>Mês</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#60A5FA' }}>Receita A</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#D4AF37' }}>Lucro A</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Margem A</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#34D399' }}>Receita B</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#D4AF37' }}>Lucro B</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Margem B</th>
                      <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider" style={{ color: '#22C55E' }}>Vantagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS.map((m, i) => {
                      const aWins = planA.profit[i] > planB.profit[i];
                      const diff = Math.abs(planA.profit[i] - planB.profit[i]);
                      return (
                        <tr key={m} style={{ borderTop: '1px solid rgba(255,255,255,0.03)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                          <td className="py-3 px-4 font-bold text-white">{m}</td>
                          <td className="py-3 px-4" style={{ color: '#60A5FA' }}>{fmt(planA.revenue[i])}</td>
                          <td className="py-3 px-4 font-bold" style={{ color: '#D4AF37' }}>{fmt(planA.profit[i])}</td>
                          <td className="py-3 px-4"><MarginBadge margin={planA.margin[i]} /></td>
                          <td className="py-3 px-4" style={{ color: '#34D399' }}>{fmt(planB.revenue[i])}</td>
                          <td className="py-3 px-4 font-bold" style={{ color: '#D4AF37' }}>{fmt(planB.profit[i])}</td>
                          <td className="py-3 px-4"><MarginBadge margin={planB.margin[i]} /></td>
                          <td className="py-3 px-4 font-bold"
                            style={{ color: aWins ? '#60A5FA' : '#34D399' }}>
                            {aWins ? 'A' : 'B'} +{fmt(diff)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(212,175,55,0.06)', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
                      <td className="py-4 px-4 font-black text-white">TOTAL</td>
                      <td className="py-4 px-4 font-black" style={{ color: '#60A5FA' }}>{fmt(planA.revenue.reduce((a,b)=>a+b,0))}</td>
                      <td className="py-4 px-4 font-black" style={{ color: '#D4AF37' }}>{fmt(planACumProfit[11])}</td>
                      <td className="py-4 px-4"><MarginBadge margin={Math.round(planACumProfit[11] / planA.revenue.reduce((a,b)=>a+b,0) * 100)} /></td>
                      <td className="py-4 px-4 font-black" style={{ color: '#34D399' }}>{fmt(planB.revenue.reduce((a,b)=>a+b,0))}</td>
                      <td className="py-4 px-4 font-black" style={{ color: '#D4AF37' }}>{fmt(planBCumProfit[11])}</td>
                      <td className="py-4 px-4"><MarginBadge margin={Math.round(planBCumProfit[11] / planB.revenue.reduce((a,b)=>a+b,0) * 100)} /></td>
                      <td className="py-4 px-4 font-black" style={{ color: '#60A5FA' }}>
                        A +{fmt(planACumProfit[11] - planBCumProfit[11])}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Verdict */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: '🏆',
                  title: 'Plano A gera mais lucro total',
                  desc: `R$${(planACumProfit[11]/1000).toFixed(2)}M vs R$${(planBCumProfit[11]/1000).toFixed(2)}M acumulados em 12 meses — diferença de R$${((planACumProfit[11]-planBCumProfit[11])/1000).toFixed(2)}M.`,
                  color: '#3B82F6',
                },
                {
                  icon: '⚡',
                  title: 'Plano B lucra mais desde o Mês 1',
                  desc: `No Mês 1, Plano B já gera R$138k de lucro vs R$26k do A. Ideal se você precisa de caixa imediato para operação.`,
                  color: '#10B981',
                },
                {
                  icon: '📌',
                  title: 'Plano A ultrapassa B no Mês 4',
                  desc: 'O MRR de assinaturas começa a compor e o lucro mensal de A supera B permanentemente a partir do 4º mês.',
                  color: '#D4AF37',
                },
              ].map(({ icon, title, desc, color: c }) => (
                <div key={title} className="rounded-2xl p-5"
                  style={{ background: `rgba(${c === '#3B82F6' ? '59,130,246' : c === '#10B981' ? '16,185,129' : '212,175,55'},0.07)`, border: `1px solid ${c}25` }}>
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-sm font-bold text-white mb-1">{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
