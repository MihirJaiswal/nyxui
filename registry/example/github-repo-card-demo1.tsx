import React from "react";
import { GitHubRepoCard } from "../ui/github-repo-card";

export default function GithubRepoCardDemo1() {
  return (
    <div className="max-w-md relative">
      <GitHubRepoCard
        manualMode={true}
        themeId="neo-brutalist"
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
}
