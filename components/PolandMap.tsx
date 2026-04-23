'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cities, type City } from '@/lib/cities';

const POLAND_PATH =
  'M 25,108 L 28,88 L 36,68 L 54,46 L 82,28 L 115,14 L 158,7 L 198,6 ' +
  'L 228,14 L 243,6 L 272,10 L 312,14 L 354,22 L 392,30 L 420,36 L 442,44 ' +
  'L 455,64 L 462,92 L 462,122 L 460,150 L 468,180 L 472,216 L 475,256 ' +
  'L 476,298 L 472,338 L 466,370 L 456,398 L 442,414 L 412,428 L 372,440 ' +
  'L 328,446 L 288,448 L 256,444 L 220,442 L 186,438 L 154,432 L 122,420 ' +
  'L 92,406 L 64,394 L 40,378 L 22,356 L 15,328 L 16,296 L 18,262 L 16,226 ' +
  'L 14,188 L 16,152 L 22,130 Z';

function statusColor(status: City['status']) {
  if (status === 'live')    return '#10b981';
  if (status === 'filling') return '#f59e0b';
  return '#475569';
}

function statusRadius(status: City['status']) {
  if (status === 'live')    return 8;
  if (status === 'filling') return 6;
  return 3;
}

interface TooltipProps {
  city: City;
  onSelect: (id: string) => void;
  onClose: () => void;
}

function CityTooltip({ city, onSelect, onClose }: TooltipProps) {
  const pct = Math.round((city.signups / city.threshold) * 100);
  const isLive = city.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="glass-card rounded-xl px-4 py-3 min-w-[172px] shadow-xl shadow-black/40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="font-semibold text-sm text-white">{city.name}</span>
        {isLive && (
          <span className="text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
            LIVE
          </span>
        )}
      </div>

      {isLive ? (
        <p className="text-xs text-emerald-300/80">Aplikacja już działa! 🎾</p>
      ) : (
        <>
          <p className="text-xs text-white/50 mb-2">
            {city.signups} / {city.threshold} zapisanych
          </p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <button
            onClick={() => { onSelect(city.id); onClose(); }}
            className="w-full text-xs font-medium py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
          >
            Zapisz się jako #{city.signups + 1}
          </button>
        </>
      )}
    </motion.div>
  );
}

/* CSS-keyframe pulse rings.
   transform-box: view-box + absolutne px origin = skaluje od centrum koła w SVG */
function PulseRings({ cx, cy, color, isLive }: { cx: number; cy: number; color: string; isLive: boolean }) {
  const dur = isLive ? '2s' : '3s';
  const origin = `${cx}px ${cy}px`;
  return (
    <>
      <circle
        cx={cx} cy={cy} r={isLive ? 14 : 11}
        fill="none" stroke={color} strokeWidth="1.5"
        style={{
          transformOrigin: origin,
          animation: `city-pulse ${dur} ease-out infinite`,
          opacity: 0.7,
        }}
      />
      {isLive && (
        <circle
          cx={cx} cy={cy} r={12}
          fill="none" stroke={color} strokeWidth="1"
          style={{
            transformOrigin: origin,
            animation: `city-pulse ${dur} ease-out infinite`,
            animationDelay: '0.6s',
            opacity: 0.5,
          }}
        />
      )}
    </>
  );
}

interface PolandMapProps {
  onCitySelect?: (cityId: string) => void;
}

export default function PolandMap({ onCitySelect }: PolandMapProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [dotsVisible, setDotsVisible] = useState(false);

  // Delay dot appearance until after border draw (~2s)
  useEffect(() => {
    const t = setTimeout(() => setDotsVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleDotClick = (cityId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setActiveCity((prev) => (prev === cityId ? null : cityId));
  };

  const tooltipPos = (city: City) => ({
    x: city.x > 350 ? city.x - 185 : city.x > 200 ? city.x - 86 : city.x + 14,
    y: city.y > 380 ? city.y - 85 : city.y - 78,
  });

  return (
    <section className="relative py-16 px-4">
      {/* CSS keyframes for pulse rings — injected once */}
      <style>{`
        @keyframes city-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gdzie grasz?
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Tapnij swoje miasto by zobaczyć status i dołączyć
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-6 text-xs text-white/45">
          {[
            { color: '#10b981', label: 'Live' },
            { color: '#f59e0b', label: 'Zbieramy zapisy' },
            { color: '#475569', label: 'Czeka na aktywację' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>

        {/* SVG container — fixed aspect ratio to prevent layout shift */}
        <div
          className="relative w-full select-none"
          style={{ paddingBottom: '90%' }}
          onClick={() => setActiveCity(null)}
        >
          <svg
            viewBox="0 0 500 450"
            className="absolute inset-0 w-full h-full"
            style={{ touchAction: 'none' }}
            aria-label="Mapa Polski z miastami"
          >
            <defs>
              <radialGradient id="mapGrad" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#022c22" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#050a09" stopOpacity="0" />
              </radialGradient>
              <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Country fill */}
            <path d={POLAND_PATH} fill="url(#mapGrad)" />

            {/* Border draw — runs once, no repeat */}
            <motion.path
              d={POLAND_PATH}
              fill="none"
              stroke="rgba(16,185,129,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {cities.map((city, i) => {
              const r = statusRadius(city.status);
              const color = statusColor(city.status);
              const isLive = city.status === 'live';
              const isFilling = city.status === 'filling';
              const isActive = activeCity === city.id;
              const pos = tooltipPos(city);

              return (
                <g key={city.id}>
                  {/* Pulse rings — pure CSS, no Framer Motion */}
                  {dotsVisible && (isLive || isFilling) && (
                    <PulseRings cx={city.x} cy={city.y} color={color} isLive={isLive} />
                  )}

                  {/* Progress arc for filling cities */}
                  {dotsVisible && isFilling && (() => {
                    const pct = city.signups / city.threshold;
                    const c = 2 * Math.PI * (r + 7);
                    return (
                      <circle
                        cx={city.x} cy={city.y} r={r + 7}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                        strokeDasharray={`${c * pct} ${c}`}
                        strokeDashoffset={c * 0.25}
                        strokeLinecap="round"
                      />
                    );
                  })()}

                  {/* Main dot — Framer Motion only for entry (runs once) */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={r}
                    fill={color}
                    filter={isLive || isFilling ? 'url(#dot-glow)' : undefined}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={dotsVisible ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.35,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleDotClick(city.id, e as unknown as React.MouseEvent)}
                    onTouchEnd={(e) => { e.preventDefault(); handleDotClick(city.id, e as unknown as React.TouchEvent); }}
                  />

                  {/* City label */}
                  {dotsVisible && (isLive || (isFilling && city.signups >= 100)) && (
                    <motion.text
                      x={city.x + r + 5}
                      y={city.y + 4}
                      fill="rgba(236,253,245,0.7)"
                      fontSize="8"
                      fontFamily="system-ui, sans-serif"
                      fontWeight="500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {city.name}{isLive ? ' ★' : ''}
                    </motion.text>
                  )}

                  {/* Tooltip via foreignObject */}
                  {isActive && (
                    <foreignObject
                      x={pos.x} y={pos.y}
                      width="190" height="140"
                      style={{ overflow: 'visible' }}
                    >
                      <AnimatePresence>
                        <CityTooltip
                          city={city}
                          onSelect={(id) => onCitySelect?.(id)}
                          onClose={() => setActiveCity(null)}
                        />
                      </AnimatePresence>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
