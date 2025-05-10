import { GitHubProfileCard } from "../components/github-profile-card";

export default function GitHubProfileCardDemo() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto relative">
      <div className="w-full max-w-md mx-auto">
        <GitHubProfileCard
          manualMode={true}
          themeId="gradient-purple"
          profileData={{
            login: "mihirjaiswal",
            name: "Mihir Jaiswal",
            avatarUrl: "https://avatars.githubusercontent.com/u/137146214?v=4",
            bio: "Aspiring Web Developer/AI engineer | 🤖 Turning coffee ☕ into code... and occasionally, code into coffee.",
            location: "Indore, India",
            followers: 18,
            following: 0,
            publicRepos: 42,
            createdAt: "2022-03-12T12:00:00Z",
            languages: [
              { name: "TypeScript", color: "#3178c6", percentage: 73 },
              { name: "JavaScript", color: "#f1e05a", percentage: 10 },
              { name: "JyupiterNotebook", color: "#DA5B0B", percentage: 9 },
            ],
            contributionData: [
              0.3, 0.5, 0.8, 0.6, 0.9, 1.0, 0.7, 0.5, 0.6, 0.8, 0.7, 0.9,
            ],
          }}
        />
      </div>
    </div>
  );
}
