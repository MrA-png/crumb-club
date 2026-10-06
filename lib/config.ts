/** Public, operator-verified deployment configuration. Unknown is not zero. */
function text(value: string | undefined): string | null {
  return value?.trim() || null;
}
function https(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
const DEFAULT_CONTRACT = '0x14D89857b298Dc3350a0D17Ee1569a1f4463E93B';
const chain = text(process.env.NEXT_PUBLIC_CHAIN_NAME) || 'Robinhood Chain';
const address = text(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) || DEFAULT_CONTRACT;
const ponsLaunchpadUrl = address ? `https://www.ponsfamily.com/launchpad/${address}` : 'https://www.ponsfamily.com';
const ponsUrl = https(process.env.NEXT_PUBLIC_PONS_URL) || ponsLaunchpadUrl;

export const site = {
  name: 'CRUMB', ticker: '$CRUMB',
  description: 'Small bird. Big crumb energy. A meme-native corner of the internet for birds of a feather.',
  siteUrl: https(process.env.NEXT_PUBLIC_SITE_URL),
  chain,
  // Publishing requires the operator to verify address format and chain independently.
  contract: address && !/\s/.test(address) ? address : null,
  ponsUrl,
  buyUrl: https(process.env.NEXT_PUBLIC_BUY_URL) || ponsUrl,
  chartUrl: https(process.env.NEXT_PUBLIC_CHART_URL),
  explorerUrl: https(process.env.NEXT_PUBLIC_EXPLORER_URL) || (address ? `https://robinhoodchain.blockscout.com/address/${address}` : null),
  supply: text(process.env.NEXT_PUBLIC_TOKEN_SUPPLY) || '1,000,000,000',
  tax: text(process.env.NEXT_PUBLIC_TOKEN_TAX) || '0 / 0',
  ownership: text(process.env.NEXT_PUBLIC_TOKEN_OWNERSHIP) || 'Renounced',
  metricsUrl: https(process.env.NEXT_PUBLIC_METRICS_URL),
  socials: {
    x: https(process.env.NEXT_PUBLIC_X_URL),
    telegram: https(process.env.NEXT_PUBLIC_TELEGRAM_URL),
    discord: https(process.env.NEXT_PUBLIC_DISCORD_URL),
  },
} as const;
export type SiteConfig = typeof site;
