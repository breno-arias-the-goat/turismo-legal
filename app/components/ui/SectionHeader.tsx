interface SectionHeaderProps {
  label?: string;
  headline: string;
  subheadline?: string;
  theme?: 'dark' | 'light';
  align?: 'center' | 'left';
  labelColor?: string;
  accentWords?: string[];
  accentClass?: string;
  className?: string;
}

export default function SectionHeader({
  label,
  headline,
  subheadline,
  theme = 'light',
  align = 'center',
  labelColor,
  accentWords = [],
  accentClass = 'gradient-text-blue',
  className = '',
}: SectionHeaderProps) {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  // Replace accent words with gradient spans
  const renderHeadline = () => {
    if (!accentWords.length) return headline;
    let result = headline;
    accentWords.forEach(word => {
      result = result.replace(word, `|||${word}|||`);
    });
    const parts = result.split('|||');
    return parts.map((part, i) =>
      accentWords.includes(part)
        ? <span key={i} className={accentClass}>{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} mb-16 ${className}`}>
      {label && (
        <p
          className="section-label mb-4"
          style={{ color: labelColor || (isDark ? 'rgba(255,255,255,0.4)' : '#6B7280') }}
        >
          {label}
        </p>
      )}
      <h2
        className={`display-md ${isDark ? 'text-white' : 'text-[#0A0A0A]'} ${isCenter ? 'mx-auto' : ''}`}
        style={{ maxWidth: isCenter ? '720px' : undefined }}
      >
        {renderHeadline()}
      </h2>
      {subheadline && (
        <p
          className={`mt-4 text-[17px] leading-[1.65] ${isCenter ? 'mx-auto' : ''}`}
          style={{
            color: isDark ? 'rgba(255,255,255,0.5)' : '#6B7280',
            maxWidth: isCenter ? '560px' : undefined,
          }}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
