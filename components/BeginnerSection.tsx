'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ClipboardList, GraduationCap, MapPin } from 'lucide-react';

const cards = [
  {
    icon: ClipboardList,
    title: 'Ustalimy Twój poziom razem',
    body: 'Krótki wywiad po rejestracji. Bez testów, bez presji. System dobierze Ci partnerów z Twojej ligi.',
  },
  {
    icon: GraduationCap,
    title: 'Zacznij z trenerem',
    body: 'Zweryfikowani trenerzy w Twoim mieście. Pierwsza lekcja to dobry start — potem grasz sam.',
  },
  {
    icon: MapPin,
    title: 'Sprzęt? Kort? Pomożemy.',
    body: 'Lokalne kluby, wypożyczalnie rakiet, polecane korty — wszystko w jednym miejscu.',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function BeginnerSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 section-pad">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — display text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4">
            Nigdy nie grałeś?
          </p>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
            Dobrze&nbsp;trafiłeś.
          </h2>
          <p className="mt-6 text-[clamp(1.1rem,2.5vw,1.35rem)] font-light leading-[1.55] text-white/55">
            Nie musisz umieć.{' '}
            <br className="hidden sm:block" />
            Nie musisz znać nikogo.{' '}
            <br className="hidden sm:block" />
            Nie musisz mieć sprzętu.
          </p>
        </motion.div>

        {/* Right — 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-4"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="glass-card rounded-2xl p-5 cursor-default group"
                style={{
                  boxShadow: '0 0 0 1px rgba(16,185,129,0.1)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-400" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
