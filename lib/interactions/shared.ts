export type Cleanup = () => void;
export type Frames = { opacity?: number[]; transform?: string[] };
export type AnimateDriver = (element: Element, frames: Frames, options: { duration: number; delay?: number }) => Cleanup;
export const nativeAnimate: AnimateDriver = (element, frames, options) => {
  const animation = element.animate(frames, { duration: options.duration * 1000, delay: (options.delay || 0) * 1000, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
  return () => animation.cancel();
};
export function scope() {
  const controller = new AbortController();
  const cleanups: Cleanup[] = [];
  const timers = new Set<ReturnType<typeof setTimeout>>();
  return {
    signal: controller.signal,
    add: (cleanup: Cleanup) => { cleanups.push(cleanup); },
    later: (callback: () => void, milliseconds: number) => {
      const id = setTimeout(() => { timers.delete(id); if (!controller.signal.aborted) callback(); }, milliseconds);
      timers.add(id); return id;
    },
    stop: () => { controller.abort(); timers.forEach(clearTimeout); cleanups.reverse().forEach(cleanup => cleanup()); },
  };
}
export function closest<T extends HTMLElement>(event: Event, selector: string): T | null {
  return event.target instanceof Element ? event.target.closest<T>(selector) : null;
}
export function motionAllowed() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.documentElement.classList.contains('motion-paused');
}
export function setText(selector: string, text: string, root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(selector).forEach(element => { element.textContent = text; });
}
export async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false;
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
/** Creates a local SVG file. No network, fonts, wallet or account required. */
export function saveFile(content: string, filename: string, type = 'image/svg+xml') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
export function mountToast() {
  const s = scope();
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  let timer: ReturnType<typeof setTimeout> | undefined;
  const hide = () => { toast?.classList.remove('is-visible'); if (timer) clearTimeout(timer); };
  document.querySelector('[data-dismiss-toast]')?.addEventListener('click', hide, { signal: s.signal });
  return {
    show(message: string) {
      if (!toast) return;
      if (timer) clearTimeout(timer);
      setText('[data-toast-message]', message, toast);
      toast.classList.add('is-visible');
      timer = s.later(hide, 5500);
    },
    cleanup() { hide(); s.stop(); },
  };
}
export type Toast = ReturnType<typeof mountToast>;
