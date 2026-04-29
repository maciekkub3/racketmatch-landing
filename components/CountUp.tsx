'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { EASE } from '@/lib/motion';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
}

export function CountUp({ to, from = 0, duration = 1.6, format }: CountUpProps) {
  const [value, setValue] = useState(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const controls = animate(from, to, {
          duration,
          ease: [...EASE],
          onUpdate: (v) => setValue(Math.floor(v)),
        });
        return () => controls.stop();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={elementRef}>
      {format ? format(value) : value.toLocaleString('pl-PL')}
    </span>
  );
}
