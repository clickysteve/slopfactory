/**
 * The shape of the Slop Factory catalogue. Everything the site shows about a tool comes from
 * one Project entry in projects.ts; nothing about a project is written anywhere else.
 */

export type CategoryId = 'reimagined' | 'audio' | 'video' | 'photo' | 'misc';

/**
 * How finished a project is. `live` means released and usable (it may still be a plugin or a
 * desktop app rather than a website); the others are shown as a badge on the card.
 */
export type Status = 'live' | 'beta' | 'experimental' | 'in-development' | 'archived';

export interface Category {
  id: CategoryId;
  /** Section heading, e.g. "Reimagined Instruments". */
  name: string;
  /** Short label for the navigation bar, e.g. "Reimagined". */
  navLabel: string;
  /** Earlier anchor ids for this section, so old links such as #generative still land here. */
  aliases?: string[];
  /** One or two sentences under the section heading. */
  blurb: string;
  /** Position on the page, lowest first. */
  order: number;
}

export interface Screenshot {
  /**
   * Base name of the image in public/screenshots/. The site uses `<file>-thumb.webp` on the
   * card and `<file>.webp` in the information window (both made by `npm run images`).
   */
  file: string;
  /** What the screenshot shows, for screen readers. */
  alt: string;
  /** CSS object-position for the card crop, e.g. "top" or "left 20%". Defaults to centre. */
  position?: string;
  /** Where the image came from, for docs/PROJECT-INVENTORY.md and anyone maintaining it. */
  source: string;
}

export interface ProjectLinks {
  /** The running web application. Rendered as the main LAUNCH button. */
  launch?: string;
  /** A download or release page, for plugins and desktop apps. */
  download?: string;
  /** Public source repository. */
  source?: string;
  /** Manual, quick start guide or other documentation. */
  docs?: string;
}

export interface Project {
  /** Unique, lowercase, URL-safe. Used for anchors and the information window (#info/<id>). */
  id: string;
  name: string;
  category: CategoryId;
  status: Status;
  /** What it runs on, e.g. "Browser", "AU / VST3 plugin". */
  platform: string;
  /** One sentence for the catalogue card. */
  summary: string;
  /** Paragraphs for the information window. */
  description: string[];
  /** Short feature list for the information window. */
  features?: string[];
  /** The historical software or hardware it is inspired by, if any. */
  inspiration?: string;
  tags?: string[];
  links: ProjectLinks;
  screenshot?: Screenshot;
  /** Shown in the Featured strip at the top of the page. */
  featured?: boolean;
  /** Position within its category, lowest first. */
  order: number;
  /** Shown on the card when there is no link to offer, e.g. "Not yet public". */
  availabilityNote?: string;
}

export interface Place {
  id: string;
  name: string;
  url: string;
  /** Short line of description. */
  description: string;
  /** Kind of destination, shown as a small label, e.g. "YouTube", "Shop". */
  kind: string;
}
