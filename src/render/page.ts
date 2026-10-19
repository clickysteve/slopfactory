/**
 * Renders the catalogue to static HTML at build time (see vite.config.ts). The page works
 * without JavaScript; src/main.ts only adds deep links and fallbacks for the info windows.
 */
import {
  STATUS_LABELS,
  catalogueStats,
  featuredProjects,
  projectActions,
  projectsInCategory,
  screenshotLink,
  screenshotPaths,
  sortedCategories,
  type Action,
} from '../catalogue.ts';
import type { Category, Place, Project } from '../data/types.ts';
import { esc, join, srOnly } from './html.ts';
import { logoSvg } from './logo.ts';

export interface PageData {
  projects: readonly Project[];
  categories: readonly Category[];
  places: readonly Place[];
  site: {
    title: string;
    subtitle: string;
    intro: string[];
    label: string;
    labelUrl: string;
  };
}

export const PLACES_ANCHOR = 'elsewhere';

const NEW_TAB = ' target="_blank" rel="noopener"';

function categoryOf(p: Project, categories: readonly Category[]): Category {
  return categories.find((c) => c.id === p.category)!;
}

function catStyle(id: string): string {
  return `style="--cat: var(--cat-${esc(id)})"`;
}

function badge(p: Project): string {
  const label = STATUS_LABELS[p.status];
  return label ? `<span class="badge badge--${esc(p.status)}">${esc(label)}</span>` : '';
}

function actionLink(a: Action, p: Project, primary: boolean): string {
  const hidden: Record<Action['kind'], string> = {
    launch: ` ${p.name}`,
    download: ` ${p.name}`,
    source: ` code for ${p.name}`,
    docs: ` for ${p.name}`,
  };
  const cls = primary ? 'btn btn--primary' : 'btn';
  const arrow = a.kind === 'launch' ? '<span class="btn-arrow" aria-hidden="true">▸</span>' : '<span class="btn-arrow" aria-hidden="true">↗</span>';
  return `<a class="${cls}" href="${esc(a.url)}"${NEW_TAB} data-action="${a.kind}">${esc(a.label)}${srOnly(`${hidden[a.kind]} (opens in a new tab)`)}${arrow}</a>`;
}

function infoButton(p: Project): string {
  return `<button class="btn btn--info" type="button" commandfor="info-${esc(p.id)}" command="show-modal" aria-haspopup="dialog" data-info="${esc(p.id)}">Info${srOnly(` about ${p.name}`)}</button>`;
}

/** The card's buttons: the main link, then source, then the info window. */
function cardActions(p: Project, { compact = false } = {}): string {
  const actions = projectActions(p);
  const shown = compact ? actions.slice(0, 1) : actions.filter((a) => a.kind !== 'docs').slice(0, 2);
  const links = shown.map((a, i) => actionLink(a, p, i === 0 && (a.kind === 'launch' || a.kind === 'download')));
  const note = !actions.length && p.availabilityNote ? `<span class="availability">${esc(p.availabilityNote)}</span>` : '';
  return `<div class="card-actions">${links.join('')}${note}${infoButton(p)}</div>`;
}

function shotImage(p: Project, variant: 'thumb' | 'full'): string {
  if (!p.screenshot) {
    return `<div class="placeholder" role="img" aria-label="${esc(`No screenshot of ${p.name} yet`)}"><span class="placeholder-name" aria-hidden="true">${esc(p.name)}</span><span class="placeholder-note" aria-hidden="true">${esc(p.platform)}</span></div>`;
  }
  const { thumb, full } = screenshotPaths(p.screenshot.file);
  const src = variant === 'thumb' ? thumb : full;
  const [w, h] = variant === 'thumb' ? [720, 450] : [1600, 1000];
  const pos = p.screenshot.position ? ` style="object-position: ${esc(p.screenshot.position)}"` : '';
  return `<img src="${esc(src)}" alt="${esc(p.screenshot.alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${pos}>`;
}

/**
 * The screenshot (or placeholder), linked to the live app or else the source. The link is
 * left out of the tab order because the LAUNCH or SOURCE button beside it goes to the same place.
 */
function shot(p: Project, variant: 'thumb' | 'full'): string {
  const image = shotImage(p, variant);
  const link = screenshotLink(p);
  if (!link) return image;
  const what = link.kind === 'launch' ? `Launch ${p.name}` : `Source code for ${p.name}`;
  return `<a class="shot-link" href="${esc(link.url)}"${NEW_TAB} tabindex="-1" data-label="${esc(link.label)} ${link.kind === 'launch' ? '▸' : '↗'}" data-shot="${link.kind}">${image}${srOnly(`${what} (opens in a new tab)`)}</a>`;
}

export function renderCard(p: Project, options: { featured?: boolean; categories?: readonly Category[] } = {}): string {
  const prefix = options.featured ? 'feature' : 'tool';
  const headingId = `${prefix}-${p.id}-name`;
  const cat = options.featured && options.categories ? categoryOf(p, options.categories) : null;
  return join([
    `<article class="card${options.featured ? ' card--feature' : ''}" id="${prefix}-${esc(p.id)}" aria-labelledby="${headingId}" data-project="${esc(p.id)}"${options.featured ? ` ${catStyle(p.category)}` : ''}>`,
    `<div class="card-shot">${shot(p, 'thumb')}</div>`,
    `<div class="card-body">`,
    cat && `<p class="card-dept">${esc(cat.name)}</p>`,
    `<div class="card-head"><h3 class="card-name" id="${headingId}">${esc(p.name)}</h3>${badge(p)}</div>`,
    `<p class="card-platform">${esc(p.platform)}</p>`,
    `<p class="card-summary">${esc(p.summary)}</p>`,
    cardActions(p, { compact: options.featured }),
    `</div>`,
    `</article>`,
  ]);
}

/** Departments with this many titles or fewer share a row with their small neighbours. */
export const SMALL_DEPARTMENT = 2;

function renderCategory(c: Category, projects: readonly Project[]): string {
  const items = projectsInCategory(projects, c.id);
  return join([
    `<section class="dept window" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-title" style="--cat: var(--cat-${esc(c.id)}); --span: ${items.length}">`,
    ...(c.aliases ?? []).map((a) => `<span class="anchor-alias" id="${esc(a)}"></span>`),
    `<div class="titlebar"><h2 class="titlebar-title" id="${esc(c.id)}-title">${esc(c.name)}</h2><span class="titlebar-fill" aria-hidden="true"></span><span class="titlebar-meta">${items.length} ${items.length === 1 ? 'title' : 'titles'}</span></div>`,
    `<p class="dept-blurb">${esc(c.blurb)}</p>`,
    `<ul class="grid" role="list">`,
    ...items.map((p) => `<li>${renderCard(p)}</li>`),
    `</ul>`,
    `</section>`,
  ]);
}

function renderFeatured(data: PageData): string {
  const items = featuredProjects(data.projects, data.categories);
  if (!items.length) return '';
  return join([
    `<section class="featured window" aria-labelledby="featured-title">`,
    `<div class="titlebar"><h2 class="titlebar-title" id="featured-title">Featured</h2><span class="titlebar-fill" aria-hidden="true"></span><span class="titlebar-meta">Start here</span></div>`,
    `<ul class="grid grid--feature" role="list">`,
    ...items.map((p) => `<li>${renderCard(p, { featured: true, categories: data.categories })}</li>`),
    `</ul>`,
    `</section>`,
  ]);
}

function renderPlaces(places: readonly Place[]): string {
  return join([
    `<section class="places window" id="${PLACES_ANCHOR}" aria-labelledby="${PLACES_ANCHOR}-title" ${catStyle('places')}>`,
    `<div class="titlebar"><h2 class="titlebar-title" id="${PLACES_ANCHOR}-title">Other Places</h2><span class="titlebar-fill" aria-hidden="true"></span><span class="titlebar-meta">Not software</span></div>`,
    `<p class="dept-blurb">Music, video and other things from the same address.</p>`,
    `<ul class="places-list" role="list">`,
    ...places.map(
      (pl) =>
        `<li><a class="place" href="${esc(pl.url)}"${NEW_TAB} data-place="${esc(pl.id)}"><span class="place-kind">${esc(pl.kind)}</span><span class="place-name">${esc(pl.name)}<span class="place-arrow" aria-hidden="true">↗</span></span><span class="place-desc">${esc(pl.description)}</span>${srOnly('(opens in a new tab)')}</a></li>`,
    ),
    `</ul>`,
    `</section>`,
  ]);
}

export function renderHeader(data: PageData): string {
  const cats = sortedCategories(data.categories);
  return join([
    `<header class="menubar">`,
    `<a class="menubar-brand" href="#top">${logoSvg('logo logo--small')}<span>${esc(data.site.title)}</span></a>`,
    `<nav class="menubar-nav" aria-label="Departments"><ul role="list">`,
    ...cats.map((c) => `<li><a href="#${esc(c.id)}" ${catStyle(c.id)}><span class="swatch" aria-hidden="true"></span>${esc(c.navLabel)}</a></li>`),
    `<li><a href="#${PLACES_ANCHOR}" ${catStyle('places')}><span class="swatch" aria-hidden="true"></span>Elsewhere</a></li>`,
    `</ul></nav>`,
    `</header>`,
  ]);
}

function renderMasthead(data: PageData): string {
  const stats = catalogueStats(data.projects, data.categories);
  const rows: Array<[string, string]> = [
    ['Titles', String(stats.titles)],
    ['Departments', String(stats.departments)],
    ['Run in a browser', String(stats.inBrowser)],
    ['Price', 'Free'],
    ['Cookies', 'None'],
  ];
  return join([
    `<section class="masthead" aria-labelledby="site-title">`,
    `<div class="masthead-main">`,
    `<h1 class="masthead-title" id="site-title">${logoSvg('logo logo--large')}<span>${esc(data.site.title)}</span></h1>`,
    `<p class="masthead-subtitle">${esc(data.site.subtitle)}</p>`,
    ...data.site.intro.map((para) => `<p class="masthead-intro">${esc(para)}</p>`),
    `</div>`,
    `<aside class="spec window" aria-label="Catalogue facts">`,
    `<div class="titlebar"><span class="titlebar-title">Catalogue No. 1</span><span class="titlebar-fill" aria-hidden="true"></span></div>`,
    `<dl>`,
    ...rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`),
    `</dl>`,
    `</aside>`,
    `</section>`,
  ]);
}

/**
 * Renders each department in order. Runs of two or more small departments are wrapped in a
 * cluster so they sit side by side on wide screens instead of each taking a full-width band.
 */
function renderDepartments(data: PageData): string[] {
  const out: string[] = [];
  let run: Category[] = [];
  const flush = () => {
    if (run.length > 1) out.push(`<div class="dept-cluster">\n${run.map((c) => renderCategory(c, data.projects)).join('\n')}\n</div>`);
    else if (run.length === 1) out.push(renderCategory(run[0]!, data.projects));
    run = [];
  };
  for (const c of sortedCategories(data.categories)) {
    if (projectsInCategory(data.projects, c.id).length <= SMALL_DEPARTMENT) run.push(c);
    else {
      flush();
      out.push(renderCategory(c, data.projects));
    }
  }
  flush();
  return out;
}

export function renderMain(data: PageData): string {
  return join([
    `<main id="top" tabindex="-1">`,
    renderMasthead(data),
    renderFeatured(data),
    ...renderDepartments(data),
    renderPlaces(data.places),
    `</main>`,
  ]);
}

export function renderFooter(data: PageData): string {
  return join([
    `<footer class="footer">`,
    `<p>${logoSvg('logo logo--small')} <strong>${esc(data.site.title)}</strong> is a department of <a href="${esc(data.site.labelUrl)}"${NEW_TAB}>${esc(data.site.label)}${srOnly('(opens in a new tab)')}</a>.</p>`,
    `<p class="footer-small">No cookies. No analytics. No warranty, expressed or implied. Please report any slop that escapes the factory.</p>`,
    `</footer>`,
  ]);
}

export function renderInfoWindow(p: Project, categories: readonly Category[]): string {
  const cat = categoryOf(p, categories);
  const actions = projectActions(p);
  const status = STATUS_LABELS[p.status];
  const id = `info-${p.id}`;
  return join([
    `<dialog class="info-window window" id="${esc(id)}" aria-labelledby="${esc(id)}-title" closedby="any" ${catStyle(p.category)} data-project="${esc(p.id)}">`,
    `<div class="titlebar">`,
    `<button class="closebox" type="button" commandfor="${esc(id)}" command="close" aria-label="Close"><span aria-hidden="true"></span></button>`,
    `<h2 class="titlebar-title" id="${esc(id)}-title">${esc(p.name)}</h2><span class="titlebar-fill" aria-hidden="true"></span><span class="titlebar-meta">${esc(cat.name)}</span>`,
    `</div>`,
    `<div class="info-body">`,
    `<div class="info-shot">${shot(p, 'full')}</div>`,
    `<div class="info-text">`,
    `<p class="info-meta">${esc(p.platform)}${status ? ` · <span class="badge badge--${esc(p.status)}">${esc(status)}</span>` : ''}</p>`,
    ...p.description.map((para) => `<p>${esc(para)}</p>`),
    p.features?.length && `<h3>Features</h3><ul class="features">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`,
    p.inspiration && `<h3>Inspired by</h3><p>${esc(p.inspiration)}</p>`,
    actions.length
      ? `<div class="card-actions info-actions">${actions.map((a, i) => actionLink(a, p, i === 0 && (a.kind === 'launch' || a.kind === 'download'))).join('')}</div>`
      : p.availabilityNote && `<p class="availability">${esc(p.availabilityNote)}</p>`,
    `</div>`,
    `</div>`,
    `</dialog>`,
  ]);
}

export function renderInfoWindows(data: PageData): string {
  return data.projects.map((p) => renderInfoWindow(p, data.categories)).join('\n');
}

/** Everything that goes inside <body>. */
export function renderBody(data: PageData): string {
  return join([
    `<a class="skip-link" href="#top">Skip to the catalogue</a>`,
    renderHeader(data),
    renderMain(data),
    renderFooter(data),
    renderInfoWindows(data),
  ]);
}
