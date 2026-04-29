import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka prywatności · RacketMatch',
  description: 'Jak RacketMatch przetwarza Twoje dane osobowe.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="wrap section-pad">
        <article className="privacy-content">
          <p className="privacy-back-top">
            <Link href="/szczecin">← Wróć</Link>
          </p>

          <h1 className="privacy-title">Polityka prywatności</h1>
          <p className="privacy-meta">Ostatnia aktualizacja: 29 kwietnia 2026</p>

          <h2>1. Administrator danych</h2>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Maciej Kubinkiewicz</strong>,
            twórca RacketMatch — osoba fizyczna nieprowadząca działalności gospodarczej.
          </p>
          <p>
            Kontakt w sprawach związanych z ochroną danych:{' '}
            <a href="mailto:maciek.k2001@gmail.com">maciek.k2001@gmail.com</a>
          </p>

          <h2>2. Jakie dane zbieramy</h2>
          <p>Gdy zapisujesz się na waitlistę RacketMatch, zbieramy:</p>
          <ul>
            <li>Twój adres email</li>
            <li>Miasto, w którym wybierasz aplikację (Szczecin, Warszawa, Poznań, Kraków)</li>
            <li>
              Opcjonalnie: preferowany sport (tenis / padel / oba) oraz Twój poziom
              (początkujący / średni / zaawansowany)
            </li>
          </ul>
          <p>
            Nie zbieramy adresów IP, identyfikatorów urządzeń ani innych danych w sposób
            ukryty.
          </p>

          <h2>3. Cel i podstawa prawna</h2>
          <p>Twoje dane przetwarzamy w celu:</p>
          <ul>
            <li>
              Poinformowania Cię, gdy aplikacja RacketMatch wystartuje w Twoim mieście
            </li>
            <li>
              Lepszego dopasowania funkcji aplikacji (gdy podasz sport / poziom)
            </li>
          </ul>
          <p>
            Podstawa prawna: <strong>Twoja zgoda</strong> wyrażona przez kliknięcie
            przycisku „Dołącz" w formularzu zapisu (art. 6 ust. 1 lit. a RODO).
          </p>

          <h2>4. Komu przekazujemy dane</h2>
          <p>Korzystamy z dwóch podmiotów przetwarzających (procesorów):</p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong> (USA) — hosting strony. Vercel zapewnia
              zgodne z RODO Standardowe Klauzule Umowne (SCC).
            </li>
            <li>
              <strong>Supabase Inc.</strong> — baza danych. Twoje dane są
              przechowywane w regionie Unii Europejskiej (Frankfurt).
            </li>
          </ul>
          <p>
            Nie sprzedajemy ani nie udostępniamy Twoich danych podmiotom marketingowym.
          </p>

          <h2>5. Jak długo przechowujemy dane</h2>
          <p>
            Twoje dane przechowujemy do czasu wycofania przez Ciebie zgody, lub maksymalnie
            przez 24 miesiące od ostatniego kontaktu — w zależności od tego, co nastąpi
            pierwsze.
          </p>

          <h2>6. Twoje prawa</h2>
          <p>Zgodnie z RODO masz prawo do:</p>
          <ul>
            <li>Dostępu do swoich danych</li>
            <li>Sprostowania nieprawidłowych danych</li>
            <li>Usunięcia danych („prawo do bycia zapomnianym")</li>
            <li>Przeniesienia danych do innego administratora</li>
            <li>
              Wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem
              wcześniejszego przetwarzania)
            </li>
            <li>
              Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych —{' '}
              <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer">
                uodo.gov.pl
              </a>
            </li>
          </ul>
          <p>
            Aby skorzystać z któregokolwiek z tych praw, napisz na{' '}
            <a href="mailto:maciek.k2001@gmail.com">maciek.k2001@gmail.com</a>.
            Odpowiadamy w ciągu 30 dni.
          </p>

          <h2>7. Cookies i analityka</h2>
          <p>
            Strona <strong>nie używa cookies</strong> ani systemów analitycznych
            śledzących użytkowników. Jeśli to się zmieni, zaktualizujemy politykę i
            poinformujemy Cię.
          </p>

          <h2>8. Zmiany polityki</h2>
          <p>
            Możemy aktualizować tę politykę. O istotnych zmianach poinformujemy mailem
            osoby zapisane na waitlistę. Aktualna wersja zawsze pod adresem{' '}
            <Link href="/privacy">/privacy</Link>.
          </p>

          <p className="privacy-back">
            <Link href="/szczecin">← Wróć do RacketMatch</Link>
          </p>
        </article>
      </div>
    </main>
  );
}
