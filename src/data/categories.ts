import type { Category } from './types.ts';

/** The catalogue's departments. Colours live in src/styles/tokens.css as --cat-<id>. */
export const categories: Category[] = [
  {
    id: 'generative',
    name: 'Generative Music',
    navLabel: 'Generative',
    blurb:
      'Browser instruments that compose with you. Each is a new take on a half-forgotten piece of late-80s music software, and all of them play your MIDI hardware.',
    order: 1,
  },
  {
    id: 'audio',
    name: 'Audio & Music Tools',
    navLabel: 'Audio',
    blurb: 'Sample choppers, plugins, librarians for small trackers, and other things for people who own too many synths.',
    order: 2,
  },
  {
    id: 'video',
    name: 'Video & Visual Tools',
    navLabel: 'Video',
    blurb: 'Pictures that misbehave, and lights that follow the music.',
    order: 3,
  },
  {
    id: 'photo',
    name: 'Photography & Imaging',
    navLabel: 'Photo',
    blurb: 'Image tools for unreasonably low-resolution cameras.',
    order: 4,
  },
  {
    id: 'other',
    name: 'Other Creative Tools',
    navLabel: 'Other',
    blurb: 'Useful things that did not fit in any of the other drawers.',
    order: 5,
  },
];
