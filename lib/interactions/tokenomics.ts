import { allocations } from '../content';
import { scope, setText, motionAllowed, type AnimateDriver } from './shared';
export function mountTokenomics(animate: AnimateDriver) {
  const s = scope();
  let selected = 'community';
  const controls = [...document.querySelectorAll<HTMLButtonElement>('[data-allocation]')];
  function select(id: string) {
    const a = allocations.find(item => item.id === id); if (!a) return;
    const changed = selected !== id;
    selected = id;
    controls.forEach(button => {
      const active = button.dataset.allocation === id;
      button.setAttribute('aria-pressed', String(active)); button.classList.toggle('is-active', active);
    });
    document.querySelectorAll<HTMLElement>('[data-crumb-group]').forEach(crumb => {
      crumb.classList.toggle('is-dimmed', crumb.dataset.crumbGroup !== id);
      crumb.classList.toggle('is-highlighted', crumb.dataset.crumbGroup === id);
    });
    const figure = document.querySelector<HTMLElement>('[data-allocation-figure]');
    if (figure) {
      const percent = document.createElement('span'); percent.textContent = '%';
      figure.replaceChildren(document.createTextNode(String(a.percent)), percent);
      if (changed && motionAllowed()) s.add(animate(figure, { opacity: [.45, 1], transform: ['translateY(7px)', 'translateY(0px)'] }, { duration: .28 }));
    }
    setText('[data-allocation-name]', a.name.toUpperCase());
    setText('[data-allocation-detail]', a.note);
    const bird = document.querySelector<SVGElement>('[data-allocation-mascot] .mascot-art');
    if (bird) { [...bird.classList].filter(name => name.startsWith('mood-')).forEach(name => bird.classList.remove(name)); bird.classList.add(`mood-${a.mood}`); }
  }
  controls.forEach((button, index) => {
    button.addEventListener('click', () => select(button.dataset.allocation!), { signal: s.signal });
    button.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') select(button.dataset.allocation!); }, { signal: s.signal });
    button.addEventListener('focus', () => select(button.dataset.allocation!), { signal: s.signal });
    button.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? controls.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + controls.length) % controls.length;
      controls[next]?.focus();
    }, { signal: s.signal });
  });
  return s.stop;
}
