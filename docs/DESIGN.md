# Design

Slop Factory looks like the catalogue of a slightly eccentric software house from 1991: GEM
windows, shareware listings and tracker panels, but drawn as a real, readable website rather
than an emulator. It shares its visual language with the instruments it lists, especially
ANVIL, emmm, Feelers, FrakMC and DOWNBEAT.

## References taken from the instruments

- **Palette.** The colours come from the "Colour" palette that ANVIL, emmm, Feelers and FrakMC
  share (warm paper `#fbf8ef`, ink `#202020`, burgundy, blue, green, ochre and violet panel
  inks), and from Feelers' and DOWNBEAT's cream desktops.
- **Panels.** As in ANVIL, every panel is a 1–2 px ink frame with a solid title bar in its
  area's colour, and selected states invert (ink background, paper text).
- **Title bars.** The ruled lines filling the rest of a title bar come from FrakMC's GEM
  windows. The square close box in the information window is the GEM close box.
- **Type.** Silkscreen, the pixel face ANVIL, emmm and DOWNBEAT use for titles, with the
  system monospace for everything else. It is self-hosted through `@fontsource`, so the
  site makes no third-party font requests.
- **Shadows.** Hard offset shadows with no blur, as on FrakMC's windows and buttons.
- **Desktop.** A faint one-pixel dot grid, a toned-down GEM desktop, as behind The Good Bits.

## Tokens

All colours, type and spacing are CSS custom properties in
[`src/styles/tokens.css`](../src/styles/tokens.css).

| Token | Value | Use |
|---|---|---|
| `--desktop` | `#e9e4d6` | Page background |
| `--paper` | `#fbf8ef` | Windows, cards, text on coloured bars |
| `--ink` | `#1d1c18` | Text, frames, shadows, inverted states |
| `--dim` | `#5f5a4f` | Secondary text (6.5:1 on paper) |
| `--cat-generative` | `#8a2f5e` | Generative Music: burgundy |
| `--cat-audio` | `#1d6a86` | Audio & Music: blue |
| `--cat-video` | `#2c7149` | Video & Visual: green |
| `--cat-photo` | `#8f5d00` | Photography: dark amber |
| `--cat-other` | `#6a3fa0` | Other Creative Tools: violet |
| `--cat-places` | `#3b3a36` | Other Places: dark grey |
| `--activity` | `#c0392b` | Experimental badge |
| `--beta` | `#8f5d00` | Beta badge |
| `--focus` | `#2b78c9` | Keyboard focus ring |

Every department colour has at least 4.5:1 contrast with paper, so paper text on a coloured
title bar or button meets WCAG AA. A unit test (`tests/unit/render.test.ts`) enforces this.

A section sets `--cat` once (`style="--cat: var(--cat-audio)"`) and everything inside it
picks the colour up: the title bar, the LAUNCH buttons, placeholder panels, the
information window's headings and bullet squares. The pixel logo's windows are lit in the
department colours.

## Typography

| Role | Face | Size |
|---|---|---|
| Site title | Silkscreen | `clamp(34px, 6.2vw, 72px)` |
| Title bars, tool names | Silkscreen | 16 px (20 px in Featured) |
| Body, summaries | System monospace | 14 px / 12.5 px |
| Labels, platform lines, buttons | System monospace, bold, uppercase, tracked | 11–12 px |

Silkscreen is only used at sizes where it stays crisp and legible; running text is never in
the pixel face.

## Layout

- **Menu bar.** Sticky, like the GEM menu bar: the logo, then one item per department with
  its colour swatch. The department on screen is shown inverted. Below 900 px the items wrap
  under the logo.
- **Masthead.** Compact: title, subtitle strip, two short paragraphs, and a "Catalogue No. 1"
  spec sheet whose figures are counted from the data. No hero image.
- **Featured.** One window with up to six tools, each labelled with its department. Four
  across on wide screens, two across on tablets and phones, with the summary hidden on phones.
- **Departments.** One window per department with a responsive card grid
  (`auto-fill, minmax(268px, 1fr)`): five across at 1650 px, four at 1440, three at 1024,
  two at 768. Consecutive departments with two titles or fewer are clustered side by side,
  each growing in proportion to its number of titles, so one-title departments do not
  each take a full-width band.
- **Cards.** Screenshot (16:10 crop, `object-position` per project), name and status badge,
  platform, one-sentence summary, then buttons: LAUNCH (or DOWNLOAD), SOURCE, INFO. LAUNCH is
  always on the card, so no one has to open a window to start an app. The screenshot itself
  links to the live app, or to the source when there is no live app; hovering it shows a
  small LAUNCH or SOURCE label. That link is kept out of the tab order because the button
  beside it goes to the same place. Below 600 px cards turn
  sideways: thumbnail beside the name, summary and buttons full width beneath.
- **Other Places.** Deliberately quieter: a dark grey bar, small text-only link tiles, no
  images, placed after the whole catalogue.
- **Information windows.** Native `<dialog>` elements opened as modals: GEM title bar with
  close box, large screenshot beside the long description, features, inspiration and every
  link. Opened with `#info/<id>`, so they can be linked to. The backdrop is a 50% dither.

## Placeholders

Tools without a screenshot get a typographic panel rather than a fake interface: a 50%
dither of the department colour with the tool's name in a framed pixel-type label and its
platform underneath. It is exposed to screen readers as an image labelled "No screenshot of
… yet".

## Interaction and accessibility

- Semantic structure: one `h1`, an `h2` per window, an `h3` per tool; cards are `article`s
  in lists; the spec sheet is a `dl`.
- Every external link opens in a new tab with `rel="noopener"`, shows an arrow, and says
  "(opens in a new tab)" to screen readers. Button labels name their tool ("Launch emmm",
  "Info about emmm").
- Visible 3 px focus ring on everything, and a skip link.
- Information windows use `<dialog>.showModal()`: focus moves in, the rest of the page is
  inert, Escape and the close box close it, and focus returns to the button that opened
  it. They open through HTML invoker commands (`commandfor`/`command`), with a small script
  fallback for browsers without them, and `closedby="any"` (or a fallback) for backdrop clicks.
- No hover-only controls. On touch screens buttons grow to at least 44 px tall.
- No animation apart from smooth anchor scrolling, which is turned off under
  `prefers-reduced-motion`. No CRT effects, scanlines, gradients or blurred shadows.

## Performance

The page is rendered to static HTML at build time from the data, so it is readable before
any script runs; the script (~2 KB) only adds window deep links and fallbacks. The HTML is
about 16 KB gzipped, the CSS about 4 KB, and the font 8 KB. Card thumbnails are 720 px WebP
(10–55 KB each) and load lazily; full-size images (≤1600 px) only load when their window opens.
