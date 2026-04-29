import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
}

export function Marquee({ children, reverse, speed = 30, className }: MarqueeProps) {
  return (
    <div className={cn('marquee-wrap', className)}>
      <div
        className={cn('marquee-track', reverse && 'reverse')}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
