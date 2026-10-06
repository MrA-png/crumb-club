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
const chain = text(process.env.NEXT_PUBLIC_CHAIN_NAME);
const address = text(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
export const site = {
  name: 'CRUMB', ticker: '$CRUMB',
  description: 'Small bird. Big crumb energy. A meme-native corner of the internet for birds of a feather.',
  siteUrl: https(process.env.NEXT_PUBLIC_SITE_URL),
  chain,
  // Publishing requires the operator to verify address format and chain independently.
  contract: chain && address && !/\s/.test(address) ? address : null,
  buyUrl: https(process.env.NEXT_PUBLIC_BUY_URL),
  chartUrl: https(process.env.NEXT_PUBLIC_CHART_URL),
  explorerUrl: https(process.env.NEXT_PUBLIC_EXPLORER_URL),
  supply: text(process.env.NEXT_PUBLIC_TOKEN_SUPPLY),
  tax: text(process.env.NEXT_PUBLIC_TOKEN_TAX),
  ownership: text(process.env.NEXT_PUBLIC_TOKEN_OWNERSHIP),
  metricsUrl: https(process.env.NEXT_PUBLIC_METRICS_URL),
  socials: {
    x: https(process.env.NEXT_PUBLIC_X_URL),
    telegram: https(process.env.NEXT_PUBLIC_TELEGRAM_URL),
    discord: https(process.env.NEXT_PUBLIC_DISCORD_URL),
  },
} as const;
export type SiteConfig = typeof site;
