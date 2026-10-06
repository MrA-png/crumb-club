import { ArrowUpRight } from 'lucide-react';
import { Mascot, Crumb } from '@/components/brand/Mascot';
export function BuySection() {
  return <section className="buy-section" aria-labelledby="buy-title"><div className="wrap buy-inner"><div className="buy-copy" data-reveal><span className="mono">YOU&apos;VE SCROLLED THIS FAR.</span><h2 id="buy-title">TRUST THE BIRD.<br /><span>CHECK THE DETAILS.</span></h2><p>The memes are free. The decisions are yours.</p><div className="buy-ctas"><button className="button button-lime magnetic" type="button" data-buy data-magnetic>Get $CRUMB <ArrowUpRight size={22} /></button><button className="button button-dark-outline" type="button" data-chart>View chart <ArrowUpRight size={19} /></button></div><span className="buy-risk">No promises. No guaranteed returns. Just a bird.</span></div><div className="buy-bird" aria-hidden="true"><Mascot mood="degen" /><Crumb className="buy-floating-crumb" /></div></div></section>;
}
