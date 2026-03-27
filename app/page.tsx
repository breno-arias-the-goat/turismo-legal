import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)' }}>
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#0066FF' }}>
            <span className="text-white font-bold text-lg">TL</span>
          </div>
          <span className="font-bold text-3xl" style={{ color: '#111827' }}>Turismo Legal</span>
        </div>

        <h1 className="text-4xl font-bold mb-4" style={{ color: '#111827' }}>
          Turismo Legal
        </h1>
        <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
          Apresentação executiva e páginas de vendas do teste A/B de 90 dias
        </p>

        <Link
          href="/apresentacao"
          className="block mb-8 rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform"
          style={{ background: 'linear-gradient(135deg, #060C1A 0%, #0D1526 100%)', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}>EXECUTIVO</span>
          </div>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Apresentação Executiva</h2>
          <p className="text-sm mb-3" style={{ color: '#64748B' }}>Diagnóstico · Posicionamento · Estratégia A/B · Roadmap · KPIs</p>
          <div className="text-sm font-semibold" style={{ color: '#D4AF37' }}>Abrir Apresentação →</div>
        </Link>

        <p className="text-sm font-semibold mb-4" style={{ color: '#6B7280' }}>Páginas de Vendas</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/vendas/teste-a"
            className="group block bg-white rounded-2xl border-2 border-blue-100 p-8 hover:shadow-xl hover:border-blue-300 transition-all"
          >
            <div className="text-4xl mb-4">💎</div>
            <div className="inline-block px-2 py-1 rounded text-xs font-bold mb-3" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
              TESTE A
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>100% Pago</h2>
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Foco em assinatura premium. CTA: &quot;Assinar Agora&quot;. Planos Gold e Black.
            </p>
            <div className="text-sm font-semibold group-hover:underline" style={{ color: '#0066FF' }}>
              Abrir Página A →
            </div>
          </Link>

          <Link
            href="/vendas/teste-b"
            className="group block bg-white rounded-2xl border-2 border-green-100 p-8 hover:shadow-xl hover:border-green-300 transition-all"
          >
            <div className="text-4xl mb-4">🎯</div>
            <div className="inline-block px-2 py-1 rounded text-xs font-bold mb-3" style={{ background: '#D1FAE5', color: '#065F46' }}>
              TESTE B
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>Freemium</h2>
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Foco em crédito consignado. CTA: &quot;Começar Grátis&quot;. Lead → Crédito → Upgrade.
            </p>
            <div className="text-sm font-semibold group-hover:underline" style={{ color: '#10B981' }}>
              Abrir Página B →
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 text-left">
          <h3 className="font-semibold mb-3" style={{ color: '#111827' }}>Diferenças Principais</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: '#6B7280' }}>
                  <th className="text-left py-2 pr-4">Aspecto</th>
                  <th className="text-left py-2 pr-4" style={{ color: '#0066FF' }}>Teste A</th>
                  <th className="text-left py-2" style={{ color: '#10B981' }}>Teste B</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {([
                  ['Foco', 'Assinatura', 'Crédito Consignado'],
                  ['CTA Principal', 'Assinar Agora', 'Começar Grátis'],
                  ['Preço Destaque', 'R$ 165–250/mês', 'R$ 0 (grátis)'],
                  ['Seções', '10 seções', '14 seções'],
                ] as string[][]).map(([a, b, c]) => (
                  <tr key={a} className="border-t border-gray-50">
                    <td className="py-2 pr-4 font-medium">{a}</td>
                    <td className="py-2 pr-4">{b}</td>
                    <td className="py-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
