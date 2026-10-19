import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { categories } from '../../src/data/categories.ts';
import { places } from '../../src/data/places.ts';
import { projects } from '../../src/data/projects.ts';
import { site } from '../../src/data/site.ts';
import type { Project } from '../../src/data/types.ts';
import { esc } from '../../src/render/html.ts';
import { renderBody, renderCard, renderInfoWindow, type PageData } from '../../src/render/page.ts';

const data: PageData = { projects, categories, places, site };
const html = renderBody(data);

function attrs(tag: string, source = html): Array<Record<string, string>> {
  return [...source.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map((m) =>
    Object.fromEntries([...m[1]!.matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1]!, a[2]!])),
  );
}

const minimal: Project = {
  id: 'bare',
  name: 'Bare <Tool>',
  category: 'misc',
  status: 'in-development',
  platform: 'Desktop',
  summary: 'A & B',
  description: ['Only a paragraph.'],
  links: {},
  availabilityNote: 'Not yet public',
  order: 1,
};

describe('the rendered page', () => {
  it('has unique element ids', () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has exactly one h1, and a section heading per department', () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    for (const c of categories) expect(html).toContain(`id="${c.id}-title">${esc(c.name)}</h2>`);
  });

  it('links each navigation item to a section that exists', () => {
    const nav = html.slice(html.indexOf('<nav'), html.indexOf('</nav>'));
    const targets = attrs('a', nav).map((a) => a.href!.slice(1));
    expect(targets.length).toBe(categories.length + 1);
    for (const t of targets) expect(html).toContain(`id="${t}"`);
  });

  it('renders every project once in the catalogue, and featured ones again in the featured strip', () => {
    for (const p of projects) {
      expect(html).toContain(`id="tool-${p.id}"`);
      expect(html.includes(`id="feature-${p.id}"`)).toBe(Boolean(p.featured));
      expect(html).toContain(`id="info-${p.id}"`);
    }
  });

  it('opens every external link in a new tab safely and says so', () => {
    const external = attrs('a').filter((a) => /^https?:/.test(a.href ?? ''));
    expect(external.length).toBeGreaterThan(20);
    for (const a of external) {
      expect(a.target, a.href).toBe('_blank');
      expect(a.rel, a.href).toContain('noopener');
    }
    expect(html.match(/opens in a new tab/g)!.length).toBeGreaterThanOrEqual(external.length);
  });

  it('only renders links that are in the data', () => {
    const rendered = new Set(attrs('a').map((a) => a.href).filter((h) => h?.startsWith('http')));
    const known = new Set([
      ...projects.flatMap((p) => Object.values(p.links)),
      ...places.map((p) => p.url),
      site.labelUrl,
    ]);
    for (const url of rendered) expect(known.has(url!), url).toBe(true);
  });

  it('gives every image alt text and dimensions, and only references local screenshots', () => {
    for (const img of attrs('img')) {
      expect(img.alt?.trim()).toBeTruthy();
      expect(img.width).toBeTruthy();
      expect(img.height).toBeTruthy();
      expect(img.src).toMatch(/^screenshots\/[a-z0-9-]+(-thumb)?\.webp$/);
    }
  });

  it('gives every button an accessible name and an info button for every card', () => {
    for (const b of attrs('button')) expect(b.type).toBe('button');
    for (const p of projects) expect(html).toContain(`commandfor="info-${p.id}" command="show-modal"`);
    expect(html.match(/class="closebox"[^>]*aria-label="Close"/g)).toHaveLength(projects.length);
  });

  it('links each screenshot to the live app, or to the source when there is no live app', () => {
    for (const p of projects) {
      const card = renderCard(p);
      const link = attrs('a', card).find((a) => a.class === 'shot-link');
      const expected = p.links.launch ?? p.links.source;
      if (!expected) {
        expect(link, p.id).toBeUndefined();
        continue;
      }
      expect(link?.href, p.id).toBe(expected);
      expect(link?.target).toBe('_blank');
      // The button beside it goes to the same place, so the image link stays out of the tab order.
      expect(link?.tabindex).toBe('-1');
      expect(renderInfoWindow(p, categories)).toContain(`class="shot-link" href="${esc(expected)}"`);
    }
  });

  it('has no author credit in the footer', () => {
    const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
    expect(footer).not.toContain('All software by');
    expect(footer).not.toMatch(/©/);
  });

  it('escapes text from the data', () => {
    const card = renderCard(minimal);
    expect(card).toContain('Bare &lt;Tool&gt;');
    expect(card).toContain('A &amp; B');
    expect(card).not.toContain('<Tool>');
  });
});

describe('optional fields', () => {
  it('shows a typographic placeholder when there is no screenshot', () => {
    const card = renderCard(minimal);
    expect(card).toContain('class="placeholder"');
    expect(card).toContain('role="img"');
    expect(card).not.toContain('<img');
  });

  it('shows the availability note instead of links when there are none', () => {
    const card = renderCard(minimal);
    expect(card).toContain('Not yet public');
    expect(card).not.toContain('<a ');
  });

  it('leaves out features and inspiration when they are not given', () => {
    const win = renderInfoWindow(minimal, categories);
    expect(win).not.toContain('Features');
    expect(win).not.toContain('Inspired by');
  });

  it('shows a status badge only for unfinished projects', () => {
    expect(renderCard(minimal)).toContain('badge--in-development');
    expect(renderCard({ ...minimal, status: 'live' })).not.toContain('badge');
  });

  it('uses a Download button for plugins and a Launch button for web apps', () => {
    const plugin = renderCard({ ...minimal, links: { download: 'https://example.com/dl' } });
    expect(plugin).toMatch(/class="btn btn--primary"[^>]*data-action="download"/);
    const web = renderCard({ ...minimal, links: { launch: 'https://example.com/' } });
    expect(web).toMatch(/class="btn btn--primary"[^>]*data-action="launch"/);
  });
});

describe('design tokens', () => {
  const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');
  const token = (name: string) => new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i').exec(css)?.[1];

  function luminance(hex: string): number {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) =>
      c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
    );
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  }
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi! + 0.05) / (lo! + 0.05);
  };

  it('defines a colour for every department and for Other Places', () => {
    for (const id of [...categories.map((c) => c.id), 'places']) expect(token(`cat-${id}`), id).toBeTruthy();
  });

  it('keeps department colours readable against paper (WCAG AA)', () => {
    const paper = token('paper')!;
    for (const id of [...categories.map((c) => c.id), 'places']) {
      expect(contrast(token(`cat-${id}`)!, paper), id).toBeGreaterThanOrEqual(4.5);
    }
    for (const name of ['ink', 'dim', 'activity', 'beta']) expect(contrast(token(name)!, paper), name).toBeGreaterThanOrEqual(4.5);
  });
});
