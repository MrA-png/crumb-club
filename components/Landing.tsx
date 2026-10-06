import { Navbar } from './navbar/Navbar';
import { Hero } from './hero/Hero';
import { CommunityStrip } from './community/CommunityStrip';
import { About } from './lore/About';
import { Token } from './token/Token';
import { Tokenomics } from './tokenomics/Tokenomics';
import { Roadmap } from './roadmap/Roadmap';
import { Lore } from './lore/Lore';
import { Gallery } from './gallery/Gallery';
import { Community } from './community/Community';
import { BuySection } from './token/BuySection';
import { Footer } from './footer/Footer';
import { Overlays } from './ui/Overlays';
/** Static React Server Components. Interactive islands are progressively enhanced. */
export function Landing() {
  return <><Navbar /><main id="main"><Hero /><CommunityStrip /><About /><Token /><Tokenomics /><Roadmap /><Lore /><Gallery /><Community /><BuySection /></main><Footer /><Overlays /></>;
}
