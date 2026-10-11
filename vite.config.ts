import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { validateCatalogue } from './src/catalogue.ts';
import { categories } from './src/data/categories.ts';
import { places } from './src/data/places.ts';
import { projects } from './src/data/projects.ts';
import { site } from './src/data/site.ts';
import { esc } from './src/render/html.ts';
import { faviconDataUri } from './src/render/logo.ts';
import { renderBody } from './src/render/page.ts';

/**
 * Renders the catalogue into index.html at build time (and on every dev-server request), so
 * the shipped page is plain HTML. Editing src/data/*.ts restarts the dev server.
 */
function catalogue(): Plugin {
  return {
    name: 'slopfactory-catalogue',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const errors = validateCatalogue(
          { projects, categories, places },
          { fileExists: (path) => existsSync(fileURLToPath(new URL(`./public/${path}`, import.meta.url))) },
        );
        if (errors.length) throw new Error(`Catalogue data is invalid:\n  - ${errors.join('\n  - ')}`);
        const vars: Record<string, string> = {
          SITE_TITLE: site.title,
          SITE_SUBTITLE: site.subtitle,
          SITE_DESCRIPTION: site.description,
          SITE_URL: site.url,
          SOCIAL_IMAGE: new URL(site.socialImage, site.url).href,
          FAVICON: faviconDataUri(),
        };
        const body = renderBody({ projects, categories, places, site, year: new Date().getFullYear() });
        return html
          .replace(/%([A-Z_]+)%/g, (m, key: string) => (key in vars ? esc(vars[key]!) : m))
          .replace('<!--catalogue-->', body);
      },
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [catalogue()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
  server: { port: 5310 },
  preview: { port: 4310 },
});
