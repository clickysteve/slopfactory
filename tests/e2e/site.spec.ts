import { expect, test, type Page } from '@playwright/test';
import { categories } from '../../src/data/categories.ts';
import { projects } from '../../src/data/projects.ts';

const featured = projects.filter((p) => p.featured);

async function loadAllImages(page: Page) {
  // Lazy images below the fold (and in closed windows) would otherwise never load.
  await page.evaluate(async () => {
    const imgs = [...document.images];
    for (const img of imgs) img.loading = 'eager';
    await Promise.all(
      imgs.map(async (img) => {
        if (!img.complete) await new Promise((r) => (img.addEventListener('load', r), img.addEventListener('error', r)));
        await img.decode().catch(() => {});
      }),
    );
  });
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  (page as Page & { errors: string[] }).errors = errors;
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  expect((page as Page & { errors: string[] }).errors).toEqual([]);
});

test('shows the masthead, every department and other places', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Slop Factory/i);
  for (const c of categories) await expect(page.getByRole('heading', { level: 2, name: c.name })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Other Places' })).toBeVisible();
  await expect(page.locator('article.card[id^="tool-"]')).toHaveCount(projects.length);
});

test('shows the featured tools first', async ({ page }) => {
  const strip = page.locator('section.featured');
  await expect(strip.locator('article.card')).toHaveCount(featured.length);
  for (const p of featured) await expect(strip.getByRole('heading', { name: p.name, exact: true })).toBeVisible();
});

test('has no horizontal overflow', async ({ page }) => {
  await loadAllImages(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('loads every image', async ({ page }) => {
  await loadAllImages(page);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
  expect(broken).toEqual([]);
});

test('navigation jumps to each department', async ({ page }) => {
  // Instant scrolling: with smooth scrolling, clicking two departments that share a row in
  // quick succession can cancel the first scroll part-way on slow machines.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const c of categories) {
    await page.locator('.menubar-nav').getByRole('link', { name: c.navLabel, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${c.id}$`));
    await expect(page.locator(`#${c.id}-title`)).toBeInViewport();
  }
});

test('the menu highlights the department you picked, including ones that share a row', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const nav = page.locator('.menubar-nav');
  for (const c of categories) {
    await nav.getByRole('link', { name: c.navLabel, exact: true }).click();
    await expect(nav.locator('a[aria-current="true"]')).toHaveText([c.navLabel]);
  }
  await nav.getByRole('link', { name: 'Elsewhere', exact: true }).click();
  await expect(nav.locator('a[aria-current="true"]')).toHaveText(['Elsewhere']);
});

test('the menu follows scrolling, and highlights Elsewhere at the bottom of the page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const nav = page.locator('.menubar-nav');
  await expect(nav.locator('a[aria-current="true"]')).toHaveCount(0);
  await page.locator('#reimagined .grid').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await expect(nav.locator('a[aria-current="true"]')).toHaveText(['Reimagined']);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(nav.locator('a[aria-current="true"]')).toHaveText(['Elsewhere']);
});

test('launch buttons go straight to the live apps in a new tab', async ({ page }) => {
  for (const p of projects.filter((x) => x.links.launch)) {
    const link = page.locator(`#tool-${p.id} a[data-action="launch"]`);
    await expect(link).toHaveAttribute('href', p.links.launch!);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAccessibleName(new RegExp(`Launch ${p.name}`));
  }
});

test('screenshots link to the live app, or the source when there is none', async ({ page }) => {
  for (const p of projects) {
    const target = p.links.launch ?? p.links.source;
    const link = page.locator(`#tool-${p.id} .card-shot a`);
    if (!target) {
      await expect(link).toHaveCount(0);
      continue;
    }
    await expect(link).toHaveAttribute('href', target);
    await expect(link).toHaveAttribute('target', '_blank');
  }
});

test('an information window opens, traps focus, closes on Escape and returns focus', async ({ page }) => {
  const p = projects.find((x) => x.id === 'anvil')!;
  const button = page.locator(`#tool-${p.id} .btn--info`);
  await button.scrollIntoViewIfNeeded();
  await button.click();
  const dialog = page.getByRole('dialog', { name: p.name });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/#info\/anvil$/);
  await expect(dialog.getByText(p.description[0]!.slice(0, 40))).toBeVisible();
  // Focus stays inside the modal window.
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((d) => d.contains(document.activeElement) || document.activeElement === document.body)).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(button).toBeFocused();
  await expect(page).not.toHaveURL(/#info/);
});

test('an information window closes from its close box', async ({ page }) => {
  await page.locator('#tool-bendr .btn--info').click();
  const dialog = page.getByRole('dialog', { name: 'BENDR' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('a link to #info/<id> opens that window', async ({ page }) => {
  await page.goto('/#info/dmg-darkroom');
  await expect(page.getByRole('dialog', { name: 'DMG Darkroom' })).toBeVisible();
});

test('keyboard users can skip to the catalogue', async ({ page, isMobile }) => {
  test.skip(isMobile, 'no keyboard on the phone profile');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to the catalogue' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});

test('buttons are large enough to tap on touch screens', async ({ page }, info) => {
  test.skip(!info.project.use.hasTouch, 'touch only');
  const sizes = await page.locator('main .btn').evaluateAll((els) =>
    els.filter((e) => (e as HTMLElement).offsetParent).map((e) => e.getBoundingClientRect().height),
  );
  expect(sizes.length).toBeGreaterThan(0);
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(44);
});

test('captures the page for visual review', async ({ page }, info) => {
  await loadAllImages(page);
  await page.screenshot({ path: `test-results/screenshots/${info.project.name}.png`, fullPage: true });
  await page.locator('#tool-emmm .btn--info').click();
  await loadAllImages(page);
  await page.screenshot({ path: `test-results/screenshots/${info.project.name}-info.png` });
});

test('old section links still reach the renamed departments', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [old, current] of [
    ['generative', 'reimagined'],
    ['other', 'misc'],
  ] as const) {
    await page.goto(`/#${old}`);
    await expect(page.locator(`#${current}`)).toBeInViewport();
  }
});
