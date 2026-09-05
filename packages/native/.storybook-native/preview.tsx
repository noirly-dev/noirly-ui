import type { Preview } from "@storybook/react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NoirlyThemeProvider } from "../src/theme/provider";

/**
 * On-device preview.
 *
 * Deliberately thinner than the web one: no font injection (the host app links
 * the TTFs) and no palette toolbar (the device supplies the colour scheme, and
 * a toolbar over a 390pt viewport costs more than it gives). Change `themeId`
 * here to preview another palette on a device.
 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NoirlyThemeProvider themeId="gold">
            <View style={{ flex: 1, padding: 16 }}>
              <Story />
            </View>
          </NoirlyThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  ],
};

export default preview;
