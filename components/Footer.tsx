import { cities } from '@/lib/cities';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap section-pad footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">RacketMatch</span>
          <span className="footer-meta">Made in Szczecin · 2026</span>
        </div>

        <div className="footer-cities" aria-label="Miasta">
          <span className="footer-cities-label">Miasta</span>
          <ul className="footer-city-list">
            {cities.map((c) => (
              <li
                key={c.slug}
                className={`footer-city${c.status === 'primary' ? ' is-primary' : ''}`}
              >
                <a href={`/${c.slug}`} className="footer-city-link">
                  {c.status === 'primary' ? (
                    <>
                      <span className="footer-city-dot" aria-hidden="true" />
                      {c.name}
                    </>
                  ) : (
                    <>
                      {c.name}
                      <span className="footer-city-soon">wkrótce</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-social">
          <a href="https://instagram.com/racketmatch" target="_blank" rel="noopener noreferrer" className="footer-link">
            @racketmatch
          </a>
          <a href="mailto:hello@racketmatch.pl" className="footer-link">
            hello@racketmatch.pl
          </a>
        </div>
      </div>
    </footer>
  );
}
