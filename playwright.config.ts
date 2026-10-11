import { defineConfig } from '@playwright/test';

/** The viewports the site is designed and checked at. */
export const VIEWPORTS = [
  { name: 'desktop-1650', width: 1650, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024, touch: true },
  { name: 'phone-390', width: 390, height: 844, touch: true, mobile: true },
];

const PORT = 4311;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/`,
    // The installed Google Chrome (present on GitHub's runners too), so nothing is downloaded.
    channel: 'chrome',
  },
  projects: VIEWPORTS.map((v) => ({
    name: v.name,
    use: {
      viewport: { width: v.width, height: v.height },
      hasTouch: !!v.touch,
      isMobile: !!v.mobile,
    },
  })),
  webServer: {
    // Always test the production build.
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
