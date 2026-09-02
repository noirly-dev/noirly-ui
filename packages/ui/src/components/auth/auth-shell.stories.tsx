import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../ui/button.js";
import { Input } from "../ui/input.js";
import { AuthShell } from "./auth-shell.js";

const meta = {
  title: "Shell/AuthShell",
  component: AuthShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AuthShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    title: "Sign in to Noirly",
    lead: "Use your account to continue.",
    logo: (
      <span className="font-mono text-xs font-bold tracking-[0.08em]">NI</span>
    ),
    children: (
      <div className="grid gap-3">
        <Input type="email" placeholder="Email" />
        <Button className="w-full">Continue</Button>
      </div>
    ),
    footer: <p>Need help? Contact support.</p>,
  },
};
