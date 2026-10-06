import { ArrowUpRight, ArrowDown, MousePointer2, Copy, Check, ExternalLink } from 'lucide-react';
import { Mascot, Crumb, BirdIcon } from '@/components/brand/Mascot';
import { Socials } from '@/components/ui/Socials';
import { site } from '@/lib/config';

export function Hero() {
  return <section id="home" className="hero" aria-labelledby="hero-title" data-section>
    <div className="hero-inner wrap">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow" data-enter><span className="status-dot" /> A SMALL BIRD. AN INTERNET-SIZED ATTITUDE.</div>
        <h1 id="hero-title" className="hero-title" aria-label="Small bird. Big crumb energy.">
          <span data-enter>SMALL BIRD.</span><span className="hero-lime-line" data-enter>BIG CRUMB</span><span data-enter>ENERGY<span className="hero-period">.</span></span>
        </h1>
        <p className="hero-description" data-enter>No grand master plan. Just a street-smart pigeon,<br className="desktop-break" /> a pocket full of crumbs, and a very online flock.</p>
        <div className="hero-ctas" data-enter><button className="button button-dark magnetic" type="button" data-buy data-magnetic>Get your $CRUMB <ArrowUpRight size={22} /></button><a className="button button-outline magnetic" href="#community" data-magnetic>Meet the flock <ArrowUpRight size={20} /></a></div>
        {site.contract && (
          <div className="hero-ca-strip" data-enter>
            <div className="hero-ca-header">
              <div className="hero-ca-tag">
                <span className="status-dot" />
                <span className="mono">OFFICIAL CA ({site.chain || 'ROBINHOOD CHAIN'})</span>
              </div>
              <a
                href={site.ponsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-ca-pons-badge"
                title="Trade on Pons Family"
              >
                <span>Pons Family</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="hero-ca-body">
              <a
                href={site.ponsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-ca-address-link"
                title="Open $CRUMB in Pons Family"
              >
                <code className="hero-ca-code" data-contract-text>{site.contract}</code>
                <ExternalLink size={13} className="hero-ca-icon" />
              </a>
              <button
                type="button"
                className="copy-button hero-ca-copy"
                data-copy-contract
                aria-label="Copy contract address"
              >
                <Copy className="copy-default" size={14} />
                <Check className="copy-success" size={14} />
                <span data-copy-label>Copy</span>
              </button>
            </div>
          </div>
        )}
        <div className="hero-bottom" data-enter><div className="mini-flock" aria-hidden="true">{(['normal', 'degen', 'rich', 'sleepy'] as const).map(m => <span key={m}><Mascot compact mood={m} /></span>)}</div><div className="hero-flock-copy"><strong>Birds of a feather.</strong><span>Weird together. Better together.</span></div><Socials /></div>
      </div>
      <div className="hero-art" data-hero-art>
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-target" aria-hidden="true"><span /><span /></div>
        <div className="hero-backword" aria-hidden="true">COO.</div>
        <div className="flight-scribble" aria-hidden="true"><svg viewBox="0 0 180 100" fill="none"><path d="M4 85c25-60 95-52 95-9 0 21-58 20-57-2 1-27 50-40 116-50m-23-11 30 9-19 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></div>
        <div className="sticker hero-sticker" data-parallax="0.04"><span>LOCALLY SOURCED</span><strong>100%<br />BIRD.</strong><span>TERMINALLY ONLINE</span></div>
        <div className="hero-coin" data-parallax="-0.025" aria-hidden="true"><BirdIcon /><span>$CRUMB</span></div>
        <Crumb className="floating-crumb crumb-a" /><Crumb className="floating-crumb crumb-b" /><Crumb className="floating-crumb crumb-c" />
        <button className="hero-mascot" type="button" data-mascot data-hero-mascot aria-label="Feed CRUMB a crumb and see his reaction"><Mascot label="CRUMB, a sleepy street pigeon holding a piece of bread and wearing oversized sneakers" /><span className="crumb-burst" aria-hidden="true" /><span className="bird-speech" role="status" aria-live="polite" data-bird-speech>coo. respectfully.</span></button>
        <div className="mascot-note"><MousePointer2 size={18} /><span>go on, feed the bird.</span><svg aria-hidden="true" viewBox="0 0 52 48" fill="none"><path d="M3 3c30 1 45 12 35 34m-10-9 9 12 11-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
        <div className="hero-art-index mono">SPECIMEN 001 / COMMON INTERNET PIGEON</div>
      </div>
    </div>
    <div className="hero-foot wrap"><a href="#about" className="scroll-cue"><span className="scroll-line" /><span>SCROLL TO GET THE LORE</span><ArrowDown size={14} /></a><span className="hero-foot-note mono">NO SUITS. NO SPACESHIPS. JUST CRUMBS.</span><span className="coordinate mono">COO / COO</span></div>
  </section>;
}
