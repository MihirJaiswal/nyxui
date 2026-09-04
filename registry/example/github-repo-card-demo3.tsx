import { GitHubRepoCard } from "@/registry/ui/github-repo-card";

export default function GithubRepoCardDemo3() {
  return (
    <div className="w-full max-w-md mx-auto relative">
      <GitHubRepoCard
        theme="modern-light"
        repo={{
          name: "next.js",
          owner: "vercel",
          ownerAvatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
          description:
            "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of full-stack capabilities.",
          stars: 128000,
          forks: 27200,
          watchers: 4200,
          issues: 2900,
          language: "JavaScript",
          updatedAt: "2025-07-28T10:42:33Z",
          topics: ["react", "nextjs", "ssr", "framework"],
          activityData: [
            0.8, 0.9, 1.0, 0.9, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.9, 1.0,
          ],
          isPrivate: false,
        }}
      />
    </div>
  );
}
