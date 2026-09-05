import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.js";
import { Input } from "./input.js";
import { Textarea } from "./textarea.js";
import { FormField } from "./field.js";
import { Badge } from "./badge.js";
import { Switch } from "./switch.js";
import { Avatar, Kbd, Separator } from "./avatar.js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card.js";
import { Skeleton, SkeletonText } from "./skeleton.js";
import { EmptyState } from "./empty-state.js";

const meta = {
  title: "UI/Primitives",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <p className="eyebrow">{title}</p>
      {children}
      <div className="rule mt-2" />
    </section>
  );
}

export const Gallery: Story = {
  render: () => (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 py-6">
      <Section title="Fields">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Full name" htmlFor="name" required hint="As it appears on your ID.">
            <Input id="name" placeholder="Aneesh Pissay" />
          </FormField>
          <FormField label="Search" htmlFor="q">
            <Input id="q" placeholder="Find anything" leading={<SearchIcon />} trailing={<Kbd>⌘K</Kbd>} />
          </FormField>
          <FormField label="Email" htmlFor="email" error="That address is already registered.">
            <Input id="email" defaultValue="aneesh@example.com" invalid />
          </FormField>
          <FormField label="Disabled" htmlFor="off">
            <Input id="off" defaultValue="Read only" disabled />
          </FormField>
        </div>
        <FormField label="Notes" htmlFor="notes" hint="Markdown is supported.">
          <Textarea id="notes" placeholder="Anything worth remembering…" />
        </FormField>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Status">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="positive" dot>
            Active
          </Badge>
          <Badge tone="negative" dot>
            Overdue
          </Badge>
          <span className="chip">tag-shaped</span>
          <Separator orientation="vertical" className="h-6" />
          <Avatar name="Aneesh Pissay" />
          <Avatar name="Noirly Bot" size="lg" />
          <Switch defaultChecked />
        </div>
      </Section>

      <Section title="Surfaces">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
            </CardHeader>
            <CardContent>
              <SkeletonText lines={3} />
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="ghost">
                Open
              </Button>
              <span className="meta ml-auto">edited 2h ago</span>
            </CardFooter>
          </Card>
          <Card variant="flat">
            <EmptyState
              icon={<SearchIcon />}
              title="Nothing here yet"
              description="When something lands, it shows up in this panel."
              action={<Button size="sm">Add the first one</Button>}
            />
          </Card>
        </div>
      </Section>

      <Section title="Loading">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <SkeletonText lines={2} />
          </div>
        </div>
      </Section>
    </div>
  ),
};
