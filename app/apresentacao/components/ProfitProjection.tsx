'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── MODELO DE CUSTOS COMPLETO ────────────────────────────────────
  Investimento fixo (usuário): R$ 75.000/mês

  ① CUSTOS FIXOS OPERACIONAIS:
  - Tecnologia (hosting, APIs, plataforma):       R$ 4.000
  - Equipe bruta (2 suporte + 1 ops):            R$ 12.000
  - Encargos trabalhistas (FGTS 8% + INSS 20%
    + RAT/terceiros 3% = ~31% sobre folha):      R$ 3.720
  - Jurídico / compliance / contabilidade:        R$ 4.000
  - Outros (ferramentas, misc):                   R$ 2.000
  TOTAL FIXO OPS (com encargos):                 R$ 25.720 ≈ R$ 25k/mês

  ② CUSTOS VARIÁVEIS (% da receita):
  - Processamento de pagamentos (gateway):  2,5%
  - Chargebacks / estornos:                 1,0%
  TOTAL VARIÁVEL:                           3,5%

  ③ IMPOSTOS (Regime: Lucro Presumido)
  Justificativa: Plano A projeta receita anual de ~R$7,4M → obrigatório
  Lucro Presumido. Plano B projeta ~R$4,3M → pode usar Simples Nacional
  mas LP é mais conservador/realista para planejamento.

  Lucro Presumido — alíquota efetiva sobre receita bruta:
  - PIS:              0,65%
  - COFINS:           3,00%
  - ISS (serviços):   3,00% (média municipal)
  - IRPJ: 32% base × 15% = 4,80% + adicional 10% (base > R$20k/mês)
  - CSLL: 32% base × 9%  = 2,88%
  TOTAL IMPOSTOS:    ~16% sobre receita bruta (conservador)

  ④ RESUMO DO CUSTO TOTAL:
  = R$ 75.000 (marketing)
  + R$ 25.000 (ops + encargos trabalhistas)
  + 3,5% × receita (variável)
  + 16,0% × receita (impostos)
  = R$ 100.000 + 19,5% × receita

  PLANO A — Budget: R$50k aquisição + R$25k crédito
  CPA R$75 → 667 novos subs/mês, churn 5%, preço R$166/mês
  50 aprovações crédito/mês × R$350 comissão = R$17,5k/mês

  PLANO B — Budget: R$50k leads + R$25k crédito
  CPL R$7 → 7.143 free users/mês, conv. crédito 6%
  629 aprovações/mês × R$350 = R$220k/mês
  Free→pago 2%, churn 3%
─────────────────────────────────────────────────────────────────── */

/* ─── DADOS CALCULADOS (R$ mil) ───────────────────────────────────
  Fórmula: Profit = Revenue - 100k - Revenue × 19.5%
           Profit = Revenue × 0.805 - 100k
  Margin  = Profit / Revenue × 100%
─────────────────────────────────────────────────────────────────── */

const MONTHS = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];

const planA = {
  revenue:  [128, 233, 333, 428, 518, 604, 685, 763, 836, 906, 972, 1035],
  // costs = 100k + 19.5% × revenue (marketing+ops+variable+taxes)
  costs:    [125, 145, 165, 183, 201, 218, 234, 249, 263, 277, 290, 302],
  // taxes alone = 16% × revenue
  taxes:    [ 20,  37,  53,  68,  83,  97, 110, 122, 134, 145, 156, 166],
  // ops (fixed 100k - 75k marketing = 25k) + variable 3.5% × revenue
  opsVar:   [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100].map((_, i) =>
    Math.round(25 + [128,233,333,428,518,604,685,763,836,906,972,1035][i] * 0.035)
  ),
  profit:   [  3,  88, 168, 245, 317, 386, 451, 514, 573, 629, 682, 733],
  margin:   [  2,  38,  50,  57,  61,  64,  66,  67,  69,  69,  70,  71],
};

const planB = {
  revenue:  [244, 267, 289, 311, 332, 352, 372, 392, 410, 428, 446, 463],
  costs:    [148, 152, 156, 161, 165, 169, 173, 176, 180, 183, 187, 190],
  taxes:    [ 39,  43,  46,  50,  53,  56,  60,  63,  66,  68,  71,  74],
  opsVar:   [244, 267, 289, 311, 332, 352, 372, 392, 410, 428, 446, 463].map(r =>
    Math.round(25 + r * 0.035)
  ),
  profit:   [ 96, 115, 133, 150, 167, 183, 199, 216, 230, 245, 259, 273],
  margin:   [ 39,  43,  46,  48,  50,  52,  54,  55,  56,  57,  58,  59],
};

const cumulative = (arr: number[]) =>
  arr.reduce<number[]>((acc, v, i) => [...acc, (acc[i - 1] ?? 0) + v], []);

const planACum = cumulative(planA.profit);
const planBCum = cumulative(planB.profit);

/* ─── Helpers ─────────────────────────────────────────────────── */
function fmt(v: number) {
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(2)}M`;
  return `R$ ${v}k`;
}

function MarginBadge({ margin }: { margin: number }) {
  const color = margin >= 65 ? '#22C55E' : margin >= 50 ? '#D4AF37' : margin >= 35 ? '#3B82F6' : '#94A3B8';
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ background: `${color}20`, color }}>{margin}%</span>
  );
}

/* ─── SVG Profit Chart ────────────────────────────────────────── */
function ProfitChart({ plan }: { plan: 'A' | 'B' }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const data = plan === 'A' ? planA : planB;
  const lineColor = plan === 'A' ? '#3B82F6' : '#10B981';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 700, H = 280;
  const PAD = { top: 20, right: 20, bottom: 40, left: 72 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const maxV = Math.ceil(Math.max(...data.revenue) * 1.08 / 100) * 100;

  const xP = (i: number) => PAD.left + (i / 11) * cW;
  const yP = (v: number) => PAD.top + cH - Math.max(0, (v / maxV)) * cH;

  const path = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xP(i).toFixed(1)},${yP(v).toFixed(1)}`).join(' ');

  const area = (arr: number[]) =>
    `${path(arr)} L${xP(11)},${PAD.top + cH} L${xP(0)},${PAD.top + cH} Z`;

  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round((maxV / 5) * i));

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`gRev${plan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`gPro${plan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`gTax${plan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F87171" stopOpacity="0.03" />
        </linearGradient>
        <clipPath id={`cp${plan}`}>
          <rect x={PAD.left} y={0} height={H}
            width={animated ? cW : 0}
            style={{ transition: 'width 2s cubic-bezier(0.4,0,0.2,1)' }} />
        </clipPath>
      </defs>

      {yTicks.map(v => (
        <g key={v}>
          <line x1={PAD.left} y1={yP(v)} x2={PAD.left + cW} y2={yP(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PAD.left - 8} y={yP(v) + 4} textAnchor="end" fontSize="10" fill="rgba(148,163,184,0.6)">
            {v === 0 ? '' : v >= 1000 ? `R$${(v/1000).toFixed(0)}M` : `R$${v}k`}
          </text>
        </g>
      ))}

      {MONTHS.map((m, i) => (
        <text key={m} x={xP(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(148,163,184,0.5)">{m}</text>
      ))}

      {/* Areas */}
      <path d={area(data.revenue)} fill={`url(#gRev${plan})`} clipPath={`url(#cp${plan})`} />
      <path d={area(data.taxes)} fill={`url(#gTax${plan})`} clipPath={`url(#cp${plan})`} />
      <path d={area(data.profit)} fill={`url(#gPro${plan})`} clipPath={`url(#cp${plan})`} />

      {/* Lines */}
      <path d={path(data.revenue)} fill="none" stroke={lineColor} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" clipPath={`url(#cp${plan})`} />
      <path d={path(data.costs)} fill="none" stroke="rgba(239,68,68,0.65)" strokeWidth="1.5"
        strokeDasharray="5 3" clipPath={`url(#cp${plan})`} />
      <path d={path(data.taxes)} fill="none" stroke="rgba(251,146,60,0.7)" strokeWidth="1.5"
        strokeDasharray="3 3" clipPath={`url(#cp${plan})`} />
      <path d={path(data.profit)} fill="none" stroke="#D4AF37" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" clipPath={`url(#cp${plan})`} />

      {/* Profit dots */}
      {animated && data.profit.map((v, i) => (
        <circle key={i} cx={xP(i)} cy={yP(v)} r="3.5" fill="#D4AF37" stroke="#060C1A" strokeWidth="1.5"
          style={{ opacity: 0, animation: `fade-in 0.3s ease forwards ${0.1 + i * 0.1}s` }} />
      ))}

      {/* Final labels */}
      {animated && (
        <>
          <text x={xP(11) + 6} y={yP(data.revenue[11]) + 4}
            fontSize="10" fontWeight="700" fill={lineColor}
            style={{ opacity: 0, animation: 'fade-in 0.5s ease forwards 1.5s' }}>
            {fmt(data.revenue[11])}
          </text>
          <text x={xP(11) + 6} y={yP(data.profit[11]) + 4}
            fontSize="10" fontWeight="700" fill="#D4AF37"
            style={{ opacity: 0, animation: 'fade-in 0.5s ease forwards 1.7s' }}>
            {fmt(data.profit[11])}
          </text>
          <text x={xP(11) + 6} y={yP(data.taxes[11]) + 4}
            fontSize="9" fill="rgba(251,146,60,0.9)"
            style={{ opacity: 0, animation: 'fade-in 0.5s ease forwards 1.9s' }}>
            {fmt(data.taxes[11])} impostos
          </text>
        </>
      )}
    </svg>
  );
}

/* ─── Tax Detail Box ─────────────────────────────────────────── */
function TaxDetail() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.2)' }}>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-xl">🧾</span>
        <div>
          <p className="text-sm font-bold text-white">Regime Fiscal: Lucro Presumido</p>
          <p className="text-xs" style={{ color: '#64748B' }}>
            Plano A projeta receita anual ~R$7,4M → obrigatório sair do Simples Nacional. Plano B ~R$4,3M → poderia usar Simples, mas usamos LP para ser conservador.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'PIS', rate: '0,65%', color: '#FB923C' },
          { label: 'COFINS', rate: '3,00%', color: '#FB923C' },
          { label: 'ISS', rate: '3,00%', color: '#FBBF24' },
          { label: 'IRPJ', rate: '~4,80%', color: '#F87171' },
          { label: 'CSLL', rate: '~2,88%', color: '#F87171' },
        ].map(({ label, rate, color }) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <p className="text-xs mb-1" style={{ color: '#64748B' }}>{label}</p>
            <p className="text-sm font-black" style={{ color }}>{rate}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: 'rgba(251,146,60,0.1)' }}>
        <span className="text-sm font-semibold text-white">Total carga tributária efetiva</span>
        <span className="text-lg font-black" style={{ color: '#FB923C' }}>~16% da receita</span>
      </div>
      <div className="mt-3">
        <p className="text-xs" style={{ color: '#475569' }}>
          ★ Encargos trabalhistas (FGTS 8% + INSS patronal 20% + RAT/terceiros 3% = ~31% sobre folha) já estão incluídos nos custos fixos operacionais. IOF e taxas bancárias sobre crédito consignado são suportados pelo tomador, não pela plataforma.
        </p>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function ProfitProjection() {
  const [activePlan, setActivePlan] = useState<'A' | 'B' | 'compare'>('A');
  const data = activePlan === 'A' ? planA : activePlan === 'B' ? planB : planA;
  const cum = activePlan === 'A' ? planACum : planBCum;
  const lineColor = activePlan === 'A' ? '#3B82F6' : '#10B981';

  return (
    <section id="lucros" className="relative py-24 bg-dark-a-2">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(251,146,60,0.12)', color: '#FB923C', border: '1px solid rgba(251,146,60,0.25)' }}>
            Previsão de Lucro Líquido · Com Impostos e Encargos
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
            Lucro Real — Sem Surpresas
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748B' }}>
            Receita menos <strong className="text-white">marketing + operacional + encargos trabalhistas + impostos (Lucro Presumido ~16%)</strong>. O que de fato pode ser reinvestido.
          </p>
        </div>

        {/* Tax detail */}
        <div className="mb-10">
          <TaxDetail />
        </div>

        {/* Plan tabs */}
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
                { label: 'Lucro Mês 1', value: fmt(data.profit[0]), sub: `Margem ${data.margin[0]}%`, warn: data.profit[0] < 20 },
                { label: 'Lucro Mês 3', value: fmt(data.profit[2]), sub: `Margem ${data.margin[2]}%`, warn: false },
                { label: 'Lucro Mês 12', value: fmt(data.profit[11]), sub: `Margem ${data.margin[11]}%`, warn: false },
                { label: 'Acumulado 12m', value: fmt(cum[11]), sub: 'Lucro líquido total', warn: false },
              ].map(({ label, value, sub, warn }) => (
                <div key={label} className="rounded-2xl p-5 text-center"
                  style={{
                    background: warn ? 'rgba(251,146,60,0.08)' : `${lineColor}0d`,
                    border: `1px solid ${warn ? 'rgba(251,146,60,0.3)' : lineColor}33`,
                  }}>
                  <p className="text-xs mb-2" style={{ color: '#64748B' }}>{label}</p>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs mt-1" style={{ color: warn ? '#FB923C' : lineColor }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Alerta Mês 1 Plano A */}
            {activePlan === 'A' && (
              <div className="mb-6 rounded-2xl p-4 flex items-start gap-3"
                style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.25)' }}>
                <span className="text-lg flex-shrink-0">⚠️</span>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  <strong className="text-white">Mês 1 quase no zero</strong> — a carga tributária (R$20k) + custos fixos (R$100k) consomem quase toda a receita inicial (R$128k). A partir do Mês 2, o MRR composto cria distância e a margem cresce consistentemente.
                </p>
              </div>
            )}

            {/* Chart */}
            <div className="rounded-3xl p-6 md:p-8 mb-2"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex flex-wrap items-center gap-5 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5" style={{ background: lineColor }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Receita</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5" style={{ background: '#D4AF37' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Lucro Líquido</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6" style={{ borderTop: '1.5px dashed rgba(239,68,68,0.65)' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Custos Totais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6" style={{ borderTop: '1.5px dashed rgba(251,146,60,0.7)' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>Impostos</span>
                </div>
              </div>
              <ProfitChart plan={activePlan} />
            </div>
            <p className="text-xs text-center mb-8" style={{ color: '#334155' }}>
              A área dourada entre custo total e receita = lucro líquido após impostos e encargos
            </p>

            {/* Full monthly table */}
            <div className="rounded-2xl overflow-hidden mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Mês','Receita','Impostos (16%)','Ops + Encargos','Marketing','Total Custos','Lucro Líquido','Margem','Acumulado'].map(h => (
                        <th key={h} className="py-3 px-3 text-left font-semibold uppercase tracking-wider whitespace-nowrap"
                          style={{ color: '#64748B' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS.map((m, i) => (
                      <tr key={m} style={{
                        borderTop: '1px solid rgba(255,255,255,0.03)',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                      }}>
                        <td className="py-3 px-3 font-bold text-white">{m}</td>
                        <td className="py-3 px-3 font-medium" style={{ color: lineColor }}>{fmt(data.revenue[i])}</td>
                        <td className="py-3 px-3 font-medium" style={{ color: '#FB923C' }}>{fmt(data.taxes[i])}</td>
                        <td className="py-3 px-3" style={{ color: '#F87171' }}>
                          {fmt(data.opsVar[i])}
                        </td>
                        <td className="py-3 px-3" style={{ color: '#94A3B8' }}>R$ 75k</td>
                        <td className="py-3 px-3 font-medium" style={{ color: '#F87171' }}>{fmt(data.costs[i])}</td>
                        <td className="py-3 px-3 font-black" style={{ color: '#D4AF37' }}>{fmt(data.profit[i])}</td>
                        <td className="py-3 px-3"><MarginBadge margin={data.margin[i]} /></td>
                        <td className="py-3 px-3 font-medium text-white">{fmt(cum[i])}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(212,175,55,0.06)', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
                      <td className="py-4 px-3 font-black text-white">TOTAL 12M</td>
                      <td className="py-4 px-3 font-black" style={{ color: lineColor }}>
                        {fmt(data.revenue.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#FB923C' }}>
                        {fmt(data.taxes.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#F87171' }}>
                        {fmt(data.opsVar.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-bold" style={{ color: '#94A3B8' }}>R$ 900k</td>
                      <td className="py-4 px-3 font-black" style={{ color: '#F87171' }}>
                        {fmt(data.costs.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#D4AF37' }}>
                        {fmt(cum[11])}
                      </td>
                      <td className="py-4 px-3">
                        <MarginBadge margin={Math.round(cum[11] / data.revenue.reduce((a, b) => a + b, 0) * 100)} />
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#D4AF37' }}>{fmt(cum[11])}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Reinvestimento */}
            <div className="rounded-3xl p-7"
              style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="text-base font-bold text-white mb-1">💰 Capacidade de Reinvestimento por Mês</h3>
              <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                O lucro líquido do mês anterior é o budget adicional disponível para o próximo mês.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {['Mês','Lucro líquido do mês','Budget disponível no próximo mês','Cenário: reinvestir 50%','Cenário: reinvestir 100%'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                          style={{ color: '#64748B', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 5, 8, 11].map(i => (
                      <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                        <td className="py-3 px-3 text-xs font-bold text-white">{MONTHS[i]}</td>
                        <td className="py-3 px-3 text-xs font-bold" style={{ color: '#D4AF37' }}>
                          {fmt(data.profit[i])}
                        </td>
                        <td className="py-3 px-3 text-xs font-medium text-white">
                          R$ {(75 + data.profit[i]).toLocaleString('pt-BR')}k
                        </td>
                        <td className="py-3 px-3 text-xs font-semibold" style={{ color: '#22C55E' }}>
                          R$ {(75 + Math.round(data.profit[i] * 0.5)).toLocaleString('pt-BR')}k ads + {fmt(Math.round(data.profit[i] * 0.5))} caixa
                        </td>
                        <td className="py-3 px-3 text-xs font-black" style={{ color: lineColor }}>
                          R$ {(75 + data.profit[i]).toLocaleString('pt-BR')}k total em mídia
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── COMPARATIVO ───────────────────────────────────── */}
        {activePlan === 'compare' && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {(['A', 'B'] as const).map(p => {
                const d = p === 'A' ? planA : planB;
                const cp = p === 'A' ? planACum : planBCum;
                const c = p === 'A' ? '#3B82F6' : '#10B981';
                return (
                  <div key={p} className="rounded-3xl p-7"
                    style={{ background: `${c}0d`, border: `1px solid ${c}33` }}>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: `${c}25`, color: c }}>Plano {p}</span>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {[
                        { label: 'Imposto M12', value: fmt(d.taxes[11]), color: '#FB923C' },
                        { label: 'Lucro M1', value: fmt(d.profit[0]), color: c },
                        { label: 'Lucro M6', value: fmt(d.profit[5]), color: '#D4AF37' },
                        { label: 'Lucro M12', value: fmt(d.profit[11]), color: '#D4AF37' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <p className="text-xs mb-1" style={{ color: '#475569' }}>{label}</p>
                          <p className="text-xl font-black" style={{ color }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm" style={{ color: '#64748B' }}>Lucro acumulado 12m</span>
                        <span className="text-2xl font-black" style={{ color: '#D4AF37' }}>{fmt(cp[11])}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm" style={{ color: '#64748B' }}>Total impostos 12m</span>
                        <span className="text-base font-bold" style={{ color: '#FB923C' }}>
                          {fmt(d.taxes.reduce((a, b) => a + b, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: '#64748B' }}>Margem média</span>
                        <MarginBadge margin={Math.round(d.margin.reduce((a, b) => a + b, 0) / 12)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full compare table */}
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#64748B' }}>Mês</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#60A5FA' }}>Impostos A</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#D4AF37' }}>Lucro A</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#94A3B8' }}>Margem A</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#34D399' }}>Impostos B</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#D4AF37' }}>Lucro B</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#94A3B8' }}>Margem B</th>
                      <th className="py-3 px-3 text-left uppercase tracking-wider" style={{ color: '#22C55E' }}>Vantagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS.map((m, i) => {
                      const aWins = planA.profit[i] > planB.profit[i];
                      return (
                        <tr key={m} style={{ borderTop: '1px solid rgba(255,255,255,0.03)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                          <td className="py-3 px-3 font-bold text-white">{m}</td>
                          <td className="py-3 px-3" style={{ color: '#FB923C' }}>{fmt(planA.taxes[i])}</td>
                          <td className="py-3 px-3 font-bold" style={{ color: '#D4AF37' }}>{fmt(planA.profit[i])}</td>
                          <td className="py-3 px-3"><MarginBadge margin={planA.margin[i]} /></td>
                          <td className="py-3 px-3" style={{ color: '#FB923C' }}>{fmt(planB.taxes[i])}</td>
                          <td className="py-3 px-3 font-bold" style={{ color: '#D4AF37' }}>{fmt(planB.profit[i])}</td>
                          <td className="py-3 px-3"><MarginBadge margin={planB.margin[i]} /></td>
                          <td className="py-3 px-3 font-bold"
                            style={{ color: aWins ? '#60A5FA' : '#34D399' }}>
                            {aWins ? 'A' : 'B'} +{fmt(Math.abs(planA.profit[i] - planB.profit[i]))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(212,175,55,0.06)', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
                      <td className="py-4 px-3 font-black text-white">TOTAL</td>
                      <td className="py-4 px-3 font-black" style={{ color: '#FB923C' }}>
                        {fmt(planA.taxes.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#D4AF37' }}>{fmt(planACum[11])}</td>
                      <td className="py-4 px-3">
                        <MarginBadge margin={Math.round(planACum[11] / planA.revenue.reduce((a, b) => a + b, 0) * 100)} />
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#FB923C' }}>
                        {fmt(planB.taxes.reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#D4AF37' }}>{fmt(planBCum[11])}</td>
                      <td className="py-4 px-3">
                        <MarginBadge margin={Math.round(planBCum[11] / planB.revenue.reduce((a, b) => a + b, 0) * 100)} />
                      </td>
                      <td className="py-4 px-3 font-black" style={{ color: '#60A5FA' }}>
                        A +{fmt(planACum[11] - planBCum[11])}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: '🏆', title: 'Plano A: maior lucro total', desc: `R$${(planACum[11]/1000).toFixed(2)}M acumulado vs R$${(planBCum[11]/1000).toFixed(2)}M do B. MRR compõe e supera a carga fiscal pesada do início.`, color: '#3B82F6' },
                { icon: '⚡', title: 'Plano B: positivo desde o Dia 1', desc: `R$96k de lucro no Mês 1 vs R$3k do A. Para quem precisa de caixa operacional imediato, B é a escolha óbvia.`, color: '#10B981' },
                { icon: '🧾', title: 'B paga menos imposto total', desc: `B paga R${planB.taxes.reduce((a,b)=>a+b,0)}k vs R${planA.taxes.reduce((a,b)=>a+b,0)}k do A em 12 meses — porque gera menos receita total.`, color: '#D4AF37' },
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
