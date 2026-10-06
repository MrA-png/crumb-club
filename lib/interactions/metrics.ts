import type { SiteConfig } from '../config';
import { scope, setText, motionAllowed } from './shared';
const keys = ['holders', 'marketCap', 'liquidity', 'members', 'transactions'] as const;
type MetricKey = typeof keys[number];
type Snapshot = { asOf: string; source: string; chain: string; contract: string; metrics: Record<MetricKey, number | null> };
const MAX_AGE_MS = 5 * 60 * 1000;
function isObject(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null; }
export function validateSnapshot(value: unknown, config: SiteConfig): Snapshot | null {
  if (!isObject(value) || typeof value.asOf !== 'string' || typeof value.source !== 'string' || !isObject(value.metrics)) return null;
  const date = Date.parse(value.asOf);
  if (!Number.isFinite(date) || Date.now() - date > MAX_AGE_MS || date - Date.now() > 30_000) return null;
  try { if (new URL(value.source).protocol !== 'https:') return null; } catch { return null; }
  if (value.chain !== config.chain || value.contract !== config.contract) return null;
  for (const key of keys) {
    const n = value.metrics[key];
    if (n !== null && (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > Number.MAX_SAFE_INTEGER)) return null;
    if (n !== null && ['holders', 'members', 'transactions'].includes(key) && !Number.isInteger(n)) return null;
  }
  return value as Snapshot;
}
export function mountMetrics(config: SiteConfig) {
  const s = scope();
  if (!config.metricsUrl || !config.contract || !config.chain) return s.stop;
  let flight: AbortController | null = null;
  let expiry: ReturnType<typeof setTimeout> | undefined;
  const frames = new Map<Element, number>();
  const format = (key: MetricKey, n: number) => new Intl.NumberFormat('en-US', {
    notation: 'compact', maximumFractionDigits: 1,
    ...(key === 'marketCap' || key === 'liquidity' ? { style: 'currency', currency: 'USD' } : {}),
  }).format(n);
  function unavailable(message: string) {
    setText('[data-metrics-status]', 'SOURCE DATA UNAVAILABLE');
    setText('[data-metrics-note]', message);
    keys.forEach(key => document.querySelectorAll<HTMLElement>(`[data-metric="${key}"]`).forEach(el => {
      el.textContent = 'Unavailable'; el.classList.remove('has-data');
      const frame = frames.get(el); if (frame) cancelAnimationFrame(frame);
    }));
  }
  async function load() {
    if (document.hidden || s.signal.aborted) return;
    flight?.abort(); flight = new AbortController();
    const request = flight;
    const timeout = setTimeout(() => request.abort(), 8000);
    try {
      const response = await fetch(config.metricsUrl!, { signal: request.signal, cache: 'no-store', credentials: 'omit', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Metrics returned HTTP ${response.status}`);
      const data = validateSnapshot(await response.json(), config);
      if (!data) throw new Error('Metrics response failed provenance, freshness or schema checks');
      if (s.signal.aborted || flight !== request) return;
      keys.forEach(key => document.querySelectorAll<HTMLElement>(`[data-metric="${key}"]`).forEach(el => {
        const n = data.metrics[key];
        const frame = frames.get(el); if (frame) cancelAnimationFrame(frame);
        el.classList.toggle('has-data', n !== null);
        if (n === null) { el.textContent = 'Not published'; return; }
        const bounds = el.getBoundingClientRect();
        if (!motionAllowed() || bounds.top > innerHeight || bounds.bottom < 0) { el.textContent = format(key, n); return; }
        const start = performance.now();
        const step = (time: number) => {
          const p = Math.min((time - start) / 550, 1);
          el.textContent = format(key, Math.round(n * (1 - (1 - p) ** 3)));
          if (p < 1) frames.set(el, requestAnimationFrame(step));
        };
        frames.set(el, requestAnimationFrame(step));
      }));
      setText('[data-metrics-status]', `UPDATED ${new Date(data.asOf).toLocaleTimeString()}`);
      const note = document.querySelector<HTMLElement>('[data-metrics-note]');
      if (note) {
        const source = document.createElement('a'); source.href = data.source; source.target = '_blank'; source.rel = 'noopener noreferrer'; source.textContent = 'View source'; source.style.textDecoration = 'underline';
        note.replaceChildren(document.createTextNode(`Source-reported snapshot: ${new Date(data.asOf).toISOString()}. `), source);
      }
      if (expiry) clearTimeout(expiry);
      expiry = s.later(() => unavailable('The last snapshot has expired. No stale financial data is shown.'), Math.max(0, Date.parse(data.asOf) + MAX_AGE_MS - Date.now()));
    } catch {
      if (!s.signal.aborted && flight === request) unavailable('The data source is unavailable or invalid. No replacement figures are being shown.');
    } finally { clearTimeout(timeout); }
  }
  void load();
  const interval = setInterval(() => void load(), 60_000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void load(); else flight?.abort(); }, { signal: s.signal });
  s.add(() => { clearInterval(interval); flight?.abort(); frames.forEach(cancelAnimationFrame); if (expiry) clearTimeout(expiry); });
  return s.stop;
}
