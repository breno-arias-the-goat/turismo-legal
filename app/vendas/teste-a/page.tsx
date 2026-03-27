import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FAQComponent from '@/app/components/FAQ';
import StatsSection from '@/app/components/sections/StatsSection';
import GradientBadge from '@/app/components/ui/GradientBadge';
import SectionHeader from '@/app/components/ui/SectionHeader';
import FeatureIcon from '@/app/components/ui/FeatureIcon';
import PrimaryButton from '@/app/components/ui/PrimaryButton';
import GlassCard from '@/app/components/ui/GlassCard';
import HoverCard from '@/app/components/ui/HoverCard';

export const metadata = {
  title: 'Turismo Legal — Assinatura que Transforma Férias em Experiências',
  description: 'Acesso ilimitado ao Aquática American Park + 250 mil hotéis + Crédito consignado aprovado em 48h. Planos Gold e Black a partir de R$ 165/mês.',
};

const faqItems = [
  { question: 'Como funciona a assinatura?', answer: 'Você escolhe um plano (Gold ou Black), paga mensalmente ou anual, e ganha acesso ilimitado ao parque + créditos de viagem. Ativação imediata após o pagamento.' },
  { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, sem multa nem burocracia. Cancele pelo app ou WhatsApp e seu acesso permanece até o fim do ciclo pago.' },
  { question: 'Como funcionam os créditos de viagem?', answer: 'Você recebe créditos mensais que expiram em 12 meses. São aplicados automaticamente em reservas de hotéis na plataforma. Não convertem em dinheiro.' },
  { question: 'O crédito consignado é seguro?', answer: 'Sim. É regulado pelo governo federal. O desconto sai automaticamente da folha de pagamento — você nunca esquece uma parcela.' },
  { question: 'Quanto tempo leva para aprovar o crédito?', answer: 'A análise é automática via DATAPREV. Em até 48 horas o dinheiro cai na sua conta por PIX ou TED.' },
  { question: 'Quem pode solicitar crédito consignado?', answer: 'Trabalhadores CLT com 6+ meses na empresa atual, idade entre 18-60 anos e score mínimo de 300 pontos. Sem consulta ao SPC/Serasa.' },
  { question: 'Qual é o valor máximo de crédito?', answer: 'De R$ 1.000 a R$ 10.000, parcelado em 6 a 36 meses. A margem consignável não pode ultrapassar 35% do salário líquido.' },
  { question: 'Há taxas escondidas?', answer: 'Não. O preço exibido é o que você paga. Você vê o custo total do crédito antes de confirmar a contratação.' },
];

const stats = [
  { number: '20k+', label: 'Famílias Ativas', desc: 'Aproveitando todo mês' },
  { number: '250k+', label: 'Hotéis na Plataforma', desc: 'Em todo o mundo' },
  { number: '4.8', label: 'Avaliação Média', desc: '⭐⭐⭐⭐⭐ no Google' },
  { number: '48h', label: 'Aprovação de Crédito', desc: 'Sem burocracia' },
];

function CheckA({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,102,255,0.15)' }}>
        <svg className="w-3 h-3" fill="none" stroke="#60A5FA" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <span className="text-[14px] text-white/70">{text}</span>
    </li>
  );
}

function CheckGold({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.15)' }}>
        <svg className="w-3 h-3" fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <span className="text-[14px] text-white/70">{text}</span>
    </li>
  );
}

export default function TesteA() {
  return (
    <div className="bg-[#060C1A] min-h-screen">
      <Header variant="a" />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-dark-a dot-grid min-h-screen flex items-center pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="animate-fade-up">
            <GradientBadge variant="glass" dot className="mb-8">
              Assinatura Premium · Parque + Hotéis + Crédito
            </GradientBadge>

            <h1 className="display-xl text-white mb-6">
              Assinatura que{' '}
              <br className="hidden sm:block"/>
              <span className="gradient-text-a">Transforma Férias</span>
              <br className="hidden sm:block"/>
              {' '}em Experiências
            </h1>

            <p className="text-[18px] leading-[1.65] mb-8" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '500px' }}>
              Acesso ilimitado ao Aquática American Park + 250 mil hotéis com descontos reais + Crédito consignado aprovado em 48h.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-2">
                {['M', 'A', 'C'].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ borderColor: '#060C1A', background: ['#0066FF', '#3B82F6', '#1D4ED8'][i] }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-white/80 text-[14px] font-semibold">20.000+</span>
                <span className="text-white/45 text-[14px]"> famílias já assinam</span>
              </div>
              <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-3.5 h-3.5" fill="#F59E0B" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-white/45 text-[13px] ml-1">4.8/5</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton variant="a" size="lg" href="#planos" arrow>
                Assinar Agora
              </PrimaryButton>
              <PrimaryButton variant="outline-white" size="lg" href="#vantagens">
                Ver Vantagens
              </PrimaryButton>
            </div>

            <p className="mt-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ✓ Cancele quando quiser · ✓ Sem fidelidade · ✓ Ativação imediata
            </p>
          </div>

          {/* Right — Hero Card */}
          <div className="flex justify-center animate-scale-in delay-200">
            <div className="relative w-full max-w-[400px]">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30" style={{ background: 'radial-gradient(ellipse, #0066FF 0%, transparent 70%)' }} />

              {/* Main card */}
              <GlassCard className="relative p-7 animate-glow-a rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <GradientBadge variant="blue">Plano Gold</GradientBadge>
                  <GradientBadge variant="gold">Popular</GradientBadge>
                </div>

                <div className="mb-1">
                  <span className="font-extrabold gradient-text-a" style={{ fontSize: '48px', letterSpacing: '-0.04em' }}>R$ 165</span>
                  <span className="text-white/40 text-[14px]">/mês</span>
                </div>
                <p className="text-[13px] mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>ou R$ 1.990/ano · economize 1 mês</p>

                <ul className="space-y-3 mb-7">
                  {[
                    'Acesso ilimitado ao parque',
                    'Titular + até 4 dependentes',
                    'Créditos mensais de viagem',
                    'Acesso a 250k+ hotéis',
                    'Suporte dedicado via WhatsApp',
                  ].map(f => <CheckA key={f} text={f} />)}
                </ul>

                <PrimaryButton variant="a" size="md" href="#planos" className="w-full justify-center" arrow>
                  Assinar Gold
                </PrimaryButton>
              </GlassCard>

              {/* Floating badge bottom-right */}
              <div
                className="absolute -bottom-5 -right-5 rounded-2xl px-4 py-3 animate-float shadow-[0_8px_24px_rgba(212,175,55,0.4)]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F59E0B)' }}
              >
                <p className="text-[11px] font-bold text-[#0A0A0A]">💰 Economize</p>
                <p className="text-[17px] font-extrabold text-[#0A0A0A] leading-tight">R$ 1.920/ano</p>
                <p className="text-[10px] text-[#0A0A0A]/60">no parque aquático</p>
              </div>

              {/* Floating badge top-left */}
              <div
                className="absolute -top-4 -left-4 rounded-2xl px-4 py-2.5 animate-float-delay"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
              >
                <p className="text-[12px] font-semibold text-white">🏊 Parque + 250k Hotéis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR ──────────────────────────────────────── */}
      <section id="vantagens" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Por que escolher"
            headline="3 Pilares de Valor"
            subheadline="Cada centavo da sua assinatura trabalha para economizar mais do que você paga."
            accentWords={['Valor']}
            accentClass="gradient-text-blue"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'park' as const,
                title: 'Acesso Ilimitado ao Parque',
                desc: 'Entrada livre para você e sua família quantas vezes quiser ao longo do ano. Um ingresso avulso custa R$ 160.',
                metric: 'R$ 1.920',
                metricLabel: 'de economia anual',
                sub: '12 visitas × R$ 160',
              },
              {
                icon: 'credit' as const,
                title: 'Créditos Mensais de Viagem',
                desc: 'Receba créditos todo mês aplicáveis em mais de 250 mil hotéis no mundo inteiro. Sua assinatura vira viagem.',
                metric: 'R$ 165–250',
                metricLabel: 'em créditos/mês',
                sub: 'Acumulam por 12 meses',
              },
              {
                icon: 'hotel' as const,
                title: 'Economia Real em Hotéis',
                desc: 'Preços exclusivos 30–70% menores que Booking e Expedia. Acesso à mesma rede com tarifas de parceiro.',
                metric: 'R$ 600',
                metricLabel: 'economizados em 3 noites',
                sub: 'R$ 500 → R$ 300/noite',
              },
            ].map((p) => (
              <HoverCard
                key={p.title}
                className="rounded-2xl p-8 border"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #F3F4F6',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <FeatureIcon icon={p.icon} variant="blue" size="lg" />
                <h3 className="text-[18px] font-semibold mt-6 mb-3" style={{ color: '#0A0A0A', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#6B7280' }}>{p.desc}</p>
                <div className="pt-5" style={{ borderTop: '1px solid #F3F4F6' }}>
                  <div className="text-[24px] font-bold" style={{ color: '#0066FF', letterSpacing: '-0.02em' }}>{p.metric}</div>
                  <div className="text-[12px] font-semibold mt-0.5" style={{ color: '#10B981' }}>{p.metricLabel}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: '#9CA3AF' }}>{p.sub}</div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────── */}
      <section id="planos" className="bg-dark-a-2 dot-grid py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Planos de assinatura"
            headline="Escolha Seu Plano"
            subheadline="Ambos com acesso ilimitado ao parque e créditos mensais de viagem."
            theme="dark"
            accentWords={['Plano']}
            accentClass="gradient-text-a"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* GOLD */}
            <GlassCard className="p-8 rounded-3xl" hover>
              <GradientBadge variant="blue" className="mb-5">Popular</GradientBadge>
              <h3 className="text-[22px] font-bold text-white mb-1 tracking-tight">Gold</h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-extrabold gradient-text-a" style={{ fontSize: '52px', letterSpacing: '-0.04em', lineHeight: '1' }}>R$ 165</span>
                <span className="text-white/40 text-[14px] pb-2">/mês</span>
              </div>
              <p className="text-[13px] mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>ou R$ 1.990/ano (1 mês grátis)</p>

              <ul className="space-y-3 mb-8">
                {['Acesso ilimitado ao parque', 'Titular + até 4 dependentes', 'Créditos mensais de viagem', 'Acesso a 250k+ hotéis', 'Suporte WhatsApp'].map(f => <CheckA key={f} text={f} />)}
              </ul>

              <PrimaryButton variant="a" size="md" href="#" className="w-full justify-center">
                Assinar Gold
              </PrimaryButton>
            </GlassCard>

            {/* BLACK SIGNATURE — featured */}
            <div className="relative">
              {/* Badge flutuante */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-[11px] font-bold text-[#0A0A0A] shadow-[0_4px_12px_rgba(212,175,55,.5)]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F59E0B)' }}
              >
                ✦ Recomendado
              </div>

              <GlassCard
                variant="gold"
                featured
                className="p-8 rounded-3xl animate-glow-gold"
              >
                {/* Linha dourada topo */}
                <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }} />

                <GradientBadge variant="gold" className="mb-5">Premium</GradientBadge>
                <h3 className="text-[22px] font-bold text-white mb-1 tracking-tight">Black Signature</h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-extrabold gradient-text-gold" style={{ fontSize: '52px', letterSpacing: '-0.04em', lineHeight: '1' }}>R$ 250</span>
                  <span className="text-white/40 text-[14px] pb-2">/mês</span>
                </div>
                <p className="text-[13px] mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>ou R$ 3.000/ano · Recomendado para viajantes</p>

                <ul className="space-y-3 mb-8">
                  {['Tudo do Gold incluído', 'Créditos de viagem 2× maiores', 'Prioridade máxima no atendimento', 'Acesso VIP ao parque', 'Consultoria pessoal de viagens', 'Cashback em reservas de hotéis'].map(f => <CheckGold key={f} text={f} />)}
                </ul>

                <PrimaryButton variant="gold" size="md" href="#" className="w-full justify-center" arrow>
                  Assinar Black Signature
                </PrimaryButton>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIVO ECONOMIA ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Comparativo de preços"
            headline="Veja Quanto Você Economiza"
            subheadline="Números reais comparando Turismo Legal com as alternativas do mercado."
            accentWords={['Economiza']}
            accentClass="gradient-text-blue"
          />

          <div className="rounded-2xl overflow-hidden mb-8" style={{ boxShadow: '0 4px 8px rgba(0,0,0,.04), 0 12px 24px rgba(0,0,0,.06)', border: '1px solid #F3F4F6' }}>
            <table className="w-full text-[14px]">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-[#6B7280] text-[12px] uppercase tracking-wide" style={{ background: '#F9FAFB' }}>Serviço</th>
                  <th className="px-6 py-4 font-bold text-center text-white text-[13px]" style={{ background: '#0066FF' }}>Turismo Legal Gold</th>
                  <th className="px-6 py-4 font-semibold text-center text-[#6B7280] text-[12px] uppercase tracking-wide" style={{ background: '#F9FAFB' }}>Booking + Ingresso</th>
                  <th className="px-6 py-4 font-semibold text-center text-[12px] uppercase tracking-wide" style={{ background: '#F9FAFB', color: '#10B981' }}>Economia</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Assinatura anual', 'R$ 1.980', '—', '—'],
                  ['Ingressos (12×/ano)', 'Incluído', 'R$ 1.920', 'R$ 1.920'],
                  ['Hotel — 3 noites/mês', 'R$ 900 (R$ 300/nt)', 'R$ 1.500 (R$ 500/nt)', 'R$ 600'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td className="px-6 py-4 font-medium text-[#374151]">{row[0]}</td>
                    <td className="px-6 py-4 text-center font-semibold" style={{ color: '#0066FF' }}>{row[1]}</td>
                    <td className="px-6 py-4 text-center" style={{ color: '#9CA3AF' }}>{row[2]}</td>
                    <td className="px-6 py-4 text-center font-semibold" style={{ color: '#10B981' }}>{row[3]}</td>
                  </tr>
                ))}
                <tr style={{ background: 'linear-gradient(to right, #EFF6FF, #DBEAFE)' }}>
                  <td className="px-6 py-4 font-bold text-[#0A0A0A]">Total Anual</td>
                  <td className="px-6 py-4 text-center font-extrabold text-[16px]" style={{ color: '#0066FF' }}>R$ 4.860</td>
                  <td className="px-6 py-4 text-center font-bold" style={{ color: '#9CA3AF' }}>R$ 3.420</td>
                  <td className="px-6 py-4 text-center font-extrabold text-[16px]" style={{ color: '#10B981' }}>R$ 2.520</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <p className="text-[13px] font-medium mb-1" style={{ color: '#6B7280' }}>Economia real com apenas 1 viagem/mês</p>
            <p className="font-extrabold" style={{ fontSize: '36px', color: '#059669', letterSpacing: '-0.03em' }}>R$ 2.520 por ano</p>
            <p className="text-[13px] mt-1" style={{ color: '#10B981' }}>Seu plano Gold se paga mais de uma vez</p>
          </div>
        </div>
      </section>

      {/* ── CRÉDITO CONSIGNADO ────────────────────────────────────── */}
      <section id="credito" className="bg-dark-a dot-grid py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <GradientBadge variant="green" dot className="mb-6">
              Oferta complementar
            </GradientBadge>
            <h2 className="display-md text-white mb-4">
              <span className="gradient-text-b">Crédito Consignado</span>
              <br/>para Financiar Suas Viagens
            </h2>
            <p className="text-[17px] leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Como assinante, você tem acesso prioritário a crédito consignado com desconto em folha. Taxas competitivas, aprovação em 48h, sem consulta ao SPC/Serasa.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: 'spark' as const, title: 'Aprovação Rápida', items: ['Análise automática via DATAPREV', 'Dinheiro na conta em até 48 horas'] },
                { icon: 'lock' as const, title: '100% Seguro', items: ['Desconto automático em folha', 'Regulado pelo Banco Central'] },
                { icon: 'money' as const, title: 'Taxas Competitivas', items: ['De R$ 1.000 a R$ 10.000', 'Parcelamento de 6 a 36 meses'] },
              ].map(b => (
                <div key={b.title} className="flex gap-4">
                  <FeatureIcon icon={b.icon} variant="green" size="md" />
                  <div>
                    <h4 className="font-semibold text-white text-[15px] mb-1">{b.title}</h4>
                    {b.items.map(i => (
                      <p key={i} className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{i}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton variant="b" size="lg" href="#" arrow>
                Solicitar Crédito
              </PrimaryButton>
              <PrimaryButton variant="outline-white" size="lg" href="#">
                Saiba mais
              </PrimaryButton>
            </div>
          </div>

          {/* Right — terminal card */}
          <div className="animate-scale-in delay-200">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20" style={{ background: 'radial-gradient(ellipse, #00C46A 0%, transparent 70%)' }} />
              <GlassCard variant="green" className="relative p-7 rounded-3xl">
                {/* Terminal bar */}
                <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"/>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"/>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"/>
                  </div>
                  <span className="text-[11px] ml-2 font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>credito_consignado.sys</span>
                </div>

                <div className="space-y-3 font-mono text-[13px]">
                  {[
                    { key: 'status', val: '✓ Pré-aprovado', color: '#34D399' },
                    { key: 'modalidade', val: 'Consignado CLT', color: 'rgba(255,255,255,0.7)' },
                    { key: 'valor_max', val: 'R$ 10.000', color: 'rgba(255,255,255,0.7)' },
                    { key: 'taxa_mensal', val: '~1.8% a.m.', color: 'rgba(255,255,255,0.7)' },
                    { key: 'aprovacao', val: 'Até 48 horas', color: 'rgba(255,255,255,0.7)' },
                    { key: 'spc_serasa', val: 'Não consultado', color: '#34D399' },
                    { key: 'desconto', val: 'Automático em folha', color: 'rgba(255,255,255,0.7)' },
                  ].map(line => (
                    <div key={line.key} className="flex gap-3">
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line.key}:</span>
                      <span style={{ color: line.color }}>{line.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Valor', value: 'R$ 1k–10k' },
                      { label: 'Prazo', value: '6–36 meses' },
                      { label: 'Contratação', value: '100% digital' },
                      { label: 'Pagamento', value: 'PIX ou TED' },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(0,196,106,0.08)', border: '1px solid rgba(0,196,106,0.15)' }}>
                        <p className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</p>
                        <p className="text-[13px] font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#F8F9FF' }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Processo"
            headline="Como Funciona"
            subheadline="Simples, transparente e sem burocracia."
            accentWords={['Funciona']}
            accentClass="gradient-text-blue"
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[36px] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5" style={{ background: 'linear-gradient(to right, rgba(0,102,255,0.2), #0066FF, rgba(0,102,255,0.2))' }} />
            {[
              { icon: 'form' as const, title: 'Escolha Seu Plano', desc: 'Gold ou Black Signature. Ativação imediata.' },
              { icon: 'park' as const, title: 'Aproveite o Parque', desc: 'Acesso ilimitado para você e a família.' },
              { icon: 'credit' as const, title: 'Acumule Créditos', desc: 'Receba créditos mensais de viagem.' },
              { icon: 'plane' as const, title: 'Viaje com Economia', desc: 'Use em 250k+ hotéis com preços exclusivos.' },
            ].map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-extrabold text-[22px] mx-auto mb-5 relative z-10 shadow-[0_4px_12px_rgba(0,102,255,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #0066FF, #3B82F6)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex justify-center mb-4">
                  <FeatureIcon icon={s.icon} variant="blue" size="md" />
                </div>
                <h3 className="font-semibold text-[15px] mb-2" style={{ color: '#0A0A0A', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <StatsSection stats={stats} variant="a" title="Números que impressionam" />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            label="Suporte"
            headline="Dúvidas Frequentes"
            subheadline="Tudo que você precisa saber antes de assinar."
            accentWords={['Frequentes']}
            accentClass="gradient-text-blue"
          />
          <FAQComponent items={faqItems} />
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="bg-cta-a dot-grid py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <GradientBadge variant="glass" dot className="mb-8 mx-auto">
            Comece hoje
          </GradientBadge>
          <h2 className="display-lg text-white mb-5">
            Pronto para Transformar<br/>
            <span className="gradient-text-a">Suas Férias?</span>
          </h2>
          <p className="text-[18px] mb-10" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto 40px' }}>
            Assine agora e comece a economizar desde hoje. Ativação imediata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton variant="a" size="xl" href="#planos" arrow className="animate-glow-a">
              Assinar Agora
            </PrimaryButton>
            <PrimaryButton variant="outline-white" size="xl" href="#">
              Falar com Especialista
            </PrimaryButton>
          </div>
          <p className="mt-6 text-[12px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            ✓ Cancele quando quiser · ✓ Sem fidelidade · ✓ Crédito em 48h
          </p>
        </div>
      </section>

      <Footer variant="a" />
    </div>
  );
}
