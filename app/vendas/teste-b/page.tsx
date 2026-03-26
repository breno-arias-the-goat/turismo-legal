import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FAQComponent from '@/app/components/FAQ';

export const metadata = {
  title: 'Turismo Legal - Comece Grátis. Viaje com Crédito Consignado.',
  description: 'Acesso grátis ao parque + Crédito consignado de R$ 1k a R$ 10k com aprovação em 48 horas. Sem cartão de crédito.',
};

const faqItems = [
  { question: 'Como funciona o crédito consignado?', answer: 'É um empréstimo com desconto automático em folha. Você solicita, é aprovado em até 48 horas, e o dinheiro cai na sua conta. As parcelas saem direto do seu salário.' },
  { question: 'Preciso de cartão de crédito?', answer: 'Não. Você não precisa de cartão de crédito. Apenas de uma conta bancária ativa.' },
  { question: 'Qual é a taxa de juros?', answer: 'As taxas são competitivas e variam conforme seu perfil. Você vê exatamente quanto vai pagar antes de confirmar.' },
  { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, você pode solicitar portabilidade para outro banco sem custos.' },
  { question: 'Como é feita a aprovação?', answer: 'Consultamos DATAPREV (sistema do governo) e validamos suas informações. Tudo é automático e seguro.' },
  { question: 'Quanto tempo leva?', answer: 'Solicitação: 5 minutos. Aprovação: até 48 horas. Dinheiro na conta: imediato após aprovação.' },
  { question: 'Há taxas escondidas?', answer: 'Não. Tudo é transparente. Você vê exatamente quanto vai pagar antes de confirmar.' },
  { question: 'Posso usar o crédito para o que quiser?', answer: 'Sim. O dinheiro é seu. Você pode usar para viagens, educação, reforma, o que quiser.' },
  { question: 'E se eu perder meu emprego?', answer: 'O crédito consignado é garantido pelo desconto em folha. Se você perder o emprego, a garantia desaparece. Por isso, é importante ter estabilidade.' },
  { question: 'Como funciona o upgrade para Premium?', answer: 'Você pode fazer upgrade a qualquer momento. Basta assinar um plano Premium e ganhar acesso ilimitado ao parque + créditos de viagem.' },
];

function CheckIcon({ gold = false }: { gold?: boolean }) {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: gold ? '#D4AF37' : '#10B981' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
    </svg>
  );
}

function XIcon() {
  return <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300 font-bold text-lg">—</span>;
}

export default function TesteB() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="b" />

      {/* SEÇÃO 1: HERO */}
      <section className="pt-24 pb-20 px-6" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 50%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: '#D1FAE5', color: '#065F46' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
              Teste B — Freemium
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: '#111827' }}>
              Comece Grátis. Viaje com Crédito Consignado.
            </h1>
            <p className="text-xl leading-relaxed mb-8" style={{ color: '#6B7280' }}>
              Acesso ao parque + Crédito de R$ 1k a R$ 10k com aprovação em 48 horas. Sem cartão de crédito necessário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#credito"
                className="px-8 py-4 rounded-xl text-white font-semibold text-base text-center transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: '#0066FF' }}
              >
                Começar Grátis
              </a>
              <a
                href="#credito"
                className="px-8 py-4 rounded-xl text-white font-semibold text-base text-center transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: '#10B981' }}
              >
                Solicitar Crédito
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">✓ Sem cartão de crédito necessário &nbsp;·&nbsp; ✓ Aprovação em 48h</p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">💳</div>
                  <h3 className="text-white text-xl font-bold">Crédito Consignado</h3>
                  <p className="text-green-100 text-sm mt-1">Para trabalhadores CLT</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Valor', value: 'R$ 1.000 a R$ 10.000' },
                    { label: 'Aprovação', value: 'Em até 48 horas' },
                    { label: 'Parcelamento', value: '6 a 36 meses' },
                    { label: 'Consulta SPC/Serasa', value: 'Não necessária' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white/20 rounded-xl px-4 py-2.5">
                      <span className="text-green-100 text-sm">{item.label}</span>
                      <span className="text-white text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white rounded-2xl px-4 py-2 text-sm font-bold shadow-lg">
                47 milhões de CLTs elegíveis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: POR QUE CRÉDITO CONSIGNADO */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Por Que Crédito Consignado?</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>A forma mais segura e rápida de financiar suas viagens</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: '100% Seguro',
                desc: 'Desconto automático em folha. Regulado pelo governo. Sem risco de inadimplência.',
                destaque: '47 milhões de CLTs já usam',
              },
              {
                icon: '⚡',
                title: 'Aprovação Rápida',
                desc: 'Aprovação em até 48 horas. Dinheiro na sua conta por PIX ou TED.',
                destaque: 'Sem burocracia excessiva',
              },
              {
                icon: '💰',
                title: 'Taxas Baixas',
                desc: 'Juros competitivos. Crédito de R$ 1k a R$ 10k. Parcelamento flexível.',
                destaque: 'Até 5× mais barato que crédito pessoal',
              },
            ].map((col) => (
              <div key={col.title} className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-5">{col.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#111827' }}>{col.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>{col.desc}</p>
                <div className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#D1FAE5', color: '#065F46' }}>
                  {col.destaque}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: COMO FUNCIONA */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Como Funciona</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Tudo em 3 passos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: '📝', title: 'Solicite Crédito', desc: 'Preencha um formulário simples com seus dados', tempo: '5 minutos' },
              { num: '02', icon: '✅', title: 'Aguarde Aprovação', desc: 'Nossa equipe valida suas informações', tempo: 'Até 48 horas' },
              { num: '03', icon: '💸', title: 'Receba na Conta', desc: 'Dinheiro cai na sua conta por PIX ou TED', tempo: 'Imediato' },
            ].map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold mb-2" style={{ color: '#10B981' }}>PASSO {s.num}</div>
                <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>{s.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#6B7280' }}>{s.desc}</p>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#D1FAE5', color: '#065F46' }}>
                  ⏱ {s.tempo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: CRÉDITO DESTAQUE */}
      <section id="credito" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>
              Crédito Consignado — Viaje Agora
            </h2>
            <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
              O crédito consignado é um empréstimo com desconto automático em folha. Você não precisa se preocupar com parcelas — elas saem direto do seu salário.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '💵', label: 'Valor', value: 'R$ 1.000 a R$ 10.000' },
                { icon: '📅', label: 'Prazo', value: '6 a 36 meses' },
                { icon: '⚡', label: 'Aprovação', value: 'Até 48 horas' },
                { icon: '👔', label: 'Elegibilidade', value: 'CLT com 6+ meses' },
              ].map(item => (
                <div key={item.label} className="border border-gray-100 rounded-xl p-4">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                  <div className="font-semibold text-sm" style={{ color: '#111827' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <a href="#" className="inline-block px-8 py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg" style={{ background: '#10B981' }}>
              Solicitar Crédito Agora
            </a>
            <p className="mt-3 text-sm text-gray-500">Sem cartão de crédito necessário. Sem consulta ao SPC/Serasa.</p>
          </div>
          <div className="flex justify-center">
            <div className="rounded-3xl p-8 w-full max-w-sm" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' }}>
              <h3 className="text-lg font-bold mb-6" style={{ color: '#065F46' }}>Simulação de Crédito</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Valor solicitado</div>
                  <div className="text-2xl font-bold" style={{ color: '#10B981' }}>R$ 5.000</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Parcelas</div>
                  <div className="text-2xl font-bold" style={{ color: '#111827' }}>24× R$ 230</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Aprovação em</div>
                  <div className="text-2xl font-bold" style={{ color: '#111827' }}>48 horas</div>
                </div>
                <p className="text-xs text-gray-400 text-center">*Valores ilustrativos. Sujeito à análise de crédito.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: QUEM PODE SOLICITAR */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Quem Pode Solicitar?</h2>
          <p className="text-lg mb-10" style={{ color: '#6B7280' }}>Verifique se você é elegível</p>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-left space-y-4">
            {[
              'Ser trabalhador CLT com carteira assinada',
              'Ter 6+ meses na empresa atual',
              'Idade entre 18 e 60 anos',
              'Score mínimo de 300 pontos',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl" style={{ background: '#D1FAE5' }}>
            <p className="font-semibold" style={{ color: '#065F46' }}>
              Se você atende esses critérios, pode solicitar crédito em 5 minutos
            </p>
          </div>
          <div className="mt-6">
            <a href="#" className="px-6 py-3 rounded-xl font-semibold border-2 inline-block transition-all hover:bg-blue-50" style={{ borderColor: '#0066FF', color: '#0066FF' }}>
              Verificar Elegibilidade
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: PLANOS FREE vs PREMIUM */}
      <section id="planos" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Escolha Seu Plano</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Comece grátis e upgrade quando quiser</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREE */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                Comece Aqui
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>Gratuito</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ color: '#10B981' }}>R$ 0</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">Sem cartão necessário</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckIcon /> Acesso ao parque (limitado)</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckIcon /> Crédito consignado (prioridade)</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckIcon /> Suporte por WhatsApp</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckIcon /> Comunidade de membros</li>
                <li className="flex items-center gap-3 text-sm text-gray-400"><XIcon /> Créditos de viagem</li>
                <li className="flex items-center gap-3 text-sm text-gray-400"><XIcon /> Acesso a 250k+ hotéis</li>
              </ul>
              <a href="#" className="block w-full text-center py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: '#0066FF' }}>
                Começar Grátis
              </a>
            </div>

            {/* PREMIUM */}
            <div className="rounded-2xl border-2 p-8 hover:shadow-xl transition-shadow relative" style={{ background: '#F0FDF4', borderColor: '#10B981' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 rounded-full text-xs font-bold text-white shadow" style={{ background: '#10B981' }}>
                  Recomendado
                </div>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: '#D1FAE5', color: '#065F46' }}>
                Gold Premium
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>Premium</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ color: '#0066FF' }}>R$ 165</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">ou R$ 1.990/ano — Upgrade a qualquer momento</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Acesso ilimitado ao parque',
                  'Créditos mensais de viagem',
                  'Acesso a 250k+ hotéis',
                  'Cashback em reservas',
                  'Prioridade em atendimento',
                  'Consultoria de viagens',
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700"><CheckIcon /> {f}</li>
                ))}
              </ul>
              <a href="#" className="block w-full text-center py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: '#10B981' }}>
                Upgrade para Premium
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: ELEGIBILIDADE - TABELA */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Critérios de Elegibilidade</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Informações que você precisa saber</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#10B981' }}>
                  <th className="text-left px-6 py-4 font-semibold text-white">Critério</th>
                  <th className="text-left px-6 py-4 font-semibold text-white">Requisito</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Ocupação', 'Trabalhador CLT com carteira assinada'],
                  ['Tempo na Empresa', 'Mínimo 6 meses'],
                  ['Idade', 'Entre 18 e 60 anos'],
                  ['Score de Crédito', 'Mínimo 300 pontos'],
                  ['Valor do Crédito', 'R$ 1.000 a R$ 10.000'],
                  ['Prazo', '6 a 36 meses'],
                  ['Aprovação', 'Até 48 horas'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-700">{row[0]}</td>
                    <td className="px-6 py-4 text-gray-600">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-center text-gray-500">Operações sujeitas a análise de crédito e validação cadastral</p>
        </div>
      </section>

      {/* SEÇÃO 8: RESTRIÇÕES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Restrições Operacionais</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Algumas ocupações não são elegíveis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-red-100 rounded-2xl p-8" style={{ background: '#FFF5F5' }}>
              <h3 className="font-semibold mb-5" style={{ color: '#DC2626' }}>Atividades Não Aceitas</h3>
              <ul className="space-y-3">
                {[
                  'Call Centers / Telemarketing',
                  'Locação de mão de obra temporária',
                  'Construção civil',
                  'Limpeza em prédios',
                  'Vigilância e segurança privada',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-red-100 rounded-2xl p-8" style={{ background: '#FFF5F5' }}>
              <h3 className="font-semibold mb-5" style={{ color: '#DC2626' }}>Ocupações Não Aceitas</h3>
              <ul className="space-y-3">
                {[
                  'Operador de Telemarketing',
                  'Atendente de Lanchonete',
                  'Servente de Obras',
                  'Operador de Caixa',
                  'Faxineiro / Auxiliar de Limpeza',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">Consulte a política vigente para a relação completa de restrições</p>
        </div>
      </section>

      {/* SEÇÃO 9: FLUXO DE CONTRATAÇÃO */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Fluxo de Contratação</h2>
            <p className="text-lg" style={{ color: '#6B7280' }}>Rápido, simples e seguro</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5" style={{ background: '#D1FAE5' }}></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { num: '01', icon: '📝', title: 'Solicitação', desc: 'Preencha o formulário com seus dados', tempo: '5 minutos' },
                { num: '02', icon: '🔍', title: 'Validação', desc: 'Consultamos DATAPREV e validamos informações', tempo: 'Até 24 horas' },
                { num: '03', icon: '✍️', title: 'Assinatura', desc: 'Assine o contrato digitalmente', tempo: 'Até 23:59 do dia' },
                { num: '04', icon: '💸', title: 'Liberação', desc: 'Dinheiro cai na sua conta', tempo: 'Até 48 horas' },
              ].map((s) => (
                <div key={s.num} className="text-center relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-white shadow-lg" style={{ background: '#D1FAE5' }}>
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold mb-1" style={{ color: '#10B981' }}>PASSO {s.num}</div>
                  <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>{s.title}</h3>
                  <p className="text-sm mb-2" style={{ color: '#6B7280' }}>{s.desc}</p>
                  <div className="inline-block px-2 py-1 rounded-full text-xs font-semibold" style={{ background: '#D1FAE5', color: '#065F46' }}>
                    ⏱ {s.tempo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10: BANCOS PARCEIROS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Conectado a 600+ Instituições</h2>
          <p className="text-lg mb-12" style={{ color: '#6B7280' }}>Seu dinheiro sai de qualquer banco</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4 mb-8">
            {['BB', 'CEF', 'ITÁ', 'BTG', 'SAN', 'NU', 'INT', 'C6', '...'].map((bank) => (
              <div key={bank} className="flex items-center justify-center h-14 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm text-gray-600 hover:shadow transition-shadow">
                {bank}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Estamos conectados a mais de <strong>600 bancos e instituições financeiras</strong> em todo o Brasil. Seu dinheiro sai de qualquer banco.
          </p>
        </div>
      </section>

      {/* SEÇÃO 11: NÚMEROS */}
      <section className="py-20 px-6" style={{ background: '#F9FAFB' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Números que Impressionam</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: 'R$ 50 Bilhões', label: 'Mercado de Crédito Consignado CLT', desc: 'Oportunidade em crescimento' },
              { num: '47 Milhões', label: 'CLTs Elegíveis', desc: 'Trabalhadores que podem acessar' },
              { num: '183%', label: 'Crescimento Anual', desc: 'Segmento em expansão' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <div className="text-3xl font-bold mb-1" style={{ color: '#10B981' }}>{s.num}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>{s.label}</div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 12: FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Dúvidas Frequentes</h2>
          </div>
          <FAQComponent items={faqItems} />
        </div>
      </section>

      {/* SEÇÃO 13: CTA FINAL */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>Comece Sua Jornada Agora</h2>
          <p className="text-xl mb-10" style={{ color: '#6B7280' }}>
            Acesso grátis + Crédito consignado com aprovação em 48 horas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:shadow-xl" style={{ background: '#0066FF' }}>
              Começar Grátis
            </a>
            <a href="#credito" className="px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:shadow-xl" style={{ background: '#10B981' }}>
              Solicitar Crédito
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">✓ Sem cartão necessário &nbsp;·&nbsp; ✓ Aprovação em 48h &nbsp;·&nbsp; ✓ Cancele quando quiser</p>
        </div>
      </section>

      <Footer variant="b" />
    </div>
  );
}
