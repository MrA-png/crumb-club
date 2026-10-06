/** Creative brand content, not financial facts or a deployed allocation. */
export const allocations = [
  { id: 'community', name: 'The flock', role: 'Community', percent: 70, color: '#d6f56a', note: 'The biggest piece belongs to the birds. A proposed community allocation, not an airdrop promise.', mood: 'happy' },
  { id: 'liquidity', name: 'Room to land', role: 'Liquidity', percent: 20, color: '#f4efe4', note: 'Proposed provision for liquidity. Venue, lock terms and deployment have not been announced.', mood: 'normal' },
  { id: 'marketing', name: 'Make some noise', role: 'Marketing', percent: 5, color: '#f19b72', note: 'A proposed budget for creative work and spreading the bird. No paid partnerships are implied.', mood: 'degen' },
  { id: 'treasury', name: 'Rainy-day crumbs', role: 'Treasury', percent: 3, color: '#a6b394', note: 'A proposed reserve for future community needs. Custody and permissions remain unannounced.', mood: 'sleepy' },
  { id: 'team', name: 'Bird keepers', role: 'Team', percent: 2, color: '#8f9490', note: 'A proposed contributor allocation. Vesting and wallet disclosures must be published before launch.', mood: 'rich' },
] as const;
export const roadmap = [
  { n: '01', title: 'Out of the egg.', status: 'The origin story', subtitle: 'Every bad idea starts somewhere.', mood: 'normal', tasks: ['Give the bird a name', 'Find a corner of the internet', 'Make the first questionable meme'] },
  { n: '02', title: 'Find the flock.', status: 'On the flight plan', subtitle: 'One bird is weird. A flock is a movement.', mood: 'happy', tasks: ['Open verified community channels', 'Release the sticker collection', 'Publish launch details and disclosures'] },
  { n: '03', title: 'Crumb together.', status: 'On the flight plan', subtitle: 'Less lurking. More making.', mood: 'degen', tasks: ['Community-made meme drops', 'Open creative collaborations', 'Publish transparent token information'] },
  { n: '04', title: 'Bird everywhere.', status: 'The big bird idea', subtitle: 'Not a destination. A state of bird.', mood: 'rich', tasks: ['Let the community shape the next chapter', 'Take the character beyond the timeline', 'Keep the whole thing delightfully weird'] },
] as const;
export const moods = [
  { id: 'normal', name: 'The original', caption: 'One crumb. Zero context.', tag: 'DEFAULT SETTINGS', color: '#d6f56a' },
  { id: 'rich', name: 'Fancy bird', caption: 'Same bird. New sunglasses.', tag: 'FEELING EXPENSIVE', color: '#e5c790' },
  { id: 'broke', name: 'Last crumb', caption: 'Emotionally diversified.', tag: 'IT BUILDS CHARACTER', color: '#c0c9bc' },
  { id: 'angry', name: 'Do not disturb', caption: 'Someone touched the crumbs.', tag: 'ABSOLUTELY NOT', color: '#f1a181' },
  { id: 'sleepy', name: 'Offline bird', caption: 'Touching grass. Horizontally.', tag: 'DO NOT PING', color: '#d2d3c3' },
  { id: 'degen', name: 'Terminally online', caption: 'Just one more refresh.', tag: 'SCREEN TIME: YES', color: '#f6dc83' },
  { id: 'diamond', name: 'Unbothered', caption: 'The crumb stays with me.', tag: 'PERSONALITY TRAIT', color: '#b8d8c5' },
  { id: 'panic', name: 'Mildly concerned', caption: 'Everything is probably fine.', tag: 'INTERNAL SCREAMING', color: '#efbaae' },
  { id: 'moon', name: 'Space cadet', caption: 'Forgot why I came up here.', tag: 'NO SIGNAL', color: '#c9cdba' },
] as const;
export type Mood = (typeof moods)[number]['id'] | 'happy';
