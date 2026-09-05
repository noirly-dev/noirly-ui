import type { Meta, StoryObj } from "@storybook/react";
import { ScrollView, View } from "react-native";
import { Text } from "./text";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Input, FormField } from "./field";
import { Skeleton, SkeletonText } from "./skeleton";
import { Stat, StatGroup } from "./stat";
import { ListRow, ListSeparator, ListSectionHeader } from "./list";
import { Avatar, EmptyState, Eyebrow, Separator } from "./misc";
import { Tabs } from "./tabs";
import { SwipeRow } from "./swipe-row";
import { PageHeader } from "./screen";
import { useState } from "react";

const meta = {
  title: "Native/Gallery",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 12, marginBottom: 28 }}>
      <Eyebrow>{title}</Eyebrow>
      {children}
      <Separator style={{ marginTop: 6 }} />
    </View>
  );
}

export const Everything: Story = {
  render: () => {
    const [tab, setTab] = useState("all");
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Typography">
          <Text variant="displayLg">Every rupee accounted for</Text>
          <Text variant="pageTitle">Accounts</Text>
          <Text variant="lede" tone="secondary">
            Budgets, expenses, shared pools and reports in one ledger.
          </Text>
          <Text variant="copy" tone="secondary">
            Body copy sits at 14pt with generous leading so a paragraph on a phone
            still reads as prose rather than as a data field.
          </Text>
          <Text variant="meta" tone="muted">
            updated 2h ago · tabular numerals
          </Text>
        </Section>

        <Section title="Buttons">
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <Button label="Primary" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Delete" variant="destructive" onPress={() => {}} />
            <Button label="Small" size="sm" onPress={() => {}} />
            <Button label="Disabled" disabled onPress={() => {}} />
          </View>
          <Button label="Continue with Noirly" size="lg" fullWidth onPress={() => {}} />
        </Section>

        <Section title="Status">
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <Badge label="Neutral" />
            <Badge label="Accent" tone="accent" />
            <Badge label="Active" tone="positive" dot />
            <Badge label="Overdue" tone="negative" dot />
            <Avatar name="Aneesh Pissay" />
            <Avatar name="Noirly Bot" size={40} />
          </View>
        </Section>

        <Section title="Fields">
          <FormField label="Full name" required hint="As it appears on your ID.">
            <Input placeholder="Aneesh Pissay" />
          </FormField>
          <FormField label="Email" error="That address is already registered.">
            <Input placeholder="you@example.com" invalid defaultValue="aneesh@example.com" />
          </FormField>
        </Section>

        <Section title="Stats">
          <StatGroup>
            <Stat label="Net worth" value="₹4,82,910" delta="4.2%" trend="up" caption="vs last month" />
            <Stat label="Spent this month" value="₹18,240" delta="1.1%" trend="down" caption="vs last month" />
            <Stat label="Budget left" value="₹31,760" delta="63%" trend="flat" caption="of ₹50,000" />
          </StatGroup>
        </Section>

        <Section title="Tabs">
          <Tabs
            activeId={tab}
            onSelect={setTab}
            items={[
              { id: "all", label: "All", count: 4 },
              { id: "banks", label: "Banks", count: 1 },
              { id: "cards", label: "Cards", count: 1 },
              { id: "archived", label: "Archived" },
            ]}
          />
        </Section>

        <Section title="Lists">
          <Card variant="flat" style={{ paddingVertical: 4 }}>
            <ListSectionHeader label="Accounts" />
            <ListRow title="HDFC Savings" subtitle="Bank" value="₹2,10,400" caption="2h ago" />
            <ListSeparator />
            <ListRow
              title="ICICI Credit"
              subtitle="Card"
              value="−₹18,240"
              valueTone="negative"
              caption="2h ago"
            />
            <ListSeparator />
            <ListRow
              title="Zerodha"
              subtitle="Investment"
              value="₹2,90,750"
              valueTone="positive"
              caption="1d ago"
              onPress={() => {}}
            />
          </Card>
        </Section>

        <Section title="Swipe to delete (drag a row left)">
          <Card variant="flat" style={{ paddingVertical: 4 }}>
            <SwipeRow onAction={() => {}}>
              <ListRow title="Coffee" subtitle="Food & drink" value="−₹240" valueTone="negative" />
            </SwipeRow>
            <ListSeparator />
            <SwipeRow onAction={() => {}}>
              <ListRow title="Metro card" subtitle="Transport" value="−₹500" valueTone="negative" />
            </SwipeRow>
          </Card>
        </Section>

        <Section title="Surfaces">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <SkeletonText lines={3} />
            </CardContent>
            <CardFooter>
              <Button label="Open" variant="ghost" size="sm" onPress={() => {}} />
            </CardFooter>
          </Card>

          <Card variant="flat">
            <EmptyState
              title="No budgets yet"
              description="Set a monthly cap on a category and Ledger will track what is left."
              action={<Button label="Create a budget" size="sm" onPress={() => {}} />}
            />
          </Card>
        </Section>

        <Section title="Loading">
          <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
            <Skeleton width={40} height={40} radius={20} />
            <View style={{ flex: 1 }}>
              <SkeletonText lines={2} />
            </View>
          </View>
        </Section>

        <Section title="Page header">
          <PageHeader
            eyebrow="Accounts · 4 active"
            title="Accounts"
            lead="Everything you own and owe, reconciled every few hours."
          />
        </Section>
      </ScrollView>
    );
  },
};
