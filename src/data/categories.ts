import type { Category } from './types.ts';

/** The catalogue's departments. Colours live in src/styles/tokens.css as --cat-<id>. */
export const categories: Category[] = [
  {
    id: 'reimagined',
    name: 'Reimagined Instruments',
    navLabel: 'Reimagined',
    aliases: ['generative'],
    blurb:
      'Forgotten ideas from the early days of computer music, rebuilt and expanded for modern machines. Not simply recreations, but explorations of what those instruments could have become.',
    order: 1,
  },
  {
    id: 'audio',
    name: 'Audio & Music Tools',
    navLabel: 'Audio',
    blurb: 'Original instruments, sample manglers, plugins, librarians and other things for people who own too many synths.',
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
    id: 'misc',
    name: 'Miscellany',
    navLabel: 'Miscellany',
    aliases: ['other'],
    blurb: "Useful oddities, peculiar experiments and things that don't fit neatly into the other drawers.",
    order: 5,
  },
];
