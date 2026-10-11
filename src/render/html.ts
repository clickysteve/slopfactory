/** Tiny helpers for building HTML strings safely. */

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes text for use in element content or a double-quoted attribute. */
export function esc(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]!);
}

/** Joins non-empty parts with newlines; lets render functions use conditionals inline. */
export function join(parts: Array<string | false | null | undefined | 0>): string {
  return parts.filter(Boolean).join('\n');
}

/** Visually hidden text for screen readers. */
export function srOnly(text: string): string {
  return `<span class="sr-only">${esc(text)}</span>`;
}
