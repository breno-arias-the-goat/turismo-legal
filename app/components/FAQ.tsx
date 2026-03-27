'use client';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  theme?: 'light' | 'dark';
}

export default function FAQ({ items, theme = 'light' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className="divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#F3F4F6' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              className="w-full flex items-start justify-between py-5 text-left group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-[15px] pr-8 transition-colors duration-200 leading-snug"
                style={{ color: isOpen
                  ? (isDark ? '#ffffff' : '#0A0A0A')
                  : (isDark ? 'rgba(255,255,255,0.7)' : '#374151')
                }}
              >
                {item.question}
              </span>
              {/* +/× icon */}
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5"
                style={{
                  borderColor: isOpen ? '#0066FF' : (isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB'),
                  background: isOpen ? 'rgba(0,102,255,0.1)' : 'transparent',
                  color: isOpen ? '#0066FF' : (isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF'),
                }}
              >
                <span className="text-[16px] leading-none font-light" style={{ lineHeight: '1' }}>
                  {isOpen ? '×' : '+'}
                </span>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? '400px' : '0px' }}
            >
              <p
                className="pb-5 text-[14px] leading-relaxed"
                style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#6B7280' }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
