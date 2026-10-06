import { closest, scope } from './shared';
export function mountNavigation() {
  const s = scope();
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  function closeMenu(focus = false) {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (focus) toggle.focus();
  }
  toggle?.addEventListener('click', () => {
    if (!menu) return;
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.hidden = !open;
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
  }, { signal: s.signal });
  document.addEventListener('click', event => {
    if (closest(event, '#mobile-menu a, [data-buy]')) closeMenu();
    if (menu && !menu.hidden && event.target instanceof Node && !header?.contains(event.target)) closeMenu();
  }, { signal: s.signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu && !menu.hidden) closeMenu(true);
  }, { signal: s.signal });
  const wide = window.matchMedia('(min-width: 701px)');
  wide.addEventListener('change', () => { if (wide.matches) closeMenu(); }, { signal: s.signal });
  let scheduled = false;
  let frame = 0;
  const update = () => { header?.classList.toggle('is-scrolled', window.scrollY > 20); scheduled = false; };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; frame = requestAnimationFrame(update); }
  }, { passive: true, signal: s.signal });
  update();
  const sections = document.querySelectorAll<HTMLElement>('[data-section]');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach(link => {
        if (link.dataset.nav === entry.target.id) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
  s.add(() => { cancelAnimationFrame(frame); observer.disconnect(); closeMenu(); });
  return s.stop;
}
