# Slop Factory

**Independent software for questionable creative purposes.**

Slop Factory is the catalogue of creative software, experimental musical instruments and
digital oddities made by Stephen McLeod Blythe (allmyfriendsaresynths): reimagined
instruments, sample tools, tracker librarians, a circuit-bent video processor, a Game Boy
Camera darkroom and more. It is designed like a software catalogue from an alternate 1991,
and most of what it lists runs in a browser: press LAUNCH and start experimenting.

It will live at <https://slopfactory.allmyfriendsaresynths.com/>.

- What is in it, and where each fact came from: [docs/PROJECT-INVENTORY.md](docs/PROJECT-INVENTORY.md)
- How it looks and why: [docs/DESIGN.md](docs/DESIGN.md)

## How it works

A small static site: TypeScript, Vite, plain CSS, no framework, no backend, no cookies, no
analytics. The catalogue is data in [`src/data/`](src/data/); at build time a Vite plugin
validates the data and renders the whole page to static HTML
([`src/render/page.ts`](src/render/page.ts)). A ~2 KB script then adds deep links and
fallbacks for the information windows.

```
src/data/projects.ts     the project registry: every tool, one entry each
src/data/categories.ts   the departments
src/data/places.ts       Other Places (music, shop, YouTube…)
src/data/site.ts         title, intro and footer copy
src/catalogue.ts         queries and validation rules
src/render/              HTML rendering and the pixel logo
src/styles/              design tokens and styles
src/main.ts              progressive enhancement
assets/screenshots/      source screenshots (PNG)
public/screenshots/      web images generated from them
tests/unit/              Vitest: data, validation, rendering, contrast
tests/e2e/               Playwright in Chrome at five viewport sizes
```

## Run it locally

You need Node.js 20.19 or newer (22 recommended).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:5310>. Editing anything in `src/data/` restarts the dev server
with the new catalogue.

## Build

```bash
npm run build
```

writes the finished site to `dist/`. `npm run preview` serves it at <http://localhost:4310>.

If the catalogue data is invalid (a duplicate id, an unknown category, a missing
screenshot, an `http://` link…), the build stops and lists every problem.

## Test

```bash
npm run verify
```

runs everything CI runs: the type check, the unit tests, the build and the browser tests.
Individually:

| Command | What it does |
|---|---|
| `npm run typecheck` | TypeScript |
| `npm test` | Unit tests: data validation, unique ids, categories, filtering, links, optional fields, rendering, colour contrast |
| `npm run test:e2e` | Builds the site and drives it in your installed Google Chrome at 1650×900, 1440×900, 1024×768, 768×1024 and 390×844: navigation, info windows, keyboard focus, broken images, horizontal overflow, touch target sizes. Full-page screenshots of each size go to `test-results/screenshots/` for review. |

## Add a project

1. **Add an entry** to [`src/data/projects.ts`](src/data/projects.ts), in the section for its
   category:

   ```ts
   {
     id: 'my-tool',                       // lowercase-with-hyphens, unique
     name: 'My Tool',
     category: 'audio',                   // reimagined | audio | video | photo | misc
     status: 'experimental',              // live | beta | experimental | in-development | archived
     platform: 'Browser · Web MIDI',
     summary: 'One sentence for the card (under 180 characters).',
     description: ['A paragraph or two for the information window.'],
     features: ['Optional', 'short', 'list'],
     inspiration: 'Optional: the old software or hardware it is inspired by.',
     links: {
       launch: 'https://my-tool.allmyfriendsaresynths.com/', // all optional
       source: 'https://github.com/clickysteve/my-tool',
       docs: 'https://…',
       download: 'https://…',            // for plugins and desktop apps
     },
     screenshot: {
       file: 'my-tool',                  // public/screenshots/my-tool.webp and my-tool-thumb.webp
       alt: 'What the screenshot shows.',
       position: 'left top',             // optional crop anchor for the card
       source: 'Where the image came from.',
     },
     featured: false,                    // optional: also show it in Featured
     order: 9,                           // position within its category
   },
   ```

   Only `id`, `name`, `category`, `status`, `platform`, `summary`, `description`, `links` and
   `order` are required. Leave out any link you don't have, and the button won't appear.
   With no links at all, add `availabilityNote: 'Not yet public'`. With no screenshot, the
   card shows a typographic placeholder.

2. **Add a screenshot** (optional): save a real screenshot of the app in a representative
   state as `assets/screenshots/<id>.png`, ideally 1440 × 900 or larger, then run

   ```bash
   npm run images
   ```

   which writes `public/screenshots/<id>.webp` (detail view, ≤1600 px) and
   `<id>-thumb.webp` (card, 720 px). Commit both the source and the generated files. Cards
   crop to 16:10; use `screenshot.position` if the interesting part is not in the middle.

3. **Build and deploy:** `npm run verify`, then push to `main`.

No components need changing. A new department is an entry in
[`src/data/categories.ts`](src/data/categories.ts) plus a `--cat-<id>` colour in
[`src/styles/tokens.css`](src/styles/tokens.css) (the contrast test will tell you if it is
too light).

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push and pull
request: install (`npm ci`), type check, unit tests, build, browser tests. On `main` it then
uploads `dist/` (the built site, not the source) and deploys it to GitHub Pages. If any step
fails, nothing is deployed. `public/CNAME` puts `slopfactory.allmyfriendsaresynths.com` in
the build.

### One-time setup

1. **Settings › Pages › Build and deployment › Source: GitHub Actions.** This must be
   *GitHub Actions*, not *Deploy from a branch*, so the workflow is the only thing publishing
   the site (otherwise branch publishing and the workflow compete).
2. **Settings › Pages › Custom domain:** `slopfactory.allmyfriendsaresynths.com`, then
   **Enforce HTTPS** once the certificate has been issued.
3. **DNS** (not done, and not to be done without your say-so): a `CNAME` record for
   `slopfactory.allmyfriendsaresynths.com` pointing to `clickysteve.github.io`, the same as
   the other `*.allmyfriendsaresynths.com` apps.
4. Optionally, verify `allmyfriendsaresynths.com` for GitHub Pages under your account settings
   to protect the subdomains from takeover.

## Licence

MIT for the site's code. The screenshots show the listed applications, each under its own
licence. Silkscreen is © Jason Kottke, SIL Open Font License.
