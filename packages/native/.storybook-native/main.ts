import type { StorybookConfig } from "@storybook/react-native";

/**
 * On-device Storybook.
 *
 * Points at the same stories as the browser config. Running it needs a bare
 * React Native host app (see README): this config only tells Storybook where
 * the stories are — it does not create the app.
 *
 * `@storybook/react-native` pins `react-native-reanimated` to exactly 4.5.1 and
 * `react-native-safe-area-context` to 5.8.0, which is why this package pins
 * both rather than tracking latest.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
};

export default config;
