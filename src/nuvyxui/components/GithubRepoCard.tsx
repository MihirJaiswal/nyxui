"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Code, Eye, Github, History, Star, GitFork, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export type ThemeOption = {
  id: string;
  name: string;
  description: string;
  cardBg: string;
  cardBorder: string;
  cardHoverShadow: string;
  accentColor: string;
  accentColorLight: string;
  graphColor: string;
  graphBgColor: string;
  badgeBg: string;
  badgeText: string;
  textMuted: string;
  textNormal: string;
};

export const themes: ThemeOption[] = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Sleek dark theme with blue accents",
    cardBg: "bg-gradient-to-br from-slate-900 to-slate-800",
    cardBorder: "border border-slate-700/50",
    cardHoverShadow: "hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300",
    accentColor: "text-blue-400",
    accentColorLight: "text-blue-400/10",
    graphColor: "text-blue-400",
    graphBgColor: "text-blue-400/10",
    badgeBg: "bg-slate-800/80 backdrop-blur-sm",
    badgeText: "text-blue-300",
    textMuted: "text-slate-400",
    textNormal: "text-slate-200",
  },
  {
    id: "modern-light",
    name: "Modern Light",
    description: "Clean light theme with subtle shadows",
    cardBg: "bg-gradient-to-br from-white to-slate-50",
    cardBorder: "border border-slate-200",
    cardHoverShadow: "hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300",
    accentColor: "text-indigo-600",
    accentColorLight: "text-indigo-600/10",
    graphColor: "text-indigo-600",
    graphBgColor: "text-indigo-600/10",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    textMuted: "text-slate-600",
    textNormal: "text-slate-900",
  },
  {
    id: "retro",
    name: "Neo Brutalist",
    description: "Bold contrasting theme with box shadows",
    cardBg: "bg-amber-50",
    cardBorder: "border-2 border-black",
    cardHoverShadow: "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300",
    accentColor: "text-rose-600",
    accentColorLight: "text-rose-600/10",
    graphColor: "text-rose-600",
    graphBgColor: "text-rose-600/10",
    badgeBg: "bg-white border border-black",
    badgeText: "text-black font-bold",
    textMuted: "text-slate-700",
    textNormal: "text-black",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep dark theme with vibrant purples",
    cardBg: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBorder: "border border-purple-900/30",
    cardHoverShadow: "hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300",
    accentColor: "text-purple-400",
    accentColorLight: "text-purple-400/10",
    graphColor: "text-purple-400",
    graphBgColor: "text-purple-400/10",
    badgeBg: "bg-purple-950/80 backdrop-blur-sm",
    badgeText: "text-purple-300",
    textMuted: "text-slate-400",
    textNormal: "text-slate-200",
  }
];

export type RepoData = {
  name: string;
  fullName: string;
  description?: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  language?: string;
  languageColor?: string;
  updatedAt: string;
  topics: string[];
  activityData?: number[];
  isPrivate: boolean;
};
const CACHE_TTL = 15 * 60 * 1000;

interface GitHubRepoCardProps {
  repoOwner?: string;
  repoName?: string;
  githubToken?: string;
  manualMode?: boolean;
  repoData?: RepoData;
  themeId?: string;
}

const getLanguageColor = (language: string) => {
  return LANGUAGE_COLORS[language as keyof typeof LANGUAGE_COLORS] || "#858585";
};

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

const getCacheKey = (repoOwner: string, repoName: string) => {
  return `github_repo_${repoOwner}_${repoName}`;
};

export function GitHubRepoCard({
  repoOwner,
  repoName,
  githubToken,
  manualMode = false,
  repoData,
  themeId = "modern-light",
}: GitHubRepoCardProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(!manualMode);
  const [error, setError] = useState<string | null>(null);
  const [repo, setRepo] = useState<RepoData | null>(manualMode ? repoData || null : null);
  const [rateLimit, setRateLimit] = useState<{ remaining: number; limit: number } | null>(null);

  const currentTheme = useMemo(() =>
    themes.find((theme) => theme.id === themeId) || themes[0],
    [themeId]);

  const repoUrl = useMemo(() => {
    if (!repo) return '';
    return `https://github.com/${repo.fullName}`;
  }, [repo]);

  const cloneCommand = useMemo(() => {
    if (!repo) return '';
    return `git clone https://github.com/${repo.fullName}.git`;
  }, [repo]);

  const getCachedData = useCallback(() => {
    if (!repoOwner || !repoName || typeof window === 'undefined') return null;

    try {
      const cacheKey = getCacheKey(repoOwner, repoName);
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);

        if (Date.now() - timestamp < CACHE_TTL) {
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (err) {
      console.error('Error reading from cache:', err);
    }

    return null;
  }, [repoOwner, repoName]);

  const setCachedData = useCallback((data: RepoData) => {
    if (!repoOwner || !repoName || typeof window === 'undefined') return;

    try {
      const cacheKey = getCacheKey(repoOwner, repoName);
      const cacheData = JSON.stringify({
        data,
        timestamp: Date.now(),
      });

      localStorage.setItem(cacheKey, cacheData);
    } catch (err) {
      console.error('Error writing to cache:', err);
    }
  }, [repoOwner, repoName]);

  const fetchRepoData = useCallback(async () => {
    if (!repoOwner || !repoName) return;

    const cachedData = getCachedData();
    if (cachedData) {
      setRepo(cachedData);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = {};
      if (githubToken) {
        headers.Authorization = `token ${githubToken}`;
      }
      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}`,
        { headers }
      );
      const rateLimitRemaining = repoResponse.headers.get("x-ratelimit-remaining");
      const rateLimitLimit = repoResponse.headers.get("x-ratelimit-limit");

      if (rateLimitRemaining && rateLimitLimit) {
        setRateLimit({
          remaining: parseInt(rateLimitRemaining, 10),
          limit: parseInt(rateLimitLimit, 10),
        });
      }
      if (!repoResponse.ok) {
        if (repoResponse.status === 403 && rateLimitRemaining === "0") {
          throw new Error("GitHub API rate limit exceeded. Please provide a GitHub token.");
        } else {
          throw new Error(`Failed to fetch repository data: ${repoResponse.status}`);
        }
      }
      const repoData = await repoResponse.json();
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/stats/commit_activity`,
        { headers }
      );
      let activityData: number[] = [];
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        const recentCommits = commitsData.slice(-12).map((week: { total: number }) => week.total);
        const maxCommit = Math.max(...recentCommits, 1);
        activityData = recentCommits.map((count: number) => count / maxCommit);
      }
      const transformedRepo: RepoData = {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description || "",
        owner: {
          login: repoData.owner.login,
          avatarUrl: repoData.owner.avatar_url,
        },
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        issues: repoData.open_issues_count,
        language: repoData.language,
        languageColor: repoData.language ? getLanguageColor(repoData.language) : undefined,
        updatedAt: repoData.updated_at,
        topics: repoData.topics || [],
        activityData,
        isPrivate: repoData.private,
      };

      setRepo(transformedRepo);
      setCachedData(transformedRepo);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setLoading(false);
    }
  }, [repoOwner, repoName, githubToken, getCachedData, setCachedData]);

  useEffect(() => {
    if (manualMode && repoData) {
      setRepo(repoData);
      setLoading(false);
      return;
    }

    if (!manualMode && repoOwner && repoName) {
      fetchRepoData();
    }
  }, [manualMode, repoData, repoOwner, repoName, fetchRepoData]);

  const copyToClipboard = () => {
    if (repo) {
      navigator.clipboard
        .writeText(cloneCommand)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(console.error);
    }
  };

  const renderLoadingState = () => (
    <div className={cn(
      "w-full max-w-full overflow-hidden transition-all duration-300 p-4 sm:p-6 rounded-md",
      currentTheme.cardBg,
      currentTheme.cardBorder
    )} aria-busy="true" aria-live="polite">
      <div className="flex h-32 sm:h-40 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          <p className={cn("text-sm font-medium", currentTheme.textMuted)}>
            Loading repository...
          </p>
        </div>
      </div>
    </div>
  );
  const renderErrorState = () => (
    <div className={cn(
      "w-full max-w-full overflow-hidden transition-all duration-300 p-4 sm:p-6 rounded-md",
      currentTheme.cardBg,
      currentTheme.cardBorder
    )} aria-live="assertive">
      <div className="flex h-32 sm:h-40 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-red-500" aria-hidden="true" />
          <p className={cn("text-center text-xs sm:text-sm font-medium", currentTheme.textMuted)}>
            Failed to load repository data.
            <br />
            {error}
          </p>
          {error?.includes("rate limit") && (
            <button
              className={cn("mt-2 text-xs sm:text-sm font-medium", currentTheme.textNormal)}
              onClick={() => setError(null)}
            >
              Use manual mode instead
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();
  if (!repo) return null;

  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden transition-all duration-300 p-4 sm:p-6 rounded-md",
        currentTheme.cardBg,
        currentTheme.cardBorder,
        currentTheme.cardHoverShadow
      )}
      role="article"
      aria-label={`GitHub repository: ${repo?.name}`}
    >
      <div className="pb-2">
        <div>
          <div className="mb-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <Github className={cn("h-3 w-3 sm:h-4 sm:w-4", currentTheme.accentColor)} aria-hidden="true" />
              <div className="flex items-center text-xs sm:text-sm">
                <Link
                  href={`https://github.com/${repo.owner.login}`}
                  className={cn("hover:underline font-medium", currentTheme.textMuted)}
                  aria-label={`View ${repo.owner.login}'s GitHub profile`}
                >
                  {repo.owner.login}
                </Link>
                <span className={cn("mx-1", currentTheme.textMuted)} aria-hidden="true">/</span>
                <Link
                  href={repoUrl}
                  className={cn("font-medium hover:underline", currentTheme.accentColor)}
                  aria-label={`View ${repo.name} repository on GitHub`}
                >
                  {repo.name}
                </Link>
              </div>
              {rateLimit && (
                <div className={cn("ml-auto text-xs font-medium hidden sm:flex items-center", currentTheme.textMuted)} aria-label={`GitHub API rate limit: ${rateLimit.remaining} of ${rateLimit.limit} requests remaining`}>
                  <span>{rateLimit.remaining}/{rateLimit.limit}</span>
                  <span className="ml-1 text-xs">API requests</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center overflow-hidden rounded-full">
            {repo.owner.avatarUrl ? (
              <Image
                src={repo.owner.avatarUrl}
                alt={`${repo.owner.login}'s avatar`}
                className="h-full w-full object-cover"
                width={24}
                height={24}
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium">
                {repo.owner.login.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className={cn("text-sm sm:text-lg font-semibold truncate max-w-[150px] sm:max-w-full", currentTheme.textNormal)}>
            {repo.name}
          </h1>
          <h1
            className={cn(
              "ml-auto text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border",
              currentTheme.badgeBg,
              currentTheme.badgeText
            )}
          >
            {repo.isPrivate ? "Private" : "Public"}
          </h1>
        </div>
        <div className={cn(
          "line-clamp-2 text-xs sm:text-sm font-normal leading-snug tracking-wide my-2 sm:my-3",
          currentTheme.textMuted
        )}>
          {repo.description || "No description provided"}
        </div>
      </div>
      <div className="pb-2">
        <div className="mb-4 sm:mb-6 rounded-md border border-border shadow-sm" aria-label="Repository activity graph">
          <div className="mb-1 sm:mb-2 flex items-center justify-between text-xs p-1.5 sm:p-2">
            <span className={cn("flex items-center gap-0.5 sm:gap-1 font-semibold text-[10px] sm:text-xs", currentTheme.textMuted)}>
              <History className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              Activity
            </span>
            <span className={cn("text-[10px] sm:text-xs font-medium", currentTheme.textMuted)}>
              Updated {formatRelativeTime(repo.updatedAt)}
            </span>
          </div>
          <div className="h-[40px] sm:h-[60px] w-full overflow-hidden rounded-b-lg bg-muted/50 dark:bg-gray-800/50 p-1 sm:p-2" role="img" aria-label="Repository commit activity visualization">
            {repo.activityData && repo.activityData.length > 0 ? (
              <svg
                className="h-full w-full"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1" className="text-muted/30" />
                <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1" className="text-muted/30" />
                <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1" className="text-muted/30" />
                {repo.activityData.map((value, index) => (
                  <circle
                    key={index}
                    cx={`${index * (100 / (repo.activityData?.length || 1))}`}
                    cy={`${20 - value * 20}`}
                    r="0.8"
                    className={currentTheme.graphColor}
                  />
                ))}
                <polyline
                  points={repo.activityData
                    .map((value, index) =>
                      `${index * (100 / (repo.activityData?.length || 1))},${20 - value * 20}`
                    )
                    .join(" ")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={currentTheme.graphColor}
                />
                <path
                  d={`M0,20 ${repo.activityData
                    .map((value, index) =>
                      `L${index * (100 / (repo.activityData?.length || 1))},${20 - value * 20}`
                    )
                    .join(" ")} L100,20 Z`}
                  fill="currentColor"
                  className={currentTheme.graphBgColor}
                />
              </svg>
            ) : (
              <div className={cn("flex h-full items-center justify-center rounded-md bg-background/50 text-xs font-medium", currentTheme.textMuted)} aria-label="No activity data available">
                No activity data available
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm" role="group" aria-label="Repository statistics">
          <div>
            <div className={cn("flex items-center gap-0.5 sm:gap-1 font-normal", currentTheme.textMuted)} aria-label={`${repo.stars.toLocaleString()} stars`}>
              <Star className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{repo.stars.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div className={cn("flex items-center gap-0.5 sm:gap-1 font-normal", currentTheme.textMuted)} aria-label={`${repo.forks.toLocaleString()} forks`}>
              <GitFork className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{repo.forks.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div className={cn("flex items-center gap-0.5 sm:gap-1 font-normal", currentTheme.textMuted)} aria-label={`${repo.watchers.toLocaleString()} watchers`}>
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{repo.watchers.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div className={cn("flex items-center gap-0.5 sm:gap-1 font-normal", currentTheme.textMuted)} aria-label={`${repo.issues.toLocaleString()} issues`}>
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{repo.issues.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          {repo.language && (
            <div className="mb-1.5 sm:mb-2 flex items-center gap-2" aria-label={`Primary language: ${repo.language}`}>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div
                  className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                  aria-hidden="true"
                />
                <span className={cn("text-xs sm:text-sm font-medium", currentTheme.textNormal)}>
                  {repo.language}
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
            <div className="w-full xs:w-auto">
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5" role="group" aria-label="Repository topics">
                  {repo.topics.slice(0, 2).map((topic) => (
                    <h1
                      key={topic}
                      className={cn(
                        "text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border leading-snug tracking-wide",
                        currentTheme.badgeBg,
                        currentTheme.badgeText
                      )}
                    >
                      {topic}
                    </h1>
                  ))}
                  {repo.topics.length > 2 && (
                    <h1
                      className={cn("text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border leading-snug tracking-wide", currentTheme.badgeBg, currentTheme.badgeText)}
                    >
                      +{repo.topics.length - 2} more
                    </h1>
                  )}
                </div>
              )}
            </div>
            <div className="w-full xs:w-auto flex justify-end">
              <button
                className={`flex items-center gap-1 border border-${currentTheme.accentColor.split(' ')[0]} text-[15px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-colors duration-200 ${currentTheme.accentColor} hover:bg-slate-100/20 dark:hover:bg-slate-800/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${currentTheme.textNormal}`}
                onClick={copyToClipboard}
                type="button"
                aria-label={copied ? "Clone command copied to clipboard" : "Copy clone command to clipboard"}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Code className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    <span>Clone</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}