import { type AnimateDriver, motionAllowed, scope } from './shared';
export function mountMascot(animate: AnimateDriver) {
  const s = scope();
  const bird = document.querySelector<HTMLButtonElement>('[data-hero-mascot]');
  const scene = document.querySelector<HTMLElement>('[data-hero-art]');
  if (!bird || !scene) return s.stop;
  const speech = bird.querySelector<HTMLElement>('[data-bird-speech]');
  const quotes = ['coo. respectfully.', 'a crumb? for me?', 'this is my entire personality.', 'financially? a bird.', 'compliments to the bakery.', 'okay. we are friends now.', 'please hold. chewing.'];
  let feedCount = 0;
  let frame = 0;
  let speechTimer: ReturnType<typeof setTimeout> | undefined;
  const reset = () => { bird.style.setProperty('--eye-x', '0px'); bird.style.setProperty('--eye-y', '0px'); bird.style.setProperty('--head-turn', '0deg'); };
  scene.addEventListener('pointermove', event => {
    if (!motionAllowed() || event.pointerType === 'touch') return;
    const r = bird.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - r.left - r.width * .5) / (r.width * .45)));
    const y = Math.max(-1, Math.min(1, (event.clientY - r.top - r.height * .3) / (r.height * .5)));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      bird.style.setProperty('--eye-x', `${x * 8}px`);
      bird.style.setProperty('--eye-y', `${y * 5}px`);
      bird.style.setProperty('--head-turn', `${x * 4}deg`);
    });
  }, { passive: true, signal: s.signal });
  scene.addEventListener('pointerleave', reset, { signal: s.signal });
  bird.addEventListener('click', () => {
    feedCount++;
    if (speech) { speech.textContent = quotes[feedCount % quotes.length]; speech.classList.add('is-visible'); }
    if (speechTimer) clearTimeout(speechTimer);
    speechTimer = s.later(() => speech?.classList.remove('is-visible'), 2400);
    if (!motionAllowed()) return;
    const art = bird.querySelector('.bird-head');
    if (art) s.add(animate(art, { transform: ['rotate(0deg)', 'rotate(-9deg)', 'rotate(5deg)', 'rotate(0deg)'] }, { duration: .48 }));
    const burst = bird.querySelector<HTMLElement>('.crumb-burst');
    if (!burst) return;
    // Finite click-triggered confetti. No continuous particle simulation.
    for (let i = 0; i < (window.innerWidth < 700 ? 5 : 9); i++) {
      const particle = document.createElement('i'); particle.style.opacity = '0'; burst.append(particle);
      const angle = ((i * 137.5 + feedCount * 21) % 360) * Math.PI / 180;
      const dx = Math.cos(angle) * (56 + i * 9), dy = -35 - Math.abs(Math.sin(angle) * 95);
      s.add(animate(particle, { opacity: [1, 1, 0], transform: ['translate(0px,0px) rotate(0deg)', `translate(${dx}px,${dy}px) rotate(${i * 50}deg)`, `translate(${dx * 1.1}px,${dy + 65}px) rotate(${i * 70}deg)`] }, { duration: .7 }));
      s.later(() => particle.remove(), 750);
    }
  }, { signal: s.signal });
  s.add(() => { cancelAnimationFrame(frame); reset(); bird.querySelector('.crumb-burst')?.replaceChildren(); speech?.classList.remove('is-visible'); });
  return s.stop;
}
