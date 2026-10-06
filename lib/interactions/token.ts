import type { SiteConfig } from '../config';
import { closest, copyText, scope, type Toast } from './shared';
export function mountToken(config: SiteConfig, toast: Toast) {
  const s = scope();
  const dialog = document.querySelector<HTMLDialogElement>('#token-dialog');
  let opener: HTMLElement | null = null;
  const risk = document.querySelector<HTMLInputElement>('[data-risk-ack]');
  const continueButton = document.querySelector<HTMLButtonElement>('[data-external-buy]');
  const openDialog = (button: HTMLElement) => {
    if (!dialog) return;
    opener = button;
    if (risk) risk.checked = false;
    if (continueButton) continueButton.disabled = true;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-close-dialog]')?.focus();
  };
  document.addEventListener('click', async event => {
    const buy = closest(event, '[data-buy]');
    if (buy) { openDialog(buy); return; }
    const close = closest(event, '[data-close-dialog]');
    if (close) {
      dialog?.close();
      const target = close.hasAttribute('data-go-gallery') ? '#gallery' : close.hasAttribute('data-go-token') ? '#token' : null;
      if (target) {
        const section = document.querySelector<HTMLElement>(target);
        section?.scrollIntoView({ behavior: 'smooth' });
        // Give the new navigation destination a meaningful keyboard target.
        s.later(() => { const heading = section?.querySelector<HTMLElement>('h2'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }, 80);
      }
      return;
    }
    if (closest(event, '[data-chart]')) {
      if (config.chartUrl) window.open(config.chartUrl, '_blank', 'noopener,noreferrer');
      else toast.show('No verified chart is published. We won’t send you to a lookalike token.');
      return;
    }
    const social = closest(event, '[data-unannounced]');
    if (social) {
      const name = social.dataset.unannounced === 'x' ? 'X' : social.dataset.unannounced === 'telegram' ? 'Telegram' : 'Discord';
      toast.show(`The official ${name} channel is not announced. Watch out for impersonators.`); return;
    }
    const copy = closest<HTMLButtonElement>(event, '[data-copy-contract]');
    if (copy) {
      if (!config.contract) { toast.show('No contract address has been announced. There is nothing verified to copy yet.'); return; }
      const ok = await copyText(config.contract);
      if (s.signal.aborted) return;
      if (ok) {
        copy.classList.add('is-copied');
        const label = copy.querySelector('[data-copy-label]');
        if (label) label.textContent = 'Copied!';
        toast.show('Contract address copied. Always verify the chain and full address.');
        s.later(() => { copy.classList.remove('is-copied'); if (label) label.textContent = 'Copy address'; }, 2200);
      } else {
        toast.show('Clipboard permission is unavailable. Select and copy the full address manually.');
        const address = document.querySelector('[data-contract-text]');
        if (address) { const range = document.createRange(); range.selectNodeContents(address); const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range); }
      }
    }
  }, { signal: s.signal });
  dialog?.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }, { signal: s.signal });
  dialog?.addEventListener('close', () => { if (opener?.isConnected) opener.focus({ preventScroll: true }); }, { signal: s.signal });
  risk?.addEventListener('change', () => { if (continueButton) continueButton.disabled = !risk.checked; }, { signal: s.signal });
  continueButton?.addEventListener('click', () => {
    if (!risk?.checked || !config.buyUrl || !config.contract || !config.chain) return;
    window.open(config.buyUrl, '_blank', 'noopener,noreferrer'); dialog?.close();
  }, { signal: s.signal });
  s.add(() => { if (dialog?.open) dialog.close(); });
  return s.stop;
}
