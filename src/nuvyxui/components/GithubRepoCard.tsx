"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Code, ExternalLink, Eye, FileCode, GitFork, Github, History, Star, AlertCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type ThemeOption = {
  id: string
  name: string
  description: string
  cardBg: string
  cardBorder: string
  cardHoverShadow: string
  accentColor: string
  accentColorLight: string
  graphColor: string
  graphBgColor: string
  badgeBg: string
  badgeText: string
  textMuted: string
  textNormal: string  // Added text normal color
}

export const themes: ThemeOption[] = [
  {
    id: "github-dark",
    name: "GitHub Dark",
    description: "GitHub's dark mode theme",
    cardBg: "bg-[#0d1117]",
    cardBorder: "border border-[#30363d]",
    cardHoverShadow: "hover:shadow-md hover:shadow-black/20",
    accentColor: "text-[#58a6ff]",
    accentColorLight: "text-[#58a6ff]/10",
    graphColor: "text-[#58a6ff]",
    graphBgColor: "text-[#58a6ff]/10",
    badgeBg: "bg-[#21262d]",
    badgeText: "text-[#c9d1d9]",
    textMuted: "text-gray-300", 
    textNormal: "text-white", 
  },
  {
    id: "github-light",
    name: "GitHub Light",
    description: "The classic GitHub light theme",
    cardBg: "bg-white",
    cardBorder: "border border-border",
    cardHoverShadow: "hover:shadow-md",
    accentColor: "text-[#0550a0]",    
    accentColorLight: "text-[#0969da]",
    graphColor: "text-[#0550a0]",    
    graphBgColor: "text-[#0969da]/10",
    badgeBg: "bg-[#f6f8fa]",
    badgeText: "text-[#24292f]",
    textMuted: "text-gray-700", 
    textNormal: "text-black", 
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "A calming blue theme",
      cardBg: "bg-[#f0f7ff] dark:bg-[#051c33]",
      cardBorder: "border border-[#cce4ff] dark:border-[#0a3866]",
      cardHoverShadow: "hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-md dark:hover:shadow-blue-900/30",
      accentColor: "text-[#0057b7] dark:text-[#58a6ff]",
      accentColorLight: "text-[#0057b7]/10 dark:text-[#58a6ff]/10",
      graphColor: "text-[#0057b7] dark:text-[#58a6ff]",
      graphBgColor: "text-[#0057b7]/10 dark:text-[#58a6ff]/10",
      badgeBg: "bg-[#e0f0ff] dark:bg-[#0a3866]",
      badgeText: "text-[#0057b7] dark:text-[#88bbff]",
      textMuted: "text-gray-700 dark:text-gray-300", 
      textNormal: "text-black dark:text-white", 
    },
    {
      id: "forest",
      name: "Forest",
      description: "A refreshing green theme",
      cardBg: "bg-[#f0fff4] dark:bg-[#071f0e]",
      cardBorder: "border border-[#c6f6d5] dark:border-[#1a4031]",
      cardHoverShadow: "hover:shadow-md hover:shadow-green-200 dark:hover:shadow-md dark:hover:shadow-green-900/30",
      accentColor: "text-[#2f855a] dark:text-[#4ade80]",
      accentColorLight: "text-[#2f855a]/10 dark:text-[#4ade80]/10",
      graphColor: "text-[#2f855a] dark:text-[#4ade80]",
      graphBgColor: "text-[#2f855a]/10 dark:text-[#4ade80]/10",
      badgeBg: "bg-[#e0fff0] dark:bg-[#1a4031]",
      badgeText: "text-[#2f855a] dark:text-[#7eeaa4]",
      textMuted: "text-gray-700 dark:text-gray-300", 
      textNormal: "text-black dark:text-white", 
    },
    {
      id: "sunset",
      name: "Sunset",
      description: "A warm orange theme",
      cardBg: "bg-[#fff7ed] dark:bg-[#271807]",
      cardBorder: "border border-[#ffedd5] dark:border-[#4a2912]",
      cardHoverShadow: "hover:shadow-md hover:shadow-orange-200 dark:hover:shadow-md dark:hover:shadow-orange-900/30",
      accentColor: "text-[#9a3412]", 
      accentColorLight: "text-[#c2410c]/10 dark:text-[#fb923c]/10",
      graphColor: "text-[#9a3412]", 
      graphBgColor: "text-[#c2410c]/10 dark:text-[#fb923c]/10",
      badgeBg: "bg-[#ffedd5] dark:bg-[#4a2912]",
      badgeText: "text-[#9a3412] dark:text-[#fdba74]", 
      textMuted: "text-gray-700 dark:text-gray-300",
      textNormal: "text-black dark:text-white",
    },
    {
      id: "nuvyx",
      name: "Nuvyx",
      description: "A cyberpunk theme with purple accents",
      cardBg: "bg-[#0f0f13] dark:bg-[#0f0f13]",
      cardBorder: "border border-[#2a2a3a] dark:border-[#2a2a3a]",
      cardHoverShadow: "hover:shadow-md hover:shadow-purple-900/30 dark:hover:shadow-md dark:hover:shadow-purple-900/30",
      accentColor: "text-[#b48eff] dark:text-[#b48eff]",
      accentColorLight: "text-[#b48eff]/20 dark:text-[#b48eff]/20",
      graphColor: "text-[#b48eff] dark:text-[#b48eff]",
      graphBgColor: "text-[#b48eff]/10 dark:text-[#b48eff]/10",
      badgeBg: "bg-[#2a2a3a] dark:bg-[#2a2a3a]",
      badgeText: "text-[#c4b5fd] dark:text-[#c4b5fd]",
      textMuted: "text-gray-300", 
      textNormal: "text-white", 
    }
  ]

const languageColors = {
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
}

export type ManualRepoData = {
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
}

interface GitHubRepoCardProps {
  repoOwner?: string;
  repoName?: string;
  githubToken?: string;
  manualMode?: boolean;
  repoData?: ManualRepoData;
  themeId?: string;
}

export function GitHubRepoCard({ 
  repoOwner, 
  repoName, 
  githubToken,
  manualMode = false,
  repoData,
  themeId = "github-light" 
}: GitHubRepoCardProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(!manualMode);
  const [error, setError] = useState<string | null>(null);
  const [repo, setRepo] = useState<ManualRepoData | null>(manualMode ? repoData || null : null);
  const [rateLimit, setRateLimit] = useState<{ remaining: number, limit: number } | null>(null);

  const currentTheme = themes.find(theme => theme.id === themeId) || themes[0];

  const fetchRepoData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const headers: HeadersInit = {};
      if (githubToken) {
        headers.Authorization = `token ${githubToken}`;
      }
      
      const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
        headers
      });
      
      const rateLimitRemaining = repoResponse.headers.get('x-ratelimit-remaining');
      const rateLimitLimit = repoResponse.headers.get('x-ratelimit-limit');
      
      if (rateLimitRemaining && rateLimitLimit) {
        setRateLimit({
          remaining: parseInt(rateLimitRemaining, 10),
          limit: parseInt(rateLimitLimit, 10)
        });
      }
      
      if (!repoResponse.ok) {
        if (repoResponse.status === 403 && rateLimitRemaining === '0') {
          throw new Error('GitHub API rate limit exceeded. Please provide a GitHub token.');
        } else {
          throw new Error(`Failed to fetch repository data: ${repoResponse.status}`);
        }
      }
      
      const repoData = await repoResponse.json();
      
      const commitsResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/stats/commit_activity`, {
        headers
      });
      
      let activityData: number[] = [];
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        activityData = commitsData
          .slice(-12)
          .map((week: { total: number }) => week.total)
          .map((count: number, _ : number, array: number[]) => {
            const max = Math.max(...array, 1);
            return count / max;
          });
      }
      
      const transformedRepo: ManualRepoData = {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description || "",
        owner: {
          login: repoData.owner.login,
          avatarUrl: repoData.owner.avatar_url
        },
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        issues: repoData.open_issues_count,
        language: repoData.language,
        languageColor: repoData.language ? getLanguageColor(repoData.language) : undefined,
        updatedAt: repoData.updated_at,
        topics: repoData.topics || [],
        activityData: activityData,
        isPrivate: repoData.private
      };
      
      setRepo(transformedRepo);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  }, [repoOwner, repoName, githubToken]);

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
    if (typeof navigator !== 'undefined' && repo) {
      navigator.clipboard.writeText(`git clone https://github.com/${repo.fullName}.git`)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  }

  const getLanguageColor = (language: string) => {
    return language && languageColors[language as keyof typeof languageColors] 
      ? languageColors[language as keyof typeof languageColors] 
      : "#858585";
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }

  if (loading) {
    return (
      <Card className={cn(
        "w-full max-w-md overflow-hidden transition-all duration-300",
        currentTheme.cardBg,
        currentTheme.cardBorder
      )}>
        <CardContent className="flex h-40 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <p className={cn("text-sm font-medium", currentTheme.textMuted)}>Loading repository...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn(
        "w-full max-w-md overflow-hidden transition-all duration-300",
        currentTheme.cardBg,
        currentTheme.cardBorder
      )}>
        <CardContent className="flex h-40 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className={cn("text-center text-sm font-medium", currentTheme.textMuted)}>
              Failed to load repository data.<br />
              {error}
            </p>
            {error.includes('rate limit') && (
              <Button 
                variant="outline" 
                size="sm" 
                className={cn("mt-2", currentTheme.textNormal)}
                onClick={() => setError(null)}
              >
                Use manual mode instead
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!repo) return null;

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden transition-all duration-300",
          currentTheme.cardBg,
          currentTheme.cardBorder,
          currentTheme.cardHoverShadow,
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Github className={cn("h-5 w-5", currentTheme.textMuted)} />
            <div className="flex items-center text-sm">
                <Link href={`https://github.com/${repo.owner.login}`} className={cn("hover:underline font-medium", currentTheme.textMuted)}>
                    {repo.owner.login}
                </Link>
                <span className={cn("mx-1", currentTheme.textMuted)}>/</span>
                <Link
                    href={`https://github.com/${repo.fullName}`}
                    className={cn("font-medium hover:underline", currentTheme.textMuted)}
                >
                    {repo.name}
                </Link>
                </div>
            {rateLimit && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn("ml-auto text-xs font-medium", currentTheme.textMuted)}>
                    {rateLimit.remaining}/{rateLimit.limit}
                  </div>
                </TooltipTrigger>
                <TooltipContent className={cn("dark:bg-gray-800 text-black dark:text-white")}>
                  <p>GitHub API requests remaining</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={repo.owner.avatarUrl} alt={repo.owner.login} />
              <AvatarFallback>{repo.owner.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className={cn("text-lg font-semibold", currentTheme.textNormal)}>{repo.name}</CardTitle>
            <Badge variant="outline" className={cn("ml-auto font-medium", currentTheme.badgeBg, currentTheme.badgeText)}>
              {repo.isPrivate ? "Private" : "Public"}
            </Badge>
          </div>
          <CardDescription className={cn("line-clamp-2 h-10 text-sm font-medium", currentTheme.textMuted)}>
            {repo.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          {/* Activity Graph */}
          <div className="mb-4 mt-2">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className={cn("flex items-center gap-1 font-medium", currentTheme.textMuted)}>
                <History className="h-3 w-3" />
                Activity
              </span>
              <span className={cn("font-medium", currentTheme.textMuted)}>Updated {formatRelativeTime(repo.updatedAt)}</span>
            </div>
            <div className="h-[40px] w-full overflow-hidden rounded-md bg-muted/50 dark:bg-gray-800/50 p-1">
              {repo.activityData && repo.activityData.length > 0 ? (
                <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <polyline
                    points={repo.activityData
                      .map((value: number, index: number) => `${index * (100 / (repo.activityData?.length || 1))},${20 - value * 20}`)
                      .join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={currentTheme.graphColor}
                  />
                  <path
                    d={`M0,20 ${repo.activityData?.map((value: number, index: number) => `L${index * (100 / (repo.activityData?.length || 1))},${20 - value * 20}`).join(" ")} L100,20 Z`}
                    fill="currentColor"
                    className={currentTheme.graphBgColor}
                  />
                </svg>
              ) : (
                <div className={cn("flex h-full items-center justify-center text-xs font-medium", currentTheme.textMuted)}>
                  No activity data available
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("flex items-center gap-1 font-medium", currentTheme.textMuted)}>
                  <Star className="h-4 w-4" />
                  <span>{repo.stars.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className={cn("text-black dark:text-white dark:bg-gray-800")}>
                <p>{repo.stars.toLocaleString()} stars</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("flex items-center gap-1 font-medium", currentTheme.textMuted)}>
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className={cn("text-black dark:text-white dark:bg-gray-800")}>
                <p>{repo.forks.toLocaleString()} forks</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("flex items-center gap-1 font-medium", currentTheme.textMuted)}>
                  <Eye className="h-4 w-4" />
                  <span>{repo.watchers.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className={cn("text-black dark:text-white dark:bg-gray-800")}>
                <p>{repo.watchers.toLocaleString()} watchers</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("flex items-center gap-1 font-medium", currentTheme.textMuted)}>
                  <BookOpen className="h-4 w-4" />
                  <span>{repo.issues.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className={cn("text-black dark:text-white dark:bg-gray-800")}>
                <p>{repo.issues.toLocaleString()} issues</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-4">
            {repo.language && (
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: repo.languageColor || getLanguageColor(repo.language) }} 
                  />
                  <span className={cn("text-sm font-medium", currentTheme.textNormal)}>{repo.language}</span>
                </div>
              </div>
            )}

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic: string) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className={cn("text-xs font-medium", currentTheme.badgeBg, currentTheme.badgeText)}
                  >
                    {topic}
                  </Badge>
                ))}
                {repo.topics.length > 3 && (
                  <Badge variant="outline" className={cn("text-xs font-medium", currentTheme.badgeText)}>
                    +{repo.topics.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <Separator className="dark:bg-gray-700" />
        <CardFooter className="flex justify-between p-4">
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1 text-xs font-medium", currentTheme.accentColor)}
            onClick={copyToClipboard}
            type="button"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Code className="h-3.5 w-3.5" />
                Clone
              </>
            )}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("h-8 w-8 p-0", currentTheme.textNormal, "hover:bg-gray-100 dark:hover:bg-gray-800")} 
              asChild
            >
              <Link href={`https://github.com/${repo.fullName}`} target="_blank">
                <span className="sr-only">View on GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("h-8 w-8 p-0", currentTheme.textNormal, "hover:bg-gray-100 dark:hover:bg-gray-800")} 
              asChild
            >
              <Link href={`https://github.com/${repo.fullName}/issues`} target="_blank">
                <span className="sr-only">View Issues</span>
                <BookOpen className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("h-8 w-8 p-0", currentTheme.textNormal, "hover:bg-gray-100 dark:hover:bg-gray-800")} 
              asChild
            >
              <Link href={`https://github.com/${repo.fullName}/blob/main/README.md`} target="_blank">
                <span className="sr-only">View README</span>
                <FileCode className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}