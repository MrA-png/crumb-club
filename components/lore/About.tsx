import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Mascot, Crumb } from '@/components/brand/Mascot';
export function About() {
  return <section className="about section-space wrap" id="about" aria-labelledby="about-title" data-section>
    <SectionLabel number="01">THE BACKSTORY</SectionLabel>
    <div className="about-top" data-reveal><h2 id="about-title" className="section-title">NOT ANOTHER DOG.<br />DEFINITELY <span className="hand-underline">A BIRD.</span></h2><div className="about-intro"><span className="small-overline">A FINELY FEATHERED BAD IDEA.</span><p>The internet has enough dogs in hats. We found a pigeon outside a bakery and gave him Wi-Fi. Things escalated.</p><a className="text-link" href="#lore">Read the field notes <ArrowUpRight size={17} /></a></div></div>
    <div className="about-grid">
      <article className="about-block" data-reveal><div className="about-number mono">01 / THE CHARACTER</div><div className="about-drawing drawing-one"><Mascot compact mood="normal" /><span className="tiny-sticker">certified bird</span></div><h3>Street bird.<br />Internet brain.</h3><p>Meet Crumb. Professionally unbothered. Easily distracted by bread. Now, unfortunately, online.</p></article>
      <article className="about-block" data-reveal><div className="about-number mono">02 / THE CULTURE</div><div className="about-drawing drawing-two"><span className="message-bubble">coo.</span><span className="message-bubble bubble-reply">coo, but louder.</span><div className="two-birds"><Mascot compact mood="degen" /><Mascot compact mood="rich" /></div></div><h3>Not a fanbase.<br />A flock.</h3><p>A place for the screenshot savers, the reply guys, the meme makers, and every delightfully odd bird.</p></article>
      <article className="about-block" data-reveal><div className="about-number mono">03 / THE WHOLE POINT</div><div className="about-drawing drawing-three"><div className="crumb-orbit"><Crumb /><span>GOOD<br />CRUMBS<br />ONLY.</span></div><svg className="about-star" viewBox="0 0 50 50" aria-hidden="true"><path d="m25 1 5 17 17-5-12 13 13 12-18-3-5 15-5-17-17 5 12-13L2 13l18 3Z" fill="currentColor" /></svg></div><h3>Less corporate.<br />More coo.</h3><p>No world-saving pitch deck. No guaranteed anything. Just a character worth passing around.</p></article>
    </div>
  </section>;
}
