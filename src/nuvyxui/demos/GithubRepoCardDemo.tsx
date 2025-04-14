'use client'
import { useState } from "react";
import { GitHubRepoCard, themes } from "@/nuvyxui/components/GithubRepoCard";
import { cn } from "@/lib/utils";

export default function GitHubRepoCardDemo() {
  const [selectedTheme, setSelectedTheme] = useState("github-dark");
  
  const sampleRepoData = {
    name: "next.js",
    fullName: "vercel/next.js",
    description: "The React Framework for the Web. Follow for release updates and more from @vercel.",
    owner: {
      login: "vercel",
      avatarUrl: "https://avatars.githubusercontent.com/u/14985020?s=48&v=4"
    },
    stars: 113500,
    forks: 24600,
    watchers: 3700,
    issues: 2100,
    language: "JavaScript",
    languageColor: "#f1e05a",
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ["react", "nextjs", "framework", "javascript", "typescript", "ssr", "static-site"],
    activityData: [0.3, 0.5, 0.2, 0.8, 0.6, 1.0, 0.7, 0.4, 0.9, 0.5, 0.3, 0.6],
    isPrivate: false
  };

  const tailwindRepoData = {
    name: "tailwindcss",
    fullName: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development.",
    owner: {
      login: "tailwindlabs",
      avatarUrl: "https://avatars.githubusercontent.com/u/67109815?s=48&v=4"
    },
    stars: 73800,
    forks: 3700,
    watchers: 2100,
    issues: 450,
    language: "CSS",
    languageColor: "#563d7c",
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ["css", "framework", "utility", "responsive", "design"],
    activityData: [0.4, 0.6, 0.3, 0.7, 0.5, 0.9, 0.8, 0.5, 0.6, 0.7, 0.4, 0.8],
    isPrivate: false
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            GitHub Repository Cards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Showcase your favorite repositories with beautiful, customizable cards
          </p>
        </div>
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-2",
                  selectedTheme === theme.id 
                    ? "bg-purple-600 text-white shadow-md" 
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <span className={cn(
                  "w-3 h-3 rounded-full",
                  theme.id.includes("dark") ? "bg-gray-800" : "bg-white border border-gray-300",
                  theme.id.includes("blue") && "bg-blue-500",
                  theme.id.includes("green") && "bg-green-500",
                  theme.id.includes("purple") && "bg-purple-500"
                )}></span>
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="transform flex flex-col items-center gap-8 transition-transform duration-500 hover:-translate-y-1">
              <GitHubRepoCard 
                manualMode={true}
                repoData={sampleRepoData}
                themeId={selectedTheme}
              />
              <GitHubRepoCard 
                manualMode={true}
                repoData={tailwindRepoData}
                themeId={selectedTheme}
              />
            </div>
          </div>
        </div>
        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Built with Next.js and Tailwind CSS
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Next.js
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
              Tailwind CSS
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}