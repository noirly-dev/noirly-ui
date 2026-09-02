import { buildThemeCss, DEFAULT_THEME_ID, getTheme } from "./index.js";
import { THEME_STYLE_ID } from "./palette.js";

export function ThemeStyles({
  themeId,
  nonce,
}: {
  themeId: string;
  nonce?: string;
}) {
  const theme = getTheme(themeId) ?? getTheme(DEFAULT_THEME_ID)!;
  const css = buildThemeCss(theme);

  return (
    <style
      id={THEME_STYLE_ID}
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
