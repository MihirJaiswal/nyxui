import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { GitHubRepoCard } from "../components/GithubRepoCard";
import GitHubRepoCardDemo from "../demos/GithubRepoCardDemo";

import GithubRepoCardSource from "!!raw-loader!@/nuvyxui/components/GithubRepoCard.tsx";
import GithubRepoCardDemoSource from "!!raw-loader!@/nuvyxui/demos/GithubRepoCardDemo.tsx";

export const githubRepoCardData: ComponentData = {
  name: "GitHub Repo Card",
  description:
    "Beautiful GitHub repository cards with customizable themes, activity graphs, and real-time data fetching.",
  preview: <GitHubRepoCardDemo />,
  usage: GithubRepoCardDemoSource,
  componentCode: GithubRepoCardSource,
  dependencies: [
    {
      name: "Utility Functions",
      description: "Utility functions for conditional class name merging.",
      install: {
        npm: "npm install clsx tailwind-merge",
        pnpm: "pnpm add clsx tailwind-merge",
        yarn: "yarn add clsx tailwind-merge",
        bun: "bun add clsx tailwind-merge",
      },
      setup: {
        description: "Create a utils.ts file with the cn utility function",
        file: "/lib/utils.ts",
        code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    },
  ],
  props: [
    {
      name: "GitHub Repo Card",
      items: [
        {
          name: "repoOwner",
          type: "string",
          default: "undefined",
          description:
            "GitHub username or organization name that owns the repository. Required when not using manualMode.",
        },
        {
          name: "repoName",
          type: "string",
          default: "undefined",
          description:
            "Name of the GitHub repository. Required when not using manualMode.",
        },
        {
          name: "githubToken",
          type: "string",
          default: "undefined",
          description:
            "Optional GitHub API token for increased rate limits (unauthenticated: 60/hr, authenticated: 5,000/hr). Store securely using environment variables.",
        },
        {
          name: "manualMode",
          type: "boolean",
          default: "false",
          description:
            "When true, uses provided repoData instead of fetching from GitHub API. Useful for avoiding rate limits or displaying custom repository data.",
        },
        {
          name: "repoData",
          type: "ManualRepoData",
          default: "undefined",
          description:
            "Repository data object for manual mode. Required when manualMode is true. Includes fields for repository name, stars, forks, language, etc.",
        },
        {
          name: "themeId",
          type: "string",
          default: "modern-dark",
          description:
            "Visual theme for the card. Options: modern-dark, modern-light, retro, midnight. Some themes support automatic light/dark mode switching.",
        },
      ],
    },
    {
      name: "ManualRepoData Type",
      items: [
        {
          name: "name",
          type: "string",
          default: "",
          description: "Repository name (e.g., 'next.js').",
        },
        {
          name: "fullName",
          type: "string",
          default: "",
          description:
            "Full repository name with owner (e.g., 'vercel/next.js').",
        },
        {
          name: "description",
          type: "string",
          default: "",
          description: "Repository description (optional).",
        },
        {
          name: "owner",
          type: "object",
          default: "{ login: '', avatarUrl: '' }",
          description:
            "Repository owner with login (username) and avatarUrl properties.",
        },
        {
          name: "stars",
          type: "number",
          default: "0",
          description: "Number of repository stars.",
        },
        {
          name: "forks",
          type: "number",
          default: "0",
          description: "Number of repository forks.",
        },
        {
          name: "watchers",
          type: "number",
          default: "0",
          description: "Number of repository watchers.",
        },
        {
          name: "issues",
          type: "number",
          default: "0",
          description: "Number of open issues in the repository.",
        },
        {
          name: "language",
          type: "string",
          default: "undefined",
          description:
            "Primary programming language used in the repository (optional).",
        },
        {
          name: "languageColor",
          type: "string",
          default: "undefined",
          description:
            "Hex color code for the language indicator (optional, defaults to standard GitHub language colors).",
        },
        {
          name: "updatedAt",
          type: "string",
          default: "",
          description:
            "ISO date string of when the repository was last updated.",
        },
        {
          name: "topics",
          type: "string[]",
          default: "[]",
          description:
            "Array of repository topics/tags to display on the card.",
        },
        {
          name: "activityData",
          type: "number[]",
          default: "undefined",
          description:
            "Array of 12 normalized values (0-1) representing repository commit activity for the graph display.",
        },
        {
          name: "isPrivate",
          type: "boolean",
          default: "false",
          description:
            "Whether the repository is private (displays badge on card).",
        },
      ],
    },
  ],
  category: "Cards",
  examples: [
    {
      name: "Retro Theme Card",
      preview: (
        <div className="max-w-md">
          <GitHubRepoCard
          manualMode={true}
          themeId="retro"
          repoData={{
            name: "vscode",
            fullName: "microsoft/vscode",
            description:
              "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
            owner: {
              login: "microsoft",
              avatarUrl: "https://avatars.githubusercontent.com/u/6154722?v=4",
            },
            stars: 145000,
            forks: 25600,
            watchers: 3100,
            issues: 7800,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-05T19:22:11Z",
            topics: ["editor", "ide", "typescript", "development"],
            activityData: [
              0.7, 0.6, 0.8, 0.9, 1.0, 0.8, 0.9, 0.7, 0.8, 0.9, 0.8, 0.7,
            ],
            isPrivate: false,
          }}
        />
        </div>
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardForestExample() {
  return (
    <div className="max-w-md">
          <GitHubRepoCard
          manualMode={true}
          themeId="retro"
          repoData={{
            name: "vscode",
            fullName: "microsoft/vscode",
            description:
              "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
            owner: {
              login: "microsoft",
              avatarUrl: "https://avatars.githubusercontent.com/u/6154722?v=4",
            },
            stars: 145000,
            forks: 25600,
            watchers: 3100,
            issues: 7800,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-05T19:22:11Z",
            topics: ["editor", "ide", "typescript", "development"],
            activityData: [
              0.7, 0.6, 0.8, 0.9, 1.0, 0.8, 0.9, 0.7, 0.8, 0.9, 0.8, 0.7,
            ],
            isPrivate: false,
          }}
        />
        </div>
  );
}`,
    },
    {
      name: "Midnight Theme Card",
      preview: (
        <div className="max-w-md">
          <GitHubRepoCard
            manualMode={true}
            themeId="midnight"
            repoData={{
            name: "shadcn-ui",
            fullName: "shadcn/ui",
            description:
              "Beautifully designed components built with Radix UI and Tailwind CSS.",
            owner: {
              login: "shadcn",
              avatarUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
            },
            stars: 42000,
            forks: 3600,
            watchers: 1600,
            issues: 310,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-07T14:18:57Z",
            topics: ["ui", "components", "tailwindcss", "radix"],
            activityData: [
              0.4, 0.5, 0.6, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0,
            ],
            isPrivate: false,
          }}
        />
        </div>
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardnuvyxExample() {
  return (
    <div className="max-w-md">
          <GitHubRepoCard
            manualMode={true}
            themeId="midnight"
            repoData={{
            name: "shadcn-ui",
            fullName: "shadcn/ui",
            description:
              "Beautifully designed components built with Radix UI and Tailwind CSS.",
            owner: {
              login: "shadcn",
              avatarUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
            },
            stars: 42000,
            forks: 3600,
            watchers: 1600,
            issues: 310,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-07T14:18:57Z",
            topics: ["ui", "components", "tailwindcss", "radix"],
            activityData: [
              0.4, 0.5, 0.6, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0,
            ],
            isPrivate: false,
          }}
        />
        </div>
  );
}`,
    }
  ],
};
