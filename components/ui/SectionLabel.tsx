export function SectionLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? 'on-dark' : ''}`}><span className="label-tick" /><span>{number} / {children}</span></div>;
}
