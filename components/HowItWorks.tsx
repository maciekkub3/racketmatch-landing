import { MapPin, Navigation } from 'lucide-react';
import type { City } from '@/lib/cities';

export function HowItWorks({ city }: { city: City }) {
  return (
    <section id="jak-to-dziala" className="section wrap section-pad">
      <div className="outcome-summary">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot" />
          Outcome
        </div>
        <h2 className="outcome-title">Nie szukasz partnera. Dostajesz.</h2>
        <p className="outcome-sub">To samo zgłoszenie. Inny rezultat.</p>
      </div>

      <div className="compare-grid">
        <div className="compare-col is-before">
          <div className="compare-head">
            <span className="compare-label">Bez RacketUp</span>
            <span className="compare-when">Czw · 22:47</span>
          </div>
          <div className="compare-col-body">
            <div className="before-thread">
              <div className="thread-row">
                <span className="thread-time">22:47</span>
                <div className="thread-msg">
                  <span className="who">Daniel</span>Ktoś zagra jutro 18–20? Średnio-zaawansowany.
                </div>
              </div>
              <div className="thread-row dim">
                <span className="thread-time">23:14</span>
                <div className="thread-msg">
                  <span className="who">Daniel</span>?
                </div>
              </div>
              <div className="thread-row dim">
                <span className="thread-time">07:02</span>
                <div className="thread-msg">
                  <span className="who">Daniel</span>Kort zarezerwowany, jest 1 miejsce.
                </div>
              </div>
              <div className="thread-row ghost">
                <span className="thread-time">17:38</span>
                <div className="thread-msg thread-strike">
                  <span className="who">Daniel</span>okej odwołuję
                </div>
              </div>
            </div>
            <div className="thread-result">
              <span className="x" aria-hidden="true">×</span>
              <span>0 odpowiedzi · 19 godzin · 80 zł za odwołany kort</span>
            </div>
          </div>
        </div>

        <div className="compare-col is-after">
          <div className="after-court" aria-hidden="true">
            <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" fill="none">
              <rect className="court-line" x="100" y="80" width="1000" height="440" />
              <line className="court-line thin" x1="160" y1="80" x2="160" y2="520" />
              <line className="court-line thin" x1="1040" y1="80" x2="1040" y2="520" />
              <line className="court-line" x1="160" y1="200" x2="1040" y2="200" />
              <line className="court-line" x1="160" y1="400" x2="1040" y2="400" />
              <line className="court-line" x1="600" y1="200" x2="600" y2="400" />
              <line className="court-net" x1="80" y1="300" x2="1120" y2="300" />
              <g>
                {Array.from({ length: 26 }).map((_, i) => {
                  const x = 100 + i * 40;
                  return <line key={i} className="net-mesh" x1={x} y1="290" x2={x} y2="300" />;
                })}
              </g>
              <line className="court-net" x1="80" y1="270" x2="80" y2="300" />
              <line className="court-net" x1="1120" y1="270" x2="1120" y2="300" />
            </svg>
          </div>
          <div className="compare-head">
            <span className="compare-label">Z RacketUp</span>
            <span className="compare-when">Pt · 19:00 · dziś</span>
          </div>
          <div className="compare-col-body">
            <div className="after-stage">
              <div className="after-time">19:00</div>
              <div className="after-vs">
                <div className="cmp-avatar-stack">
                  <div className="cmp-avatar cmp-avatar-lime">KN</div>
                  <span className="cmp-avatar-tag">Ty</span>
                </div>
                <span className="vs-label">vs</span>
                <div className="cmp-avatar cmp-avatar-ghost">MZ</div>
                <div className="vs-info">
                  <div className="vs-name">Mateusz Zieliński</div>
                  <div className="vs-meta">ELO 1820 · H2H 3–1</div>
                </div>
              </div>
              <div className="after-loc">
                <span className="after-loc-where">
                  <MapPin size={16} aria-hidden="true" />
                  {city.venueExample}
                </span>
                <span className="pill-nav">
                  <Navigation size={14} aria-hidden="true" />
                  Nawiguj
                </span>
              </div>
            </div>
            <div className="after-result">
              <span className="check" aria-hidden="true">✓</span>
              <span>Dobrane w 4 min · partner potwierdził · mecz się odbywa</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
