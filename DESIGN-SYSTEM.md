# Noirly design system

Everything the portfolio establishes visually, packaged so every Noirly app
renders from the same source. Nothing here is portfolio-specific: colour comes
from the active palette, motion from one set of tokens, and both schemes and all
seven themes are derived, never hand-tuned per app.

## What ships where

| Import | Needs | Contains |
|---|---|---|
| `@noirly-dev/ui/styles.css` | tailwindcss ^4 | Tokens, base layer, primitives, type scale, ambient background |
| `@noirly-dev/ui/effects.css` | — | Pointer spotlight, card tilt, custom cursor |
| `@noirly-dev/ui/transitions.css` | — | The shutter route transition |
| `@noirly-dev/ui` | react, next | Tokens, themes, fonts, UI + shell components, `SiteBackground`, `CustomCursor`, `PageTransition`, pointer hooks |
| `@noirly-dev/ui/motion` | framer-motion | Motion tokens and every animated component |
| `@noirly-dev/ui/scroll` | lenis | `SmoothScroll`, scroll-mode hooks |
| `@noirly-dev/ui/experience` | both | `NoirlyExperience` — the whole presentation layer in one wrapper |

The split exists so an app that never animates does not pull framer-motion into
its bundle by importing a `Button`.

## Wiring an app

```css
/* app/globals.css */
@import "tailwindcss";
@source "../node_modules/@noirly-dev/ui/dist";
@import "@noirly-dev/ui/styles.css";
@import "@noirly-dev/ui/effects.css";
@import "@noirly-dev/ui/transitions.css";
@import "lenis/dist/lenis.css";
```

```tsx
// app/layout.tsx
import { NoirlyHead, noirlyFontClassName } from "@noirly-dev/ui";
import { NoirlyExperience } from "@noirly-dev/ui/experience";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full" data-theme="gold" suppressHydrationWarning>
      <head>
        <NoirlyHead themeId="gold" />
      </head>
      <body className={`${noirlyFontClassName} flex min-h-dvh flex-col antialiased`}>
        <NoirlyExperience mark="Noirly">{children}</NoirlyExperience>
      </body>
    </html>
  );
}
```

Every part of the experience is a prop, so an app can drop one without
reassembling the rest:

```tsx
<NoirlyExperience mark="Ledger" smoothScroll={false} cursor={false}>
```

`smoothScroll` is the one to watch: Lenis takes over the document scroller, so
it does not mix with a virtualiser that measures `window.scrollY` itself.

## Colour

Palette tokens are not written by hand. `NOIRLY_THEMES` holds five hex values
per scheme — `bg`, `surface`, `text`, `accent`, `accentInk` — and
`buildThemeCss()` derives the ~30 tokens the CSS actually uses (secondary and
muted text, hairlines, elevations, card gradients, sheen, glow, and the
shadcn-compatible aliases). `<NoirlyHead>` inlines the result during SSR, so
there is no flash before hydration.

Adding a theme means adding five hex pairs and clearing the gate:

```bash
pnpm build && pnpm themes:verify
```

Four pairs per scheme have to reach WCAG AA normal text (4.5:1): text on bg,
accent-ink on accent, accent on bg, and text on surface. All seven current
palettes clear it in both schemes.

## Type

Fraunces for display, Hanken Grotesk for prose, JetBrains Mono for labels —
loaded through `next/font` and exposed as `noirlyFontClassName`.

`.display-xl` · `.display-lg` · `.display-md` — Fraunces, fluid `clamp()`,
tight tracking. `.lede` and `.copy` for prose, `.numeral` for tabular figures,
`.eyebrow` and `.mono-label` for the mono labels, `.text-outline` for the one
graphic flourish per page.

## Surfaces and motion

`.shell` for the page gutter, `.section-y` for vertical rhythm, `.surface` /
`.surface-flat` for panels, `.grain` for the noise overlay, `.aura` for a glow,
`.hairline-x` / `.hairline-y` for dividers, `.btn` (+ `-solid` / `-ghost` /
`-sm` / `-lg` / `-icon`) and `.chip` for controls, `.spotlight` for the
cursor-tracked card highlight, `.section-rule` for the fading band divider.

Motion has one rhythm: expo-out easing, transform/opacity/filter only (never
layout), exits at ~65% of their enter duration. `<MotionProvider>` sets
`reducedMotion="user"` globally, so individual components never branch on the
media query — and the base layer neutralises every animation and transition
under `prefers-reduced-motion` regardless.

## Capability gates

The expressive layer is additive and removes itself where it does not belong:

- **Touch** — no custom cursor, no tilt, no pointer spotlight, no smooth scroll.
- **Reduced motion** — the shutter cross-fades instead of wiping, the cursor
  keeps its dot and drops the trailing ring, the marquee becomes a static list,
  entrance animations resolve to their final state.
- **No JavaScript** — `cursor: none` is gated on an attribute set from JS, so a
  failed bundle leaves the system cursor in place rather than none at all.
