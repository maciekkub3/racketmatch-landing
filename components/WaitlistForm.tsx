'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { City } from '@/lib/cities';

type Step1Data = { email: string };
type Step2Data = { sport: 'tenis' | 'padel' | 'oba'; poziom: 'poczatkujacy' | 'sredni' | 'zaawansowany' };

const SPORT_LABEL: Record<Step2Data['sport'], string> = {
  tenis: 'Tenis',
  padel: 'Padel',
  oba: 'Oba',
};
const POZIOM_LABEL: Record<Step2Data['poziom'], string> = {
  poczatkujacy: 'Początkujący',
  sredni: 'Średni',
  zaawansowany: 'Zaawansowany',
};

interface WaitlistFormProps {
  city: City;
}

export function WaitlistForm({ city }: WaitlistFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  const step1 = useForm<Step1Data>({ defaultValues: { email: '' }, mode: 'onSubmit' });
  const step2 = useForm<Step2Data>({ mode: 'onSubmit' });

  const fireConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 120,
        spread: 80,
        startVelocity: 45,
        origin: { y: 0.7 },
        colors: ['#C8FF5E', '#B3E84E', '#1C5A3A', '#5691F0'],
      });
    } catch {
      /* canvas-confetti is best-effort; never block the success state */
    }
  };

  const onStep1Submit = async (data: Step1Data) => {
    console.log('[waitlist] step 1', { city: city.slug, email: data.email });
    await new Promise((r) => setTimeout(r, 600));
    setEmail(data.email);
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    console.log('[waitlist] step 2', { city: city.slug, email, ...data });
    await new Promise((r) => setTimeout(r, 600));
    setStep(3);
    fireConfetti();
  };

  const onStep2Skip = () => {
    console.log('[waitlist] step 2 skipped', { city: city.slug, email });
    setStep(3);
    fireConfetti();
  };

  if (step === 3) {
    return (
      <div className="hero-form" ref={successRef} role="status" aria-live="polite">
        <div className="form-success">
          <div className="form-success-check" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="form-success-title">Jesteś na liście.</h3>
          <p className="form-success-body">
            Damy znać jak ruszamy {city.locative}. Pierwsze 100 osób z waitlisty dostaje 3 miesiące za darmo. Powiadomimy Cię na <strong>{email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const sportError = step2.formState.errors.sport;
    const poziomError = step2.formState.errors.poziom;
    const submitting = step2.formState.isSubmitting;

    return (
      <form onSubmit={step2.handleSubmit(onStep2Submit)} className="hero-form" noValidate>
        <div className="form-step2">
          <fieldset className="form-fieldset">
            <legend className="form-legend">Sport (jeden lub oba)</legend>
            <div className="form-opt-grid">
              {(Object.keys(SPORT_LABEL) as Step2Data['sport'][]).map((value) => (
                <label key={value} className="form-opt">
                  <input type="radio" value={value} {...step2.register('sport', { required: true })} />
                  <span>{SPORT_LABEL[value]}</span>
                </label>
              ))}
            </div>
            {sportError && <p className="form-error" role="alert">Wybierz sport</p>}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend">Twój poziom</legend>
            <div className="form-opt-grid">
              {(Object.keys(POZIOM_LABEL) as Step2Data['poziom'][]).map((value) => (
                <label key={value} className="form-opt">
                  <input type="radio" value={value} {...step2.register('poziom', { required: true })} />
                  <span>{POZIOM_LABEL[value]}</span>
                </label>
              ))}
            </div>
            {poziomError && <p className="form-error" role="alert">Wybierz poziom</p>}
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="btn-lime" disabled={submitting}>
              {submitting ? 'Zapisywanie…' : 'Gotowe →'}
            </button>
            <button type="button" className="form-skip" onClick={onStep2Skip} disabled={submitting}>
              Pomiń
            </button>
          </div>
        </div>
      </form>
    );
  }

  // Step 1 — email-only inline capture
  const emailError = step1.formState.errors.email;
  const submitting = step1.formState.isSubmitting;

  return (
    <form onSubmit={step1.handleSubmit(onStep1Submit)} className="hero-form" noValidate>
      <div className="form-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="twoj@email.pl"
          className="form-input"
          aria-label="Email"
          aria-invalid={!!emailError}
          {...step1.register('email', {
            required: 'Email jest wymagany',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Podaj prawidłowy email',
            },
          })}
        />
        <button type="submit" className="btn-lime form-submit" disabled={submitting}>
          {submitting ? 'Wysyłanie…' : 'Dołącz →'}
        </button>
      </div>

      {emailError && (
        <p className="form-error" role="alert">{emailError.message}</p>
      )}

      <div className="form-chip-row">
        <span className="form-chip">
          <span className="form-chip-dot" aria-hidden="true" />
          3 miesiące za darmo
        </span>
        <span className="form-chip-ghost">
          <span className="form-chip-dot-ghost" aria-hidden="true" />
          Pierwsze 100 miejsc
        </span>
        <span className="form-microcopy">Zero spamu, ever.</span>
      </div>
    </form>
  );
}
