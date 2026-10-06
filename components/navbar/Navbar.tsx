import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Socials } from '@/components/ui/Socials';
const links = [['home', 'Home'], ['about', 'The bird'], ['token', 'The token'], ['roadmap', 'Flight plan'], ['community', 'The flock']];
export function Navbar() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" data-header>
      <div className="nav-inner wrap">
        <a href="#home" className="nav-brand" aria-label="CRUMB home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([id, title]) => <a key={id} href={`#${id}`} data-nav={id} aria-current={id === 'home' ? 'page' : undefined}>{title}</a>)}</nav>
        <div className="nav-actions"><Socials /><button className="button button-dark nav-buy" type="button" data-buy>Get $CRUMB <ArrowUpRight size={17} /></button><button className="mobile-toggle icon-button" type="button" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="Open navigation"><Menu className="menu-open-icon" /><X className="menu-close-icon" /></button></div>
      </div>
      <nav className="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden>{links.map(([id, title], i) => <a key={id} href={`#${id}`}><span className="mono">0{i + 1}</span>{title}<ArrowUpRight size={21} /></a>)}<button className="button button-dark" type="button" data-buy>Get $CRUMB <ArrowUpRight size={20} /></button></nav>
    </header>
  </>;
}
