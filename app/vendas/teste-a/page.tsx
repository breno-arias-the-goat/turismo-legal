import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FAQComponent from '@/app/components/FAQ';

export const metadata = {
  title: 'Turismo Legal - Assinatura que Transforma a Diversão em Destinos',
  description: 'Acesso ilimitado ao Aquática American Park + 250 mil hotéis + Crédito consignado com juros baixos. Planos a partir de R$ 165/mês.',
};

const faqItems = [
  { question: 'Como funciona a assinatura?', answer: 'Você escolhe um plano (Gold ou Black), paga mensalmente ou anual, e ganha acesso ilimitado ao parque + créditos de viagem. Simples assim.' },
  { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, sem penalidades. Você pode cancelar sua assinatura a qualquer momento pelo app ou WhatsApp.' },
  { question: 'Como funcionam os créditos de viagem?', answer: 'Você recebe créditos todo mês que podem ser usados em 250 mil hotéis. Os créditos não expiram e podem ser acumulados.' },
  { question: 'O crédito consignado é seguro?', answer: 'Sim, é regulado pelo governo. O desconto é automático em folha e você tem total controle sobre o processo.' },
  { question: 'Quanto tempo leva para aprovar o crédito?', answer: 'Até 48 horas. Após a aprovação, o dinheiro cai na sua conta por PIX ou TED.' },
  { question: 'Quem pode solicitar crédito consignado?', answer: 'Trabalhadores CLT com 6+ meses na empresa, idade entre 18-60 anos e score mínimo de 300 pontos.' },
  { question: 'Qual é o valor máximo de crédito?', answer: 'Você pode solicitar de R$ 1.000 a R$ 10.000, parcelado de 6 a 36 meses.' },
  { question: 'Há taxas escondidas?', answer: 'Não. Tudo é transparente. Você vê exatamente quanto vai pagar antes de confirmar.' },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#10B981' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
    </svg>
  );
}

function DashIcon() {
  return <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300 font-bold">—</span>;
}

export default function TesteA() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="a" />

      {/* SEÇÃO 1: HERO */}
      <section className="pt-24 pb-20 px-6" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ffffff 60%)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Teste A — Assinatura Premium
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: '#111827' }}>
              Assinatura que Transforma a Diversão em Destinos
            </h1>
            <p className="text-xl leading-relaxed mb-8" style={{ color: '#6B7280' }}>
              Acesso ilimitado ao Aquática American Park + 250 mil hotéis + Crédito consignado com juros baixos para você e sua família.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#planos"
                className="px-8 py-4 rounded-xl text-white font-semibold text-base text-center transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: '#0066FF' }}
              >
                Assinar Agora
              </a>
              <a
                href="#vantagens"
                className="px-8 py-4 rounded-xl font-semibold text-base text-center transition-all hover:bg-gray-50 border-2"
                style={{ borderColor: '#0066FF', color: '#0066FF' }}
              >
                Conhecer Vantagens
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">✓ Cancele a qualquer momento &nbsp;·&nbsp; ✓ Sem fidelidade</p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0066FF, #3B82F6)' }}>
                <div className="text-6xl mb-4">🏊‍♀️</div>
                <h3 className="text-white text-xl font-bold mb-2">Aquática American Park</h3>
                <p className="text-blue-100 text-sm mb-6">Acesso ilimitado para toda a família</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-white font-bold text-lg">R$ 160</div>
                    <div className="text-blue-200 text-xs">ingresso avulso</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="font-bold text-lg" style={{ color: '#0066FF' }}>Incluído</div>
                    <div className="text-gray-500 text-xs">no plano Gold</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 rounded-2xl px-4 py-2 text-sm font-bold shadow-lg">
                Economize R$ 1.920/ano
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: 3 PILARES */}
      <section id="vantagens" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>3 Pilares de Valor</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Por que o Turismo Legal é a melhor escolha para sua família</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏊',
                title: 'Acesso Ilimitado ao Parque',
                desc: 'Entrada livre para você e sua família quantas vezes quiser. Um ingresso custa R$ 160, com a assinatura você economiza desde a primeira visita.',
                number: '12 visitas/ano',
                sub: 'Economia de R$ 1.920',
              },
              {
                icon: '💳',
                title: 'Créditos Mensais de Viagem',
                desc: 'Receba créditos todo mês que podem ser usados em 250 mil hotéis. Sua assinatura se transforma em viagem automaticamente.',
                number: 'R$ 165–250/mês',
                sub: 'Viagem anual financiada',
              },
              {
                icon: '🏨',
                title: 'Economia Real em Hotéis',
                desc: 'Acesso exclusivo a preços 30–70% mais baixos que Booking. Viaje com sua família gastando menos.',
                number: 'R$ 500 → R$ 300/noite',
                sub: 'R$ 600 de economia em 3 noites',
              },
            ].map((p) => (
              <div key={p.title} className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-5">{p.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#111827' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>{p.desc}</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-lg font-bold" style={{ color: '#0066FF' }}>{p.number}</div>
                  <div className="text-sm" style={{ color: '#10B981' }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PLANOS */}
      <section id="planos" className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Escolha Seu Plano</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Ambos com acesso ilimitado ao parque</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GOLD */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 relative hover:shadow-xl transition-shadow">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>Gold</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ color: '#0066FF' }}>R$ 165</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">ou R$ 1.990/ano (economize 1 mês)</p>
              <ul className="space-y-3 mb-8">
                {['Acesso ilimitado ao parque', '1 titular + até 4 dependentes', 'Créditos mensais de viagem', 'Acesso a 250k+ hotéis', 'Suporte por WhatsApp'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <a href="#" className="block w-full text-center py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: '#0066FF' }}>
                Assinar Gold
              </a>
            </div>

            {/* BLACK */}
            <div className="rounded-2xl border-2 p-8 relative hover:shadow-xl transition-shadow" style={{ background: '#111827', borderColor: '#D4AF37' }}>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: '#D4AF37', color: '#111827' }}>
                Premium
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Black Signature</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ color: '#D4AF37' }}>R$ 250</span>
                <span className="text-gray-400 text-sm">/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">ou R$ 3.000/ano</p>
              <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>Recomendado para quem viaja mais</p>
              <ul className="space-y-3 mb-8">
                {['Tudo do Gold incluído', 'Créditos 2x maiores', 'Prioridade em atendimento', 'Acesso VIP ao parque', 'Consultoria de viagens', 'Cashback em hotéis'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#D4AF37' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className="block w-full text-center py-4 rounded-xl font-semibold transition-all hover:opacity-90 text-gray-900" style={{ background: '#D4AF37' }}>
                Assinar Black
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: COMPARATIVO ECONOMIA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Veja Quanto Você Economiza</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Comparativo real com plataformas concorrentes</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Serviço</th>
                  <th className="px-6 py-4 font-semibold text-center" style={{ color: '#0066FF' }}>Turismo Legal Gold</th>
                  <th className="px-6 py-4 font-semibold text-center text-gray-500">Booking + Ingresso</th>
                  <th className="px-6 py-4 font-semibold text-center" style={{ color: '#10B981' }}>Economia</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Assinatura', 'R$ 165/mês', '—', '—'],
                  ['Ingresso Parque (12×/ano)', 'Incluído', 'R$ 1.920', 'R$ 1.920'],
                  ['Hotel (3 noites/mês)', 'R$ 900 (R$ 300/noite)', 'R$ 1.500 (R$ 500/noite)', 'R$ 600'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row[0]}</td>
                    <td className="px-6 py-4 text-center" style={{ color: '#0066FF' }}>{row[1]}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row[2]}</td>
                    <td className="px-6 py-4 text-center font-semibold" style={{ color: '#10B981' }}>{row[3]}</td>
                  </tr>
                ))}
                <tr style={{ background: '#EFF6FF' }}>
                  <td className="px-6 py-4 font-bold text-gray-900">Total Anual</td>
                  <td className="px-6 py-4 text-center font-bold" style={{ color: '#0066FF' }}>R$ 2.880</td>
                  <td className="px-6 py-4 text-center font-bold text-gray-500">R$ 4.320</td>
                  <td className="px-6 py-4 text-center font-bold" style={{ color: '#10B981' }}>R$ 1.440</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold" style={{ color: '#10B981' }}>
              Economia de R$ 1.440/ano apenas em 1 viagem
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: CRÉDITO CONSIGNADO */}
      <section id="credito" className="py-20 px-6" style={{ background: '#F0FDF4' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="rounded-3xl p-8 text-center w-full max-w-sm" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-white text-xl font-bold mb-4">Crédito Consignado</h3>
              <div className="grid grid-cols-2 gap-3 text-white">
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="font-bold">R$ 1k–10k</div>
                  <div className="text-green-100 text-xs">Valor disponível</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="font-bold">48h</div>
                  <div className="text-green-100 text-xs">Aprovação</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="font-bold">6–36x</div>
                  <div className="text-green-100 text-xs">Parcelamento</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="font-bold">100%</div>
                  <div className="text-green-100 text-xs">Seguro</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>
              Amplie Suas Possibilidades com Crédito Consignado
            </h2>
            <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
              Como assinante do Turismo Legal, você tem acesso a crédito consignado com desconto em folha. Financie suas viagens com taxas competitivas e aprovação em até 48 horas.
            </p>
            <div className="space-y-5 mb-8">
              {[
                { icon: '⚡', title: 'Rápido', items: ['Aprovação em até 48 horas', 'Sem burocracia excessiva'] },
                { icon: '🔒', title: 'Seguro', items: ['Desconto automático em folha', 'Regulado pelo governo'] },
                { icon: '💎', title: 'Acessível', items: ['Crédito de R$ 1k a R$ 10k', 'Parcelamento de 6 a 36 meses'] },
              ].map(b => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="text-3xl">{b.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: '#111827' }}>{b.title}</h4>
                    {b.items.map(i => <p key={i} className="text-sm" style={{ color: '#6B7280' }}>{i}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#" className="px-6 py-3 rounded-xl text-white font-semibold text-center transition-all hover:opacity-90" style={{ background: '#10B981' }}>
                Solicitar Crédito
              </a>
              <a href="#" className="px-6 py-3 rounded-xl font-semibold text-center transition-all hover:underline" style={{ color: '#0066FF' }}>
                Saiba mais sobre crédito consignado →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: COMO FUNCIONA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Como Funciona</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Simples e transparente</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '01', icon: '📋', title: 'Escolha Seu Plano', desc: 'Escolha entre Gold ou Black Signature' },
              { num: '02', icon: '🎢', title: 'Aproveite o Parque', desc: 'Acesso ilimitado para você e sua família' },
              { num: '03', icon: '💳', title: 'Acumule Créditos', desc: 'Ganhe créditos de viagem todo mês' },
              { num: '04', icon: '✈️', title: 'Viaje com Economia', desc: 'Use em 250k+ hotéis com preços exclusivos' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: '#EFF6FF' }}>
                  {step.icon}
                </div>
                <div className="text-xs font-bold mb-2" style={{ color: '#0066FF' }}>PASSO {step.num}</div>
                <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: NÚMEROS */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Números que Impressionam</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '20.000+', label: 'Membros Ativos', desc: 'Famílias aproveitando vantagens' },
              { num: '250.000+', label: 'Hotéis Disponíveis', desc: 'Em todo o mundo' },
              { num: '4.8/5', label: 'Avaliação Média', desc: 'Satisfação dos clientes' },
              { num: '12x/ano', label: 'Média de Visitação', desc: 'Ao Aquática American Park' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold mb-1" style={{ color: '#0066FF' }}>{s.num}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>{s.label}</div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Dúvidas Frequentes</h2>
          </div>
          <FAQComponent items={faqItems} />
        </div>
      </section>

      {/* SEÇÃO 9: CTA FINAL */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Pronto para Transformar Suas Férias?</h2>
          <p className="text-xl mb-10" style={{ color: '#6B7280' }}>Assine agora e comece a economizar desde hoje</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#planos" className="px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:shadow-xl" style={{ background: '#0066FF' }}>
              Assinar Agora
            </a>
            <a href="#" className="px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white border-2" style={{ borderColor: '#0066FF', color: '#0066FF' }}>
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      <Footer variant="a" />
    </div>
  );
}
