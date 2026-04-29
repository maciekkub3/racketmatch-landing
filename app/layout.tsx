import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://racketmatch.pl'),
  title: {
    default: 'RacketMatch — tenis i padel w Twoim mieście',
    template: '%s · RacketMatch',
  },
  description:
    'Apka która dobiera Ci partnera do tenisa albo padla na Twoim poziomie. Najpierw Szczecin, potem reszta Polski.',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'RacketMatch',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A120E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RacketMatch',
  url: 'https://racketmatch.pl',
  description:
    'Apka która dobiera Ci partnera do tenisa albo padla na Twoim poziomie.',
  founder: {
    '@type': 'Person',
    name: 'Maciej Kubinkiewicz',
  },
  sameAs: ['https://instagram.com/racketmatch'],
  areaServed: {
    '@type': 'Country',
    name: 'Poland',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" data-theme="dark" className={interTight.variable}>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
