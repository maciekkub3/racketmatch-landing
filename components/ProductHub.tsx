export function ProductHub() {
  return (
    <section id="hub" className="section product-hub-section">
      <div className="wrap section-pad">
        <div className="hub-block">
          <div className="hub-eyebrow">
            <span className="hub-eyebrow-dot" aria-hidden="true" />
            Kompletny hub
          </div>

          <div className="hub-grid">
            <div className="hub-card">
              <div className="hub-num">01 · Ludzie</div>
              <svg className="hub-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="8" r="3.5" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
                <path d="M15 18c.3-2 1.7-3.5 4-3.5s3.7 1.5 4 3.5" />
              </svg>
              <div className="hub-name">Partnerzy</div>
              <div className="hub-desc">Dobrani na Twoim poziomie. ELO ± 1, w Twoim mieście, bez przerabiania znajomych.</div>
              <div className="hub-meta">Match radius ± 1</div>
            </div>

            <div className="hub-card">
              <div className="hub-num">02 · Gra</div>
              <svg className="hub-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="14" rx="1.5" />
                <path d="M12 4v14" />
                <path d="M3 11h18" />
              </svg>
              <div className="hub-name">Mecze</div>
              <div className="hub-desc">Wyniki, statystyki, H2H. Twój ranking rośnie z każdą rozegraną piątką.</div>
              <div className="hub-meta">ELO · H2H · Forma</div>
            </div>

            <div className="hub-card is-trener">
              <div className="hub-num">03 · Rozwój</div>
              <svg className="hub-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="6" r="3" />
                <path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6" />
                <path d="m17 4 2 2-2 2" />
                <path d="M19 6h-3" />
              </svg>
              <div className="hub-name">Trenerzy</div>
              <div className="hub-desc">Lokalni trenerzy z dostępnością na żywo. Zarezerwuj indywidualnie albo grupowo.</div>
              <div className="hub-meta">Od 120 zł / h</div>
            </div>

            <div className="hub-card">
              <div className="hub-num">04 · Miejsce</div>
              <svg className="hub-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div className="hub-name">Korty</div>
              <div className="hub-desc">Pogoń, Arkonia, Kort Centralny — dostępność i rezerwacja w jednym flow.</div>
              <div className="hub-meta">12 obiektów · Szczecin</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
