'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const activities = [
  { text: 'Anna z Krakowa zapisała się', time: '3 min temu', sport: '🎾' },
  { text: 'Michał z Gdańska zaprosił 3 znajomych', time: '7 min temu', sport: '🏓' },
  { text: 'Zofia z Warszawy dołączyła do waitlisty', time: '11 min temu', sport: '🎾' },
  { text: 'Piotr z Wrocławia wybrał padla', time: '14 min temu', sport: '🏸' },
  { text: 'Kamila z Poznania zapisała się', time: '19 min temu', sport: '🎾' },
  { text: 'Tomasz z Łodzi czeka na otwarcie', time: '22 min temu', sport: '🎾' },
  { text: 'Marta z Gdyni dołączyła', time: '28 min temu', sport: '🏓' },
  { text: 'Bartek ze Szczecina gra już w apce', time: '31 min temu', sport: '🎾' },
  { text: 'Agnieszka z Bydgoszczy zapisała się', time: '36 min temu', sport: '🏸' },
  { text: 'Łukasz z Lublina wybrał tenisa', time: '42 min temu', sport: '🎾' },
  { text: 'Kasia z Torunia zaprasza znajomych', time: '47 min temu', sport: '🎾' },
  { text: 'Rafał z Katowic dołączył do waitlisty', time: '55 min temu', sport: '🏸' },
];

function FeedItem({ item }: { item: (typeof activities)[0] }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-white/6 bg-white/3 mx-2">
      <span className="text-lg leading-none">{item.sport}</span>
      <div>
        <p className="text-sm text-white/75 font-medium whitespace-nowrap">{item.text}</p>
        <p className="text-xs text-white/35 mt-0.5">{item.time}</p>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 px-4"
      >
        <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
          Na żywo
        </p>
        <h2 className="text-xl font-bold text-white/80">Twoi przyszli partnerzy już tu są</h2>
      </motion.div>

      {/* Fade masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#050a09] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#050a09] to-transparent" />

        {/* Marquee — two copies for seamless loop */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex flex-nowrap" style={{ width: 'max-content' }}>
            {activities.map((item, i) => (
              <FeedItem key={`a-${i}`} item={item} />
            ))}
            {activities.map((item, i) => (
              <FeedItem key={`b-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Second row reversed */}
        <div className="flex overflow-hidden mt-3">
          <div
            className="flex flex-nowrap"
            style={{
              width: 'max-content',
              animation: 'marquee-scroll 36s linear infinite reverse',
            }}
          >
            {[...activities].reverse().map((item, i) => (
              <FeedItem key={`c-${i}`} item={item} />
            ))}
            {[...activities].reverse().map((item, i) => (
              <FeedItem key={`d-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
