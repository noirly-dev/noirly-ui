import type { Meta, StoryObj } from "@storybook/react";
import { SidebarBrand } from "./sidebar-brand.js";

const meta = {
  title: "Shell/SidebarBrand",
  component: SidebarBrand,
} satisfies Meta<typeof SidebarBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: (
      <span className="font-mono text-xs font-bold tracking-[0.08em]">NF</span>
    ),
    title: "Noirly Flow",
    subtitle: "Workspace",
  },
};
