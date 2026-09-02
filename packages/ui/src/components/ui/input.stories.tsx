import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input.js";
import { Label } from "./label.js";

const meta = {
  title: "UI/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Email address",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Read only",
  },
};
