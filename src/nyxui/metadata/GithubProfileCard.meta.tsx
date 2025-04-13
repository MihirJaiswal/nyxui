import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { GitHubProfileCard } from "../components/GithubProfileCard";
import GitHubProfileCardDemo from "../demos/GithubProfileCardDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/GithubProfileCard.tsx");
const githubProfileCardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/GitHubProfileCardDemo.tsx");
const githubProfileCardDemoSource = fs.readFileSync(demoPath, "utf8");

export const githubProfileCardData: ComponentData = {
  name: "GitHub Profile Card",
  description: "Beautiful GitHub profile cards with customizable themes, activity graphs, and real-time data fetching.",
  preview: <GitHubProfileCardDemo />,
  usage: githubProfileCardDemoSource,
  componentCode: githubProfileCardSource,
  dependencies: [{
    name: "UI Components",
    description: "Various UI components from the shadcn/ui library",
    install: {
      npm: "npx shadcn@latest init",
      pnpm: "pnpm dlx shadcn@latest init",
      yarn: "npx shadcn@latest init",
      bun: "bunx --bun shadcn@latest init",
    },
  }, {
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
  }],
  props: [
    {
      name: "GitHub Profile Card",
      items: [
        {
          name: "username",
          type: "string",
          default: "undefined",
          description: "GitHub username to fetch profile data for. Required when not using manualMode.",
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
          description: "When true, uses provided profileData instead of fetching from GitHub API. Useful for avoiding rate limits or displaying custom profile data.",
        },
        {
          name: "profileData",
          type: "ManualProfileData",
          default: "undefined",
          description: "Profile data object for manual mode. Required when manualMode is true. Includes fields for username, name, followers, etc.",
        },
        {
          name: "themeId",
          type: "string",
          default: "github-light",
          description: "Visual theme for the card. Options: github-light, github-dark, ocean, forest, sunset, nyx. Some themes support automatic light/dark mode switching.",
        },
      ],
    },
    {
      name: "ManualProfileData Type",
      items: [
        {
          name: "login",
          type: "string",
          default: "",
          description: "GitHub username (login).",
        },
        {
          name: "name",
          type: "string",
          default: "",
          description: "Display name of the GitHub user.",
        },
        {
          name: "avatarUrl",
          type: "string",
          default: "",
          description: "URL to the user's GitHub avatar image.",
        },
        {
          name: "bio",
          type: "string",
          default: "undefined",
          description: "User's GitHub bio (optional).",
        },
        {
          name: "location",
          type: "string",
          default: "undefined",
          description: "User's location from their GitHub profile (optional).",
        },
        {
          name: "followers",
          type: "number",
          default: "0",
          description: "Number of GitHub followers.",
        },
        {
          name: "following",
          type: "number",
          default: "0",
          description: "Number of users the profile is following on GitHub.",
        },
        {
          name: "publicRepos",
          type: "number",
          default: "0",
          description: "Number of public repositories.",
        },
        {
          name: "createdAt",
          type: "string",
          default: "",
          description: "ISO date string of when the user joined GitHub.",
        },
        {
          name: "languages",
          type: "Array<{ name: string, color: string, percentage: number }>",
          default: "undefined",
          description: "Array of most used programming languages with name, color, and usage percentage.",
        },
        {
          name: "pinnedRepos",
          type: "Array<{ name: string, description?: string, language?: string, languageColor?: string, stars: number, forks: number }>",
          default: "undefined",
          description: "Array of pinned or featured repositories with their details.",
        },
        {
          name: "contributionData",
          type: "Array<number>",
          default: "undefined",
          description: "Array of 12 normalized values (0-1) representing GitHub contribution activity for the graph display.",
        },
      ],
    },
  ],
  category: "Cards",
  examples: [
    {
      name: "GitHub Light Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="github-light"
          profileData={{
            login: "johndoe",
            name: "John Doe",
            avatarUrl: "https://avatars.githubusercontent.com/u/12345678?v=4",
            bio: "Frontend developer passionate about React and UI/UX design",
            location: "San Francisco, CA",
            followers: 1250,
            following: 320,
            publicRepos: 45,
            createdAt: "2015-03-12T12:00:00Z",
            languages: [
              { name: "JavaScript", color: "#f1e05a", percentage: 45 },
              { name: "TypeScript", color: "#3178c6", percentage: 35 },
              { name: "CSS", color: "#563d7c", percentage: 20 }
            ],
            pinnedRepos: [
              {
                name: "react-toolkit",
                description: "A collection of React hooks and utilities",
                language: "TypeScript",
                languageColor: "#3178c6",
                stars: 560,
                forks: 120
              },
              {
                name: "tailwind-components",
                description: "Reusable Tailwind CSS components",
                language: "JavaScript",
                languageColor: "#f1e05a",
                stars: 340,
                forks: 85
              }
            ],
            contributionData: [0.3, 0.5, 0.8, 0.6, 0.9, 1.0, 0.7, 0.5, 0.6, 0.8, 0.7, 0.9]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardExample() {
  return (
    <GitHubProfileCard 
      username="johndoe"
      themeId="github-light"
    />
  );
}`,
    },
    {
      name: "GitHub Dark Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="github-dark"
          profileData={{
            login: "janesmith",
            name: "Jane Smith",
            avatarUrl: "https://avatars.githubusercontent.com/u/87654321?v=4",
            bio: "Backend engineer working with Node.js and Go",
            location: "Austin, TX",
            followers: 830,
            following: 145,
            publicRepos: 32,
            createdAt: "2017-06-22T15:30:00Z",
            languages: [
              { name: "TypeScript", color: "#3178c6", percentage: 50 },
              { name: "Go", color: "#00ADD8", percentage: 30 },
              { name: "Python", color: "#3572A5", percentage: 20 }
            ],
            pinnedRepos: [
              {
                name: "go-microservices",
                description: "Microservices architecture with Go",
                language: "Go",
                languageColor: "#00ADD8",
                stars: 780,
                forks: 230
              },
              {
                name: "node-api-toolkit",
                description: "Node.js API development toolkit",
                language: "TypeScript",
                languageColor: "#3178c6",
                stars: 520,
                forks: 140
              }
            ],
            contributionData: [0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.8, 0.9, 0.9, 0.8, 0.7, 0.9]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardDarkExample() {
  return (
    <GitHubProfileCard 
      username="janesmith"
      themeId="github-dark"
    />
  );
}`,
    },
    {
      name: "Ocean Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="ocean"
          profileData={{
            login: "devsmith",
            name: "Developer Smith",
            avatarUrl: "https://avatars.githubusercontent.com/u/23456789?v=4",
            bio: "Full-stack developer specializing in React & Node.js",
            location: "Seattle, WA",
            followers: 620,
            following: 210,
            publicRepos: 29,
            createdAt: "2018-01-15T10:45:00Z",
            languages: [
              { name: "JavaScript", color: "#f1e05a", percentage: 40 },
              { name: "TypeScript", color: "#3178c6", percentage: 35 },
              { name: "Python", color: "#3572A5", percentage: 25 }
            ],
            pinnedRepos: [
              {
                name: "next-dashboard",
                description: "Dashboard template built with Next.js",
                language: "TypeScript",
                languageColor: "#3178c6",
                stars: 450,
                forks: 120
              },
              {
                name: "express-api-boilerplate",
                description: "Express.js API starter with authentication",
                language: "JavaScript",
                languageColor: "#f1e05a",
                stars: 320,
                forks: 95
              }
            ],
            contributionData: [0.5, 0.6, 0.4, 0.5, 0.7, 0.8, 0.9, 1.0, 0.8, 0.6, 0.7, 0.8]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardOceanExample() {
  return (
    <GitHubProfileCard 
      username="devsmith"
      themeId="ocean"
    />
  );
}`,
    },
    {
      name: "Forest Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="forest"
          profileData={{
            login: "techguru",
            name: "Tech Guru",
            avatarUrl: "https://avatars.githubusercontent.com/u/34567890?v=4",
            bio: "Software architect focused on scalable systems",
            location: "Boston, MA",
            followers: 1850,
            following: 105,
            publicRepos: 38,
            createdAt: "2016-07-08T09:20:00Z",
            languages: [
              { name: "Java", color: "#b07219", percentage: 45 },
              { name: "Kotlin", color: "#A97BFF", percentage: 30 },
              { name: "Rust", color: "#dea584", percentage: 25 }
            ],
            pinnedRepos: [
              {
                name: "spring-microservices",
                description: "Spring Boot microservices example",
                language: "Java",
                languageColor: "#b07219",
                stars: 680,
                forks: 230
              },
              {
                name: "kotlin-coroutines-demo",
                description: "Advanced Kotlin coroutines examples",
                language: "Kotlin",
                languageColor: "#A97BFF",
                stars: 420,
                forks: 85
              }
            ],
            contributionData: [0.7, 0.6, 0.8, 0.9, 1.0, 0.8, 0.9, 0.7, 0.8, 0.9, 0.8, 0.7]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardForestExample() {
  return (
    <GitHubProfileCard 
      username="techguru"
      themeId="forest"
    />
  );
}`,
    },
    {
      name: "Sunset Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="sunset"
          profileData={{
            login: "codeartist",
            name: "Code Artist",
            avatarUrl: "https://avatars.githubusercontent.com/u/45678901?v=4",
            bio: "UI/UX designer who codes with React & CSS wizardry",
            location: "Portland, OR",
            followers: 740,
            following: 280,
            publicRepos: 25,
            createdAt: "2019-03-25T14:30:00Z",
            languages: [
              { name: "TypeScript", color: "#3178c6", percentage: 40 },
              { name: "CSS", color: "#563d7c", percentage: 35 },
              { name: "HTML", color: "#e34c26", percentage: 25 }
            ],
            pinnedRepos: [
              {
                name: "design-system",
                description: "A complete React design system with Storybook",
                language: "TypeScript",
                languageColor: "#3178c6",
                stars: 390,
                forks: 75
              },
              {
                name: "css-animations",
                description: "Collection of advanced CSS animations",
                language: "CSS",
                languageColor: "#563d7c",
                stars: 260,
                forks: 65
              }
            ],
            contributionData: [0.3, 0.4, 0.6, 0.8, 0.7, 0.5, 0.6, 0.8, 0.9, 1.0, 0.9, 0.8]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardSunsetExample() {
  return (
    <GitHubProfileCard 
      username="codeartist"
      themeId="sunset"
    />
  );
}`,
    },
    {
      name: "Nyx Theme Profile Card",
      preview: (
        <GitHubProfileCard 
          manualMode={true}
          themeId="nyx"
          profileData={{
            login: "nightcoder",
            name: "Night Coder",
            avatarUrl: "https://avatars.githubusercontent.com/u/56789012?v=4",
            bio: "DevOps engineer passionate about automation and cloud infrastructure",
            location: "Amsterdam, Netherlands",
            followers: 920,
            following: 125,
            publicRepos: 31,
            createdAt: "2017-12-05T23:15:00Z",
            languages: [
              { name: "Python", color: "#3572A5", percentage: 45 },
              { name: "Go", color: "#00ADD8", percentage: 30 },
              { name: "Shell", color: "#89e051", percentage: 25 }
            ],
            pinnedRepos: [
              {
                name: "terraform-patterns",
                description: "Common Terraform patterns for cloud infrastructure",
                language: "Go",
                languageColor: "#00ADD8",
                stars: 540,
                forks: 175
              },
              {
                name: "kubernetes-toolkit",
                description: "Tools and utilities for Kubernetes management",
                language: "Python",
                languageColor: "#3572A5",
                stars: 490,
                forks: 130
              }
            ],
            contributionData: [0.4, 0.5, 0.6, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0]
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nyxui/components/GitHubProfileCard";

export function GitHubProfileCardNyxExample() {
  return (
    <GitHubProfileCard 
      username="nightcoder"
      themeId="nyx"
    />
  );
}`,
    },
  ],
};