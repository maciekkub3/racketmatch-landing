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

  const canonical = `/${data.slug}`;

  if (data.status === 'primary') {
    return {
      title: `Tenis i padel ${data.locative}. Znajdź swoich ludzi.`,
      description: `Apka która dobiera Ci partnera do tenisa albo padla na Twoim poziomie. ${data.name} pierwszy.`,
      alternates: { canonical },
      openGraph: {
        title: `RacketUp ${data.name} — tenis i padel`,
        description: `Apka która dobiera Ci partnera na Twoim poziomie. ${data.name} pierwszy.`,
        locale: 'pl_PL',
        url: canonical,
      },
    };
  }

  return {
    title: `RacketUp ${data.name} — wkrótce`,
    description: `Czekamy aż uzbieramy 200 osób ${data.locative}. Zostaw email, powiadomimy gdy startujemy.`,
    alternates: { canonical },
    openGraph: {
      title: `RacketUp ${data.name} — wkrótce`,
      description: `Zostaw email, powiadomimy gdy startujemy ${data.locative}.`,
      locale: 'pl_PL',
      url: canonical,
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

  return (
    <>
      <main id="main">
        <Hero city={data} />
        <HowItWorks city={data} />
        <BeginnerReframe />
        <ProductHub city={data} />
        <Founder />
        <FAQ city={data} />
      </main>

      <Footer />

      <StickyCta />
    </>
  );
}
