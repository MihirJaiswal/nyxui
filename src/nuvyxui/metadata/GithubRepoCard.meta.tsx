import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { GitHubRepoCard } from "../components/GithubRepoCard";
import GitHubRepoCardDemo from "../demos/GithubRepoCardDemo";

import GithubRepoCardSource from '!!raw-loader!@/nuvyxui/components/GithubRepoCard.tsx';
import GithubRepoCardDemoSource from '!!raw-loader!@/nuvyxui/demos/GithubRepoCardDemo.tsx';

export const githubRepoCardData: ComponentData = {
  name: "GitHub Repo Card",
  description: "Beautiful GitHub repository cards with customizable themes, activity graphs, and real-time data fetching.",
  preview: <GitHubRepoCardDemo />,
  usage: GithubRepoCardDemoSource,
  componentCode: GithubRepoCardSource,
  dependencies: [{
    name: "UI Components",
    description: "Various UI components from the shadcn/ui library",
    install: {
      npm: "npx shadcn@latest init",
      pnpm: "pnpm dlx shadcn@latest init",
      yarn: "npx shadcn@latest init",
      bun: "bunx --bun shadcn@latest init",
    },
  },{
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
    },],
    props: [
      {
        name: "GitHub Repo Card",
        items: [
          {
            name: "repoOwner",
            type: "string",
            default: "undefined",
            description: "GitHub username or organization name that owns the repository. Required when not using manualMode.",
          },
          {
            name: "repoName",
            type: "string",
            default: "undefined",
            description: "Name of the GitHub repository. Required when not using manualMode.",
          },
          {
            name: "githubToken",
            type: "string",
            default: "undefined",
            description: "Optional GitHub API token for increased rate limits (unauthenticated: 60/hr, authenticated: 5,000/hr). Store securely using environment variables.",
          },
          {
            name: "manualMode",
            type: "boolean",
            default: "false",
            description: "When true, uses provided repoData instead of fetching from GitHub API. Useful for avoiding rate limits or displaying custom repository data.",
          },
          {
            name: "repoData",
            type: "ManualRepoData",
            default: "undefined",
            description: "Repository data object for manual mode. Required when manualMode is true. Includes fields for repository name, stars, forks, language, etc.",
          },
          {
            name: "themeId",
            type: "string",
            default: "github-light",
            description: "Visual theme for the card. Options: github-light, github-dark, ocean, forest, sunset, nuvyx. Some themes support automatic light/dark mode switching.",
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
            description: "Full repository name with owner (e.g., 'vercel/next.js').",
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
            description: "Repository owner with login (username) and avatarUrl properties.",
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
            description: "Primary programming language used in the repository (optional).",
          },
          {
            name: "languageColor",
            type: "string",
            default: "undefined",
            description: "Hex color code for the language indicator (optional, defaults to standard GitHub language colors).",
          },
          {
            name: "updatedAt",
            type: "string",
            default: "",
            description: "ISO date string of when the repository was last updated.",
          },
          {
            name: "topics",
            type: "string[]",
            default: "[]",
            description: "Array of repository topics/tags to display on the card.",
          },
          {
            name: "activityData",
            type: "number[]",
            default: "undefined",
            description: "Array of 12 normalized values (0-1) representing repository commit activity for the graph display.",
          },
          {
            name: "isPrivate",
            type: "boolean",
            default: "false",
            description: "Whether the repository is private (displays badge on card).",
          },
        ],
      },
    ],
  category: "Cards",
  examples: [
    {
      name: "GitHub Light Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="github-light"
          repoData={{
            name: "react",
            fullName: "facebook/react",
            description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
            owner: {
              login: "facebook",
              avatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4"
            },
            stars: 203000,
            forks: 42000,
            watchers: 6500,
            issues: 1200,
            language: "JavaScript",
            languageColor: "#f1e05a",
            updatedAt: "2025-03-15T12:34:56Z",
            topics: ["javascript", "frontend", "ui", "library"],
            activityData: [0.3, 0.5, 0.8, 0.6, 0.9, 1.0, 0.7, 0.5, 0.6, 0.8, 0.7, 0.9],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardExample() {
  return (
    <GitHubRepoCard 
      repoOwner="facebook"
      repoName="react"
      themeId="github-light"
    />
  );
}`,
    },
    {
      name: "GitHub Dark Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="github-dark"
          repoData={{
            name: "next.js",
            fullName: "vercel/next.js",
            description: "The React framework for production grade applications that scale.",
            owner: {
              login: "vercel",
              avatarUrl: "https://avatars.githubusercontent.com/u/14985020?v=4"
            },
            stars: 98500,
            forks: 23000,
            watchers: 3200,
            issues: 1500,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-01T15:30:00Z",
            topics: ["react", "nextjs", "framework", "jamstack"],
            activityData: [0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.8, 0.9, 0.9, 0.8, 0.7, 0.9],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardDarkExample() {
  return (
    <GitHubRepoCard 
      repoOwner="vercel"
      repoName="next.js"
      themeId="github-dark"
    />
  );
}`,
    },
    {
      name: "Ocean Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="ocean"
          repoData={{
            name: "tailwindcss",
            fullName: "tailwindlabs/tailwindcss",
            description: "A utility-first CSS framework for rapid UI development.",
            owner: {
              login: "tailwindlabs",
              avatarUrl: "https://avatars.githubusercontent.com/u/67109815?v=4"
            },
            stars: 68000,
            forks: 3500,
            watchers: 1800,
            issues: 95,
            language: "JavaScript",
            languageColor: "#f1e05a",
            updatedAt: "2025-04-02T08:15:43Z",
            topics: ["css", "framework", "design", "frontend"],
            activityData: [0.5, 0.6, 0.4, 0.5, 0.7, 0.8, 0.9, 1.0, 0.8, 0.6, 0.7, 0.8],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardOceanExample() {
  return (
    <GitHubRepoCard 
      repoOwner="tailwindlabs"
      repoName="tailwindcss"
      themeId="ocean"
    />
  );
}`,
    },
    {
      name: "Forest Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="forest"
          repoData={{
            name: "vscode",
            fullName: "microsoft/vscode",
            description: "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
            owner: {
              login: "microsoft",
              avatarUrl: "https://avatars.githubusercontent.com/u/6154722?v=4"
            },
            stars: 145000,
            forks: 25600,
            watchers: 3100,
            issues: 7800,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-05T19:22:11Z",
            topics: ["editor", "ide", "typescript", "development"],
            activityData: [0.7, 0.6, 0.8, 0.9, 1.0, 0.8, 0.9, 0.7, 0.8, 0.9, 0.8, 0.7],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardForestExample() {
  return (
    <GitHubRepoCard 
      repoOwner="microsoft"
      repoName="vscode"
      themeId="forest"
    />
  );
}`,
    },
    {
      name: "Sunset Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="sunset"
          repoData={{
            name: "deno",
            fullName: "denoland/deno",
            description: "A modern runtime for JavaScript and TypeScript.",
            owner: {
              login: "denoland",
              avatarUrl: "https://avatars.githubusercontent.com/u/42048915?v=4"
            },
            stars: 89000,
            forks: 4800,
            watchers: 2300,
            issues: 1200,
            language: "Rust",
            languageColor: "#dea584",
            updatedAt: "2025-04-03T11:45:32Z",
            topics: ["javascript", "typescript", "runtime", "security"],
            activityData: [0.3, 0.4, 0.6, 0.8, 0.7, 0.5, 0.6, 0.8, 0.9, 1.0, 0.9, 0.8],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardSunsetExample() {
  return (
    <GitHubRepoCard 
      repoOwner="denoland"
      repoName="deno"
      themeId="sunset"
    />
  );
}`,
    },
    {
      name: "nuvyx Theme Card",
      preview: (
        <GitHubRepoCard 
          manualMode={true}
          themeId="nuvyx"
          repoData={{
            name: "shadcn-ui",
            fullName: "shadcn/ui",
            description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
            owner: {
              login: "shadcn",
              avatarUrl: "https://avatars.githubusercontent.com/u/124599?v=4"
            },
            stars: 42000,
            forks: 3600,
            watchers: 1600,
            issues: 310,
            language: "TypeScript",
            languageColor: "#3178c6",
            updatedAt: "2025-04-07T14:18:57Z",
            topics: ["ui", "components", "tailwindcss", "radix"],
            activityData: [0.4, 0.5, 0.6, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0],
            isPrivate: false
          }}
        />
      ),
      filename: "GitHubRepoCard.tsx",
      code: `import { GitHubRepoCard } from "@/nuvyxui/components/GitHubRepoCard";

export function GitHubRepoCardnuvyxExample() {
  return (
    <GitHubRepoCard 
      repoOwner="shadcn"
      repoName="ui"
      themeId="nuvyx"
    />
  );
}`,
    },
  ],
};