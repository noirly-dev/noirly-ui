import type { Meta, StoryObj } from "@storybook/react";
import { Activity, Settings, Users } from "lucide-react";
import { Button } from "../ui/button.js";
import { AppShell } from "./app-shell.js";
import { SidebarBrand } from "./sidebar-brand.js";

const meta = {
  title: "Shell/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: {
      brand: (
        <SidebarBrand
          logo={
            <span className="font-mono text-xs font-bold tracking-[0.08em]">
              NF
            </span>
          }
          title="Noirly Flow"
          subtitle="Workspace"
        />
      ),
      items: [
        { href: "/settings", label: "Settings", icon: Settings, match: "prefix" },
        {
          href: "/w/demo/activity",
          label: "Activity",
          icon: Activity,
          match: "prefix",
        },
        {
          href: "/w/demo/members",
          label: "Members",
          icon: Users,
          match: "prefix",
        },
      ],
      footer: (
        <div className="space-y-3">
          <div>
            <p className="truncate text-sm">Aneesh Pissay</p>
            <p className="truncate font-mono text-[11px] text-[var(--muted-foreground)]">
              you@example.com
            </p>
          </div>
          <Button variant="secondary" className="w-full">
            Sign out
          </Button>
        </div>
      ),
    },
    header: {
      brand: (
        <p className="font-display text-sm font-semibold tracking-tight">
          Noirly Flow
        </p>
      ),
    },
    children: (
      <div className="p-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Tasks
        </h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Shell preview content area.
        </p>
      </div>
    ),
  },
};
