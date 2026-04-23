'use client';

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Timer, Swords } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Zapisz się',
    body: 'Podaj email, wybierz miasto i sport. Zajmuje 30 sekund.',
    color: 'from-emerald-500/10 to-emerald-500/0',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    icon: Timer,
    step: '02',
    title: 'Czekaj na próg',
    body: 'Gdy miasto zbierze 200 zapisów, odpalamy aplikację. Śledzimy postęp razem.',
    color: 'from-amber-500/10 to-amber-500/0',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    icon: Swords,
    step: '03',
    title: 'Graj!',
    body: 'Dostajesz dostęp, ustalamy poziom, system dobiera Ci partnerów. Czas na kort.',
    color: 'from-lime-500/10 to-lime-500/0',
    glow: 'rgba(132,204,22,0.12)',
  },
];

function TiltCard({ children, glow }: { children: React.ReactNode; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className="h-full"
      whileHover={{ boxShadow: `0 0 40px ${glow}` }}
    >
      {children}
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 section-pad">
      {/* Section divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Jak to działa
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight text-white">
            Trzy kroki do pierwszego meczu
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TiltCard glow={step.glow}>
                  <div
                    className={`h-full glass-card rounded-2xl p-6 bg-gradient-to-b ${step.color} relative overflow-hidden`}
                  >
                    {/* Step number watermark */}
                    <span className="absolute top-4 right-5 text-6xl font-black text-white/4 select-none">
                      {step.step}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white/70" strokeWidth={1.8} />
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>

                    {/* Mini animated progress bar for step 2 */}
                    {i === 1 && (
                      <div className="mt-5">
                        <div className="flex justify-between text-xs text-white/35 mb-1">
                          <span>Warszawa</span>
                          <span>147/200</span>
                        </div>
                        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-amber-400"
                            initial={{ width: 0 }}
                            animate={inView ? { width: '73.5%' } : {}}
                            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
