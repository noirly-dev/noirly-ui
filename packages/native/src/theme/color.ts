/**
 * Colour maths.
 *
 * The web half of the design system leans on `color-mix()` and `rgb(… / α)` to
 * derive ~30 tokens from five hex values per scheme. React Native has neither,
 * and it cannot read a CSS custom property, so the same derivations have to be
 * computed here and handed over as concrete strings.
 *
 * Keeping the *inputs* identical is what makes the two halves match: both read
 * the same `NOIRLY_THEMES` entry, and the ratios below are the ones in
 * `buildThemeCss`.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function parseHex(hex: string): Rgb {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}

/** `rgba()` rather than an 8-digit hex: Android accepts both, but rgba reads
 *  better in a style inspector and matches what the web emits. */
export function alpha(hex: string, a: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${round(a)})`;
}

/**
 * `amount` is how much of `top` ends up in the result, matching the reading of
 * `color-mix(in srgb, top X%, bottom)`. Both inputs must be opaque hex — this
 * is only ever used to blend palette colours, never to flatten transparency.
 */
export function mix(top: string, bottom: string, amount: number): string {
  const t = parseHex(top);
  const b = parseHex(bottom);
  const k = clamp(amount, 0, 1);
  const ch = (x: number, y: number) => Math.round(x * k + y * (1 - k));
  return toHex({ r: ch(t.r, b.r), g: ch(t.g, b.g), b: ch(t.b, b.b) });
}

function toHex({ r, g, b }: Rgb): string {
  const pair = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");
  return `#${pair(r)}${pair(g)}${pair(b)}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

/** WCAG 2.1 relative luminance. Used to pick readable ink over an arbitrary fill. */
export function luminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
