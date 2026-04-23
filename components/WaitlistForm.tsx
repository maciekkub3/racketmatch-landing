'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Loader2 } from 'lucide-react';
import { cities } from '@/lib/cities';

// Zod v4 schema
const schema = z.object({
  email: z.email({ message: 'Podaj poprawny adres e-mail' }),
  city: z.string().min(1, { message: 'Wybierz miasto' }),
  sport: z.enum(['tennis', 'padel', 'both']),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success';

interface WaitlistFormProps {
  preselectedCity?: string | null;
  formRef?: React.RefObject<HTMLElement | null>;
}

function ShareButtons({ position, city }: { position: number; city: string }) {
  const [copied, setCopied] = useState(false);
  const text = `Dołączyłem/am do RacketMatch! Zapisz się i zagrajmy razem w ${city} 🎾`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 border border-green-500/25 text-green-300 text-xs font-medium hover:bg-green-600/30 transition-colors"
      >
        WhatsApp →
      </a>
      <a
        href={`https://www.messenger.com/share/?link=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/25 text-blue-300 text-xs font-medium hover:bg-blue-600/30 transition-colors"
      >
        Messenger →
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/6 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/10 transition-colors"
      >
        <Copy className="w-3.5 h-3.5" />
        {copied ? 'Skopiowano!' : 'Kopiuj link'}
      </button>
    </div>
  );
}

export default function WaitlistForm({ preselectedCity, formRef }: WaitlistFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [submittedCity, setSubmittedCity] = useState('');
  const [queuePosition, setQueuePosition] = useState(148);
  const [citySearch, setCitySearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const internalRef = useRef<HTMLElement>(null);
  const resolvedRef = (formRef as React.RefObject<HTMLElement>) ?? internalRef;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: { sport: 'both' },
  });

  const watchedCity = watch('city');

  useEffect(() => {
    if (preselectedCity) {
      const city = cities.find((c) => c.id === preselectedCity);
      if (city) {
        setValue('city', city.id);
        setCitySearch(city.name);
        const pos = city.signups + 1;
        setQueuePosition(pos);
        setSubmittedCity(city.name);
      }
    }
  }, [preselectedCity, setValue]);

  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const selectedCityObj = cities.find((c) => c.id === watchedCity);

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    const cityObj = cities.find((c) => c.id === data.city);
    setSubmittedCity(cityObj?.name ?? data.city);
    setQueuePosition((cityObj?.signups ?? 147) + 1);

    await new Promise((r) => setTimeout(r, 1500));

    // Confetti
    if (typeof window !== 'undefined') {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#f59e0b'],
        scalar: 1.1,
      });
    }

    console.log('Waitlist signup:', data);
    setStatus('success');
  };

  return (
    <section
      ref={resolvedRef as React.RefObject<HTMLElement>}
      id="waitlist"
      className="relative py-24 section-pad"
    >
      {/* Section divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Dołącz teraz
          </p>
          <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold tracking-tight text-white">
            Zapisz się na waitlistę
          </h2>
          <p className="mt-3 text-sm text-white/45">
            Bez zobowiązań. Powiadomimy Cię gdy Twoje miasto będzie gotowe.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Jesteś #{queuePosition} w kolejce w {submittedCity}! 🎉
              </h3>
              <p className="text-sm text-white/50 mb-4">
                Zaproś znajomych, żeby miasto szybciej osiągnęło próg.
              </p>
              <ShareButtons position={queuePosition} city={submittedCity} />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
            >
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Email
                </label>
                <input
                  {...register('email', { required: 'Podaj email' })}
                  type="email"
                  placeholder="ty@example.com"
                  autoComplete="email"
                  className="
                    w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25
                    bg-white/6 border border-white/10 outline-none
                    focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20
                    transition-all duration-200
                  "
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* City — custom dropdown with search */}
              <div className="relative">
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Miasto
                </label>
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => { setCitySearch(e.target.value); setDropdownOpen(true); }}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  placeholder="Wyszukaj miasto..."
                  className="
                    w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25
                    bg-white/6 border border-white/10 outline-none
                    focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20
                    transition-all duration-200
                  "
                />
                <input type="hidden" {...register('city', { required: 'Wybierz miasto' })} />

                <AnimatePresence>
                  {dropdownOpen && filteredCities.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 top-full mt-1 left-0 right-0 max-h-48 overflow-y-auto
                                 rounded-xl border border-white/10 bg-[#0d1a15] shadow-xl shadow-black/40"
                    >
                      {filteredCities.map((c) => (
                        <li
                          key={c.id}
                          onMouseDown={() => {
                            setValue('city', c.id);
                            setCitySearch(c.name);
                            setDropdownOpen(false);
                            setQueuePosition(c.signups + 1);
                          }}
                          className="flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white/80">{c.name}</span>
                          <span className={`text-xs font-medium ${
                            c.status === 'live' ? 'text-emerald-400' :
                            c.status === 'filling' ? 'text-amber-400' : 'text-white/30'
                          }`}>
                            {c.status === 'live' ? '● LIVE' :
                             c.status === 'filling' ? `${c.signups}/200` :
                             `${c.signups}/200`}
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {errors.city && (
                  <p className="mt-1 text-xs text-red-400">{errors.city.message}</p>
                )}
              </div>

              {/* Sport selection */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-2">
                  Sport
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'tennis', label: '🎾 Tenis' },
                    { value: 'padel',  label: '🏸 Padel' },
                    { value: 'both',   label: '⚡ Oba' },
                  ].map((opt) => {
                    const checked = watch('sport') === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`
                          flex items-center justify-center px-3 py-2.5 rounded-xl
                          border text-sm font-medium cursor-pointer select-none
                          transition-all duration-200
                          ${checked
                            ? 'border-emerald-500/50 bg-emerald-500/12 text-emerald-300'
                            : 'border-white/8 bg-white/4 text-white/45 hover:border-white/15'}
                        `}
                      >
                        <input
                          {...register('sport')}
                          type="radio"
                          value={opt.value}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  relative flex items-center justify-center gap-2
                  w-full py-4 rounded-xl font-semibold text-sm text-emerald-950
                  bg-emerald-500 hover:bg-emerald-400
                  glow-emerald disabled:opacity-60
                  transition-colors duration-200 cursor-pointer
                "
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Zapisuję...
                  </>
                ) : (
                  <>
                    Dołącz do waitlisty
                    {selectedCityObj && ` w ${selectedCityObj.name}`}
                    {' '}→
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-white/25">
                Żadnego spamu. Odpisujesz z listy jednym kliknięciem.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
