/**
 * Progressive enhancement for the pre-rendered catalogue (see src/render/page.ts):
 * - information windows open from #info/<id> links and keep the address bar in step;
 * - fallbacks for browsers without invoker commands (`command`/`commandfor`) or `closedby`.
 */
import '@fontsource/silkscreen/latin-400.css';
import './styles/main.css';

const INFO_HASH = /^#info\/([a-z0-9-]+)$/;

function infoWindow(id: string): HTMLDialogElement | null {
  const el = document.getElementById(`info-${id}`);
  return el instanceof HTMLDialogElement ? el : null;
}

function openInfo(id: string): void {
  const dialog = infoWindow(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function setHash(hash: string): void {
  const url = `${location.pathname}${location.search}${hash}`;
  if (url !== `${location.pathname}${location.search}${location.hash}`) history.replaceState(null, '', url);
}

// Browsers without invoker commands: emulate show-modal and close.
if (!('command' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[commandfor]');
    if (!button) return;
    const target = document.getElementById(button.getAttribute('commandfor') ?? '');
    if (!(target instanceof HTMLDialogElement)) return;
    const command = button.getAttribute('command');
    if (command === 'show-modal' && !target.open) target.showModal();
    else if (command === 'close') target.close();
  });
}

for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog.info-window')) {
  const id = dialog.dataset.project!;
  // Browsers without closedby="any": a click on the backdrop closes the window.
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
  dialog.addEventListener('toggle', () => setHash(dialog.open ? `#info/${id}` : ''));
  dialog.addEventListener('close', () => {
    if (location.hash === `#info/${id}`) setHash('');
  });
}

function openFromHash(): void {
  const match = INFO_HASH.exec(location.hash);
  if (match) openInfo(match[1]!);
}
window.addEventListener('hashchange', openFromHash);
openFromHash();

// Mark the department currently on screen in the menu bar.
//  - Every department crossing a line 40% down the screen is current. Departments that share
//    a row (see .dept-cluster) are current together.
//  - At the very bottom of the page the last section is current, since short sections there
//    can never reach the line.
//  - A department picked from the menu stays current until it has been on screen and then
//    scrolled away, so the item you clicked is the one that lights up.
const navLinks = new Map<string, HTMLAnchorElement>();
for (const a of document.querySelectorAll<HTMLAnchorElement>('.menubar-nav a[href^="#"]')) {
  navLinks.set(a.hash.slice(1), a);
}
const sections = [...navLinks.keys()]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => el !== null);

let picked: { id: string; seen: boolean } | null = null;
let current: string[] = [];

function onScreen(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

function currentDepartments(): string[] {
  if (picked) {
    const el = document.getElementById(picked.id);
    if (el && onScreen(el)) picked.seen = true;
    else if (picked.seen) picked = null;
    if (picked) return [picked.id];
  }
  const root = document.documentElement;
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
    return sections.length ? [sections[sections.length - 1]!.id] : [];
  }
  const line = window.innerHeight * 0.4;
  const crossing = sections.filter((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= line && r.bottom > line;
  });
  if (crossing.length) return crossing.map((el) => el.id);
  // Between two departments: keep the last one, unless we are back above the first.
  const first = sections[0];
  return first && first.getBoundingClientRect().top > line ? [] : current;
}

function updateMenu(): void {
  current = currentDepartments();
  for (const [id, a] of navLinks) {
    if (current.includes(id)) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  }
}

let queued = false;
window.addEventListener(
  'scroll',
  () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      updateMenu();
    });
  },
  { passive: true },
);
window.addEventListener('resize', updateMenu);
for (const [id, a] of navLinks) {
  a.addEventListener('click', () => {
    picked = { id, seen: false };
    updateMenu();
  });
}
updateMenu();
