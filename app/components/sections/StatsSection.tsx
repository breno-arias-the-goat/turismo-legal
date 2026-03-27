interface Stat {
  number: string;
  label: string;
  desc: string;
}

interface StatsSectionProps {
  stats: Stat[];
  variant?: 'a' | 'b';
  title?: string;
}

export default function StatsSection({ stats, variant = 'a', title }: StatsSectionProps) {
  const gradientClass = variant === 'a' ? 'gradient-text-a' : 'gradient-text-b';
  const bgClass = variant === 'a' ? 'bg-dark-a' : 'bg-dark-b';
  const labelColor = variant === 'a' ? '#60A5FA' : '#34D399';

  return (
    <section className={`${bgClass} dot-grid py-24 px-6`}>
      <div className="max-w-6xl mx-auto">
        {title && (
          <p className="section-label text-center mb-14" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center py-12 px-6 transition-all duration-300 hover:bg-white/5"
              style={{ background: 'rgba(6,12,26,0.8)' }}
            >
              <div
                className={`font-extrabold mb-2 ${gradientClass}`}
                style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}
              >
                {s.number}
              </div>
              <div className="font-semibold text-[14px] mb-1.5" style={{ color: labelColor }}>
                {s.label}
              </div>
              <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
