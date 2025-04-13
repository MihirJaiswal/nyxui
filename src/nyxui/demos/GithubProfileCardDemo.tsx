"use client"
import { useState } from "react";
import { GitHubProfileCard, themes } from "../components/GithubProfileCard";

export default function GitHubProfileCardDemo() {
  const [selectedTheme, setSelectedTheme] = useState("github-light");

  const sampleProfileData = {
    login: "MihirJaiswal",
    name: "Mihir Jaiswal",
    avatarUrl: "https://avatars.githubusercontent.com/u/137146214?s=400&u=4f98a71bab33f56d2c388330bf3c06b26039dc6f&v=4",
    bio: "👨‍💻 Aspiring Web Developer/AI engineer | Engineering 🚀|🤖 Turning coffee ☕ into code... and occasionally, code into coffee. ☕🖥️",
    location: "Indore, India",
    followers: 16,
    following: 0,
    publicRepos: 41,
    createdAt: "2023-06-20",
    languages: [
      { name: "TypeScript", color: "#3178c6", percentage: 69 },
      { name: "JavaScript", color: "#f1e05a", percentage: 12 },
      { name: "HTML", color: "#e00417", percentage: 11 },
    ],
    pinnedRepos: [
      {
        name: "Nyx UI",
        description: "A beautiful component library for Next.js",
        language: "TypeScript",
        languageColor: "#3178c6",
        stars: 542,
        forks: 123,
      },
      {
        name: "CertiGen",
        description: "A certificate generation tool",
        language: "JavaScript",
        languageColor: "#f1e05a",
        stars: 1243,
        forks: 287,
      },
    ],
    contributionData: [
      0.13, 0.27, 0.5, 0.4, 0.77, 0.6, 0.83, 1.0, 0.53, 0.67, 0.93, 0.73, 0.47, 0.63, 0.87, 0.7,
      0.57, 0.37, 0.8, 0.97, 0.33, 0.3, 0.43, 0.9
    ],
  };

  const getButtonStyle = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);

    if (selectedTheme === themeId) {
      return {
        backgroundColor:
          theme?.id === "github-dark" || theme?.id === "nyx"
            ? "#2a2a3a"
            : theme?.id === "ocean"
            ? "#0057b7"
            : theme?.id === "forest"
            ? "#2f855a"
            : theme?.id === "sunset"
            ? "#9a3412"
            : theme?.id === "github-light"
            ? "#0969da"
            : "#3182ce",
        color: "#ffffff",
        border: "none",
      };
    } else {
      return {
        backgroundColor:
          theme?.id === "github-dark" || theme?.id === "nyx"
            ? "#1a1a2e"
            : theme?.id === "ocean"
            ? "#e0f0ff"
            : theme?.id === "forest"
            ? "#e0fff0"
            : theme?.id === "sunset"
            ? "#ffedd5"
            : theme?.id === "github-light"
            ? "#f6f8fa"
            : "#f3f4f6",
        color:
          theme?.id === "github-dark" || theme?.id === "nyx"
            ? "#c4b5fd"
            : theme?.id === "ocean"
            ? "#0057b7"
            : theme?.id === "forest"
            ? "#2f855a"
            : theme?.id === "sunset"
            ? "#9a3412"
            : theme?.id === "github-light"
            ? "#0969da"
            : "#374151",
        border: `1px solid ${
          theme?.id === "github-dark" || theme?.id === "nyx"
            ? "#2a2a3a"
            : theme?.id === "ocean"
            ? "#cce4ff"
            : theme?.id === "forest"
            ? "#c6f6d5"
            : theme?.id === "sunset"
            ? "#ffedd5"
            : theme?.id === "github-light"
            ? "#d0d7de"
            : "#e5e7eb"
        }`,
      };
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-8">GitHub Profile Card</h1>
      <div className="w-full mb-8">
        <h2 className="text-lg font-medium mb-3 text-center">Select Theme</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {themes.map((theme) => {
            const buttonStyle = getButtonStyle(theme.id);
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                style={buttonStyle}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      theme.id === "github-dark"
                        ? "#58a6ff"
                        : theme.id === "ocean"
                        ? "#0057b7"
                        : theme.id === "forest"
                        ? "#2f855a"
                        : theme.id === "sunset"
                        ? "#9a3412"
                        : theme.id === "nyx"
                        ? "#b48eff"
                        : "#0969da",
                  }}
                />
                {theme.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-md mx-auto">
        <GitHubProfileCard
          username="octocat"
          themeId={selectedTheme}
          manualMode={true}
          profileData={sampleProfileData}
        />
      </div>
    </div>
  );
}
