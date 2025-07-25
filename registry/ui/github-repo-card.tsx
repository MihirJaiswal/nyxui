"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import { BookOpen, Code, Eye, Github, History, Star, GitFork, Check, ExternalLink, Calendar} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
}

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
  textNormal: string
  glowEffect?: string
  backdropBlur?: string
}

export const themes: ThemeOption[] = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Sleek dark theme with blue accents and glassmorphism",
    cardBg: "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95",
    cardBorder: "border border-slate-700/50 backdrop-blur-xl",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-500 ease-out",
    accentColor: "text-blue-400",
    accentColorLight: "text-blue-400/20",
    graphColor: "text-blue-400",
    graphBgColor: "text-blue-400/10",
    badgeBg: "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50",
    badgeText: "text-blue-300",
    textMuted: "text-slate-400",
    textNormal: "text-slate-100",
    glowEffect: "hover:shadow-blue-500/25",
    backdropBlur: "backdrop-blur-xl",
  },
  {
    id: "modern-light",
    name: "Modern Light",
    description: "Clean light theme with glassmorphism and subtle shadows",
    cardBg: "bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95",
    cardBorder: "border border-slate-200/60 backdrop-blur-xl",
    cardHoverShadow:"hover:shadow-2xl hover:shadow-slate-200/60 hover:scale-[1.02] transition-all duration-500 ease-out",
    accentColor: "text-indigo-600",
    accentColorLight: "text-indigo-600/20",
    graphColor: "text-indigo-600",
    graphBgColor: "text-indigo-600/10",
    badgeBg: "bg-indigo-50/80 backdrop-blur-sm border border-indigo-200/50",
    badgeText: "text-indigo-700",
    textMuted: "text-slate-600",
    textNormal: "text-slate-900",
    glowEffect: "hover:shadow-indigo-200/40",
    backdropBlur: "backdrop-blur-xl",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon theme with electric colors",
    cardBg: "bg-gradient-to-br from-black/95 via-purple-950/95 to-black/95",
    cardBorder: "border border-cyan-500/30 backdrop-blur-xl",
    cardHoverShadow:"hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] hover:border-cyan-400/50 transition-all duration-500 ease-out",
    accentColor: "text-cyan-400",
    accentColorLight: "text-cyan-400/20",
    graphColor: "text-cyan-400",
    graphBgColor: "text-cyan-400/10",
    badgeBg: "bg-purple-950/80 backdrop-blur-sm border border-cyan-500/30",
    badgeText: "text-cyan-300",
    textMuted: "text-slate-400",
    textNormal: "text-cyan-100",
    glowEffect: "hover:shadow-cyan-500/30",
    backdropBlur: "backdrop-blur-xl",
  },
  {
    id: "neo-brutalist",
    name: "Neo Brutalist",
    description: "Bold contrasting theme with dynamic shadows",
    cardBg: "bg-gradient-to-br from-amber-50 to-orange-50",
    cardBorder: "border-2 border-black",
    cardHoverShadow:"hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-out",
    accentColor: "text-rose-600",
    accentColorLight: "text-rose-600/20",
    graphColor: "text-rose-600",
    graphBgColor: "text-rose-600/10",
    badgeBg: "bg-white border-2 border-black",
    badgeText: "text-black font-bold",
    textMuted: "text-slate-700",
    textNormal: "text-black",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Ethereal theme with aurora-like gradients",
    cardBg: "bg-gradient-to-br from-violet-900/95 via-purple-800/95 to-indigo-900/95",
    cardBorder: "border border-violet-500/30 backdrop-blur-xl",
    cardHoverShadow:"hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-500 ease-out",
    accentColor: "text-violet-300",
    accentColorLight: "text-violet-300/20",
    graphColor: "text-violet-300",
    graphBgColor: "text-violet-300/10",
    badgeBg: "bg-violet-950/80 backdrop-blur-sm border border-violet-500/30",
    badgeText: "text-violet-200",
    textMuted: "text-violet-300/70",
    textNormal: "text-violet-100",
    glowEffect: "hover:shadow-violet-500/25",
    backdropBlur: "backdrop-blur-xl",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Nature-inspired theme with green accents",
    cardBg: "bg-gradient-to-br from-emerald-950/95 via-green-900/95 to-teal-950/95",
    cardBorder: "border border-emerald-500/30 backdrop-blur-xl",
    cardHoverShadow:"hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-500 ease-out",
    accentColor: "text-emerald-400",
    accentColorLight: "text-emerald-400/20",
    graphColor: "text-emerald-400",
    graphBgColor: "text-emerald-400/10",
    badgeBg: "bg-emerald-950/80 backdrop-blur-sm border border-emerald-500/30",
    badgeText: "text-emerald-300",
    textMuted: "text-emerald-300/70",
    textNormal: "text-emerald-100",
    glowEffect: "hover:shadow-emerald-500/25",
    backdropBlur: "backdrop-blur-xl",
  },
]

export type RepoData = {
  name: string
  owner: string
  ownerAvatar?: string
  description?: string
  stars: number
  forks: number
  watchers: number
  issues: number
  language?: string
  updatedAt: string
  topics?: string[]
  activityData?: number[]
  isPrivate?: boolean
}

interface GitHubRepoCardProps {
  repo: RepoData
  theme?: string
  className?: string
}

const getLanguageColor = (language: string) => {
  return LANGUAGE_COLORS[language as keyof typeof LANGUAGE_COLORS] || "#858585"
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds)
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`
    }
  }
  return "just now"
}

export function GitHubRepoCard({
  repo,
  theme = "modern-light",
  className,
}: GitHubRepoCardProps) {
  const [copied, setCopied] = useState(false)

  const currentTheme = useMemo(() => themes.find((t) => t.id === theme) || themes[0], [theme])

  const repoUrl = useMemo(() => {
    return `https://github.com/${repo.owner}/${repo.name}`
  }, [repo.owner, repo.name])

  const cloneCommand = useMemo(() => {
    return `git clone https://github.com/${repo.owner}/${repo.name}.git`
  }, [repo.owner, repo.name])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(cloneCommand)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(console.error)
  }

  // Set language color if not provided
  const repoWithColor = useMemo(() => ({
    ...repo,
    languageColor: repo.language ? getLanguageColor(repo.language) : undefined
  }), [repo])

  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden transition-all duration-500 p-6 rounded-xl relative group",
        currentTheme.cardBg,
        currentTheme.cardBorder,
        currentTheme.cardHoverShadow,
        currentTheme.backdropBlur,
        className
      )}
      role="article"
      aria-label={`GitHub repository: ${repoWithColor.name}`}
    >
      {currentTheme.glowEffect && (
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            currentTheme.glowEffect,
          )}
        />
      )}

      <div className="relative space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Github className={cn("h-4 w-4", currentTheme.accentColor)} aria-hidden="true" />
              <Link
                href={`https://github.com/${repoWithColor.owner}`}
                className={cn("hover:underline font-medium transition-colors duration-200", currentTheme.textMuted)}
                aria-label={`View ${repoWithColor.owner}'s GitHub profile`}
              >
                {repoWithColor.owner}
              </Link>
              <span className={cn("text-xs", currentTheme.textMuted)}>/</span>
              <Link
                href={repoUrl}
                className={cn("font-semibold hover:underline transition-colors duration-200", currentTheme.accentColor)}
                aria-label={`View ${repoWithColor.name} repository on GitHub`}
              >
                {repoWithColor.name}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20 transition-transform duration-200 group-hover:scale-110">
                {repoWithColor.ownerAvatar ? (
                  <Image
                    src={repoWithColor.ownerAvatar || "/placeholder.svg"}
                    alt={`${repoWithColor.owner}'s avatar`}
                    className="h-full w-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-sm font-bold">
                    {repoWithColor.owner.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className={cn("text-xl font-bold truncate", currentTheme.textNormal)}>{repoWithColor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-md border",
                    currentTheme.badgeBg,
                    currentTheme.badgeText,
                  )}
                >
                  {repoWithColor.isPrivate ? "Private" : "Public"}
                </span>
                <div className={cn("flex items-center gap-1 text-xs", currentTheme.textMuted)}>
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatRelativeTime(repoWithColor.updatedAt)}</span>
                </div>
              </div>
            </div>

            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-all duration-200 hover:scale-110",
                currentTheme.badgeBg,
                currentTheme.badgeText,
              )}
              aria-label="Open repository in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <p className={cn("text-sm leading-relaxed", currentTheme.textMuted)}>
            {repoWithColor.description || "No description provided"}
          </p>
        </div>

        {/* Activity Graph Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className={cn("h-4 w-4", currentTheme.accentColor)} />
              <span className={cn("text-sm font-semibold", currentTheme.textNormal)}>Activity</span>
            </div>
            <span className={cn("text-xs", currentTheme.textMuted)}>Last 12 weeks</span>
          </div>

          <div
            className={cn(
              "h-16 w-full rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]",
              currentTheme.badgeBg,
            )}
            role="img"
            aria-label="Repository commit activity visualization"
          >
            {repoWithColor.activityData && repoWithColor.activityData.length > 0 ? (
              <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                {/* Grid lines */}
                {[5, 10, 15].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="0.2"
                    strokeDasharray="1,2"
                    className="text-muted-foreground/20"
                  />
                ))}

                {/* Data points */}
                {repoWithColor.activityData.map((value, index) => (
                  <circle
                    key={index}
                    cx={`${index * (100 / (repoWithColor.activityData?.length || 1))}`}
                    cy={`${20 - value * 18}`}
                    r="1"
                    className={cn(currentTheme.graphColor, "animate-pulse")}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: "2s",
                    }}
                  />
                ))}

                {/* Connecting line */}
                <polyline
                  points={repoWithColor.activityData
                    .map((value, index) => `${index * (100 / (repoWithColor.activityData?.length || 1))},${20 - value * 18}`)
                    .join(" ")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={currentTheme.graphColor}
                />

                {/* Area fill */}
                <path
                  d={`M0,20 ${repoWithColor.activityData
                    .map((value, index) => `L${index * (100 / (repoWithColor.activityData?.length || 1))},${20 - value * 18}`)
                    .join(" ")} L100,20 Z`}
                  fill="currentColor"
                  className={currentTheme.graphBgColor}
                />
              </svg>
            ) : (
              <div
                className={cn("flex h-full items-center justify-center text-xs font-medium", currentTheme.textMuted)}
              >
                No activity data available
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Star, value: repoWithColor.stars, label: "Stars" },
            { icon: GitFork, value: repoWithColor.forks, label: "Forks" },
            { icon: Eye, value: repoWithColor.watchers, label: "Watchers" },
            { icon: BookOpen, value: repoWithColor.issues, label: "Issues" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:scale-105",
                currentTheme.badgeBg,
              )}
            >
              <Icon className={cn("h-4 w-4 mb-1", currentTheme.accentColor)} />
              <span className={cn("text-sm font-bold", currentTheme.textNormal)}>{value.toLocaleString()}</span>
              <span className={cn("text-xs", currentTheme.textMuted)}>{label}</span>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="space-y-3">
          {repoWithColor.language && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: repoWithColor.languageColor }} />
              <span className={cn("text-sm font-medium", currentTheme.textNormal)}>{repoWithColor.language}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              {repoWithColor.topics && repoWithColor.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repoWithColor.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-md border transition-all duration-200 hover:scale-105",
                        currentTheme.badgeBg,
                        currentTheme.badgeText,
                      )}
                    >
                      {topic}
                    </span>
                  ))}
                  {repoWithColor.topics.length > 3 && (
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-md border",
                        currentTheme.badgeBg,
                        currentTheme.badgeText,
                      )}
                    >
                      +{repoWithColor.topics.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
                currentTheme.badgeBg,
                currentTheme.badgeText,
                copied ? "bg-green-500/20 text-green-600" : "",
              )}
              onClick={copyToClipboard}
              type="button"
              aria-label={copied ? "Clone command copied to clipboard" : "Copy clone command to clipboard"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Code className="h-4 w-4" />
                  <span>Clone</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}