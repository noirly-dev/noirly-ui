# noirly-ui

Shared Noirly design system for web apps: dark gold tokens, theme palettes, and React UI components.

## Package

`@noirly-dev/ui` — published to [GitHub Packages](https://github.com/noirly-dev/noirly-ui/pkgs/npm/ui).

### Install

Configure the `@noirly-dev` scope in `.npmrc`:

```
@noirly-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @noirly-dev/ui
```

Peer dependencies: `react`, `react-dom`, `next` (>=16), `tailwindcss` (^4), `lucide-react`.

### Usage

```css
/* app/globals.css */
@import "tailwindcss";
@import "@noirly-dev/ui/styles.css";
```

```tsx
import { ThemeStyles, noirlyFontClassName, Button, AppShell } from "@noirly-dev/ui";

export default function RootLayout({ children }) {
  return (
    <html className={`${noirlyFontClassName} dark`} data-theme="gold">
      <head>
        <ThemeStyles themeId="gold" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Next.js apps should set `transpilePackages: ["@noirly-dev/ui"]` and use `next build --webpack` until Turbopack resolves local/linked packages reliably.

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
```

## Publish

Publishing runs automatically on GitHub Release, or manually via the **Publish GitHub Packages** workflow.
