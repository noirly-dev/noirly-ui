import {
  DEFAULT_THEME_ID,
  getTheme,
  NOIRLY_THEMES,
  type ThemeDefinition,
  type ThemePalette,
} from "@noirly-dev/ui/themes";
import { alpha, mix } from "./color";

export type ColorScheme = "light" | "dark";

export interface Elevation {
  /** iOS. */
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  /** Android. Cannot be coloured or offset, so it only ever approximates. */
  elevation: number;
}

export interface NoirlyColors {
  bg: string;
  bgDeep: string;
  surface: string;
  surface2: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  hairline: string;
  hairlineStrong: string;
  accent: string;
  accentInk: string;
  accentSoft: string;
  positive: string;
  negative: string;
  destructive: string;
  /** Translucent scrim for modals and drawers. */
  scrim: string;
}

export interface NoirlyTokens {
  themeId: string;
  scheme: ColorScheme;
  color: NoirlyColors;
  radius: typeof radius;
  space: typeof space;
  duration: typeof duration;
  font: typeof font;
  type: ReturnType<typeof buildTypography>;
  elevation: { e1: Elevation; e2: Elevation; e3: Elevation };
}

/* --------------------------------- Scale ---------------------------------- */

/** Matches the web `--r-*` ladder exactly. */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
  pill: 9999,
} as const;

/** 4pt grid. `row` is the 36pt nav/list row the web layer settled on. */
export const space = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 32,
  row: 36,
} as const;

export const duration = {
  fast: 160,
  base: 280,
  slow: 620,
} as const;

/**
 * Font *family names*, not files. A bare React Native app has to ship the TTFs
 * and register them (react-native.config.js assets + `npx react-native-asset`);
 * until it does, these names resolve to the platform default rather than
 * throwing, which is why there is no hard failure if fonts are missing.
 */
export const font = {
  display: "Fraunces",
  sans: "HankenGrotesk",
  mono: "JetBrainsMono",
} as const;

function buildTypography() {
  return {
    displayXl: { fontFamily: font.display, fontSize: 40, lineHeight: 42, letterSpacing: -1.2 },
    displayLg: { fontFamily: font.display, fontSize: 32, lineHeight: 35, letterSpacing: -0.9 },
    pageTitle: { fontFamily: font.display, fontSize: 26, lineHeight: 29, letterSpacing: -0.7 },
    sectionTitle: { fontFamily: font.display, fontSize: 17, lineHeight: 21, letterSpacing: -0.3 },
    statValue: { fontFamily: font.display, fontSize: 28, lineHeight: 30, letterSpacing: -0.8 },
    lede: { fontFamily: font.sans, fontSize: 16, lineHeight: 26 },
    body: { fontFamily: font.sans, fontSize: 15, lineHeight: 23 },
    copy: { fontFamily: font.sans, fontSize: 14, lineHeight: 22 },
    label: { fontFamily: font.sans, fontSize: 13, lineHeight: 18 },
    // Tracking is in points in RN, not em — 0.22em at 11px is ~2.4pt.
    eyebrow: { fontFamily: font.mono, fontSize: 11, lineHeight: 14, letterSpacing: 2.4 },
    meta: { fontFamily: font.mono, fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
    monoLabel: { fontFamily: font.mono, fontSize: 10, lineHeight: 13, letterSpacing: 1.8 },
    button: { fontFamily: font.mono, fontSize: 11, lineHeight: 14, letterSpacing: 1.5 },
  } as const;
}

/* --------------------------------- Colours -------------------------------- */

function colorsFor(palette: ThemePalette, scheme: ColorScheme): NoirlyColors {
  const dark = scheme === "dark";
  const { bg, surface, text, accent, accentInk } = palette;

  return {
    bg,
    bgDeep: dark ? "#000000" : mix(text, bg, 0.12),
    surface,
    surface2: mix(text, surface, dark ? 0.12 : 0.08),
    text,
    textSecondary: alpha(text, dark ? 0.68 : 0.66),
    textMuted: alpha(text, dark ? 0.49 : 0.58),
    hairline: alpha(text, dark ? 0.09 : 0.1),
    hairlineStrong: alpha(text, 0.18),
    accent,
    accentInk,
    accentSoft: alpha(accent, dark ? 0.14 : 0.1),
    positive: dark ? "#7dd3a8" : "#0a7a45",
    negative: dark ? "#e8a87c" : "#a65f00",
    destructive: dark ? "#f87171" : "#dc2626",
    scrim: alpha(dark ? "#000000" : text, dark ? 0.6 : 0.45),
  };
}

/**
 * Shadows are the one place native cannot follow the web.
 *
 * The web elevations are two-layer shadows with negative spread. iOS takes a
 * single offset/radius/opacity, and Android takes only an `elevation` integer
 * whose colour and direction are fixed by the platform. These are matched by
 * eye to the web's three steps rather than converted, and on a dark scheme the
 * opacity is raised because a shadow on near-black has almost nothing to darken.
 */
function elevationsFor(scheme: ColorScheme): NoirlyTokens["elevation"] {
  const dark = scheme === "dark";
  const shadowColor = "#000000";
  return {
    e1: {
      shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: dark ? 0.5 : 0.08,
      shadowRadius: 3,
      elevation: 1,
    },
    e2: {
      shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: dark ? 0.6 : 0.12,
      shadowRadius: 12,
      elevation: 5,
    },
    e3: {
      shadowColor,
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: dark ? 0.7 : 0.18,
      shadowRadius: 24,
      elevation: 12,
    },
  };
}

/** Builds the full token set for one palette in one scheme. */
export function tokensFor(themeId: string, scheme: ColorScheme): NoirlyTokens {
  const theme: ThemeDefinition = getTheme(themeId) ?? getTheme(DEFAULT_THEME_ID)!;
  return {
    themeId: theme.id,
    scheme,
    color: colorsFor(scheme === "dark" ? theme.dark : theme.light, scheme),
    radius,
    space,
    duration,
    font,
    type: buildTypography(),
    elevation: elevationsFor(scheme),
  };
}

export { NOIRLY_THEMES, DEFAULT_THEME_ID };
export type { ThemeDefinition, ThemePalette };
