import type { Preview } from "@storybook/react";
import { ThemeStyles } from "../src/themes/ThemeStyles.js";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="dark min-h-dvh bg-[var(--bg)] text-[var(--foreground)]">
        <ThemeStyles themeId="gold" />
        <Story />
      </div>
    ),
  ],
};

export default preview;
