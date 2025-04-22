import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { GitHubProfileCard } from "../components/GithubProfileCard";
import GitHubProfileCardDemo from "../demos/GithubProfileCardDemo";
import GithubProfileCardSource from "!!raw-loader!@/nuvyxui/components/GithubProfileCard.tsx";
import GithubProfileCardDemoSource from "!!raw-loader!@/nuvyxui/demos/GithubProfileCardDemo.tsx";

export const githubProfileCardData: ComponentData = {
  name: "GitHub Profile Card",
  description:
    "Beautiful GitHub profile cards with customizable themes, activity graphs, and real-time data fetching.",
  preview: <GitHubProfileCardDemo />,
  usage: GithubProfileCardDemoSource,
  componentCode: GithubProfileCardSource,
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
      name: "GitHub Profile Card",
      items: [
        {
          name: "username",
          type: "string",
          default: "undefined",
          description:
            "GitHub username to fetch profile data for. Required when not using manualMode.",
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
            "When true, uses provided profileData instead of fetching from GitHub API. Useful for avoiding rate limits or displaying custom profile data.",
        },
        {
          name: "profileData",
          type: "ManualProfileData",
          default: "undefined",
          description:
            "Profile data object for manual mode. Required when manualMode is true. Includes fields for username, name, followers, etc.",
        },
        {
          name: "themeId",
          type: "string",
          default: "github-light",
          description:
            "Visual theme for the card. Options: modern-light, gradient-blue, gradient-purple, minimal-black. Some themes support automatic light/dark mode switching.",
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
          description:
            "Array of most used programming languages with name, color, and usage percentage.",
        },
        {
          name: "contributionData",
          type: "Array<number>",
          default: "undefined",
          description:
            "Array of 12 normalized values (0-1) representing GitHub contribution activity for the graph display.",
        },
      ],
    },
  ],
  category: "Cards",
  tags: ["GitHub", "Card"],
  examples: [
    {
      name: "GitHub Light Theme Profile Card",
      preview: (
        <GitHubProfileCard
          manualMode={true}
          themeId="gradient-blue"
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
              { name: "CSS", color: "#563d7c", percentage: 20 },
            ],
            contributionData: [
              0.3, 0.5, 0.8, 0.6, 0.9, 1.0, 0.7, 0.5, 0.6, 0.8, 0.7, 0.9,
            ],
          }}
        />
      ),
      filename: "GitHubProfileCard.tsx",
      code: `import { GitHubProfileCard } from "@/nuvyxui/components/GitHubProfileCard";

export function GitHubProfileCardExample() {
  return (
    <GitHubProfileCard
          manualMode={true}
          themeId="gradient-blue"
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
              { name: "CSS", color: "#563d7c", percentage: 20 },
            ],
            contributionData: [
              0.3, 0.5, 0.8, 0.6, 0.9, 1.0, 0.7, 0.5, 0.6, 0.8, 0.7, 0.9,
            ],
          }}
        />
  );
}`,
    },
  ],
};
