import type { Project } from './types.ts';

/**
 * The project registry. To add a tool, add an entry here, put its screenshot in
 * assets/screenshots/<id>.png and run `npm run images`. See README.md.
 *
 * Every fact here comes from the project's own README, documentation or live site. Sources
 * and open questions are recorded in docs/PROJECT-INVENTORY.md.
 */
export const projects: Project[] = [
  // ── Reimagined Instruments ──────────────────────────────────────────────────────────────────
  {
    id: 'emmm',
    name: 'emmm',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Give it a few notes and conduct four voices in real time: a modern recreation and continuation of M, the interactive composing program.',
    description: [
      'emmm is a recreation and continuation of M, the interactive composing and performing program made at Intelligent Music in 1986–87. You give it a few notes; it plays them continuously through four Voices, and you shape which notes, how often, how loud, how long and how swung while you listen.',
      'It reproduces M’s own model (Patterns, Voices, Variables with six Positions, Cyclic Variables, conducting, Hold/Do, Snapshots and Slideshows) and its dense 1-bit control-panel look. It plays your MIDI hardware through Web MIDI, with a small internal monitor sound for browsers without it.',
    ],
    features: [
      'Conduct with the mouse, recall Snapshots, or play into it from a MIDI keyboard',
      'Pattern Editor, Time Distortion, Slideshows and the Robot Conductor',
      'MIDI file export and import, MIDI clock in and out',
      'Seeded randomness, autosave, undo, and colour palettes',
    ],
    inspiration: 'M, by Joel Chadabe, David Zicarelli, John Offenhartz and Antony Widoff (Intelligent Music, 1986–87).',
    tags: ['MIDI', 'generative', 'performance'],
    links: {
      launch: 'https://emmm.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/emmm',
      docs: 'https://github.com/clickysteve/emmm/blob/main/docs/QUICK-START.md',
    },
    screenshot: {
      file: 'emmm',
      alt: 'emmm playing its demo document: black-and-white Patterns, Variables, Cyclic Variables and Midi windows on a 1-bit desktop.',
      position: 'left top',
      source: 'Captured from the live app with the ?demo document loaded.',
    },
    featured: true,
    order: 1,
  },
  {
    id: 'feelers',
    name: 'Feelers',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Four lines reach into a bank of Time, Pitch, Velocity and Legato series, and you steer the combinations as they evolve.',
    description: [
      'Feelers is an interactive MIDI composition instrument. Every note is assembled on the spot from four independently moving read heads, one each on a Time, Pitch, Velocity and S/L (staccato/legato) series. Because the series have different lengths, directions and control elements, the combinations keep evolving.',
      'You steer them while they play: rewrite material, reverse heads, loop, skip, rest, transpose, pause, mute, push lines out of phase and let marked values wander. The musical model follows Emile Tobenfeld’s Dr. T’s Fingers as documented in its manual; Feelers is an independent implementation, not a port, and is not affiliated with the original author or publisher.',
    ],
    features: [
      'Skip, Rest, Loop, End of Series and Column Link marks',
      'Scale Mode, auto-randomisation and Restore Last Start',
      'MIDI clock out, mono and legato note modes for CV/gate modules',
      'Built-in preview synth, six demos, palettes and MIDI takes',
    ],
    inspiration: 'Dr. T’s Fingers (Emile Tobenfeld, Atari ST, 1988) and MIDI-AX.',
    tags: ['MIDI', 'generative', 'series'],
    links: {
      launch: 'https://feelers.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/feelers',
    },
    screenshot: {
      file: 'feelers',
      alt: 'Feelers with its default setup: a series bank of Time, Pitch, Velocity and S/L columns beside four coloured line panels.',
      position: 'left top',
      source: 'Captured from the live app with the default “First Contact” setup.',
    },
    order: 2,
  },
  {
    id: 'frakmc',
    name: 'FrakMC',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary: 'Turns the Mandelbrot and Julia sets into music for up to six MIDI instruments.',
    description: [
      'FrakMC turns the Mandelbrot and Julia sets into music for up to six MIDI instruments. Each track reads a note box and a length box on a Mandelbrot plot, one pixel per note, and each pixel’s escape count picks the pitch through the track’s range, scale patterns, tonality map and rhythm map. In Julia mode, six Julia sets are drawn dot by dot while they play.',
      'It follows the musical model of Hugh McDowell’s Fractal Music Composer 2 for the Atari ST, worked out from its manual and from examining the program, with its own GEM-style interface. It is an independent implementation, not an official port, and is not affiliated with the original author or publishers.',
    ],
    features: [
      'Composer, Rhythm Map, Tonality Map and Scale Pattern editors',
      'Set Coordinates and Explore (zoom) screens',
      'MIDI monitor, panic button and MIDI file export',
      'MIDI File Analyser, and import of data files from your own copy of the original',
    ],
    inspiration: 'Fractal Music Composer 2, by Hugh McDowell (Atari ST).',
    tags: ['MIDI', 'generative', 'fractals'],
    links: {
      launch: 'https://frakmc.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/frakmc',
      docs: 'https://github.com/clickysteve/frakmc/blob/main/docs/QUICK-START.md',
    },
    screenshot: {
      file: 'frakmc',
      alt: 'FrakMC in Julia mode: six Julia sets drawn dot by dot in black on white, with a MIDI monitor listing notes on the right.',
      source: 'docs/images/qs-julia.png in the FrakMC repository.',
    },
    order: 3,
  },
  {
    id: 'anvil',
    name: 'ANVIL',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Set the rules; ANVIL composes short themes, makes variations of them and plays them through up to six voices of accompaniment.',
    description: [
      'ANVIL is an algorithmic MIDI composition instrument. You set constraints for rhythm, pitch and variation; it composes short themes from them, makes variations, and plays them through up to six voices of accompaniment derived from the theme, on your MIDI hardware or its own preview sound. The name follows a line of descent: Tunesmith → smith → anvil.',
      'Its Classic mode reconstructs the documented and observed behaviour of Dr. T’s Tunesmith; Extended mode adds new tools such as regenerating only the rhythm or pitches, locking notes and mutating. ANVIL contains none of the original’s code or data and is not affiliated with its author or publisher.',
    ],
    features: [
      'Five themes × three variations, with a note-level theme editor',
      'Six rhythm algorithms and weighted pitch rules, 38 + 8 scales',
      'Accompaniment voices with rhythm, Divide and harmony from the theme',
      'Arranger, MIDI clock in and out, Standard MIDI File export',
    ],
    inspiration: 'Dr. T’s Tunesmith (Jim Johnson, Dr. T’s Music Software, 1988–91).',
    tags: ['MIDI', 'generative', 'algorithmic'],
    links: {
      launch: 'https://anvil.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/anvil',
    },
    screenshot: {
      file: 'anvil',
      alt: 'ANVIL in its Colour palette: constraints on the left, a grid of generated themes and variations, and a piano-roll theme view.',
      position: 'left top',
      source: 'Captured from the live app (Colour palette, several themes generated).',
    },
    order: 4,
  },
  {
    id: 'downbeat',
    name: 'DOWNBEAT',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'A modern reimagining of Upbeat: an intelligent drum machine that thins, fills, shifts, evolves, breeds and morphs the patterns you write, with samples and WAV export.',
    description: [
      'DOWNBEAT is a browser instrument for drums and percussion. You establish a rhythm; DOWNBEAT explores what it could become. Keep intervening while it plays: thin it out, fill the gaps, shift it, let it evolve, breed it with another pattern, morph between two, or leave the autopilot running. What you wrote is never changed, and the grid always shows which hits are yours, which were generated and which were suppressed.',
      'It plays immediately through its own synthesised drum sounds, can swap in your own samples, exports audio and stems as WAV, and is a full MIDI instrument besides. CLASSIC mode is a clean-room reading of the documented features of Intelligent Music’s UpBeat; EXTENDED adds probability, groove, Euclidean patterns, breeding, morphing and rules.',
    ],
    features: [
      'Velocity strikers, flams, density, fills and per-track loop points',
      'Evolution, mutation, breeding, morphing and an autopilot',
      'Per-voice MIDI channels and notes, clock in and out',
      'Load your own samples; export WAV, per-voice stems or a ZIP',
      'Standard MIDI File export and import, six original demos',
    ],
    inspiration: 'UpBeat, “the intelligent rhythm programmer” (Intelligent Music, 1987; created by John Offenhartz).',
    tags: ['drums', 'MIDI', 'generative'],
    links: {
      launch: 'https://downbeat.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/downbeat',
      docs: 'https://github.com/clickysteve/downbeat/blob/main/docs/QUICK_START.md',
    },
    screenshot: {
      file: 'downbeat',
      alt: 'DOWNBEAT playing a jungle demo: a drum grid with source, generated and suppressed hits, and the Evolve panel below.',
      position: 'left top',
      source: 'docs/images/downbeat.png in the DOWNBEAT repository.',
    },
    order: 5,
  },
  {
    id: 'squared',
    name: 'SQUARED',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Explore harmony by moving across a grid where every cell is a four-note chord: across changes one pair of notes, up changes the other.',
    description: [
      'SQUARED is a MIDI instrument for exploring melody and harmony through two-dimensional movement. Every cell of its grid (16 × 16 by default) is a four-note chord: moving across changes one pair of notes, moving up changes the other, with the harmony intervals for each axis counted in scale degrees. When you move, common tones keep sounding.',
      'Play it with the mouse, drive it from a hardware sequencer with two CC lanes and a trigger note, or let its own coordinate sequencer walk the grid in time with internal or external MIDI clock. It makes no sound itself: it plays your synthesizers, on one channel or four. It is an unofficial spiritual successor to David Snow’s MIDI Square, a clean-room implementation with its own interface, and is not affiliated with the original developer.',
    ],
    features: [
      'Root, scale, octave and harmony interval for each axis',
      'Gated or latched play, POLY or MULTI channel routing',
      'External X/Y control by CC, coordinate sequencer, clock in and out',
      'MIDI Learn, grid sizes from 4 to 32, project files and autosave',
    ],
    inspiration: 'MIDI Square, by David Snow (Atari ST).',
    tags: ['MIDI', 'generative', 'harmony'],
    links: {
      launch: 'https://squared.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/squared',
    },
    screenshot: {
      file: 'squared',
      alt: 'SQUARED with the cursor mid-grid: scale and harmony settings on the left, the chord grid with its crosshair, the four sounding notes and MIDI panels on the right, and the coordinate sequencer below.',
      source: 'Captured from a local build of the SQUARED repository (main at 482b51e).',
    },
    order: 6,
  },
  {
    id: 'picturescue',
    name: 'PICTURESCUE',
    category: 'reimagined',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Pictures make music: load an image and four scanning regions read its colours and shapes into evolving MIDI performances.',
    description: [
      'PICTURESCUE is an image-driven MIDI instrument. Load a picture, place four regions on it, and a cursor in each scans its cells, turning brightness, hue, saturation, edges or the 16-colour ST palette into pitch, velocity and MIDI CC. It is an algorithmic instrument, not an AI one: every note comes from visible rules, and the same picture, settings and seed always give the same music.',
      'It plays through five small internal sounds or your MIDI hardware, with seven scan modes, six interpretation modes, one global scale, seeds, randomise with locks, WILDCARD, factory presets and Standard MIDI File export. It is a clean-room successor to Gareth Jones’s Picture Music and uses none of the original’s code, graphics or data.',
    ],
    features: [
      'Four editable regions, each with its own channel, range, sound and scan',
      'Seven scan modes, reverse, rate, length and offset',
      'Pitch, velocity and trigger mapped from brightness, hue, saturation, edges or ST COLOUR',
      'Open your own pictures or use nine built-in demos; patches, presets and MIDI file export',
    ],
    inspiration: 'Picture Music, by Gareth Jones (Atari ST, public domain).',
    tags: ['MIDI', 'generative', 'images'],
    links: {
      launch: 'https://picturescue.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/picturescue',
    },
    screenshot: {
      file: 'picturescue',
      alt: 'PICTURESCUE playing its ST low-res demo picture: four regions outlined on a pixel-art landscape, with transport, region settings and an activity roll around it.',
      source: 'Captured from a local build of the PICTURESCUE repository (main at 998c216), demo picture playing.',
    },
    order: 7,
  },

  // ── Audio & Music Tools ─────────────────────────────────────────────────────────────────────
  {
    id: 'breakery',
    name: 'The Breakery',
    category: 'audio',
    status: 'live',
    platform: 'Browser',
    summary:
      'A generative breakbeat instrument built around your own drum samples. Bake, chop, mutate and roll everything from funk to jungle, edit every hit, then export it as WAV.',
    description: [
      'The Breakery is a generative breakbeat instrument. You bring the ingredients (drum one-shots); it invents the recipe: an original drum performance, with a backbeat that anchors, kicks that syncopate, ghost notes that answer the snare, hats that keep time with a drummer’s accents, a feel, and a turnaround that pushes back into the top of the loop. It is not a step sequencer: you guide it with a recipe (FUNK, HIP-HOP, JUNGLE, D&B, BREAKCORE and more), a tempo and a handful of controls, and it composes. Then you can take over: every hit can be added, moved, deleted or changed by hand.',
      'Bake one break or a batch of eight, freeze the layers you like while baking again, chop and mutate it into related sections, and take the result away as a WAV to sample, slice and rearrange in your sampler or DAW. Your samples stay in the browser and are never uploaded; on a first visit a synthesised demo kit lets you try everything at once.',
    ],
    features: [
      'Eleven recipes, from FUNK and HIP-HOP to JUNGLE, D&B and BREAKCORE',
      'Density, syncopation, ghosts, swing, humanise, fills, toms and rolls',
      'CHOP and MUTATE tabs, BATCH of eight candidates, and FREEZE for the layers you like',
      'Hand-edit any hit, with a mixer and an output chain',
      'WAV export as bars plus tail or a seamless loop, with optional stems and MIDI file',
      'Drop in WAV or AIFF one-shots, sorted into categories by file name',
    ],
    tags: ['drums', 'breakbeat', 'generative'],
    links: {
      launch: 'https://breakery.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/the-breakery',
    },
    screenshot: {
      file: 'breakery',
      alt: 'The Breakery with its demo kit: ingredients on the left, the FUNK recipe and bake controls above, a two-bar break in the pattern view, and a batch of eight candidates below.',
      source: 'Captured from a local build of The Breakery repository (main at dc97fba).',
    },
    order: 1,
  },
  {
    id: 'clatter',
    name: 'CLATTER',
    category: 'audio',
    status: 'live',
    platform: 'Browser · Web MIDI',
    summary:
      'Generative drum synthesis and rhythmic destruction: generate a rhythm and a kit on the LXR-02 engine, then chop, roll and mangle what plays.',
    description: [
      'CLATTER is a drum workstation built from three systems that stay independent. RHYTHM generates seeded patterns in eleven styles, with variation, mutation, per-track density, fills, chance and polymetric lengths, and a step editor whose hand edits survive regeneration. SOUND runs the drum voices, filters, modulation and FX of the Erica Synths LXR-02’s open-source firmware, compiled to WebAssembly. DESTRUCTION chops, rolls and destroys each cycle without touching what you wrote.',
      'Every track is a synth voice, a sample, or both together. GENERATE KIT designs a kit for the style; MUTATE and LOCK change it in controlled ways. A PERFORM view gives you quantised pads, fills, mutes, macros and snapshots. It is an independent project, not an Erica Synths product, and its source is released under the GPL.',
    ],
    features: [
      'Eleven generator styles, seeded, with a step editor for velocity, probability, pitch, ratchets and flams',
      'LXR-02 drum engine, with SYNTH, SAMPLE and HYBRID tracks and kit generation and mutation',
      'CHOP, ROLLS, DESTROY and WILDCARD transformations, switched off to restore the written pattern',
      'Mixer, FX bus, PERFORM view, Web MIDI notes and clock, eight factory presets',
      'Export the master, stems, a MIDI file, every drum hit or the kit',
    ],
    inspiration: 'The Erica Synths LXR-02 drum synthesizer (open-source firmware), with rhythm intelligence after DOWNBEAT.',
    tags: ['drums', 'synthesis', 'generative'],
    links: {
      launch: 'https://clatter.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/clatter',
      docs: 'https://github.com/clickysteve/clatter/blob/main/docs/ARCHITECTURE.md',
    },
    screenshot: {
      file: 'clatter',
      alt: 'CLATTER playing a generated MACHINE pattern: a ten-track, two-bar step grid in 1-bit black and white, with the generator controls and Evolve panel below.',
      position: 'left top',
      source: 'Captured from a local build of the CLATTER repository (main at 0c5b524), default project, after GENERATE and GENERATE KIT.',
    },
    order: 2,
  },
  {
    id: 'good-bits',
    name: 'The Good Bits',
    category: 'audio',
    status: 'live',
    platform: 'Browser',
    summary:
      'Point it at long recordings and it finds the phrases, chops and one-shots worth keeping, then stretches, conforms, flips or mangles them into something new.',
    description: [
      'The Good Bits is a fast first pass for sampling. Point it at folders of long source recordings (solo horns, Rhodes, drum breaks) and it finds candidate phrases for you to audition and load into hardware samplers later. It does not try to replace your own chopping decisions.',
      'It is organised around what you are trying to do: Chop, Stretch (with Stretch FX, which melts a break into time-stretched malfunction effects), Play Nice (conform unrelated loops to one tempo and key), Flip (automatic remixes of one loop) and Lab (grow small, unfamiliar DSP algorithms and keep the good ones). Everything runs in your browser; nothing is uploaded.',
    ],
    features: [
      'Key, tempo and onset detection, with a live waveform editor',
      'Process to preview every cut; Export to write them',
      'Time-stretch and lo-fi chain, one-shot extraction',
      'Flip remixes, Stretch FX and the Lab',
    ],
    tags: ['sampling', 'audio', 'time-stretch'],
    links: {
      launch: 'https://thegoodbits.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/the-good-bits',
    },
    screenshot: {
      file: 'good-bits',
      alt: 'The Good Bits after processing a drum loop: a waveform cut into four one-bar chops, with naming and detection settings on the left.',
      position: 'left top',
      source: 'Captured from the live app after processing a synthesised drum loop (Chop task, Drums, 1 bar).',
    },
    featured: true,
    order: 3,
  },
  {
    id: 'loop-saboteur',
    name: 'Loop Saboteur',
    category: 'audio',
    status: 'live',
    platform: 'AU / VST3 plugin',
    summary:
      'A destructive glitch and beat-slicing plugin that grabs the last few bars of audio and sabotages them with a step sequencer.',
    description: [
      'Loop Saboteur sits in an insert slot and keeps a rolling recording of the last few bars. When it decides to fire, on a host-synced grid or a free-running clock, it reaches back into that buffer, grabs a slice and plays it through a chain of stutter, ratchet, reverse, filter, bit-crush, stretch and stereo effects before mixing it against the dry signal.',
      'The creative surface is built around eight Acts (A–H), each a snapshot of every knob plus four LFOs, which are stamped onto a step sequencer or fired by probability, with parameter locks, ratchets, mutes and freezes on top.',
    ],
    features: [
      'Eight Acts with their own LFOs',
      'Step sequencer with trig conditions, p-locks and ratchets',
      'Slice, Play, Colour, Crunch and Space sections',
      'AU and VST3 on macOS; VST3 on Windows and Linux (built from source with JUCE 8)',
    ],
    inspiration: 'The beat-slicing tradition of µ-Ziq, Aphex Twin and OctaMED.',
    tags: ['plugin', 'glitch', 'effects'],
    links: {
      docs: 'https://clickysteve.github.io/Loop-Saboteur/',
      source: 'https://github.com/clickysteve/Loop-Saboteur',
    },
    screenshot: {
      file: 'loop-saboteur',
      alt: 'Loop Saboteur’s plugin window: orange-on-black knob rows for Slice, Play, Colour, Crunch and Space above a 16-step Acts sequencer.',
      position: 'top',
      source: 'docs/loop-saboteur-UI.png in the Loop Saboteur repository.',
    },
    order: 4,
  },
  {
    id: 'grid-theory',
    name: 'Grid Theory',
    category: 'audio',
    status: 'in-development',
    platform: 'AU MIDI FX plugin (macOS)',
    summary: 'A step sequencer that sequences step sequencers: nested Songs, Blocks and Acts driving any synth from your DAW.',
    description: [
      'Grid Theory is a MIDI FX plugin built for deep step sequencing (conditional trigs, parameter locks, probability, ratchets and scene chaining) to drive any synth in any DAW, rather than being a synth itself.',
      'Three nested sequencer levels share the same grammar: a Song sequences Blocks, a Block sequences Acts, and each Act is a self-contained 16-step pattern with its own scale and voicing. It has Mono, Poly, Drum, Arp and Chord modes.',
    ],
    features: ['Song › Block › Act › Grid nesting', 'Mono, Poly, Drum, Arp and Chord modes', 'Probability, p-locks, ratchets and LFOs'],
    tags: ['plugin', 'sequencer', 'MIDI'],
    links: {},
    availabilityNote: 'Not yet public',
    order: 5,
  },
  {
    id: 'm8-librarian',
    name: 'M8 Librarian',
    category: 'audio',
    status: 'beta',
    platform: 'Browser (Chrome / Edge)',
    summary:
      'Browse, play, audit and repair a Dirtywave M8 SD card in the browser: songs, instruments, samples, themes and bundles.',
    description: [
      'M8 Librarian reads a Dirtywave M8 SD card entirely in your browser. Browse songs, instruments, samples, themes and bundles; find and repair broken sample references; build lean set exports; and export songs as MIDI. No install, no server, and nothing leaves your machine.',
      'It can play songs in the browser by walking the song grid the way the tracker does, decode every instrument in full, and mirror a connected M8’s screen over USB with optional GPU output effects for capture. No card handy? It has a synthetic demo card.',
    ],
    features: [
      'Missing-sample detection and repair',
      'In-browser song playback and MIDI export',
      'Theme viewer and theme creator',
      'Live USB screen mirror with output effects',
    ],
    tags: ['tracker', 'librarian', 'M8'],
    links: {
      launch: 'https://m8librarian.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/m8-librarian',
    },
    screenshot: {
      file: 'm8-librarian',
      alt: 'M8 Librarian showing the built-in demo card: a song’s instruments, sample dependencies and song grid in a dark window.',
      source: 'Captured from the live app using its synthetic demo card.',
    },
    order: 6,
  },
  {
    id: 'pico-tracker-librarian',
    name: 'picoTracker Librarian',
    category: 'audio',
    status: 'beta',
    platform: 'Browser (Chrome / Edge)',
    summary:
      'A librarian and arrangement editor for picoTracker and picoTracker Advance SD cards, with playback, repair and MIDI export.',
    description: [
      'picoTracker Librarian browses and audits the projects, instruments, samples and themes on a picoTracker SD card (pico and Advance alike), plays songs without leaving the page, and edits the arrangement, phrases, slice points and instrument parameters.',
      'It finds and repairs broken sample references, builds ordered setlists, and exports MIDI as a whole song or per-channel stems. It is beta software that writes to your card, so it backs everything up first; back up your own card too.',
    ],
    features: [
      'Song grid and phrase editing',
      'Sample browser with slice editor',
      'MIDI export, whole song or stems',
      'Live USB screen mirror with output effects',
    ],
    tags: ['tracker', 'librarian', 'picoTracker'],
    links: {
      launch: 'https://pt-librarian.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/pico-tracker-librarian',
    },
    screenshot: {
      file: 'pico-tracker-librarian',
      alt: 'picoTracker Librarian’s pattern editor: a song grid of hex chain numbers in coloured columns beside a chain’s phrase list.',
      position: 'left top',
      source: 'screenshots/pattern-editor.png in the picoTracker Librarian repository.',
    },
    order: 7,
  },
  {
    id: 'mega-tools',
    name: 'Mega-Tools',
    category: 'audio',
    status: 'live',
    platform: 'Browser',
    summary:
      'One home for the browser tools around GENMDDJ, the Sega Mega Drive music tracker: a web player, ROM patchers and save tools.',
    description: [
      'Mega-Tools collects the browser tools around GENMDDJ, little-scale’s Sega Mega Drive / Genesis music tracker, on one landing page: patch a ROM, convert a song, manage saves, or render audio straight to your browser.',
      'Most of the tools are little-scale’s own, copied in as-is and kept in sync with upstream. Two parts were built here and have since been submitted upstream: extra features for the palette patcher, and the GENMDDJ Web Player, which runs the real ROM through a WebAssembly build of Genesis Plus GX to render a song as a stereo mix or as ten hardware-voice stems.',
    ],
    features: [
      'GENMDDJ Web Player: render .gmdj songs, with per-voice stems',
      'ROM patchers: palettes, FM instruments, kits, wavetables, font',
      'Save tool, bank editor and converter',
    ],
    inspiration: 'GENMDDJ, by little-scale (Sebastian Tomczak).',
    tags: ['tracker', 'Mega Drive', 'chiptune'],
    links: {
      launch: 'https://mega-tools.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/mega-tools',
    },
    screenshot: {
      file: 'mega-tools',
      alt: 'The Mega-Tools landing page: a blue terminal-style index of renderer, ROM patcher, save and converter tools.',
      source: 'Captured from the live site.',
    },
    order: 8,
  },
  {
    id: 'opennura',
    name: 'OpenNura for Mac',
    category: 'audio',
    status: 'experimental',
    platform: 'macOS app',
    summary:
      'Control Nuraphone headphones from a Mac, and recover the device key without needing an iOS or Windows device.',
    description: [
      'OpenNura for Mac is a macOS-focused fork of James Young’s opennura. It adds a classic Bluetooth (RFCOMM) transport, which is how the Nuraphone’s control channel is actually reached on macOS, and on-Mac recovery of the headphone’s device key, so the app works end to end on a Mac alone.',
      'It is unofficial, experimental software that talks to the hardware through a reverse-engineered protocol and is not affiliated with Nura. Read the safety notes in the README before connecting.',
    ],
    features: ['Classic Bluetooth transport for macOS', 'Device-key recovery from your own Nura account', 'Offline control afterwards'],
    tags: ['headphones', 'macOS', 'Bluetooth'],
    links: {
      download: 'https://github.com/clickysteve/open-nura-mac/releases/tag/v1.0.0',
      source: 'https://github.com/clickysteve/open-nura-mac',
      docs: 'https://iamsteve.in/2026/07/30/opennura-for-macos/',
    },
    order: 9,
  },
  {
    id: 'amfas-music-library',
    name: 'AMFAS Music Library',
    category: 'audio',
    status: 'live',
    platform: 'Browser',
    summary:
      'A growing library of free Creative Commons music for film-makers, vloggers and independent artists, with previews, tags and a sound map.',
    description: [
      'The AMFAS Music Library is a public database of music by Stephen McLeod, aka allmyfriendsaresynths, shared for independent artists, film-makers, vloggers and other creative folks to use in their projects. Every track is free for non-commercial use under CC BY-NC-SA 4.0, with a credit and a link back.',
      'Search by name, gear or feel, filter by tags, length or key, preview tracks as high-quality WAV with pre-baked waveforms, and download them. The Sound Map lays the whole library out in two dimensions so that similar-sounding tracks cluster together, and every track has a “sounds like” suggestion and an embeddable player.',
    ],
    features: [
      'Search, tag filters, duration filter and favourites',
      'Key, loudness and energy analysis for every track',
      'Sound Map and “sounds like” suggestions from audio similarity',
      'Shareable views, embed widget and lock-screen playback controls',
    ],
    tags: ['music', 'Creative Commons', 'library'],
    links: {
      launch: 'https://musiclibrary.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/amfas-music-library',
    },
    screenshot: {
      file: 'amfas-music-library',
      alt: 'The AMFAS Music Library track list: dark track cards with genre tags, gear used, play buttons and waveform previews, under search and filter buttons.',
      position: 'top',
      source: 'Captured from the live site, scrolled to the track list.',
    },
    order: 10,
  },

  // ── Video & Visual Tools ────────────────────────────────────────────────────────────────────
  {
    id: 'bendr',
    name: 'BENDR',
    category: 'video',
    status: 'live',
    platform: 'Browser (Chrome recommended)',
    summary:
      'A circuit-bent video processor in your browser: four channels of dying VHS, unstable sync, rescan feedback and datamosh.',
    description: [
      'BENDR emulates the analogue glitch aesthetic of circuit-bent video hardware (bent video enhancers, dying VHS decks, unstable sync circuits and rescan feedback rigs) plus a digital corruption stage for pixel sorting, databending and datamoshing. Feed it video and abuse the signal path in real time.',
      'It is a four-channel mixer: each channel has its own source and complete effects chain, meeting in two buses and a master crossfade. Sources include video files streamed from disk, cameras, screen capture, generated patterns, a pattern synth, text, pasted fragment shaders, or re-entry from elsewhere in the rig. It is a single self-contained HTML file and nothing leaves your machine.',
    ],
    features: [
      'Four channels, three buses, twenty transitions and a melt stage',
      'Scan processor with real line geometry',
      'Mod matrix, snapshots and a performance recorder',
      'Live recording, offline MP4 render up to 4K, pop-out output for OBS',
    ],
    inspiration: 'Circuit-bent analogue video hardware.',
    tags: ['video', 'glitch', 'feedback'],
    links: {
      launch: 'https://bendr.allmyfriendsaresynths.com/',
      source: 'https://github.com/clickysteve/bendr',
    },
    screenshot: {
      file: 'bendr',
      alt: 'BENDR’s dark interface: a channel and mixer panel on the left, a warped rainbow-banded picture in the centre, and a mod matrix below.',
      source: 'docs/doc_ui.png in the BENDR repository.',
    },
    featured: true,
    order: 1,
  },
  {
    id: 'lc-1x-plus',
    name: 'LC-1X+ MIDI2DMX',
    category: 'video',
    status: 'live',
    platform: 'AU / VST3 plugin · standalone',
    summary:
      'Lighting control from your DAW: paint colour patterns on a step grid and play DMX light shows in sync with the music.',
    description: [
      'LC-1X+ MIDI2DMX is a MIDI FX plugin for controlling DMX stage lighting through the BoomLights LC-1X+ MIDI-to-DMX converter. It gives you a step-sequencer grid inside your DAW: paint colours across multi-segment fixtures, store scenes and chain patterns into a lighting song that follows your session’s transport.',
      'It is about light, not sound: it sits on a MIDI track next to your music and turns it into a synchronised show. It is an unofficial fan project, not affiliated with or endorsed by BoomLights.',
    ],
    features: [
      'Step grid for multiple fixtures and segments',
      'Scenes A–D, pattern bank and song mode',
      'FLOOD and FILL live colour overrides, hue shift and crossfade',
      'Internal, MIDI clock or host sync; record a show as a MIDI file',
    ],
    inspiration: 'The BoomLights LC-1X+ MIDI-to-DMX converter (unofficial).',
    tags: ['lighting', 'DMX', 'plugin'],
    links: {
      download: 'https://github.com/clickysteve/LC-1X-Plus-MIDI-2-DMX-Plugin/releases/latest',
      source: 'https://github.com/clickysteve/LC-1X-Plus-MIDI-2-DMX-Plugin',
    },
    screenshot: {
      file: 'lc-1x-plus',
      alt: 'The LC-1X+ MIDI2DMX plugin: a 16-step by 8-segment grid painted in a rainbow of colours under transport and fixture controls.',
      source: 'LC1XPLUSPLUGIN.png in the LC-1X+ MIDI2DMX repository.',
    },
    order: 2,
  },

  // ── Photography & Imaging ───────────────────────────────────────────────────────────────────
  {
    id: 'dmg-darkroom',
    name: 'DMG Darkroom',
    category: 'photo',
    status: 'live',
    platform: 'Browser',
    summary:
      'A darkroom for Game Boy Camera photos: load a save, then apply palettes, effects and border frames, and export PNGs or GIFs.',
    description: [
      'DMG Darkroom loads Game Boy Camera .sav or .srm files (including from an Analogue Pocket SD card), shows the photos in their in-camera album order, and lets you apply palettes, effects and authentic border frames per photo or across the whole roll.',
      'It recovers photos deleted in-camera but not yet overwritten, decodes photo metadata from the save, imports any image into an empty slot dithered to four shades, and writes a modified save back for emulators and flash carts.',
    ],
    features: [
      '100+ palettes, with a custom palette editor',
      'CRT, LCD, halftone, Game Boy Printer and dithering effects',
      '21 Game Boy Camera border frames',
      'Batch PNG, animated GIF builder and contact sheets',
    ],
    inspiration: 'The Nintendo Game Boy Camera.',
    tags: ['Game Boy Camera', 'image', 'palettes'],
    links: {
      launch: 'https://dmgdarkroom.allmyfriendsarejpegs.com/',
      source: 'https://github.com/clickysteve/dmg-darkroom',
      docs: 'https://iamsteve.in/2026/05/07/dmg-darkroom-gb-camera-companion-app/',
    },
    screenshot: {
      file: 'dmg-darkroom',
      alt: 'DMG Darkroom with a demo save loaded: a grid of green four-shade Game Boy images and a large preview of a dithered Mandelbrot set.',
      source: 'Captured from the live app with a synthetic demo save (generated patterns, no real photos).',
    },
    featured: true,
    order: 1,
  },

  // ── Miscellany ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'cartridge-index',
    name: 'Cartridge Index',
    category: 'misc',
    status: 'live',
    platform: 'Browser · installable',
    summary:
      'A library manager for the Analogue Pocket: scan the SD card, fill in box art and metadata, and keep track of what to play next.',
    description: [
      'Cartridge Index catalogues an Analogue Pocket library from the browser. It scans the SD card directly (ROMs, GB Studio games, video snaps, on-device screenshots and saves), fills in box art and metadata, and keeps status, ratings, notes, tags and collections.',
      'The library syncs to a private file in your own Google Drive, so it needs a Google sign-in, and can be exported as a full JSON backup. It installs as an offline-capable app.',
    ],
    features: [
      'SD card scanning with the File System Access API (Chrome / Edge)',
      'Box art and metadata from libretro-thumbnails, TheGamesDB and itch.io',
      'Status, ratings, notes, tags and collections',
      'Google Drive sync and JSON backup',
    ],
    tags: ['Analogue Pocket', 'library', 'hardware'],
    links: {
      launch: 'https://games.clickysteve.com/',
      source: 'https://github.com/clickysteve/cartridge-index',
    },
    order: 1,
  },
  {
    id: 'oh-mother',
    name: 'Oh Mother',
    category: 'misc',
    status: 'experimental',
    platform: 'macOS / Windows app',
    summary:
      'A save file editor for EarthBound on the SNES: names, levels, stats, inventory, money, Escargo Express storage and all 1024 story flags.',
    description: [
      'Oh Mother edits EarthBound save files (.srm and .sav, SNES, USA region). It exists because of an accidentally overwritten save, and the prospect of grinding through all the levels again to get back to where it had got to.',
      'It edits character names, levels, XP, HP and PP, stats, inventory, equipment, money, position, Escargo Express storage, story flags, permanent stat boosts and in-game preferences. Both mirror copies of each save block are updated and their checksums recomputed, and a .bak backup is made automatically. Many fields are mapped from community reverse-engineering, so treat values as best effort and check them in the game.',
    ],
    features: [
      'Per-character editor: stats, 14 inventory slots and equipment',
      '35 quick-jump locations for the party leader',
      'All 1024 story flags, searchable, with sanctuary presets',
      'Colour-coded hex viewer of the full 8 KB SRAM',
    ],
    tags: ['EarthBound', 'save editor', 'SNES'],
    links: {
      download: 'https://github.com/clickysteve/Oh-Mother-Earthbound-Save-File-Editor/releases/latest',
      source: 'https://github.com/clickysteve/Oh-Mother-Earthbound-Save-File-Editor',
    },
    screenshot: {
      file: 'oh-mother',
      alt: 'Oh Mother’s Character tab for Ness: stat fields, permanent stat boosts, fourteen inventory slots and equipment dropdowns in a dark window.',
      position: 'top',
      source: 'docs/screenshots/character.png in the Oh Mother repository.',
    },
    order: 2,
  },
];
