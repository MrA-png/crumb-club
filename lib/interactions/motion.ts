import { type AnimateDriver, motionAllowed, scope } from './shared';
export function mountMotion(animate: AnimateDriver) {
  const s = scope();
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  const label = document.querySelector<HTMLElement>('[data-motion-label]');
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  try { userPaused = sessionStorage.getItem('crumb-motion-paused') === 'true'; } catch { /* Storage is optional. */ }
  const sync = () => {
    const paused = userPaused || media.matches;
    root.classList.toggle('motion-paused', paused);
    toggle?.setAttribute('aria-pressed', String(paused));
    toggle?.setAttribute('title', media.matches ? 'System reduced-motion preference is respected' : paused ? 'Resume decorative motion' : 'Pause decorative motion');
    if (label) label.textContent = media.matches ? 'Reduced motion' : paused ? 'Motion off' : 'Motion on';
  };
  sync();
  toggle?.addEventListener('click', () => {
    userPaused = !userPaused;
    try { sessionStorage.setItem('crumb-motion-paused', String(userPaused)); } catch { /* No tracking. */ }
    sync();
  }, { signal: s.signal });
  media.addEventListener('change', sync, { signal: s.signal });
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-hidden', document.hidden), { signal: s.signal });
  // Nothing starts invisible in CSS. The page remains readable without JavaScript.
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (motionAllowed()) s.add(animate(entry.target, { opacity: [0, 1], transform: ['translateY(23px)', 'translateY(0px)'] }, { duration: .65 }));
      reveal.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px 25px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
  if (motionAllowed()) document.querySelectorAll('[data-enter]').forEach((el, index) => {
    s.add(animate(el, { opacity: [0, 1], transform: ['translateY(17px)', 'translateY(0px)'] }, { duration: .72, delay: Math.min(index * .065, .5) }));
  });
  // Pause all decorative loops in sections that are outside the viewport.
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting));
  }, { rootMargin: '100px' });
  document.querySelectorAll('main > section').forEach(el => visibility.observe(el));
  const hero = document.querySelector<HTMLElement>('[data-hero-art]');
  let scrollFrame = 0;
  const onScroll = () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      if (!hero || !motionAllowed() || window.innerWidth < 701 || hero.getBoundingClientRect().bottom < 0) return;
      hero.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
        const speed = Number(el.dataset.parallax || 0);
        el.style.transform = `translateY(${Math.min(window.scrollY, 700) * speed}px)`;
      });
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true, signal: s.signal });
  const finePointer = window.matchMedia('(pointer: fine)');
  document.querySelectorAll<HTMLElement>('[data-magnetic], [data-tilt]').forEach(el => {
    let frame = 0;
    const reset = () => { cancelAnimationFrame(frame); el.style.transform = ''; };
    el.addEventListener('pointermove', event => {
      if (!finePointer.matches || !motionAllowed()) return;
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = el.hasAttribute('data-tilt') ? `rotateX(${-y * 6}deg) rotateY(${x * 7}deg) translateY(-4px)` : `translate(${x * 7}px,${y * 6}px)`;
      });
    }, { passive: true, signal: s.signal });
    el.addEventListener('pointerleave', reset, { signal: s.signal });
    el.addEventListener('blur', reset, { signal: s.signal });
    s.add(reset);
  });
  s.add(() => {
    reveal.disconnect(); visibility.disconnect(); cancelAnimationFrame(scrollFrame);
    root.classList.remove('page-hidden');
    document.querySelectorAll('.is-offscreen').forEach(el => el.classList.remove('is-offscreen'));
  });
  return s.stop;
}
