import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Mascot, BirdIcon } from '@/components/brand/Mascot';
import { site } from '@/lib/config';
export function Token() {
  return <section className="token-section section-space" id="token" aria-labelledby="token-title" data-section>
    <div className="wrap"><SectionLabel number="02" light>THE LITTLE TOKEN THAT COULD</SectionLabel>
      <div className="token-layout">
        <div className="token-intro" data-reveal><h2 id="token-title">ALL HAIL<br /><span>$CRUMB.</span></h2><p>Small denomination.<br />Unreasonably large personality.</p><div className="token-seal"><BirdIcon /><div><strong>KEEP IT CRUMBY.</strong><span className="mono">BREAD IS TEMPORARY. MEMES ARE FOREVER.</span></div></div><div className="token-bird" aria-hidden="true"><Mascot compact mood="rich" /></div></div>
        <div className="token-details" data-reveal><div className="token-details-header"><span className="mono">THE BIRD&apos;S VITALS</span><span className="outline-tag">{site.contract ? 'CHECK BEFORE YOU PECK' : 'NOT LAUNCHED'}</span></div><dl className="token-vitals">
          <div><dt>Ticker</dt><dd>$CRUMB</dd></div><div><dt>Chain</dt><dd>{site.chain || 'Not announced'}</dd></div><div><dt>Total supply</dt><dd>{site.supply || 'Not announced'}</dd></div><div><dt>Liquidity</dt><dd data-metric="liquidity">Not published</dd></div><div><dt>Market cap</dt><dd data-metric="marketCap">Not published</dd></div><div><dt>Buy / sell tax</dt><dd>{site.tax || 'Not announced'}</dd></div><div><dt>Ownership</dt><dd>{site.ownership || 'Not verified'}</dd></div>
        </dl><p className="token-disclosure">No contract, liquidity lock, ownership renunciation, or audit is claimed without a published source.</p></div>
      </div>
      <div className="contract-strip" data-reveal><div className="contract-label"><span className="status-dot" /><span className="mono">THE OFFICIAL CONTRACT</span></div><code data-contract-text>{site.contract || 'No contract announced. Stay sharp, bird.'}</code><button className="copy-button" type="button" data-copy-contract aria-disabled={!site.contract}><Copy className="copy-default" size={18} /><Check className="copy-success" size={18} /><span data-copy-label>{site.contract ? 'Copy address' : 'Awaiting launch'}</span></button></div>
      <div className="contract-footer"><span>Always verify the chain and the full contract address.</span><button className="text-link" type="button" data-chart>View chart <ArrowUpRight size={16} /></button></div>
    </div>
  </section>;
}
