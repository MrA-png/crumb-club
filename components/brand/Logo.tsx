import { BirdIcon } from './Mascot';
export function Logo({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return <span className={`brand-logo ${className}`} aria-label="CRUMB home"><BirdIcon />{!compact && <span className="wordmark">crumb<span className="wordmark-dot">.</span></span>}</span>;
}
