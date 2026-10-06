import { BirdIcon } from '@/components/brand/Mascot';
const stats = [{ key: 'holders', label: 'FLOCK HOLDERS' }, { key: 'marketCap', label: 'MARKET CAP' }, { key: 'liquidity', label: 'LIQUIDITY' }, { key: 'members', label: 'COMMUNITY MEMBERS' }, { key: 'transactions', label: 'TOTAL TRANSACTIONS' }];
export function CommunityStrip() {
  return <>
    <div className="ticker-shell" aria-label="Low flight. High vibes. Born online. Raised on crumbs."><div className="ticker-track" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span className="ticker-set" key={i}><span>LOW FLIGHT. HIGH VIBES.</span><BirdIcon /><span>FOR THE FLOCK.</span><BirdIcon /><span>RAISED ON CRUMBS.</span><BirdIcon /></span>)}</div></div>
    <section className="stats-section" aria-labelledby="flock-roll-call"><div className="wrap stats-top"><h2 id="flock-roll-call" className="mono">THE FLOCK, BY THE NUMBERS.</h2><span className="data-status mono" data-metrics-status>ON-CHAIN DATA NOT PUBLISHED</span></div><dl className="wrap stats-grid">{stats.map(stat => <div key={stat.key} className="stat"><dt>{stat.label}</dt><dd data-metric={stat.key} data-animate-number>Not published</dd></div>)}</dl><div className="wrap metrics-note" data-metrics-note>No invented holders. No imaginary market cap. Verified figures will appear here when available.</div></section>
  </>;
}
