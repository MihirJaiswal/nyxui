import React from "react";
import { GitHubRepoCard } from "../ui/github-repo-card";

export default function GithubRepoCardDemo1() {
  return (
    <div className="max-w-md relative">
      <GitHubRepoCard
        theme="neo-brutalist"
          repo={{
          owner: "microsoft", 
          ownerAvatar: "https://avatars.githubusercontent.com/u/6154722?v=4",
          name: "vscode",
          description:"Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
          stars: 145000,
          forks: 25600,
          watchers: 3100,
          issues: 7800,
          language: "TypeScript",
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
