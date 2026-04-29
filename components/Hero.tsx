import type { City } from '@/lib/cities';
import { WaitlistForm } from './WaitlistForm';

interface HeroProps {
  city: City;
}

export function Hero({ city }: HeroProps) {
  const isPrimary = city.status === 'primary';

  return (
    <section id="hero" className="hero-section">
      <nav className="hero-nav" aria-label="Główna">
        <div className="wrap hero-nav-inner">
          <a href="#hero" className="hero-brand">
            <span className="hero-brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="9.5" cy="9.5" rx="6" ry="6.5" transform="rotate(-30 9.5 9.5)" />
                <line x1="14" y1="14" x2="20" y2="20" />
                <path d="M5.5 7.5 L13 12" strokeWidth="0.8" />
                <path d="M4 11 L11.5 14.5" strokeWidth="0.8" />
                <path d="M8 4.5 L11 12.5" strokeWidth="0.8" />
                <path d="M12 5 L9 13" strokeWidth="0.8" />
              </svg>
            </span>
            RacketUp
          </a>
          <span className="hero-city-tag">· {city.name}</span>
        </div>
      </nav>
      <div className="hero-court" aria-hidden="true">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" fill="none">
          <rect className="court-line" x="100" y="80" width="1000" height="440" />
          <line className="court-line thin" x1="160" y1="80" x2="160" y2="520" />
          <line className="court-line thin" x1="1040" y1="80" x2="1040" y2="520" />
          <line className="court-line" x1="160" y1="200" x2="1040" y2="200" />
          <line className="court-line" x1="160" y1="400" x2="1040" y2="400" />
          <line className="court-line" x1="600" y1="200" x2="600" y2="400" />
          <line className="court-line thin" x1="600" y1="80" x2="600" y2="92" />
          <line className="court-line thin" x1="600" y1="508" x2="600" y2="520" />
          <line className="court-net" x1="80" y1="300" x2="1120" y2="300" />
          <g className="net-mesh-group">
            {Array.from({ length: 26 }).map((_, i) => {
              const x = 100 + i * 40;
              return <line key={i} className="net-mesh" x1={x} y1="290" x2={x} y2="300" />;
            })}
          </g>
          <line className="court-net" x1="80" y1="270" x2="80" y2="300" />
          <line className="court-net" x1="1120" y1="270" x2="1120" y2="300" />
        </svg>
      </div>
      <div className="wrap section-pad hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          {isPrimary ? `Zaczynamy · ${city.name}` : `Wkrótce · ${city.name}`}
        </div>

        <h1 className="hero-h1">
          {isPrimary ? (
            <>
              Tenis i padel {city.locative}.
              <br />
              Znajdź <span className="hero-h1-accent">swoich</span> ludzi.
            </>
          ) : (
            <>
              RacketUp {city.name} —
              <br />
              wkrótce.
            </>
          )}
        </h1>

        <p className="hero-sub">
          {isPrimary
            ? 'Wiemy jak to jest. Wynająłeś kort, partner odwołał. Znajomi za słabi albo za mocni. RacketUp łączy partnerów na poziomie, trenerów w okolicy i korty — w jednej apce. Zaczynamy w Szczecinie, pierwsza setka rusza wcześniej.'
            : `Też zbieramy waitlistę ${city.locative}. Po Szczecinie ruszamy dalej — zostaw email, powiadomimy Cię gdy będzie wasza kolej.`}
        </p>

        <div id="hero-form" className="hero-form-wrap">
          <WaitlistForm city={city} />
        </div>
      </div>
    </section>
  );
}
