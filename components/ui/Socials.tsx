import { site } from '@/lib/config';
export function SocialIcon({ name }: { name: 'x' | 'telegram' | 'discord' }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
    {name === 'x' ? <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.5L.8 2h6.5l5.9 7.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" /> : name === 'telegram' ? <path d="M21.6 3.2 18 21.1c-.3 1.2-1 1.5-2 .9l-5.5-4.1-2.7 2.6c-.3.3-.6.6-1.2.6l.4-5.6L17.2 6c.5-.4-.1-.6-.7-.2L4 13.7.6 12.6c-1.1-.3-1.1-1.1.2-1.6L20.1 2c.9-.4 1.8.2 1.5 1.2Z" /> : <path d="M20.3 4.4a19 19 0 0 0-4.6-1.4l-.6 1.2a17 17 0 0 0-6.2 0L8.3 3a19 19 0 0 0-4.6 1.4C.8 8.7 0 12.8.4 16.8a19 19 0 0 0 5.7 2.9l1.2-2a12 12 0 0 1-1.8-.9l.4-.3a14 14 0 0 0 12.2 0l.4.3-1.8.9 1.2 2a19 19 0 0 0 5.7-2.9c.5-4.6-.8-8.7-3.3-12.4ZM8.1 14.5c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm7.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z" />}
  </svg>;
}
export function Socials({ extended = false, className = '' }: { extended?: boolean; className?: string }) {
  const names: ('x' | 'telegram' | 'discord')[] = extended ? ['x', 'telegram', 'discord'] : ['x', 'telegram'];
  return <div className={`social-links ${className}`}>
    {names.map(name => site.socials[name] ?
      <a key={name} href={site.socials[name]!} target="_blank" rel="noopener noreferrer" className="social-button" aria-label={`Visit CRUMB on ${name === 'x' ? 'X' : name}`}><SocialIcon name={name} /></a> :
      <button key={name} type="button" className="social-button" data-unannounced={name} aria-label={`${name === 'x' ? 'X' : name} channel not announced`} title="Official channel not announced"><SocialIcon name={name} /></button>
    )}
  </div>;
}
