import type { NoirlyTokens } from "./tokens";

/**
 * React Navigation `Theme` shape, declared structurally.
 *
 * `@react-navigation/native` is an optional peer, so importing its types here
 * would make the package fail to typecheck for anyone who does not use it. The
 * object below is assignable to React Navigation's `Theme` without the import.
 */
export interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: {
    regular: NavigationFontStyle;
    medium: NavigationFontStyle;
    bold: NavigationFontStyle;
    heavy: NavigationFontStyle;
  };
}

interface NavigationFontStyle {
  fontFamily: string;
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}

/**
 * Adapts Noirly tokens to the theme `NavigationContainer` expects, so the
 * navigator's own chrome — header, card background, the flash between screens
 * during a transition — is the palette rather than React Navigation's defaults.
 *
 * `background` is `bgDeep`, not `bg`: it shows through underneath a screen
 * mid-gesture, and the deeper value reads as space behind the card instead of
 * as a second, slightly-off page.
 */
export function navigationTheme(tokens: NoirlyTokens): NavigationTheme {
  const { color, font } = tokens;
  return {
    dark: tokens.scheme === "dark",
    colors: {
      primary: color.accent,
      background: color.bgDeep,
      card: color.surface,
      text: color.text,
      border: color.hairline,
      notification: color.accent,
    },
    fonts: {
      regular: { fontFamily: font.sans, fontWeight: "400" },
      medium: { fontFamily: font.sans, fontWeight: "500" },
      bold: { fontFamily: font.sans, fontWeight: "600" },
      heavy: { fontFamily: font.sans, fontWeight: "700" },
    },
  };
}

/**
 * Screen options for a native-stack navigator. Spread into
 * `screenOptions` to get Noirly headers without restating this per screen.
 */
export function navigationScreenOptions(tokens: NoirlyTokens) {
  const { color, font } = tokens;
  return {
    headerStyle: { backgroundColor: color.bg },
    headerTintColor: color.accent,
    headerTitleStyle: {
      color: color.text,
      fontFamily: font.display,
      fontSize: 17,
    },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: color.bg },
  } as const;
}
