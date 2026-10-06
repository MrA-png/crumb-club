import type { SiteConfig } from '../config';
import { type AnimateDriver, nativeAnimate, mountToast } from './shared';
import { mountNavigation } from './navigation';
import { mountMotion } from './motion';
import { mountMascot } from './mascot';
import { mountToken } from './token';
import { mountTokenomics } from './tokenomics';
import { mountRoadmap } from './roadmap';
import { mountGallery } from './gallery';
import { mountMetrics } from './metrics';
/** Shared by the React island and the standalone HTML preview. Returns complete cleanup. */
export function mountSite(config: SiteConfig, animate: AnimateDriver = nativeAnimate) {
  const toast = mountToast();
  const cleanups = [
    toast.cleanup, mountNavigation(), mountMotion(animate), mountMascot(animate),
    mountToken(config, toast), mountTokenomics(animate), mountRoadmap(),
    mountGallery(animate, toast), mountMetrics(config),
  ];
  return () => cleanups.reverse().forEach(cleanup => cleanup());
}
