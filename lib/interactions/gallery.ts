import { moods, type Mood } from '../content';
import { closest, copyText, saveFile, scope, setText, motionAllowed, type AnimateDriver, type Toast } from './shared';
const NS = 'http://www.w3.org/2000/svg';
const avatarCss = `.accessory{display:none}.mood-rich .accessory-glasses,.mood-degen .accessory-hat,.mood-broke .accessory-tear,.mood-angry .accessory-anger,.mood-moon .accessory-helmet,.mood-diamond .accessory-diamond{display:initial}.mood-happy .bird-blush{opacity:1}.mood-sleepy .bird-lids{transform:translateY(25px)}.mood-sleepy .bird-pupils{opacity:.25}.mood-panic .bird-lids{transform:translateY(-27px)}.mood-angry .bird-lids{transform:translateY(-8px)}.mood-degen .bird-lids{transform:translateY(-9px)}.bird-shadow{display:none}`;
/** Self-contained, editable vector artwork. No external font files or scripts. */
function avatarSvg(source: SVGElement, mood: Mood, background: string, poster?: string): string {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('xmlns', NS); svg.setAttribute('viewBox', '0 0 800 800'); svg.setAttribute('width', '800'); svg.setAttribute('height', '800');
  svg.setAttribute('role', 'img');
  const title = document.createElementNS(NS, 'title'); title.textContent = `CRUMB ${mood} ${poster ? 'meme' : 'avatar'}`; svg.append(title);
  const style = document.createElementNS(NS, 'style'); style.textContent = avatarCss; svg.append(style);
  const rect = document.createElementNS(NS, 'rect'); rect.setAttribute('width', '800'); rect.setAttribute('height', '800'); rect.setAttribute('fill', background); svg.append(rect);
  const art = source.cloneNode(true) as SVGElement;
  [...art.classList].filter(name => name.startsWith('mood-')).forEach(name => art.classList.remove(name));
  art.classList.add(`mood-${mood}`);
  art.setAttribute('viewBox', poster ? '0 0 560 610' : '105 38 330 330');
  art.setAttribute('x', poster ? '150' : '55'); art.setAttribute('y', poster ? '180' : '45');
  art.setAttribute('width', poster ? '510' : '690'); art.setAttribute('height', poster ? '570' : '690');
  art.removeAttribute('aria-hidden'); art.removeAttribute('aria-label'); art.removeAttribute('style');
  svg.append(art);
  if (poster) {
    const lines = poster === 'grass' ? ['THEY SAID TOUCH GRASS.', 'I ATE THE BREAD.'] : ['COO. COO. COO.', 'WE ARE SO BACK.'];
    lines.forEach((line, i) => {
      const t = document.createElementNS(NS, 'text'); t.setAttribute('x', '50'); t.setAttribute('y', i ? '754' : '93');
      t.setAttribute('fill', '#20221f'); t.setAttribute('font-family', 'Arial Black,Arial,sans-serif');
      t.setAttribute('font-size', i ? '47' : '49'); t.setAttribute('font-weight', '900');
      t.setAttribute('letter-spacing', '-2'); t.textContent = line; svg.append(t);
    });
  }
  const caption = document.createElementNS(NS, 'text'); caption.setAttribute('x', '50'); caption.setAttribute('y', '784'); caption.setAttribute('fill', '#20221f'); caption.setAttribute('font-family', 'monospace'); caption.setAttribute('font-size', '11'); caption.textContent = 'CRUMB / SMALL BIRD. BIG CRUMB ENERGY.'; svg.append(caption);
  return new XMLSerializer().serializeToString(svg);
}
export function mountGallery(animate: AnimateDriver, toast: Toast) {
  const s = scope();
  let selected: typeof moods[number] = moods[0];
  const controls = [...document.querySelectorAll<HTMLButtonElement>('[data-mood]')];
  function select(id: string) {
    const mood = moods.find(m => m.id === id); if (!mood) return;
    selected = mood;
    controls.forEach(button => {
      const active = button.dataset.mood === id;
      button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active));
    });
    const panel = document.querySelector<HTMLElement>('[data-featured-panel]');
    if (panel) panel.style.backgroundColor = mood.color;
    const art = document.querySelector<SVGElement>('[data-featured-art] .mascot-art');
    if (art) {
      [...art.classList].filter(name => name.startsWith('mood-')).forEach(name => art.classList.remove(name));
      art.classList.add(`mood-${mood.id}`); art.setAttribute('aria-label', `${mood.name}: ${mood.caption}`);
      if (motionAllowed()) s.add(animate(art, { opacity: [.6, 1] }, { duration: .28 }));
    }
    setText('[data-featured-name]', mood.name); setText('[data-featured-caption]', mood.caption);
    setText('[data-featured-tag]', mood.tag); setText('[data-featured-index]', `0${moods.indexOf(mood) + 1} / 09`);
  }
  controls.forEach((button, index) => {
    button.addEventListener('click', () => select(button.dataset.mood!), { signal: s.signal });
    button.addEventListener('keydown', event => {
      const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 };
      if (!(event.key in offsets)) return;
      event.preventDefault(); const next = (index + offsets[event.key] + controls.length) % controls.length;
      controls[next].focus(); select(controls[next].dataset.mood!);
    }, { signal: s.signal });
  });
  document.addEventListener('click', async event => {
    if (closest(event, '[data-download-avatar]')) {
      const art = document.querySelector<SVGElement>('[data-featured-art] .mascot-art');
      if (art) { saveFile(avatarSvg(art, selected.id, selected.color), `crumb-${selected.id}-avatar.svg`); toast.show(`Your ${selected.name.toLowerCase()} avatar is ready. Keep it crumby.`); }
    }
    const poster = closest(event, '[data-download-poster]');
    if (poster) {
      const kind = poster.dataset.downloadPoster;
      const art = poster.closest('article')?.querySelector<SVGElement>('.mascot-art');
      if (art) { saveFile(avatarSvg(art, kind === 'coo' ? 'degen' : 'normal', kind === 'coo' ? '#f19b72' : '#b8c5a7', kind), `crumb-${kind}-meme.svg`); toast.show('Meme saved as editable SVG. Now go bother the group chat.'); }
    }
    const like = closest<HTMLButtonElement>(event, '[data-like]');
    if (like) {
      const liked = like.getAttribute('aria-pressed') !== 'true'; like.setAttribute('aria-pressed', String(liked));
      const label = like.querySelector('span'); if (label) label.textContent = liked ? 'Same, bird.' : 'Relatable';
    }
    if (closest(event, '[data-copy-joke]')) {
      const ok = await copyText('my portfolio is just 3 crumbs and an emotional attachment to this website — crumb');
      if (!s.signal.aborted) toast.show(ok ? 'Line copied. Please credit the bird.' : 'Clipboard unavailable. Select the line and copy it manually.');
    }
  }, { signal: s.signal });
  return s.stop;
}
