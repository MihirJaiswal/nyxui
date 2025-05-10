import { GitHubRepoCard } from "@/nuvyxui/components/github-repo-card";
export default function GitHubRepoCardDemo() {
  return (
    <div className="max-w-md relative">
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
}
