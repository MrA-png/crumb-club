import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Mascot } from '@/components/brand/Mascot';
import { roadmap } from '@/lib/content';
export function Roadmap() {
  return <section id="roadmap" className="roadmap section-space" aria-labelledby="roadmap-title" data-section>
    <div className="wrap"><SectionLabel number="04">A HIGHLY UNOFFICIAL FLIGHT PLAN</SectionLabel><div className="section-heading-row" data-reveal><h2 className="section-title" id="roadmap-title">WINGING IT.<br /><span className="outline-text">WITH INTENTION.</span></h2><div className="roadmap-aside"><p>No quarterly buzzwords.<br />Just one bird, figuring it out.</p><div className="roadmap-controls"><button className="icon-button" type="button" data-roadmap-prev aria-label="Previous flight-plan stage"><ArrowLeft size={21} /></button><button className="icon-button" type="button" data-roadmap-next aria-label="Next flight-plan stage"><ArrowRight size={21} /></button></div></div></div>
      <div className="roadmap-track" data-roadmap-track tabIndex={0} aria-label="Flight plan. Scroll horizontally to explore.">{roadmap.map((stage, i) => <article className={`roadmap-card ${i === 0 ? 'is-active' : ''}`} data-roadmap-card key={stage.n}>
        <div className="roadmap-card-top"><span className="roadmap-number">{stage.n}</span><span className="mono roadmap-status">{stage.status}</span></div><div className="roadmap-illustration"><Mascot mood={stage.mood} compact /><svg className="flight-trail" viewBox="0 0 220 100" fill="none" aria-hidden="true"><path d="M0 83c29-45 66-29 83-1s62 11 59-20-43-36-46-12 54 24 106-42m-15 2 17-6-2 19" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" /></svg></div><h3>{stage.title}</h3><p>{stage.subtitle}</p><details className="roadmap-details" open={i === 0}><summary>Peek at the plan <ArrowUpRight size={17} /></summary><ul>{stage.tasks.map(task => <li key={task}><span className="milestone-dot" />{task}</li>)}</ul></details><div className="stage-progress" aria-hidden="true"><span style={{ width: `${(i + 1) * 25}%` }} /></div>
      </article>)}</div><p className="roadmap-disclaimer mono">A CREATIVE DIRECTION, NOT A GUARANTEE OF DELIVERY OR TOKEN PERFORMANCE.</p>
    </div>
  </section>;
}
