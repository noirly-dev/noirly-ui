import { buildThemeCss, DEFAULT_THEME_ID, getTheme } from "./index.js";

export function ThemeStyles({ themeId }: { themeId: string }) {
  const theme = getTheme(themeId) ?? getTheme(DEFAULT_THEME_ID)!;
  const css = buildThemeCss(theme);

  return (
    <style
      id="noirly-theme"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
