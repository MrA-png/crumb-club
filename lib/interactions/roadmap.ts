import { scope, motionAllowed } from './shared';
export function mountRoadmap() {
  const s = scope();
  const track = document.querySelector<HTMLElement>('[data-roadmap-track]');
  const cards = [...document.querySelectorAll<HTMLElement>('[data-roadmap-card]')];
  let index = 0;
  const select = (target: number) => {
    index = (target + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === index);
      const details = card.querySelector('details'); if (details) details.open = i === index;
    });
    if (track && cards[index]) {
      const delta = cards[index].getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollTo({ left: track.scrollLeft + delta - 3, behavior: motionAllowed() ? 'smooth' : 'auto' });
    }
  };
  document.querySelector('[data-roadmap-prev]')?.addEventListener('click', () => select(index - 1), { signal: s.signal });
  document.querySelector('[data-roadmap-next]')?.addEventListener('click', () => select(index + 1), { signal: s.signal });
  cards.forEach((card, i) => {
    const details = card.querySelector('details');
    details?.addEventListener('toggle', () => { if (details.open) { index = i; cards.forEach((c, n) => c.classList.toggle('is-active', n === i)); } }, { signal: s.signal });
  });
  return s.stop;
}
