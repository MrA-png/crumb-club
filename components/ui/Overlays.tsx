import { X, Check, ArrowUpRight, Info } from 'lucide-react';
import { Mascot } from '@/components/brand/Mascot';
import { site } from '@/lib/config';
export function Overlays() {
  const ready = Boolean(site.contract && site.chain && site.buyUrl);
  return <>
    <dialog className="token-dialog" id="token-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description"><div className="dialog-content"><button type="button" className="dialog-close icon-button" data-close-dialog aria-label="Close token details"><X size={23} /></button><div className="dialog-bird"><Mascot compact mood={ready ? 'happy' : 'normal'} /></div><span className="mono dialog-kicker">{ready ? 'CHECK THE DETAILS BEFORE YOU PECK' : 'GOOD BIRDS DON’T RUSH'}</span><h2 id="dialog-title">{ready ? 'A crumb of caution.' : 'Not quite hatched.'}</h2><p id="dialog-description">{ready ? 'You are leaving CRUMB for an external exchange. Verify the full address, chain, slippage and transaction details yourself.' : 'CRUMB is a brand concept. A verified token launch, contract address, and trading venue have not been announced.'}</p>
      <dl className="dialog-details"><div><dt>Chain</dt><dd>{site.chain || 'Not announced'}</dd></div><div><dt>Contract</dt><dd><code>{site.contract || 'Not announced'}</code></dd></div><div><dt>Trading</dt><dd>{ready ? 'External venue configured' : 'Unavailable'}</dd></div></dl>
      {ready ? <><label className="risk-checkbox"><input type="checkbox" data-risk-ack /><span>I understand that meme tokens can lose all value and will verify the destination independently.</span></label><button type="button" className="button button-dark dialog-action" data-external-buy disabled>Continue to trading venue <ArrowUpRight size={19} /></button></> : <><button className="button button-dark dialog-action" type="button" data-close-dialog data-go-token>Explore the token details <ArrowUpRight size={19} /></button><button className="text-link dialog-secondary" type="button" data-close-dialog data-go-gallery>In the meantime, grab a free bird <ArrowUpRight size={16} /></button></>}
      <p className="dialog-fineprint"><Info size={15} />Never share your seed phrase. This site never asks for it.</p>
    </div></dialog>
    <div className="toast" role="status" aria-live="polite" aria-atomic="true" data-toast><span className="toast-icon"><Check size={19} /></span><span data-toast-message /><button type="button" aria-label="Dismiss notification" data-dismiss-toast><X size={16} /></button></div>
    <button type="button" className="motion-toggle" data-motion-toggle aria-pressed="false" title="Pause decorative motion"><span className="motion-indicator" aria-hidden="true"><i /><i /><i /></span><span data-motion-label>Motion on</span></button>
  </>;
}
