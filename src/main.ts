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
const navLinks = new Map<string, HTMLAnchorElement>();
for (const a of document.querySelectorAll<HTMLAnchorElement>('.menubar-nav a[href^="#"]')) {
  navLinks.set(a.hash.slice(1), a);
}
if ('IntersectionObserver' in window && navLinks.size) {
  const visible = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      }
      const current = [...navLinks.keys()].find((id) => visible.has(id));
      for (const [id, a] of navLinks) {
        if (id === current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  for (const id of navLinks.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}
