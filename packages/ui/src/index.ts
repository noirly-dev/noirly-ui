export { cn } from "./lib/utils.js";

export {
  NOIRLY_THEMES,
  DEFAULT_THEME_ID,
  THEME_IDS,
  isValidThemeId,
  getTheme,
  buildThemeCss,
  type ThemePalette,
  type ThemeDefinition,
} from "./themes/index.js";
export { ThemeStyles } from "./themes/ThemeStyles.js";
export { NoirlyHead, type NoirlyHeadProps } from "./themes/NoirlyHead.js";
export {
  PALETTE_STORAGE_KEY,
  THEME_STYLE_ID,
  getThemeCssMap,
  resolvePaletteId,
  themeCssFor,
  applyPalette,
  readStoredPalette,
  buildThemeBootScript,
} from "./themes/palette.js";

export { fraunces, hanken, jetbrains, noirlyFontClassName } from "./fonts/index.js";

export { Button, type ButtonProps } from "./components/ui/button.js";
export { Badge } from "./components/ui/badge.js";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card.js";
export { Input } from "./components/ui/input.js";
export { Textarea } from "./components/ui/textarea.js";
export { Label } from "./components/ui/label.js";
export { Switch } from "./components/ui/switch.js";
export { Dialog } from "./components/ui/dialog.js";

export {
  PageContainer,
  SHELL_GUTTER_CLASS,
  type PageContainerProps,
} from "./components/shell/page-container.js";
export { SidebarBrand, type SidebarBrandProps } from "./components/shell/sidebar-brand.js";
export { PageHeader, type PageHeaderProps } from "./components/shell/page-header.js";
export { AppHeader, type AppHeaderProps } from "./components/shell/app-header.js";
export {
  AppSidebar,
  type AppNavItem,
  type AppSidebarProps,
} from "./components/shell/app-sidebar.js";
export { AppShell, type AppShellProps } from "./components/shell/app-shell.js";

export { AuthShell, type AuthShellProps } from "./components/auth/auth-shell.js";

/* --------------------------- Presentation layer ---------------------------
 * Dependency-free half of the portfolio design system. Anything needing
 * framer-motion lives in `@noirly-dev/ui/motion`, anything needing lenis in
 * `@noirly-dev/ui/scroll`, and the assembled wrapper in
 * `@noirly-dev/ui/experience`.
 * -------------------------------------------------------------------------- */

export { SiteBackground } from "./components/fx/site-background.js";
export { CustomCursor } from "./components/fx/custom-cursor.js";
export {
  PageTransition,
  type PageTransitionProps,
} from "./components/fx/page-transition.js";

export {
  useCoarsePointer,
  useNarrowViewport,
  useInstantEntrance,
} from "./hooks/use-coarse-pointer.js";
export { useCachedRect } from "./hooks/use-cached-rect.js";
export { useSpotlight } from "./hooks/use-spotlight.js";
export { useCursor, type Cursor, type CursorVariant } from "./hooks/use-cursor.js";
export {
  useTransitionState,
  setTransitionPhase,
  type TransitionPhase,
} from "./hooks/use-transition-state.js";
