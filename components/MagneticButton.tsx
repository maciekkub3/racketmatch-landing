'use client';

import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  children: ReactNode;
}

export function MagneticButton({
  strength = 0.28,
  className,
  children,
  style,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate3d(${x}px, ${y}px, 0)`);
  };

  const handleLeave = () => setTransform('translate3d(0, 0, 0)');

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('magnetic-btn', className)}
      style={{ transform, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
