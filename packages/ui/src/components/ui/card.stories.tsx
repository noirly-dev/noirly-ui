import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card.js";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Workspace settings</CardTitle>
        <CardDescription>
          Manage defaults for new projects in this workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Save changes</Button>
      </CardContent>
    </Card>
  ),
};
