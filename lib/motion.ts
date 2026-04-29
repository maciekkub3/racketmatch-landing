// Design system motion — JEDNA krzywa, no spring physics.
// Mirrors --ease in globals.css for use in framer-motion / animate() calls.

export const EASE = [0.5, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;
