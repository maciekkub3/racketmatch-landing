'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useCallback } from 'react';

import Hero from '@/components/Hero';

const PolandMap       = dynamic(() => import('@/components/PolandMap'),        { ssr: false });
const BeginnerSection = dynamic(() => import('@/components/BeginnerSection'));
const HowItWorks      = dynamic(() => import('@/components/HowItWorks'));
const ActivityFeed    = dynamic(() => import('@/components/ActivityFeed'),      { ssr: false });
const WaitlistForm    = dynamic(() => import('@/components/WaitlistForm'),      { ssr: false });
const FAQ             = dynamic(() => import('@/components/FAQ'));
const Footer          = dynamic(() => import('@/components/Footer'));

export default function Home() {
  const formRef = useRef<HTMLElement>(null);
  const [preselectedCity, setPreselectedCity] = useState<string | null>(null);

  const scrollToForm = useCallback(() => {
    // Try ref first, fallback to id selector
    const el = formRef.current ?? document.getElementById('waitlist');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleCitySelect = useCallback((cityId: string) => {
    setPreselectedCity(cityId);
    setTimeout(scrollToForm, 80);
  }, [scrollToForm]);

  return (
    <main className="relative overflow-x-hidden">
      <Hero onCtaClick={scrollToForm} />
      <PolandMap onCitySelect={handleCitySelect} />
      <BeginnerSection />
      <HowItWorks />
      <ActivityFeed />
      <WaitlistForm preselectedCity={preselectedCity} formRef={formRef} />
      <FAQ />
      <Footer />
    </main>
  );
}
