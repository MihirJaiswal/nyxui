import { GitHubRepoCard } from "../ui/github-repo-card";

export default function GitHubRepoCardDemo() {
  return (
    <div className="max-w-md relative">
      <GitHubRepoCard
        theme="cyberpunk"
        repo={{
          name: "shadcn-ui",
          owner: "shadcn",
          ownerAvatar: "https://avatars.githubusercontent.com/u/124599?v=4",
          description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
          stars: 42000,
          forks: 3600,
          watchers: 1600,
          issues: 310,
          language: "TypeScript",
          updatedAt: "2025-04-07T14:18:57Z",
          topics: ["ui", "components", "tailwindcss", "radix"],
          activityData: [0.4, 0.5, 0.6, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0],
          isPrivate: false,
        }}
      />
    </div>
  );
}