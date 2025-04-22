import { GitHubRepoCard } from "@/nuvyxui/components/GithubRepoCard";

export default function GitHubRepoCardDemo() {
  const token = process.env.GITHUB_TOKEN;
  return (
    <div className="w-full max-w-md mx-auto">
      <GitHubRepoCard  
        repoOwner="MihirJaiswal"
        repoName="nuvyxui"
        themeId="modern-dark"
        githubToken={token}
      />
    </div>
  );
}
