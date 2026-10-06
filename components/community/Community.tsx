import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Mascot, BirdIcon } from '@/components/brand/Mascot';
import { SocialIcon } from '@/components/ui/Socials';
import { site } from '@/lib/config';
import { moods } from '@/lib/content';
export function Community() {
  return <section id="community" className="community section-space" aria-labelledby="community-title" data-section>
    <div className="community-avatar-row" aria-hidden="true"><div className="avatar-track">{Array.from({ length: 3 }, (_, k) => moods.map((m, i) => <span key={`${k}-${m.id}`} className="community-avatar" style={{ background: m.color, rotate: `${i % 2 ? 7 : -5}deg` }}><Mascot compact mood={m.id} /></span>))}</div></div>
    <div className="wrap community-inner"><SectionLabel number="07">YOUR KIND OF WEIRD</SectionLabel><div className="community-content" data-reveal><span className="community-coo" aria-hidden="true"><BirdIcon /></span><h2 id="community-title">YOU FOUND<br /><span>YOUR FLOCK.</span></h2><p>No secret handshake. No minimum crumb count.<br />Just good birds, questionable memes, and a place to land.</p><div className="community-ctas">{(['x', 'telegram', 'discord'] as const).map(name => { const label = name === 'x' ? 'Follow on X' : name === 'telegram' ? 'Join Telegram' : 'Find us on Discord'; const cls = `button ${name === 'x' ? 'button-dark' : 'button-outline'}`; return site.socials[name] ? <a key={name} className={cls} href={site.socials[name]!} target="_blank" rel="noopener noreferrer"><SocialIcon name={name} />{label}<ArrowUpRight size={18} /></a> : <button key={name} type="button" className={cls} data-unannounced={name}><SocialIcon name={name} />{label}<ArrowUpRight size={18} /></button>; })}</div><span className="community-channel-note">Official community channels have not been announced.</span></div>
      <div className="community-notice"><div><span className="status-dot" /><strong>A GOOD FLOCK CHECKS THE RECEIPTS.</strong></div><p>No live feed or member count is being simulated. Current status: awaiting verified community sources.</p><a href="#gallery">Grab a bird in the meantime <ArrowUpRight size={17} /></a></div>
    </div>
  </section>;
}
