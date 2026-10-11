# Project inventory

Everything considered for the Slop Factory catalogue, what was verified, and what still needs
a human decision. Compiled on **11 October 2026** from three sources treated as complementary:

1. The projects page at <https://iamsteve.in/projects/> (out of date: it predates the generative family).
2. The public repositories of [github.com/clickysteve](https://github.com/clickysteve), including each README and docs folder.
3. The list of recent applications supplied with the brief (emmm, Feelers, FrakMC, ANVIL, DOWNBEAT, The Good Bits).

Every live URL below was requested on that date and returned HTTP 200, unless noted. Custom
domains were confirmed against each repository's GitHub Pages configuration (`CNAME`).
Descriptions on the site are taken from the READMEs and live apps, not invented.

The catalogue data itself lives in [`src/data/projects.ts`](../src/data/projects.ts) and
[`src/data/places.ts`](../src/data/places.ts).

## Items needing your review

| # | Item | Question |
|---|------|----------|
| 1 | **Grid Theory** | The repository `clickysteve/grid-theory` is **private**, so the GitHub link on iamsteve.in/projects returns 404 to visitors. It is listed as *In development* with no links and the note "Not yet public". Make the repo public (or give a release URL) and add `links.source`. No screenshot is available. |
| 2 | **Cartridge Index screenshot** | The live app opens behind a Google sign-in, so no representative screenshot could be captured without signing in to your account. It uses a typographic placeholder. A screenshot of your own library would be the obvious fix. |
| 3 | **OpenNura screenshot** | No screenshot of the app exists in the repo or the blog post (the post's only image is a 2018 photo of the headphones). Placeholder used. |
| 4 | **Statuses** | Feelers, FrakMC, ANVIL and DOWNBEAT are marked *Experimental* because their GitHub descriptions say "Experimental"; emmm's does not, so it is *Live*. M8 Librarian and picoTracker Librarian are *Beta* (both say so in the app and README). OpenNura is *Experimental* per its README. Adjust in `projects.ts` if you see them differently. |
| 5 | **Loop Saboteur** | v1.0.0 with a manual, but no binary release on GitHub, so it has *Manual* and *Source* buttons and no Download. Add `links.download` if builds are published. |
| 6 | **allmyfriendsaresynths / Bandcamp** | `allmyfriendsaresynths.com` does not resolve, and `allmyfriendsaresynths.bandcamp.com` does not exist. "allmyfriendsaresynths" therefore links to the YouTube channel (as on iamsteve.in), and "Bandcamp" is the Cow Tongue Taco Records page. These are one entry each rather than duplicates. |
| 7 | **Featured** | emmm, The Good Bits, BENDR and DMG Darkroom: one per department with strong screenshots. Change with `featured: true` in `projects.ts`. |
| 8 | **The Good Bits URL** | The README says the live app is at `clickysteve.github.io/the-good-bits/`; the Pages configuration serves it at `thegoodbits.allmyfriendsaresynths.com`, which is what the site uses. The README could be updated. |
| 9 | **Mega-Tools URL** | Same as above: README says `clickysteve.github.io/mega-tools/`, Pages serves `mega-tools.allmyfriendsaresynths.com`. |
| 10 | **Production domain** | `slopfactory.allmyfriendsaresynths.com` does not resolve yet. DNS has not been touched (see README › Deployment). |

## Included in the catalogue

### Generative Music

| Project | Live | Source | Status | Screenshot | Notes |
|---|---|---|---|---|---|
| **emmm** | <https://emmm.allmyfriendsaresynths.com/> | [emmm](https://github.com/clickysteve/emmm) | Live | Captured from the live app (`?demo`) | Recreation and continuation of *M* (Intelligent Music, 1986–87). Docs: [Quick Start](https://github.com/clickysteve/emmm/blob/main/docs/QUICK-START.md). Not on iamsteve.in. |
| **Feelers** | <https://feelers.allmyfriendsaresynths.com/> | [feelers](https://github.com/clickysteve/feelers) | Experimental | Captured from the live app (default "First Contact") | Inspired by Dr. T's *Fingers* (Emile Tobenfeld, 1988) and MIDI-AX. In-app guide; no separate quick start. Not on iamsteve.in. |
| **FrakMC** | <https://frakmc.allmyfriendsaresynths.com/> | [frakmc](https://github.com/clickysteve/frakmc) | Experimental | `docs/images/qs-julia.png` from the repo | Hugh McDowell's *Fractal Music Composer 2*. Docs: [Quick Start](https://github.com/clickysteve/frakmc/blob/main/docs/QUICK-START.md). Not on iamsteve.in. |
| **ANVIL** | <https://anvil.allmyfriendsaresynths.com/> | [anvil](https://github.com/clickysteve/anvil) | Experimental | Captured from the live app (Colour palette, themes generated) | Dr. T's *Tunesmith* (Jim Johnson, 1988–91). Not on iamsteve.in. |
| **DOWNBEAT** | <https://downbeat.allmyfriendsaresynths.com/> | [downbeat](https://github.com/clickysteve/downbeat) | Experimental | `docs/images/downbeat.png` from the repo | Intelligent Music's *UpBeat* (1987). Docs: [Quick Start](https://github.com/clickysteve/downbeat/blob/main/docs/QUICK_START.md). Not on iamsteve.in. |

### Audio & Music Tools

| Project | Live / download | Source | Status | Screenshot | Notes |
|---|---|---|---|---|---|
| **The Good Bits** | <https://thegoodbits.allmyfriendsaresynths.com/> | [the-good-bits](https://github.com/clickysteve/the-good-bits) | Live | Captured from the live app after processing a synthesised drum loop | Chop, Stretch, Both, Play Nice, Flip, Stretch FX, Lab. The audio was generated for the screenshot; no third-party recordings. |
| **Loop Saboteur** | Manual: <https://clickysteve.github.io/Loop-Saboteur/> | [Loop-Saboteur](https://github.com/clickysteve/Loop-Saboteur) | Live (v1.0.0, build from source) | `docs/loop-saboteur-UI.png` from the repo | JUCE 8 AU/VST3 plugin, GPL-3.0. |
| **Grid Theory** | none | private | In development | none | See review item 1. |
| **M8 Librarian** | <https://m8librarian.allmyfriendsaresynths.com/> | [m8-librarian](https://github.com/clickysteve/m8-librarian) | Beta (v0.4.1) | Captured from the live app's synthetic demo card | Dirtywave M8 SD card librarian. |
| **picoTracker Librarian** | <https://pt-librarian.allmyfriendsaresynths.com/> | [pico-tracker-librarian](https://github.com/clickysteve/pico-tracker-librarian) | Beta | `screenshots/pattern-editor.png` from the repo | Named "Pico Tracker Librarian" on iamsteve.in; the app calls itself "picoTracker Librarian". Projects page links with `http://`; the site uses `https://`. |
| **Mega-Tools** | <https://mega-tools.allmyfriendsaresynths.com/> | [mega-tools](https://github.com/clickysteve/mega-tools) | Live | Captured from the live site | Represented as **one entry**: the suite has ten tools, most of them little-scale's GENMDDJ `user-tools` copied in as-is. The two parts built in this repo (palette patcher features, GENMDDJ Web Player) are described in the entry. Listing each tool would flood the catalogue with near-identical entries. |
| **OpenNura for Mac** | [v1.0.0 release](https://github.com/clickysteve/open-nura-mac/releases/tag/v1.0.0) | [open-nura-mac](https://github.com/clickysteve/open-nura-mac) | Experimental | none | Fork of jamesy0ung/opennura. Docs: [blog post](https://iamsteve.in/2026/07/30/opennura-for-macos/). Included as requested; it is an audio-hardware utility rather than a creative tool. |
| **Music Collection DB** | <https://music.clickysteve.com/> | [music-collection](https://github.com/clickysteve/music-collection) | Live | Captured from the live site | Notion + Last.fm gallery of a CD and vinyl collection. Shows album artwork from the collection. |

### Video & Visual Tools

| Project | Live / download | Source | Status | Screenshot | Notes |
|---|---|---|---|---|---|
| **BENDR** | <https://bendr.allmyfriendsaresynths.com/> | [bendr](https://github.com/clickysteve/bendr) | Live | `docs/doc_ui.png` from the repo | Circuit-bent video processor. Written "BENDR" in the app and README, "Bendr" on iamsteve.in. |
| **LC-1X+ MIDI2DMX** | [latest release](https://github.com/clickysteve/LC-1X-Plus-MIDI-2-DMX-Plugin/releases/latest) | [LC-1X-Plus-MIDI-2-DMX-Plugin](https://github.com/clickysteve/LC-1X-Plus-MIDI-2-DMX-Plugin) | Live (v1.3.1) | `LC1XPLUSPLUGIN.png` from the repo | **Lighting control**: a MIDI FX plugin driving DMX fixtures via the BoomLights LC-1X+. Filed under Video & Visual, not Audio. Unofficial; not affiliated with BoomLights. Release assets: macOS pkg/AU/VST3/app, Windows VST3/standalone. |

### Photography & Imaging

| Project | Live | Source | Status | Screenshot | Notes |
|---|---|---|---|---|---|
| **DMG Darkroom** | <https://dmgdarkroom.allmyfriendsarejpegs.com/> | [dmg-darkroom](https://github.com/clickysteve/dmg-darkroom) | Live | Captured from the live app with a synthetic save | The save was built in the page with the app's own `GBCam.writePhotoToSlot` (the same technique as its e2e tests) and contains generated patterns, not real photos. Docs: [blog post](https://iamsteve.in/2026/05/07/dmg-darkroom-gb-camera-companion-app/). Written "DMG DarkRoom" in the app. |

### Other Creative Tools

| Project | Live | Source | Status | Screenshot | Notes |
|---|---|---|---|---|---|
| **Cartridge Index** | <https://games.clickysteve.com/> | [cartridge-index](https://github.com/clickysteve/cartridge-index) | Live | none (sign-in wall) | Analogue Pocket library manager. Kept out of any games category, as asked. See review item 2. |

## Other Places

| Destination | URL | Verified as |
|---|---|---|
| allmyfriendsaresynths (YouTube) | <https://www.youtube.com/c/allmyfriendsaresynths> | Channel "Stephen McLeod": electronic music, glitchy visuals, unusual gear |
| Cow Tongue Taco Records (Bandcamp) | <https://cowtonguetacorecords.bandcamp.com/> | "Independent, tape based label from Glasgow"; the label most of the music is released on |
| AMFAS Music Library | <https://musiclibrary.allmyfriendsaresynths.com/> | CC BY-NC-SA music library ([repo](https://github.com/clickysteve/amfas-music-library)) |
| AMFAS Shop | <https://shop.allmyfriendsaresynths.com/> | "allmyfriendsaresynths – i make stuff": music, photo books and other offerings |
| iamsteve.in projects | <https://iamsteve.in/projects/> | The existing projects page |
| GitHub | <https://github.com/clickysteve> | Source for most of the catalogue |

Also verified but **not** included (photography portfolios, not software; easy to add to
`places.ts` if wanted): <https://allmyfriendsarejpegs.com/> (photo blog) and
<https://stephenmcleodphoto.com/> (photography folio).

## Considered and excluded

| Repository / item | Why |
|---|---|
| `octabam`, `octemu` | Forks of other people's Octatrack projects (sambanks/octabam, markandrus/octemu). Interesting, but not original work. |
| `genmddj` | Fork of little-scale/genmddj. Represented through Mega-Tools instead. |
| `midigrid` | Fork of jaggednz/midigrid (a norns helper library), last touched 2022. |
| `amfas-music-library` | A music library rather than a tool: listed under Other Places. |
| `Oh-Mother-Earthbound-Save-File-Editor` | A save-file editor for an SNES game. Not a creative tool, and there is no games category. |
| `greek-grammar-practice`, `holding-pattern-daily-planner` | Learning and productivity tools, not creative software. |
| `alfred-remote-workflows`, `Alfred-Workflows`, `alfred-workflows-1`, `vlc-alfred-remote-control`, `Keyboard-Maestro-Macros`, `PopClip-Extensions` | Automation and macOS utilities. |
| `qmk_keyboard_layouts`, keyboard and iPod build logs | Hardware hobby projects and logs, not software in the catalogue sense. |
| `legal-process-review-tool`, `legal-templates`, `legalmattic`, `policy`, `dmca` | Legal and work projects. |
| `notifyslack`, `clickysteve.github.io`, `test`, `info`, `TrackerIssues` | Old utilities, scaffolding or empty. |
| Publications, allmyfriendsarejpegs.com, stephenmcleodphoto.com | Not software (see Other Places note above). |

## Local folders not on GitHub

`~/Documents/Scripts` also contains `FMC`, `M`, `micro-nation` and `good-bits-sample-chopper`.
They were not inspected in depth and nothing from them is published: the catalogue only lists
work with a public presence. `micro-nation` may be a future entry.

## Screenshot sources

Source images are in [`assets/screenshots/`](../assets/screenshots/), named by project id; the
web versions in `public/screenshots/` are generated from them by `npm run images`. Live
captures were taken on 11 October 2026 at 1440 × 900 in headless Chrome. Web MIDI was stubbed
with an empty device list so the apps showed their normal no-device state rather than a
permission error. Repository images are used unchanged apart from resizing to at most 1600 px
wide. Each entry's `screenshot.source` field in `projects.ts` records its origin.
