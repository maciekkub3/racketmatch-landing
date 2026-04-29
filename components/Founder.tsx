export function Founder() {
  return (
    <section id="founder" className="section founder-section">
      <div className="wrap section-pad">
        <article className="founder-card">
          <div className="founder-card-glow" aria-hidden="true" />

          <div className="founder-grid">
            <div className="founder-side">
              <div className="section-eyebrow">
                <span className="section-eyebrow-dot" />
                Od założycieli
              </div>

              <div className="founders-stack">
                <div className="founder-row">
                  <div className="founder-avatar founder-avatar-lime" aria-hidden="true">D</div>
                  <div>
                    <div className="founder-name">Daniel</div>
                    <div className="founder-role">Gracz · Szczecin</div>
                  </div>
                </div>
                <div className="founder-row">
                  <div className="founder-avatar founder-avatar-ghost" aria-hidden="true">M</div>
                  <div>
                    <div className="founder-name">Maciek</div>
                    <div className="founder-role">Inżynier · Szczecin</div>
                  </div>
                </div>
              </div>

              <p className="founder-pull">
                Nie znaleźliśmy takiej apki. <em>Zrobiliśmy ją.</em>
              </p>
            </div>

            <div className="founder-letter">
              <p className="founder-lead">
                Robimy to dla siebie. Daniel co tydzień szuka partnera. Maciek nigdy nie zaczął, bo klub odstraszał.
              </p>

              <p className="founder-ps">
                <span className="founder-ps-label">PS</span>
                żyjesz tenisem albo padlem? Buduj z nami szczecińską społeczność — zero umów i „stanowisk", wspólna sprawa:{' '}
                <a href="mailto:hello@racketup.pl" className="founder-link">hello@racketup.pl</a>
              </p>

              <div className="founder-cta">
                <a href="#hero" className="btn-lime">
                  Dołącz do waitlisty →
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
