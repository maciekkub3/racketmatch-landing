'use client';

import { useEffect, useState } from 'react';

interface StickyCtaProps {
  /** Element id of the hero section. Bar shows when this scrolls out of view, and click scrolls back to it. */
  targetId?: string;
  /** Mobile sticky bar label. */
  label?: string;
}

export function StickyCta({
  targetId = 'hero',
  label = 'Dołącz do waitlisty →',
}: StickyCtaProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  const handleClick = () => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky-cta" data-show={show} aria-hidden={!show}>
      <button
        onClick={handleClick}
        className="sticky-cta-btn"
        type="button"
        tabIndex={show ? 0 : -1}
        disabled={!show}
      >
        {label}
      </button>
    </div>
  );
}
