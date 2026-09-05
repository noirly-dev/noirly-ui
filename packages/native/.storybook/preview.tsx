import type { Preview } from "@storybook/react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NoirlyThemeProvider } from "../src/theme/provider";
import { NOIRLY_THEMES, tokensFor } from "../src/theme/tokens";
import type { ColorScheme } from "../src/theme/tokens";

/**
 * The fonts. On a device these come from linked TTFs; in the browser they come
 * from Google Fonts, and the family names have to match the ones in
 * `theme/tokens.ts` exactly or every `fontFamily` silently falls back.
 */
const FONT_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap");
[style*="Fraunces"] { font-family: "Fraunces", Georgia, serif !important; }
[style*="HankenGrotesk"] { font-family: "Hanken Grotesk", system-ui, sans-serif !important; }
[style*="JetBrainsMono"] { font-family: "JetBrains Mono", ui-monospace, monospace !important; }
html, body, #storybook-root { height: 100%; margin: 0; }
`;

if (typeof document !== "undefined" && !document.getElementById("noirly-native-fonts")) {
  const style = document.createElement("style");
  style.id = "noirly-native-fonts";
  style.textContent = FONT_CSS;
  document.head.appendChild(style);
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i } },
  },
  globalTypes: {
    theme: {
      description: "Noirly palette",
      defaultValue: "gold",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        items: NOIRLY_THEMES.map((t) => ({ value: t.id, title: t.name })),
        dynamicTitle: true,
      },
    },
    scheme: {
      description: "Colour scheme",
      defaultValue: "dark",
      toolbar: {
        title: "Scheme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeId = (context.globals.theme as string) ?? "gold";
      const scheme = ((context.globals.scheme as string) ?? "dark") as ColorScheme;
      const tokens = tokensFor(themeId, scheme);

      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider
            // Insets are faked in the browser; a real device supplies its own.
            initialMetrics={{
              frame: { x: 0, y: 0, width: 390, height: 844 },
              insets: { top: 0, left: 0, right: 0, bottom: 0 },
            }}
          >
            <NoirlyThemeProvider themeId={themeId} scheme={scheme}>
              <View
                style={{
                  flex: 1,
                  minHeight: "100%" as unknown as number,
                  backgroundColor: tokens.color.bg,
                  padding: 16,
                }}
              >
                <Story />
              </View>
            </NoirlyThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      );
    },
  ],
};

export default preview;
