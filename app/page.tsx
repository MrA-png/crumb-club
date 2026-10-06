import { Landing } from '@/components/Landing';
import { Interactions } from '@/components/Interactions';
import { site } from '@/lib/config';
export default function Home() { return <><Landing /><Interactions config={site} /></>; }
