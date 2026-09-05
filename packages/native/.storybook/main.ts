import type { StorybookConfig } from "@storybook/react-native-web-vite";

/**
 * Browser Storybook, via react-native-web.
 *
 * This is the fast loop and the one CI can run: no Android SDK, no Xcode, no
 * simulator. It shares its `*.stories.tsx` files with the on-device config in
 * `.storybook-native`, so a story written once renders in both.
 *
 * What it cannot tell you: anything that depends on a real native shadow,
 * genuine safe-area insets, or platform gesture arbitration. Check those on a
 * device before shipping.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      // These ship untranspiled Flow/ESM that Vite will not parse from
      // node_modules unless they are explicitly opted in.
      modulesToTranspile: [
        "react-native-reanimated",
        "react-native-gesture-handler",
        "react-native-safe-area-context",
        "react-native-worklets",
      ],
      pluginReactOptions: {
        babel: {
          // Reanimated 4 moved its Babel plugin into react-native-worklets.
          // Without it, `useAnimatedStyle` and every gesture callback throw at
          // runtime because their bodies were never compiled into worklets.
          plugins: ["react-native-worklets/plugin"],
        },
      },
    },
  },
};

export default config;
