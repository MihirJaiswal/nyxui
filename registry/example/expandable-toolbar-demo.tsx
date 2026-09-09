"use client";

import {
  ExpandableToolbar,
  type ToolbarItem,
} from "@/registry/blocks/expandable-toolbar";
import {
  FileSpreadsheet,
  FileText,
  FileType2,
  Folder,
  MessageCircle,
  TrendingUp,
  User,
  WalletCards,
} from "lucide-react";

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-3 pb-1">{children}</div>
);

const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="flex h-8 w-full select-none items-center justify-center rounded-lg bg-muted text-xs font-medium text-foreground transition-colors hover:bg-accent active:scale-[0.98]"
  >
    {children}
  </button>
);

const Avatar = ({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) => (
  <span
    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white ${className}`}
  >
    {initials}
  </span>
);

const ListRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-accent">
    {children}
  </div>
);

const UserPanel = () => (
  <Panel>
    <div className="flex items-center gap-2.5">
      <Avatar
        initials="MI"
        className="bg-linear-to-br from-blue-500 to-blue-400"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">Mihir</span>
        <span className="text-xs text-muted-foreground">@mihirjaiswal</span>
      </div>
    </div>
    <div className="border-t border-border" />
    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
      <div className="flex justify-between">
        <span>Plan</span>
        <span className="font-medium text-foreground">Pro</span>
      </div>
      <div className="flex justify-between">
        <span>Member since</span>
        <span className="font-medium text-foreground">2023</span>
      </div>
    </div>
    <ActionButton>Edit Profile</ActionButton>
  </Panel>
);

const MESSAGES = [
  {
    initials: "SK",
    color: "bg-linear-to-br from-rose-500 to-rose-400",
    name: "Sarah K.",
    text: "Can you review the PR?",
  },
  {
    initials: "JT",
    color: "bg-linear-to-br from-emerald-500 to-emerald-400",
    name: "James T.",
    text: "Deploy is live",
  },
  {
    initials: "AL",
    color: "bg-linear-to-br from-amber-500 to-amber-400",
    name: "Ana L.",
    text: "Meeting moved to 3pm",
  },
];

const MessagesPanel = () => (
  <Panel>
    <p className="text-xs font-medium text-muted-foreground">3 new messages</p>
    <div className="flex flex-col">
      {MESSAGES.map((m) => (
        <ListRow key={m.name}>
          <Avatar initials={m.initials} className={m.color} />
          <div className="flex min-w-0 flex-col">
            <span className="text-xs font-medium text-foreground">
              {m.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {m.text}
            </span>
          </div>
        </ListRow>
      ))}
    </div>
    <ActionButton>View all messages</ActionButton>
  </Panel>
);

const FILES = [
  { icon: FileText, name: "Project_Proposal.pdf", size: "2.4 MB" },
  { icon: FileType2, name: "Meeting_Notes.docx", size: "128 KB" },
  { icon: FileSpreadsheet, name: "Financial_Report.xlsx", size: "842 KB" },
];

const DocumentsPanel = () => (
  <Panel>
    <p className="text-xs font-medium text-muted-foreground">Recent files</p>
    <div className="flex flex-col">
      {FILES.map((f) => (
        <ListRow key={f.name}>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
            <f.icon className="size-4 text-muted-foreground" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-medium text-foreground">
              {f.name}
            </span>
            <span className="text-muted-foreground text-[11px]">{f.size}</span>
          </div>
        </ListRow>
      ))}
    </div>
    <ActionButton>Manage documents</ActionButton>
  </Panel>
);

const WalletPanel = () => (
  <Panel>
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">Current balance</span>
      <span className="text-2xl font-medium tracking-tight text-foreground">
        $1,250.32
      </span>
      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
        <TrendingUp className="size-3.5" />
        +12.4% this month
      </span>
    </div>
    <div className="border-t border-border" />
    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
      <div className="flex justify-between">
        <span>Pending</span>
        <span className="font-medium text-foreground">$84.00</span>
      </div>
      <div className="flex justify-between">
        <span>Last payout</span>
        <span className="font-medium text-foreground">Sep 1</span>
      </div>
    </div>
    <ActionButton>View transactions</ActionButton>
  </Panel>
);

const ITEMS: ToolbarItem[] = [
  {
    id: 1,
    label: "User",
    icon: <User className="size-4.5" />,
    content: <UserPanel />,
  },
  {
    id: 2,
    label: "Messages",
    icon: <MessageCircle className="size-4.5" />,
    content: <MessagesPanel />,
  },
  {
    id: 3,
    label: "Documents",
    icon: <Folder className="size-4.5" />,
    content: <DocumentsPanel />,
  },
  {
    id: 4,
    label: "Wallet",
    icon: <WalletCards className="size-4.5" />,
    content: <WalletPanel />,
  },
];

export const ExpandableToolbarDemo = () => {
  return (
    <div className="relative flex h-80 w-full items-end justify-center pb-8">
      <ExpandableToolbar items={ITEMS} searchPlaceholder="Search notes" />
    </div>
  );
};
