import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.js";

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};
