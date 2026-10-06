import { Download, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Mascot } from '@/components/brand/Mascot';
import { moods } from '@/lib/content';
export function Gallery() {
  return <section id="gallery" className="gallery section-space" aria-labelledby="gallery-title"><div className="wrap">
    <SectionLabel number="06">ONE BIRD. MANY BAD DECISIONS.</SectionLabel><div className="section-heading-row" data-reveal><h2 className="section-title" id="gallery-title">PICK YOUR<br /><span className="hand-underline">PERSONALITY.</span></h2><div><p>Same bird. Different tabs open.<br />Choose a mood. Make it your avatar.</p><button className="button button-outline gallery-download" type="button" data-download-avatar><Download size={18} /> Save your bird</button></div></div>
    <div className="gallery-layout" data-reveal><div className="featured-bird" style={{ backgroundColor: moods[0].color }} data-featured-panel><div className="featured-top mono"><span data-featured-tag>{moods[0].tag}</span><span data-featured-index>01 / 09</span></div><div className="featured-art" data-featured-art><Mascot mood="normal" label="The original CRUMB pigeon" /></div><div className="featured-bottom"><div><h3 data-featured-name>{moods[0].name}</h3><p data-featured-caption>{moods[0].caption}</p></div><span className="round-arrow"><ArrowUpRight size={24} /></span></div></div>
      <div className="gallery-picker" role="group" aria-label="Choose your bird personality">{moods.map((mood, i) => <button key={mood.id} type="button" className={`gallery-choice ${i === 0 ? 'is-active' : ''}`} data-mood={mood.id} aria-pressed={i === 0} aria-label={`Choose ${mood.name}`} title={mood.caption} style={{ '--mood-color': mood.color } as React.CSSProperties}><span className="gallery-mini"><Mascot compact mood={mood.id} /></span><span className="gallery-choice-name">{mood.name}</span><span className="gallery-choice-index mono">0{i + 1}</span></button>)}</div>
    </div><div className="gallery-footer mono"><span>SVG AVATARS / YOUR MOOD, YOUR BIRD</span><span>NO WALLET REQUIRED. OBVIOUSLY.</span></div>
  </div></section>;
}
