import React from "react";
import { GitHubRepoCard } from "../ui/github-repo-card";

export default function GithubRepoCardDemo2() {
  return (
    <div className="w-full max-w-md mx-auto relative">
      <GitHubRepoCard
        theme="modern-dark"
        repo={{
          name: "tailwindcss",
          description:
            "A utility-first CSS framework for rapid UI development.",
          owner: "tailwindlabs",
          ownerAvatar: "https://avatars.githubusercontent.com/u/115471?v=4",
          stars: 68000,
          forks: 3500,
          watchers: 1800,
          issues: 95,
          language: "JavaScript",
          updatedAt: "2025-04-02T08:15:43Z",
          topics: ["css", "framework", "design", "frontend"],
          activityData: [
            0.5, 0.6, 0.4, 0.5, 0.7, 0.8, 0.9, 1.0, 0.8, 0.6, 0.7, 0.8,
          ],
          isPrivate: false,
        }}
      />
    </div>
  );
}
