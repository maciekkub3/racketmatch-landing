'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { City } from '@/lib/cities';

function getFaqs(city?: City): { num: string; cat: string; q: string; a: string }[] {
  const isPrimary = !city || city.status === 'primary';
  const cityLocative = city?.locative ?? 'w Szczecinie';

  const launchAnswer = isPrimary
    ? 'Gdy uzbieramy 200 zapisanych. Im szybciej tym szybciej — zostaw email, powiadomimy Cię osobiście.'
    : `Po Szczecinie (tam lecimy pierwsi). Kolejka ${cityLocative} rusza gdy uzbieramy 200 osób z tego miasta — dlatego zostaw email, każdy zapis przyspiesza launch.`;

  return [
    {
      num: '01',
      cat: 'Apka',
      q: 'Co znajdę w apce?',
      a: 'Trzy rzeczy: partnerów na Twoim poziomie (matchmaking po ELO i grafiku), profile trenerów w okolicy (z umawianiem lekcji) i korty w klubach które integrujemy. Wszystko w jednym miejscu — żebyś nie pingpongował między pięcioma apkami.',
    },
    {
      num: '02',
      cat: 'Cena',
      q: 'Czy to będzie płatne?',
      a: 'Tak. Apka kosztuje 10 zł miesięcznie. Pierwsza setka z waitlisty dostaje 3 miesiące za darmo.',
    },
    {
      num: '03',
      cat: 'Termin',
      q: `Kiedy ruszamy ${cityLocative}?`,
      a: launchAnswer,
    },
    {
      num: '04',
      cat: 'Ranking',
      q: 'Czy padel ma osobne ELO?',
      a: 'Tak. Ranking liczony osobno per sport. Możesz mieć inny poziom w tenisie i w padlu — apka traktuje to jako dwa różne sporty.',
    },
    {
      num: '05',
      cat: 'Korzyści',
      q: 'Co dostaję za zapis?',
      a: '3 miesiące za darmo + wcześniejszy dostęp przed publicznym launchem. Jeśli chcesz pomagać budować społeczność, nie tylko grać — napisz do nas (info wyżej, w sekcji Daniel + Maciek).',
    },
  ];
}

export function FAQ({ city }: { city?: City } = {}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = getFaqs(city);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="section faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="wrap section-pad">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot" />
          FAQ
        </div>

        <h2 className="faq-title">Krótkie odpowiedzi na zwykłe pytania.</h2>

        <div className="faq-grid">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`faq-cell${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-q-row"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${i}`}
                >
                  <span className="faq-q-stack">
                    <span className="faq-num">{item.num} · {item.cat}</span>
                    <span className="faq-q-text">{item.q}</span>
                  </span>
                  <span className="faq-chev" aria-hidden="true">
                    <ChevronDown size={14} />
                  </span>
                </button>
                <div
                  id={`faq-content-${i}`}
                  className="faq-a-wrap"
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p className="faq-a-text">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-cta">
          <a href="#hero" className="btn-lime btn-lime-lg">
            Zarezerwuj swoje miejsce →
          </a>
        </div>
      </div>
    </section>
  );
}
