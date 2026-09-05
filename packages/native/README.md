# @noirly-dev/ui-native

The Noirly design system for React Native. Bare RN — no Expo.

It reads the **same seven palettes** as the web package. `@noirly-dev/ui/themes`
is pure TypeScript with no React, Next or DOM imports, so this package imports
`NOIRLY_THEMES` directly and derives StyleSheet tokens from it. Editing a
palette updates web and mobile together; there is no second copy to drift.

```
packages/ui/src/themes/index.ts   ← one source of truth
        │
        ├─ buildThemeCss()   → CSS custom properties   (web)
        └─ tokensFor()       → StyleSheet token object (native)
```

## Install

```bash
pnpm add @noirly-dev/ui-native
pnpm add react-native-reanimated react-native-safe-area-context
pnpm add react-native-gesture-handler @react-navigation/native   # optional
```

Reanimated needs its Babel plugin in `babel.config.js` — this is required by
Reanimated itself, not by this package:

```js
module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: ["react-native-worklets/plugin"], // must be last
};
```

Fonts are referenced by family name (`Fraunces`, `HankenGrotesk`,
`JetBrainsMono`). Ship the TTFs in your app and register them with
`npx react-native-asset`; until you do, text falls back to the platform default
rather than failing.

## Use

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  NoirlyThemeProvider,
  navigationTheme,
  useTheme,
  Screen,
  PageHeader,
  Button,
} from "@noirly-dev/ui-native";

function Root() {
  const tokens = useTheme();
  return (
    <NavigationContainer theme={navigationTheme(tokens)}>
      {/* navigators */}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NoirlyThemeProvider themeId="gold">
          <Root />
        </NoirlyThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

`useTheme()` throws outside the provider rather than falling back to a default
palette — silently wrong colours are harder to notice than a missing provider.

## What is in it

**Theme** — `NoirlyThemeProvider`, `useTheme`, `tokensFor`, `navigationTheme`,
`navigationScreenOptions`, and the `alpha` / `mix` / `contrastRatio` helpers.

**Components** — `Text` (12 variants mapped to the web type scale), `Button`,
`Card` + parts, `Badge`, `Input`, `FormField`, `Stat`, `StatGroup`, `ListRow`,
`ListSeparator`, `ListSectionHeader`, `Avatar`, `Separator`, `Eyebrow`,
`EmptyState`, `Skeleton`, `SkeletonText`, `Tabs`, `SwipeRow`, `Screen`,
`PageHeader`.

### Where native deliberately differs from web

- **`ListRow` instead of `DataTable`.** Columns cannot shed width on a phone; a
  four-column row either wraps into nonsense or scrolls sideways. The row is
  what the web table degrades to at its smallest breakpoint anyway.
- **Real borders instead of inset shadows.** RN has no inset box-shadow, so the
  hairline `.surface` draws inside its radius on the web is a 1px border here.
- **Elevation is approximate.** Android takes a single `elevation` integer whose
  colour and direction the platform fixes, so the three steps are matched by eye
  rather than converted.
- **`Eyebrow` is a component, not a class.** The web draws its leading rule with
  `::before`; RN has no pseudo-elements, so the rule is a sibling view.

## Storybook

Two configs, **one set of stories** (`src/**/*.stories.tsx`).

### Browser (react-native-web)

```bash
pnpm --filter @noirly-dev/ui-native storybook   # http://localhost:7007
```

No Android SDK, no Xcode, no simulator — this is the fast loop and the one CI
can run. The toolbar switches palette and colour scheme, which is the quickest
way to check a component against all seven.

It cannot tell you about real native shadows, genuine safe-area insets, or
platform gesture arbitration. Check those on a device.

### On device

`.storybook-native/` holds the on-device config. It needs a bare RN host app,
which this package does not create:

```bash
npx @react-native-community/cli init NoirlyStorybookHost --skip-install
# then point its index.js at .storybook-native and add this package
```

`@storybook/react-native` pins `react-native-reanimated` to exactly `4.5.1` and
`react-native-safe-area-context` to `5.8.0`, which is why this package pins both
rather than tracking latest. That also caps `react-native` at 0.86.x, since
Reanimated 4.5.1 declares `0.83 - 0.86`.

## A note on `useAnimatedStyle`

Every call passes an explicit dependency array. Reanimated normally discovers a
style worklet's dependencies through its Babel plugin, but a library cannot
assume every consumer's bundler is configured for that — and it is not under
Vite/react-native-web. Passing the array is Reanimated's documented alternative
and makes these components render wherever they are imported.

Gesture callbacks in `SwipeRow` are still worklets, since UI-thread handling is
the entire reason to use Gesture Handler for a swipe. Those do need the Babel
plugin above, which every React Native app has.
