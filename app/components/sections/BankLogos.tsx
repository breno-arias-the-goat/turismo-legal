'use client';

const banks = [
  { name: 'Banco do Brasil', abbr: 'BB', color: '#F9A825' },
  { name: 'Caixa Econômica', abbr: 'CEF', color: '#1565C0' },
  { name: 'Itaú', abbr: 'Itaú', color: '#EC7000' },
  { name: 'Bradesco', abbr: 'Bradesco', color: '#CC092F' },
  { name: 'Santander', abbr: 'Santander', color: '#EC0000' },
  { name: 'Nubank', abbr: 'Nu', color: '#8A05BE' },
  { name: 'Inter', abbr: 'Inter', color: '#FF7A00' },
  { name: 'C6 Bank', abbr: 'C6', color: '#246B6B' },
  { name: 'BTG Pactual', abbr: 'BTG', color: '#0F2B7F' },
  { name: 'XP', abbr: 'XP', color: '#1A1A2E' },
  { name: 'Sicoob', abbr: 'Sicoob', color: '#005B2F' },
  { name: 'Banrisul', abbr: 'Banrisul', color: '#00539B' },
];

export default function BankLogos() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3" style={{ color: '#9CA3AF' }}>infraestrutura</p>
          <h2 className="display-md" style={{ color: '#0A0A0A' }}>
            Conectado a{' '}
            <span className="gradient-text-blue">600+</span>
            {' '}Instituições
          </h2>
          <p className="mt-4 text-[17px]" style={{ color: '#6B7280', maxWidth: '480px', margin: '12px auto 0' }}>
            Seu dinheiro sai de qualquer banco parceiro com segurança e rapidez.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3 mb-10">
          {banks.map(bank => (
            <div
              key={bank.name}
              className="h-14 rounded-xl flex items-center justify-center px-3 transition-all duration-300 cursor-default"
              style={{
                background: '#F9FAFB',
                border: '1px solid #F3F4F6',
                filter: 'grayscale(100%) opacity(0.5)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(0%) opacity(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(100%) opacity(0.5)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              title={bank.name}
            >
              <span
                className="font-bold text-[11px] text-center leading-tight"
                style={{ color: bank.color }}
              >
                {bank.abbr}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px]" style={{ color: '#9CA3AF' }}>
          + 588 outras instituições financeiras parceiras em todo o Brasil
        </p>
      </div>
    </section>
  );
}
