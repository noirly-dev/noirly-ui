import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./app-shell.js";
import { PageContainer } from "./page-container.js";
import { PageHeader } from "./page-header.js";
import { Button } from "../ui/button.js";
import { Badge } from "../ui/badge.js";
import { Avatar } from "../ui/avatar.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.js";
import { StatCell, StatGroup } from "../ui/stat.js";
import { DataTable, type DataTableColumn } from "../ui/data-table.js";
import { Tabs } from "../ui/tabs.js";
import { EmptyState } from "../ui/empty-state.js";
import { SkeletonRows } from "../ui/skeleton.js";

const meta = {
  title: "Shell/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const groups = [
  {
    items: [
      { href: "/overview", label: "Overview" },
      { href: "/accounts", label: "Accounts" },
    ],
  },
  {
    label: "Money",
    items: [
      { href: "/transactions", label: "Transactions", badge: 12 },
      { href: "/budgets", label: "Budgets" },
      { href: "/reports", label: "Reports" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { href: "/members", label: "Members" },
      { href: "/settings", label: "Settings" },
    ],
  },
];

const brand = (
  <div className="flex items-center gap-2.5">
    <span className="flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)] bg-[var(--accent-soft)] font-display text-sm font-semibold text-[var(--accent)]">
      N
    </span>
    <span className="flex min-w-0 flex-col leading-tight">
      <span className="truncate font-display text-sm font-semibold tracking-tight">Noirly</span>
      <span className="meta text-[0.625rem]">Ledger</span>
    </span>
  </div>
);

const footer = (
  <div className="flex items-center gap-2.5 px-1">
    <Avatar name="Aneesh Pissay" />
    <span className="flex min-w-0 flex-col leading-tight">
      <span className="truncate text-[0.8125rem] font-medium">Aneesh Pissay</span>
      <span className="meta text-[0.625rem]">Owner</span>
    </span>
  </div>
);

type Account = {
  id: string;
  name: string;
  type: string;
  balance: string;
  updated: string;
  status: "active" | "syncing";
};

const accounts: Account[] = [
  { id: "1", name: "HDFC Savings", type: "Bank", balance: "₹2,10,400", updated: "2h ago", status: "active" },
  { id: "2", name: "ICICI Credit", type: "Card", balance: "−₹18,240", updated: "2h ago", status: "active" },
  { id: "3", name: "Zerodha", type: "Investment", balance: "₹2,90,750", updated: "1d ago", status: "syncing" },
  { id: "4", name: "Cash", type: "Wallet", balance: "₹1,240", updated: "3d ago", status: "active" },
];

const columns: DataTableColumn<Account>[] = [
  { id: "name", header: "Account", primary: true, cell: (r) => r.name },
  { id: "type", header: "Type", hideOnMobile: true, cell: (r) => r.type },
  {
    id: "status",
    header: "Status",
    hideOnMobile: true,
    cell: (r) => (
      <Badge dot tone={r.status === "active" ? "positive" : "neutral"}>
        {r.status}
      </Badge>
    ),
  },
  { id: "balance", header: "Balance", numeric: true, cell: (r) => r.balance },
  { id: "updated", header: "Updated", numeric: true, hideOnMobile: true, cell: (r) => r.updated },
];

export const Ledger: Story = {
  args: {
    sidebar: { brand, groups, footer },
    header: {
      breadcrumb: [{ label: "Ledger", href: "/" }, { label: "Accounts" }],
      brand: <span className="font-display text-sm font-semibold">Accounts</span>,
      onCommandClick: () => {},
      actions: <Avatar name="Aneesh Pissay" />,
    },
    children: (
      <PageContainer>
        <PageHeader
          eyebrow="Accounts · 4 active"
          title="Accounts"
          lead="Everything you own and owe, reconciled every few hours."
          action={
            <>
              <Button variant="ghost" size="sm">
                Import
              </Button>
              <Button size="sm">Add account</Button>
            </>
          }
          toolbar={
            <Tabs
              aria-label="Account views"
              activeId="all"
              items={[
                { id: "all", label: "All", count: 4 },
                { id: "banks", label: "Banks", count: 1 },
                { id: "cards", label: "Cards", count: 1 },
                { id: "archived", label: "Archived" },
              ]}
            />
          }
        />

        <StatGroup>
          <StatCell label="Net worth" value="₹4,82,910" delta="4.2%" trend="up" caption="vs last month" />
          <StatCell label="Spent this month" value="₹18,240" delta="1.1%" trend="down" caption="vs last month" />
          <StatCell label="Budget left" value="₹31,760" delta="63%" trend="flat" caption="of ₹50,000" />
          <StatCell label="Accounts" value="4" caption="1 syncing" />
        </StatGroup>

        <Card>
          <CardHeader>
            <CardTitle>All accounts</CardTitle>
          </CardHeader>
          <DataTable columns={columns} rows={accounts} rowKey={(r) => r.id} caption="Accounts" />
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <SkeletonRows rows={4} />
            </CardContent>
          </Card>
          <Card>
            <EmptyState
              title="No budgets yet"
              description="Set a monthly cap on a category and Ledger will track what is left."
              action={<Button size="sm">Create a budget</Button>}
            />
          </Card>
        </div>
      </PageContainer>
    ),
  },
};
