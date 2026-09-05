import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { DEFAULT_THEME_ID, tokensFor, type ColorScheme, type NoirlyTokens } from "./tokens";

const ThemeContext = createContext<NoirlyTokens | null>(null);

export interface NoirlyThemeProviderProps {
  children: ReactNode;
  /** One of the seven palette ids. Defaults to the shared default. */
  themeId?: string;
  /** Force a scheme. Omit to follow the OS. */
  scheme?: ColorScheme;
}

export function NoirlyThemeProvider({
  children,
  themeId = DEFAULT_THEME_ID,
  scheme,
}: NoirlyThemeProviderProps) {
  // `useColorScheme()` can return null before the native module reports in, and
  // on a device with no preference. Dark is the Noirly default, matching the
  // `class="dark"` the web apps set on <html>.
  const osScheme = useColorScheme();
  const resolved: ColorScheme = scheme ?? (osScheme === "light" ? "light" : "dark");

  const tokens = useMemo(() => tokensFor(themeId, resolved), [themeId, resolved]);

  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
}

/**
 * Throws rather than falling back to a default token set. A component rendering
 * with silently-wrong colours is far harder to notice than a missing provider,
 * and the fix is the same either way.
 */
export function useTheme(): NoirlyTokens {
  const tokens = useContext(ThemeContext);
  if (!tokens) {
    throw new Error("useTheme() must be used inside <NoirlyThemeProvider>.");
  }
  return tokens;
}
