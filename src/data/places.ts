import type { Place } from './types.ts';

/** Other places: the wider allmyfriendsaresynths world. External destinations, not software. */
export const places: Place[] = [
  {
    id: 'youtube',
    name: 'allmyfriendsaresynths',
    kind: 'YouTube',
    url: 'https://www.youtube.com/c/allmyfriendsaresynths',
    description: 'Electronic music, glitchy visuals and unusual gear.',
  },
  {
    id: 'cow-tongue-taco',
    name: 'Cow Tongue Taco Records',
    kind: 'Bandcamp',
    url: 'https://cowtonguetacorecords.bandcamp.com/',
    description: 'Small independent tape label from Glasgow. Most of the music lives here.',
  },
  {
    id: 'music-library',
    name: 'AMFAS Music Library',
    kind: 'Free music',
    url: 'https://musiclibrary.allmyfriendsaresynths.com/',
    description: 'Creative Commons music for film-makers, vloggers and independent artists.',
  },
  {
    id: 'shop',
    name: 'AMFAS Shop',
    kind: 'Shop',
    url: 'https://shop.allmyfriendsaresynths.com/',
    description: 'Music, photo books and other creative offerings.',
  },
  {
    id: 'projects',
    name: 'iamsteve.in',
    kind: 'Projects',
    url: 'https://iamsteve.in/projects/',
    description: 'The wider list of things cobbled together, including the ones that are not software.',
  },
  {
    id: 'github',
    name: 'clickysteve',
    kind: 'GitHub',
    url: 'https://github.com/clickysteve',
    description: 'Source code for most of the catalogue.',
  },
];
