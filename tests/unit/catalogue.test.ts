import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  STATUSES,
  catalogueStats,
  featuredProjects,
  projectActions,
  projectsInCategory,
  screenshotLink,
  screenshotPaths,
  validateCatalogue,
} from '../../src/catalogue.ts';
import { categories } from '../../src/data/categories.ts';
import { places } from '../../src/data/places.ts';
import { projects } from '../../src/data/projects.ts';
import type { Project } from '../../src/data/types.ts';

const publicFile = (path: string) => existsSync(fileURLToPath(new URL(`../../public/${path}`, import.meta.url)));
const data = { projects, categories, places };

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'test-tool',
    name: 'Test Tool',
    category: 'audio',
    status: 'live',
    platform: 'Browser',
    summary: 'Does a thing.',
    description: ['Does a thing, at length.'],
    links: { launch: 'https://example.com/' },
    order: 99,
    ...overrides,
  };
}

describe('the catalogue data', () => {
  it('passes validation, including screenshot files on disk', () => {
    expect(validateCatalogue(data, { fileExists: publicFile })).toEqual([]);
  });

  it('has unique project ids', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses known categories and statuses', () => {
    const known = new Set(categories.map((c) => c.id));
    for (const p of projects) {
      expect(known.has(p.category), p.id).toBe(true);
      expect(STATUSES).toContain(p.status);
    }
  });

  it('has no Games department', () => {
    expect(categories.map((c) => c.name.toLowerCase()).join(' ')).not.toMatch(/game/);
  });

  it('files LC-1X+ under Video & Visual, not Audio', () => {
    expect(projects.find((p) => p.id === 'lc-1x-plus')?.category).toBe('video');
  });

  it('keeps Cartridge Index with the other creative tools', () => {
    expect(projects.find((p) => p.id === 'cartridge-index')?.category).toBe('other');
  });

  it('includes the whole generative family with live links', () => {
    const family = projectsInCategory(projects, 'generative').map((p) => p.id);
    expect(family).toEqual(['emmm', 'feelers', 'frakmc', 'anvil', 'downbeat', 'squared', 'breakery']);
    for (const p of projectsInCategory(projects, 'generative')) expect(p.links.launch).toMatch(/allmyfriendsaresynths\.com\/$/);
  });

  it('marks the generative family as released, not experimental', () => {
    for (const p of projectsInCategory(projects, 'generative')) expect(p.status, p.id).toBe('live');
  });

  it('lists the AMFAS Music Library as an audio tool, and Music Collection DB as another place', () => {
    expect(projects.find((p) => p.id === 'amfas-music-library')?.category).toBe('audio');
    expect(places.some((pl) => pl.url.includes('musiclibrary'))).toBe(false);
    expect(projects.some((p) => p.links.launch?.includes('music.clickysteve.com'))).toBe(false);
    expect(places.find((pl) => pl.id === 'music-collection')?.url).toBe('https://music.clickysteve.com/');
  });

  it('includes the EarthBound save editor in Other Creative Tools', () => {
    expect(projects.find((p) => p.id === 'oh-mother')?.category).toBe('other');
  });

  it('includes The Good Bits', () => {
    expect(projects.find((p) => p.id === 'good-bits')?.links.launch).toBe('https://thegoodbits.allmyfriendsaresynths.com/');
  });

  it('only links to https destinations', () => {
    const urls = [...projects.flatMap((p) => Object.values(p.links)), ...places.map((pl) => pl.url)];
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });

  it('has every screenshot as a thumbnail and a full-size image', () => {
    for (const p of projects.filter((x) => x.screenshot)) {
      const { thumb, full } = screenshotPaths(p.screenshot!.file);
      expect(publicFile(thumb), thumb).toBe(true);
      expect(publicFile(full), full).toBe(true);
    }
  });
});

describe('queries', () => {
  it('filters a category and sorts it by order', () => {
    const audio = projectsInCategory(projects, 'audio');
    expect(audio.every((p) => p.category === 'audio')).toBe(true);
    const orders = audio.map((p) => p.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('returns featured projects in page order', () => {
    const featured = featuredProjects(projects, categories);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.featured)).toBe(true);
    const categoryOrder = featured.map((p) => categories.find((c) => c.id === p.category)!.order);
    expect(categoryOrder).toEqual([...categoryOrder].sort((a, b) => a - b));
  });

  it('builds actions only from links that exist', () => {
    expect(projectActions(project({ links: {} }))).toEqual([]);
    expect(projectActions(project({ links: { source: 'https://example.com/src' } })).map((a) => a.kind)).toEqual(['source']);
    const all = projectActions(
      project({ links: { docs: 'https://e.com/d', source: 'https://e.com/s', download: 'https://e.com/dl', launch: 'https://e.com/' } }),
    );
    expect(all.map((a) => a.kind)).toEqual(['launch', 'download', 'source', 'docs']);
  });

  it('links screenshots to the live app first, then the source, else nowhere', () => {
    expect(screenshotLink(project({ links: { launch: 'https://e.com/', source: 'https://e.com/s' } }))?.url).toBe('https://e.com/');
    expect(screenshotLink(project({ links: { download: 'https://e.com/dl', source: 'https://e.com/s' } }))?.url).toBe('https://e.com/s');
    expect(screenshotLink(project({ links: { docs: 'https://e.com/d' } }))).toBeUndefined();
  });

  it('calls documentation a manual when there is nothing to launch or download', () => {
    const [docs] = projectActions(project({ links: { docs: 'https://e.com/manual' } }));
    expect(docs?.label).toBe('Manual');
  });

  it('counts titles and browser apps', () => {
    const stats = catalogueStats(projects, categories);
    expect(stats.titles).toBe(projects.length);
    expect(stats.inBrowser).toBe(projects.filter((p) => p.links.launch).length);
  });
});

describe('validation', () => {
  const withProject = (p: Project) => ({ projects: [...projects, p], categories, places });

  it('accepts a minimal project with only optional fields left out', () => {
    expect(validateCatalogue(withProject(project()))).toEqual([]);
  });

  it('rejects duplicate ids', () => {
    expect(validateCatalogue(withProject(project({ id: 'emmm' })))).toContainEqual(expect.stringContaining('duplicate id'));
  });

  it('rejects unknown categories', () => {
    const bad = project({ category: 'games' as Project['category'] });
    expect(validateCatalogue(withProject(bad))).toContainEqual(expect.stringContaining('unknown category'));
  });

  it('rejects malformed ids', () => {
    expect(validateCatalogue(withProject(project({ id: 'Bad Id' })))).toContainEqual(expect.stringContaining('id must be'));
  });

  it('rejects insecure or invalid links', () => {
    expect(validateCatalogue(withProject(project({ links: { launch: 'http://example.com/' } })))).toContainEqual(
      expect.stringContaining('must use https'),
    );
    expect(validateCatalogue(withProject(project({ links: { source: 'not a url' } })))).toContainEqual(
      expect.stringContaining('not a valid URL'),
    );
  });

  it('requires an availability note when there are no links', () => {
    expect(validateCatalogue(withProject(project({ links: {} })))).toContainEqual(expect.stringContaining('availabilityNote'));
    expect(validateCatalogue(withProject(project({ links: {}, availabilityNote: 'Soon' })))).toEqual([]);
  });

  it('requires a screenshot for featured projects', () => {
    expect(validateCatalogue(withProject(project({ featured: true })))).toContainEqual(
      expect.stringContaining('featured projects need a screenshot'),
    );
  });

  it('reports missing screenshot files', () => {
    const p = project({ screenshot: { file: 'does-not-exist', alt: 'x', source: 'y' } });
    expect(validateCatalogue(withProject(p), { fileExists: publicFile })).toContainEqual(expect.stringContaining('missing image'));
  });

  it('requires alt text on screenshots', () => {
    const p = project({ screenshot: { file: 'emmm', alt: ' ', source: 'y' } });
    expect(validateCatalogue(withProject(p))).toContainEqual(expect.stringContaining('alt text'));
  });
});
