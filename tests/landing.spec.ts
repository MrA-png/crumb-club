import { test, expect } from '@playwright/test';

// Run against the default unannounced concept: leave deployment env variables empty.
test.beforeEach(async ({ page }) => { await page.goto('/'); });

test('the complete landing renders without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await expect(page.locator('main > section')).toHaveCount(10);
  await expect(page.locator('h1')).toContainText('SMALL BIRD.');
  await expect(page.locator('[data-metric="holders"]')).toHaveText('Not published');
  expect(errors).toEqual([]);
});

test('prelaunch dialog is honest and returns keyboard focus', async ({ page }) => {
  const button = page.locator('[data-buy]').first();
  await button.click();
  await expect(page.locator('#token-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('Not quite hatched.');
  await expect(page.locator('[data-external-buy]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('#token-dialog')).not.toBeVisible();
  await expect(button).toBeFocused();
});

test('unannounced destinations show feedback rather than invented links', async ({ page }) => {
  await page.locator('[data-chart]').first().click();
  await expect(page.locator('[data-toast-message]')).toContainText('No verified chart');
  await page.locator('[data-unannounced="x"]').first().click();
  await expect(page.locator('[data-toast-message]')).toContainText('not announced');
});

test('allocation has 100 real tiles and keyboard-selectable groups', async ({ page }) => {
  await page.locator('[data-allocation="liquidity"]').click();
  await expect(page.locator('[data-crumb-group]')).toHaveCount(100);
  await expect(page.locator('.allocation-crumb.is-highlighted')).toHaveCount(20);
  await expect(page.locator('[data-allocation-figure]')).toContainText('20');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('[data-allocation="marketing"]')).toHaveAttribute('aria-pressed', 'true');
});

test('roadmap progresses and avatar selection exports a file', async ({ page }) => {
  await page.locator('[data-roadmap-next]').click();
  await expect(page.locator('[data-roadmap-card]').nth(1).locator('details')).toHaveAttribute('open', '');
  await page.locator('[data-mood="rich"]').click();
  await expect(page.locator('[data-featured-name]')).toHaveText('Fancy bird');
  const downloadEvent = page.waitForEvent('download');
  await page.locator('[data-download-avatar]').click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('crumb-rich-avatar.svg');
  expect(await download.failure()).toBeNull();
});

test('bird reacts and motion respects the system preference', async ({ page }) => {
  await page.locator('[data-hero-mascot]').click();
  await expect(page.locator('[data-bird-speech]')).toHaveText('a crumb? for me?');
  await expect(page.locator('html')).toHaveClass(/motion-paused/);
});

for (const width of [320, 360, 375, 390, 430, 700, 768, 1024, 1440, 1920]) {
  test(`no page-level horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(width);
  });
}

test('mobile menu opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator('[data-menu-toggle]');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
