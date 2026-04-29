import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { BeginnerReframe } from '@/components/BeginnerReframe';
import { ProductHub } from '@/components/ProductHub';
import { Founder } from '@/components/Founder';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyCta } from '@/components/StickyCta';

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};

  if (data.status === 'primary') {
    return {
      title: `Tenis i padel ${data.locative}. Znajdź swoich ludzi.`,
      description: `Apka która dobiera Ci partnera do tenisa albo padla na Twoim poziomie. ${data.name} pierwszy.`,
      openGraph: {
        title: `RacketMatch ${data.name} — tenis i padel`,
        description: `Apka która dobiera Ci partnera na Twoim poziomie. ${data.name} pierwszy.`,
        locale: 'pl_PL',
      },
    };
  }

  return {
    title: `RacketMatch ${data.name} — wkrótce`,
    description: `Czekamy aż uzbieramy 200 osób ${data.locative}. Zostaw email, powiadomimy gdy startujemy.`,
    openGraph: {
      title: `RacketMatch ${data.name} — wkrótce`,
      description: `Zostaw email, powiadomimy gdy startujemy ${data.locative}.`,
      locale: 'pl_PL',
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const isPrimary = data.status === 'primary';

  // PRIMARY city (Szczecin): full landing — all 5 sections.
  // SECONDARY city (Wwa/Pzn/Krk): minimal funnel — Hero + Founder + FAQ.
  // Outcome + Beginner sections skipped on secondary pages because:
  //   - Outcome mock shows "Pogoń · Kort 3" (Szczecin club) — would mislead
  //   - Beginner reframe is universal but adds scroll without city-specific value
  return (
    <>
      <main id="main">
        <Hero city={data} />

        {isPrimary && <HowItWorks />}
        {isPrimary && <BeginnerReframe />}
        {isPrimary && <ProductHub />}

        <Founder />

        <FAQ city={data} />
      </main>

      <Footer />

      <StickyCta />
    </>
  );
}
