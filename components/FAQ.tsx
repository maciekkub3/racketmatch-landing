'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const faqs = [
  {
    q: 'Nigdy nie grałem w tenisa/padla. Czy to dla mnie?',
    a: 'Tak. Większość osób na waitliście to gracze rekreacyjni albo zaczynający. System dopasowuje Cię do osób na Twoim poziomie — nie zagrasz z kimś kto Cię rozbije 6:0.',
  },
  {
    q: 'Kiedy apka będzie dostępna w moim mieście?',
    a: 'Odpalamy miasto gdy zbierze 200 zapisów. Szczecin już działa. Sprawdź mapę lub wpisz swoje miasto — zobaczysz ile brakuje.',
  },
  {
    q: 'Ile kosztuje?',
    a: 'Podstawowe granie za darmo. Premium i turnieje Masters w przyszłości.',
  },
  {
    q: 'Skąd system wie jaki mam poziom?',
    a: 'Krótki wywiad po rejestracji ustala Twój początkowy ranking ELO. Nie dostajesz domyślnych punktów — ustalamy indywidualnie.',
  },
  {
    q: 'Kim są Masters?',
    a: 'Top 5% graczy w Twoim mieście i sporcie. Minimum 20 meczów rankingowych.',
  },
  {
    q: 'Czy muszę mieć rakietę i dostęp do kortu?',
    a: 'Nie. Lokalne kluby w apce pokazują korty, wypożyczalnie i pierwsze lekcje z trenerami.',
  },
  {
    q: 'Czy aplikacja jest na iOS i Android?',
    a: 'Tak, obie platformy.',
  },
];

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={false}
      className="border border-white/7 rounded-2xl overflow-hidden"
      animate={{
        borderColor: isOpen ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)',
      }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-sm font-medium text-white/85 leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-white/12 flex items-center justify-center text-white/50"
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/6 pt-3">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-24 section-pad">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight text-white">
            Masz pytania?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
