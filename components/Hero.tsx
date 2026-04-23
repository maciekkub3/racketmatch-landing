'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

const TARGET_SIGNUPS = 2847;
const TARGET_CITIES = 23;

function CountUp({ to, duration = 2.2 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [to, duration]);

  return <span>{value.toLocaleString('pl-PL')}</span>;
}

function MagneticButton({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 28 });
  const sy = useSpring(my, { stiffness: 280, damping: 28 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      ref={btnRef}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        px-8 py-4 rounded-2xl text-base font-bold tracking-tight
        bg-emerald-500 text-emerald-950 cursor-pointer select-none
        transition-colors duration-200 hover:bg-emerald-400
        glow-emerald
      "
    >
      {children}
    </motion.button>
  );
}

interface HeroProps {
  onCtaClick?: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 pt-16 pb-12 text-center overflow-hidden"
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(16,185,129,0.12) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-5 max-w-4xl w-full"
      >
        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,8.5vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
        >
          <span className="gradient-text">Zacznij&nbsp;grać</span>
          {' '}w&nbsp;tenisa{' '}
          <br className="hidden sm:block" />
          albo&nbsp;padla.{' '}Znajdź&nbsp;swoich&nbsp;ludzi.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="max-w-lg text-[clamp(0.95rem,2.2vw,1.15rem)] leading-relaxed text-white/55"
        >
          Nieważne czy grasz od lat, czy nigdy nie trzymałeś rakiety.
          <br className="hidden sm:block" />
          Dobieramy partnerów na Twoim poziomie. W Twoim mieście.
        </motion.p>

        {/* Pill badges — below subtitle per spec */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {[
            { emoji: '🎾', label: 'Dla początkujących' },
            { emoji: '🏆', label: 'Dla graczy z rankingiem' },
          ].map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                         text-xs font-medium tracking-wide
                         bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
            >
              {b.emoji} {b.label}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 mt-1"
        >
          <MagneticButton onClick={onCtaClick}>
            Dołącz do waitlisty →
          </MagneticButton>

          {/* Micro-trust — 60% opacity */}
          <p className="text-xs text-white/38 tracking-wide">
            ✓&nbsp;Bez&nbsp;zobowiązań &nbsp;·&nbsp; ✓&nbsp;Dla&nbsp;każdego&nbsp;poziomu &nbsp;·&nbsp; ✓&nbsp;Polish-made
          </p>
        </motion.div>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.7 }}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full
                     border border-white/8 bg-white/[0.03]
                     text-sm text-white/60"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>
            <CountUp to={TARGET_SIGNUPS} duration={2.3} />
            {' '}osób już zapisanych w{' '}
            <CountUp to={TARGET_CITIES} duration={1.6} />
            {' '}miastach
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/22"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-5 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
