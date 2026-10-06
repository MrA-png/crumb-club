'use client';
import { useEffect } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import type { SiteConfig } from '@/lib/config';
import type { AnimateDriver } from '@/lib/interactions/shared';
import { mountSite } from '@/lib/interactions';
/** One small React/Motion island enhances server-rendered content; no page-sized client tree. */
export function Interactions({ config }: { config: SiteConfig }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const driver: AnimateDriver = (element, keyframes, options) => {
      if (reduced) return () => {};
      const playback = animate(element, keyframes, { ...options, ease: [0.22, 1, 0.36, 1] });
      return () => playback.stop();
    };
    return mountSite(config, driver);
  }, [config, reduced]);
  return null;
}
