/**
 * Queries and validation over the catalogue data. Pure functions: the build, the tests and
 * the page all use these, so the rules live in one place.
 */
import type { Category, CategoryId, Place, Project, Status } from './data/types.ts';

export const STATUSES: readonly Status[] = ['live', 'beta', 'experimental', 'in-development', 'archived'];

/** Badge text per status. `live` gets no badge: a released tool needs no label. */
export const STATUS_LABELS: Record<Status, string | null> = {
  live: null,
  beta: 'Beta',
  experimental: 'Experimental',
  'in-development': 'In development',
  archived: 'Archived',
};

export const SCREENSHOT_DIR = 'screenshots';

export function screenshotPaths(file: string): { thumb: string; full: string } {
  return { thumb: `${SCREENSHOT_DIR}/${file}-thumb.webp`, full: `${SCREENSHOT_DIR}/${file}.webp` };
}

export function sortedCategories(categories: readonly Category[]): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function projectsInCategory(projects: readonly Project[], id: CategoryId): Project[] {
  return projects.filter((p) => p.category === id).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

/** Featured projects in page order: by category order, then their order within it. */
export function featuredProjects(projects: readonly Project[], categories: readonly Category[]): Project[] {
  return sortedCategories(categories).flatMap((c) => projectsInCategory(projects, c.id).filter((p) => p.featured));
}

export interface Action {
  kind: 'launch' | 'download' | 'docs' | 'source';
  label: string;
  url: string;
}

/** The links a project offers, most important first. Only links present in the data appear. */
export function projectActions(p: Project): Action[] {
  const actions: Action[] = [];
  if (p.links.launch) actions.push({ kind: 'launch', label: 'Launch', url: p.links.launch });
  if (p.links.download) actions.push({ kind: 'download', label: 'Download', url: p.links.download });
  if (p.links.source) actions.push({ kind: 'source', label: 'Source', url: p.links.source });
  if (p.links.docs) actions.push({ kind: 'docs', label: p.links.launch || p.links.download ? 'Docs' : 'Manual', url: p.links.docs });
  return actions;
}

export interface CatalogueStats {
  titles: number;
  departments: number;
  inBrowser: number;
}

export function catalogueStats(projects: readonly Project[], categories: readonly Category[]): CatalogueStats {
  return {
    titles: projects.length,
    departments: categories.length,
    inBrowser: projects.filter((p) => p.links.launch).length,
  };
}

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function checkUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return 'must use https';
    return null;
  } catch {
    return 'is not a valid URL';
  }
}

export interface ValidationOptions {
  /** Return whether a file exists under public/, e.g. "screenshots/emmm-thumb.webp". */
  fileExists?: (path: string) => boolean;
}

/** Returns a list of problems; an empty list means the catalogue is valid. */
export function validateCatalogue(
  data: { projects: readonly Project[]; categories: readonly Category[]; places: readonly Place[] },
  options: ValidationOptions = {},
): string[] {
  const errors: string[] = [];
  const { projects, categories, places } = data;
  const categoryIds = new Set<string>();
  for (const c of categories) {
    if (categoryIds.has(c.id)) errors.push(`category "${c.id}": duplicate id`);
    categoryIds.add(c.id);
    if (!c.name.trim() || !c.navLabel.trim()) errors.push(`category "${c.id}": needs a name and navLabel`);
  }

  const ids = new Set<string>();
  for (const p of projects) {
    const where = `project "${p.id}"`;
    if (!ID.test(p.id)) errors.push(`${where}: id must be lowercase letters, digits and single hyphens`);
    if (ids.has(p.id)) errors.push(`${where}: duplicate id`);
    ids.add(p.id);
    if (!p.name.trim()) errors.push(`${where}: missing name`);
    if (!categoryIds.has(p.category)) errors.push(`${where}: unknown category "${p.category}"`);
    if (!STATUSES.includes(p.status)) errors.push(`${where}: unknown status "${p.status}"`);
    if (!p.platform.trim()) errors.push(`${where}: missing platform`);
    if (!p.summary.trim()) errors.push(`${where}: missing summary`);
    if (p.summary.length > 180) errors.push(`${where}: summary is ${p.summary.length} characters (keep it under 180)`);
    if (!p.description.length || p.description.some((d) => !d.trim())) errors.push(`${where}: description needs at least one paragraph`);
    if (!Number.isInteger(p.order)) errors.push(`${where}: order must be an integer`);
    for (const [kind, url] of Object.entries(p.links)) {
      if (url === undefined) continue;
      const problem = checkUrl(url);
      if (problem) errors.push(`${where}: ${kind} link ${problem}`);
    }
    if (!Object.values(p.links).some(Boolean) && !p.availabilityNote) {
      errors.push(`${where}: has no links, so give it an availabilityNote`);
    }
    if (p.screenshot) {
      if (!p.screenshot.alt.trim()) errors.push(`${where}: screenshot needs alt text`);
      if (!p.screenshot.source.trim()) errors.push(`${where}: screenshot needs a source`);
      if (options.fileExists) {
        const { thumb, full } = screenshotPaths(p.screenshot.file);
        for (const f of [thumb, full]) if (!options.fileExists(f)) errors.push(`${where}: missing image public/${f} (run npm run images)`);
      }
    }
    if (p.featured && !p.screenshot) errors.push(`${where}: featured projects need a screenshot`);
  }

  for (const c of categories) {
    if (!projects.some((p) => p.category === c.id)) errors.push(`category "${c.id}": has no projects`);
    const orders = projectsInCategory(projects, c.id).map((p) => p.order);
    if (new Set(orders).size !== orders.length) errors.push(`category "${c.id}": two projects share the same order`);
  }

  const featured = projects.filter((p) => p.featured).length;
  if (featured < 1 || featured > 6) errors.push(`between 1 and 6 projects should be featured (found ${featured})`);

  const placeIds = new Set<string>();
  for (const pl of places) {
    if (placeIds.has(pl.id)) errors.push(`place "${pl.id}": duplicate id`);
    placeIds.add(pl.id);
    const problem = checkUrl(pl.url);
    if (problem) errors.push(`place "${pl.id}": url ${problem}`);
    if (!pl.name.trim() || !pl.kind.trim()) errors.push(`place "${pl.id}": needs a name and kind`);
  }
  return errors;
}
