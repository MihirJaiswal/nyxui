"use client";

import {
  Dropdown,
  Tab,
  Tabs,
  Trigger,
  TriggerWrapper,
} from "@/registry/blocks/morphing-navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Download,
  Film,
  Flame,
  Heart,
  Languages,
  ListVideo,
  Play,
  Sparkles,
  Swords,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

const NavLink = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <span className="group grid w-full cursor-pointer grid-cols-[20px_1fr] items-start gap-x-2 gap-y-0.5 rounded-lg p-2 transition-colors duration-200 hover:bg-accent">
    <span className="col-start-1 row-start-1 flex size-5 items-center justify-center rounded-[2px]">
      <Icon className="size-3.5 text-muted-foreground" />
    </span>
    <span className="col-start-2 row-start-1 text-sm font-medium text-primary">
      {title}
    </span>
    <span className="col-start-2 row-start-2 text-xs leading-4 text-muted-foreground">
      {description}
    </span>
  </span>
);

const NavSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">
      {label}
    </p>
    <ul className="m-0 flex list-none flex-col gap-px p-0">{children}</ul>
  </div>
);

const ArrowLink = ({ children }: { children: React.ReactNode }) => (
  <span className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
    {children}
    <ArrowRight className="size-3.5 opacity-50 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" />
  </span>
);

export const MorphingNavigationDemo = () => {
  return (
    <div className="flex h-96 w-full justify-start">
      <Dropdown>
        <TriggerWrapper>
          <Trigger>Watch</Trigger>
          <Trigger>Library</Trigger>
          <Trigger>Collections</Trigger>
        </TriggerWrapper>
        <Tabs>
          <Tab className="w-190">
            <WatchPanel />
          </Tab>
          <Tab className="w-190">
            <LibraryPanel />
          </Tab>
          <Tab className="w-190">
            <CollectionsPanel />
          </Tab>
        </Tabs>
      </Dropdown>
    </div>
  );
};

const WatchPanel = () => (
  <div className="flex">
    <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-6 p-6">
      <NavSection label="Streaming">
        <li>
          <NavLink
            icon={Clock3}
            title="Simulcast"
            description="New episodes the hour they air."
          />
        </li>
        <li>
          <NavLink
            icon={Languages}
            title="Dubs"
            description="English dubs with the subbed."
          />
        </li>
        <li>
          <NavLink
            icon={Download}
            title="Offline Mode"
            description="Download episodes and watch."
          />
        </li>
      </NavSection>
      <NavSection label="Discover">
        <li>
          <NavLink
            icon={Flame}
            title="Trending Now"
            description="What everyone is watching ?"
          />
        </li>
        <li>
          <NavLink
            icon={CalendarDays}
            title="Release Calendar"
            description="Air dates for every next episode"
          />
        </li>
        <li>
          <NavLink
            icon={Users}
            title="Watch Parties"
            description="Sync up and stream together."
          />
        </li>
      </NavSection>
    </div>
    <span className="w-px shrink-0 bg-neutral-200 dark:bg-neutral-800" />
    <aside className="w-60 shrink-0 p-6 pl-5">
      <p className="pb-2 text-xs font-medium text-neutral-400 dark:text-neutral-500">
        Featured collection
      </p>
      <span className="group block cursor-pointer">
        <span className="block w-full overflow-hidden rounded-lg">
          <span className="block aspect-219/144 w-full bg-linear-to-br bg-size-[150%] from-rose-500 via-violet-600 to-indigo-500 transition-transform duration-300 group-hover:scale-105" />
        </span>
        <span className="mt-3 block text-sm leading-5 text-neutral-500 dark:text-neutral-400"></span>
        <ArrowLink>Explore collection</ArrowLink>
      </span>
    </aside>
  </div>
);

const LibraryPanel = () => (
  <div className="flex">
    <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-6 p-6">
      <NavSection label="Browse by category">
        <li>
          <NavLink
            icon={Swords}
            title="Shonen Classics"
            description="Series that defined a generation"
          />
        </li>
        <li>
          <NavLink
            icon={Sparkles}
            title="Isekai Hits"
            description="Every popular another-world story."
          />
        </li>
        <li>
          <NavLink
            icon={Heart}
            title="Slice of Life"
            description="Shows for relaxed viewing."
          />
        </li>
      </NavSection>
      <NavSection label="Continue">
        <li>
          <NavLink
            icon={Play}
            title="Continue Watching"
            description="Pick up right where you left off"
          />
        </li>
        <li>
          <NavLink
            icon={ListVideo}
            title="My List"
            description="Everything you saved for later"
          />
        </li>
        <li>
          <NavLink
            icon={Film}
            title="Movies"
            description="Feature films and festival favorites"
          />
        </li>
      </NavSection>
    </div>
    <span className="w-px shrink-0 bg-neutral-200 dark:bg-neutral-800" />
    <aside className="w-60 shrink-0 p-6 pl-5">
      <p className="pb-2 text-xs font-medium text-neutral-400 dark:text-neutral-500">
        Saved list
      </p>
      <span className="group block cursor-pointer">
        <span className="block w-full overflow-hidden rounded-lg">
          <span className="block aspect-219/144 w-full bg-linear-to-br bg-size-[150%] from-amber-400 via-orange-500 to-rose-500 transition-transform duration-300 group-hover:scale-105" />
        </span>
        <ArrowLink>Open library</ArrowLink>
      </span>
    </aside>
  </div>
);

const CollectionsPanel = () => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-6">
    <NavSection label="Featured">
      <li>
        <span className="group grid w-full cursor-pointer grid-cols-[20px_1fr] items-start gap-x-2 gap-y-0.5 rounded-lg p-2 transition-colors duration-200 hover:bg-accent">
          <span className="col-start-1 row-start-1 flex size-5 items-center justify-center">
            <Trophy className="size-3.5 text-muted-foreground" />
          </span>
          <span className="col-start-2 row-start-1 flex items-center gap-1 text-sm font-medium text-primary">
            Top 100 of All Time
            <ArrowRight className="size-3.5 opacity-50 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </span>
          <span className="col-start-2 row-start-2 text-xs leading-4 text-muted-foreground">
            Community-voted rankings updated every season
          </span>
        </span>
      </li>
    </NavSection>
    <NavSection label="Genres">
      <li>
        <NavLink
          icon={Swords}
          title="Action & Adventure"
          description="High-energy fights, quests and rivalries"
        />
      </li>
      <li>
        <NavLink
          icon={Heart}
          title="Romance & Drama"
          description="Slow-burn stories and emotional payoffs"
        />
      </li>
    </NavSection>
  </div>
);
