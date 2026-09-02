import { buildThemeBootScript, getThemeCssMap } from "./palette.js";
import { ThemeStyles } from "./ThemeStyles.js";

export type NoirlyHeadProps = {
  themeId: string;
  nonce?: string;
};

export function NoirlyHead({ themeId, nonce }: NoirlyHeadProps) {
  const themeCssMap = getThemeCssMap();

  return (
    <>
      <ThemeStyles themeId={themeId} nonce={nonce} />
      <script
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: buildThemeBootScript(themeId, themeCssMap),
        }}
      />
    </>
  );
}
