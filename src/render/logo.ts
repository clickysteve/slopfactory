/**
 * The Slop Factory mark: a 16×16 pixel factory with a sawtooth roof, a smoking chimney and
 * windows lit in the department colours. Drawn as SVG rects so it stays crisp at any size.
 */

// # = ink, 1–4 = department-coloured windows, s = smoke. Read top to bottom.
const PIXELS = [
  '..........ss....',
  '.........s..s...',
  '..........ss.ss.',
  '............s..s',
  '.............ss.',
  '...........##...',
  '#.....#....##...',
  '##....##...##...',
  '#.#...#.#..##...',
  '#..#..#..#.##...',
  '#...#.#...###...',
  '################',
  '#..............#',
  '#.11.22.33.44..#',
  '#.11.22.33.44..#',
  '################',
];

const FILLS: Record<string, string> = {
  '#': 'var(--logo-ink, #1d1c18)',
  s: 'var(--logo-smoke, #8c8576)',
  '1': 'var(--logo-1, #8a2f5e)',
  '2': 'var(--logo-2, #1d6a86)',
  '3': 'var(--logo-3, #2c7149)',
  '4': 'var(--logo-4, #8f5d00)',
};

function rects(fills: Record<string, string>): string {
  const out: string[] = [];
  PIXELS.forEach((row, y) => {
    // Merge horizontal runs of the same colour into one rect.
    let x = 0;
    while (x < row.length) {
      const c = row[x]!;
      let w = 1;
      while (row[x + w] === c) w++;
      if (fills[c]) out.push(`<rect x="${x}" y="${y}" width="${w}" height="1" fill="${fills[c]}"/>`);
      x += w;
    }
  });
  return out.join('');
}

/** Inline mark for the page; colours follow the CSS custom properties. */
export function logoSvg(className = 'logo'): string {
  return `<svg class="${className}" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects(FILLS)}</svg>`;
}

/** Self-contained favicon (no CSS variables) as a data URI. */
export function faviconDataUri(): string {
  const fixed = Object.fromEntries(Object.entries(FILLS).map(([k, v]) => [k, v.replace(/^var\([^,]+,\s*([^)]+)\)$/, '$1')]));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">${rects(fixed)}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
