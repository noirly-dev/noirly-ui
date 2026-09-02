const { join } = require("node:path");

/** @type {import("@storybook/react-vite").StorybookConfig} */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/link": join(__dirname, "mocks/next-link.tsx"),
      "next/navigation": join(__dirname, "mocks/next-navigation.ts"),
    };
    return config;
  },
};

module.exports = config;
