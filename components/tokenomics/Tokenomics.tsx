import { SectionLabel } from '@/components/ui/SectionLabel';
import { allocations } from '@/lib/content';
import { Mascot } from '@/components/brand/Mascot';
import { ArrowUpRight } from 'lucide-react';
export function Tokenomics() {
  const crumbs = allocations.flatMap(group => Array.from({ length: group.percent }, (_, i) => ({ group: group.id, color: group.color, i })));
  return <section className="tokenomics section-space wrap" aria-labelledby="tokenomics-title" data-tokenomics>
    <SectionLabel number="03">BREAKING THE BREAD</SectionLabel>
    <div className="section-heading-row" data-reveal><h2 id="tokenomics-title" className="section-title">A LITTLE CRUMB<br />FOR <span className="hand-underline">THE WHOLE FLOCK.</span></h2><p>Every crumb has a place.<br />Here&apos;s one idea for how to share them.</p></div>
    <div className="allocation-layout">
      <div className="allocation-art" data-reveal><div className="allocation-board"><div className="board-top mono"><span>THE CRUMB COUNT</span><span>100 PIECES / ONE FLOCK</span></div><div className="crumb-grid" aria-hidden="true">{crumbs.map((crumb, i) => <span key={`${crumb.group}-${crumb.i}`} className={`allocation-crumb allocation-${crumb.group}`} data-crumb-group={crumb.group} style={{ background: crumb.color, borderRadius: `${[22, 38, 27, 18][i % 4]}% ${[31, 19, 24][i % 3]}% ${[28, 42][i % 2]}% 24%`, rotate: `${(i % 5) * 2 - 4}deg` }} />)}</div><div className="board-bottom mono"><span>ONE CRUMB = ONE PERCENT</span><span>PROPOSED ONLY</span></div></div><div className="allocation-tag"><strong data-allocation-figure>70<span>%</span></strong><span data-allocation-name>FOR THE FLOCK</span></div><div className="allocation-mascot" data-allocation-mascot><Mascot compact mood="happy" /></div><span className="handwritten allocation-note">sharing is a bird thing.</span></div>
      <div className="allocation-content" data-reveal><span className="outline-tag allocation-disclaimer">ILLUSTRATIVE ALLOCATION CONCEPT</span><div className="allocation-list" role="group" aria-label="Explore proposed allocations">{allocations.map((group, i) => <button key={group.id} type="button" className={`allocation-row ${i === 0 ? 'is-active' : ''}`} data-allocation={group.id} aria-pressed={i === 0}><span className="allocation-dot" style={{ background: group.color }} /><span><strong>{group.role}</strong><small>{group.name}</small></span><b>{group.percent}<span>%</span></b><ArrowUpRight size={19} /></button>)}</div><p className="allocation-detail" data-allocation-detail aria-live="polite">{allocations[0].note}</p><p className="allocation-fineprint">This is a creative tokenomics proposal, not an executed distribution. Final supply, wallets, vesting, and allocations require confirmation before any launch.</p></div>
    </div>
  </section>;
}
