"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AtSign, BookOpen, Calendar, ExternalLink, Github, GitFork, MapPin, Star, AlertCircle } from "lucide-react"
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
  textNormal: string
  tabsBg: string
}

export const themes: ThemeOption[] = [
  {
    id: "github-light",
    name: "GitHub Light",
    description: "The classic GitHub light theme",
    cardBg: "bg-white",
    cardBorder: "border border-border",
    cardHoverShadow: "hover:shadow-md",
    accentColor: "text-[#0969da] dark:text-[#0550a0]",
    accentColorLight: "text-[#0969da] dark:text-[#0550a0]",
    graphColor: "text-[#0550a0] dark:text-[#0969da]",
    graphBgColor: "text-[#0969da]/10 dark:text-[#0550a0]/10",
    badgeBg: "bg-[#f6f8fa] dark:bg-[#24292f]",
    badgeText: "text-[#24292f] dark:text-[#24292f]",
    textMuted: "text-gray-700",
    textNormal: "text-black",
    tabsBg: "bg-[#bbd5fc] dark:bg-[#74aafc]",
  },
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
    tabsBg: "bg-[#161b22] dark:bg-[#74aafc]",
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
    tabsBg: "bg-[#dbeaff] dark:bg-[#0a2b4d]",
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
    tabsBg: "bg-[#d7f7e0] dark:bg-[#133929]",
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
    tabsBg: "bg-[#ffe8cc] dark:bg-[#3e230f]",
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
    tabsBg: "bg-[#1a1a2e] dark:bg-[#1a1a2e]",
  },
]

export type ManualProfileData = {
  login: string
  name: string
  avatarUrl: string
  bio?: string
  location?: string
  followers: number
  following: number
  publicRepos: number
  createdAt: string
  languages?: Array<{
    name: string
    color: string
    percentage: number
  }>
  pinnedRepos?: Array<{
    name: string
    description?: string
    language?: string
    languageColor?: string
    stars: number
    forks: number
  }>
  contributionData?: Array<number>
}

// Define proper types for GitHub API responses
interface GitHubUserProfile {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  followers: number
  following: number
  public_repos: number
  created_at: string
}

interface GitHubRepository {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
}

interface GitHubProfileCardProps {
  username?: string
  githubToken?: string
  manualMode?: boolean
  profileData?: ManualProfileData
  themeId?: string
}

export function GitHubProfileCard({
  username,
  githubToken,
  manualMode = false,
  profileData,
  themeId,
}: GitHubProfileCardProps) {
  const currentTheme = themes.find((theme) => theme.id === themeId) || themes[0]
  const [isLoaded, setIsLoaded] = useState(manualMode)
  const [loading, setLoading] = useState(!manualMode)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<ManualProfileData | null>(manualMode ? profileData || null : null)
  const [rateLimit, setRateLimit] = useState<{ remaining: number; limit: number } | null>(null)

  const fetchProfileData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const headers: HeadersInit = {}
      if (githubToken) {
        headers.Authorization = `token ${githubToken}`
      }

      const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers,
      })

      const rateLimitRemaining = profileResponse.headers.get("x-ratelimit-remaining")
      const rateLimitLimit = profileResponse.headers.get("x-ratelimit-limit")

      if (rateLimitRemaining && rateLimitLimit) {
        setRateLimit({
          remaining: Number.parseInt(rateLimitRemaining, 10),
          limit: Number.parseInt(rateLimitLimit, 10),
        })
      }

      if (!profileResponse.ok) {
        if (profileResponse.status === 403 && rateLimitRemaining === "0") {
          throw new Error("GitHub API rate limit exceeded. Please provide a GitHub token.")
        } else {
          throw new Error(`Failed to fetch profile data: ${profileResponse.status}`)
        }
      }

      const profileData: GitHubUserProfile = await profileResponse.json()

      let pinnedRepos: Array<{
        name: string
        description?: string
        language?: string
        languageColor?: string
        stars: number
        forks: number
      }> = []
      
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`, {
          headers,
        })

        if (reposResponse.ok) {
          const repos: GitHubRepository[] = await reposResponse.json()
          pinnedRepos = repos.map((repo) => ({
            name: repo.name,
            description: repo.description || undefined,
            language: repo.language || undefined,
            languageColor: getLanguageColor(repo.language || undefined),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          }))
        }
      } catch (err) {
        console.error("Failed to fetch repos, continuing with profile data", err)
      }

      const contributionData = Array.from({ length: 12 }, () => Math.random())

      const languages = [
        { name: "JavaScript", color: "#f1e05a", percentage: 40 },
        { name: "TypeScript", color: "#3178c6", percentage: 30 },
        { name: "Python", color: "#3572A5", percentage: 20 },
      ]

      const transformedProfile: ManualProfileData = {
        login: profileData.login,
        name: profileData.name || profileData.login,
        avatarUrl: profileData.avatar_url,
        bio: profileData.bio || undefined,
        location: profileData.location || undefined,
        followers: profileData.followers,
        following: profileData.following,
        publicRepos: profileData.public_repos,
        createdAt: profileData.created_at,
        languages: languages,
        pinnedRepos: pinnedRepos,
        contributionData: contributionData,
      }

      setProfile(transformedProfile)
      setLoading(false)
      setIsLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setLoading(false)
    }
  }, [username, githubToken])

  useEffect(() => {
    if (manualMode && profileData) {
      setProfile(profileData)
      setLoading(false)
      setIsLoaded(true)
      return
    }

    if (!manualMode && username) {
      fetchProfileData()
    }
  }, [manualMode, profileData, username, githubToken, fetchProfileData])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date)
  }

  const getYearsOnGitHub = (dateString: string) => {
    const joinDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - joinDate.getTime())
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)
    return Math.floor(diffYears)
  }

  const getLanguageColor = (language?: string) => {
    if (!language) return "#858585"

    const languageColors: Record<string, string> = {
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

    return languageColors[language] || "#858585"
  }

  if (loading) {
    return (
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden transition-all duration-300",
          currentTheme.cardBg,
          currentTheme.cardBorder,
        )}
      >
        <CardContent className="flex h-40 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden transition-all duration-300",
          currentTheme.cardBg,
          currentTheme.cardBorder,
        )}
      >
        <CardContent className="flex h-36 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-center text-sm font-medium text-muted-foreground">
              Failed to load profile data.
              <br />
              {error}
            </p>
            {error.includes("rate limit") && (
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setError(null)}>
                Use manual mode instead
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) return null

  return (
    <>
      {isLoaded && (
        <div className="w-full max-w-md">
          <Card
            className={cn(
              "overflow-hidden transition-all duration-300",
              currentTheme.cardBg,
              currentTheme.cardBorder,
              currentTheme.cardHoverShadow,
              currentTheme.id === "github-light" && "bg-gradient-to-br from-white to-gray-50",
              currentTheme.id === "github-dark" && "bg-gradient-to-br from-[#0d1117] to-[#161b22]",
              currentTheme.id === "ocean" &&
                "bg-gradient-to-br from-[#f0f7ff] to-[#e6f0ff] dark:from-[#051c33] dark:to-[#072440]",
              currentTheme.id === "forest" &&
                "bg-gradient-to-br from-[#f0fff4] to-[#e6ffec] dark:from-[#071f0e] dark:to-[#0a2a13]",
              currentTheme.id === "sunset" &&
                "bg-gradient-to-br from-[#fff7ed] to-[#fff0e0] dark:from-[#271807] dark:to-[#33200a]",
              currentTheme.id === "nuvyx" && "bg-gradient-to-br from-[#0f0f13] to-[#13131a]",
            )}
          >
            <CardHeader className="pb-2 pt-3">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={cn("text-lg font-bold leading-none", currentTheme.textNormal)}>{profile.name}</h2>
                      <div className={cn("flex items-center text-sm text-muted-foreground", currentTheme.textMuted)}>
                        <AtSign className={cn("mr-1 h-3 w-3", currentTheme.textMuted)} />
                        <span className={cn("font-medium", currentTheme.textMuted)}>{profile.login}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("h-8 gap-1 text-xs", currentTheme.accentColor)}
                      asChild
                    >
                      <Link href={`https://github.com/${profile.login}`} target="_blank">
                        <Github className={cn("h-3 w-3", currentTheme.accentColor)} />
                        Follow
                      </Link>
                    </Button>
                  </div>

                  {profile.bio && (
                    <p className={cn("line-clamp-2 text-sm text-muted-foreground", currentTheme.textMuted)}>
                      {profile.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className={cn("h-3 w-3", currentTheme.textMuted)} />
                        <span className={cn("font-medium", currentTheme.textMuted)}>{profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className={cn("h-3 w-3", currentTheme.textMuted)} />
                      <span className={cn("font-medium", currentTheme.textMuted)}>
                        Joined {formatDate(profile.createdAt)}
                      </span>
                    </div>
                    {rateLimit && !manualMode && (
                      <div className="ml-auto text-xs">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className={cn("font-medium", currentTheme.textMuted)}>
                              {rateLimit.remaining}/{rateLimit.limit}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className={cn("text-sm", currentTheme.textMuted)}>GitHub API requests remaining</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-2 pt-0">
              <div className="mb-3 grid grid-cols-3 gap-2 rounded-md border p-1.5 text-center">
                <div className="flex flex-col">
                  <span className={cn("text-base font-semibold", currentTheme.textNormal)}>
                    {profile.followers.toLocaleString()}
                  </span>
                  <span className={cn("text-xs text-muted-foreground", currentTheme.textMuted)}>followers</span>
                </div>
                <div className="flex flex-col">
                  <span className={cn("text-base font-semibold", currentTheme.textNormal)}>
                    {profile.following.toLocaleString()}
                  </span>
                  <span className={cn("text-xs text-muted-foreground", currentTheme.textMuted)}>following</span>
                </div>
                <div className="flex flex-col">
                  <span className={cn("text-base font-semibold", currentTheme.textNormal)}>
                    {profile.publicRepos.toLocaleString()}
                  </span>
                  <span className={cn("text-xs text-muted-foreground", currentTheme.textMuted)}>repos</span>
                </div>
              </div>

              <div>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className={cn("grid w-full grid-cols-2", currentTheme.tabsBg)}>
                    <TabsTrigger value="overview" className={currentTheme.accentColor}>
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="repositories" className={currentTheme.accentColor}>
                      Repositories
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className={cn("mt-3 space-y-3", currentTheme.textMuted)}>
                    {profile.languages && profile.languages.length > 0 && (
                      <div>
                        <h3 className={cn("mb-2 text-xs font-medium uppercase", currentTheme.textMuted)}>
                          Top Languages
                        </h3>
                        <div className={cn("mt-2 w-full space-y-2", currentTheme.accentColor)}>
                          {profile.languages.slice(0, 3).map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                  <span className="font-medium">{item.name}</span>
                                </div>
                                <span className="font-medium">{item.percentage}%</span>
                              </div>
                              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100/30">
                                <div
                                  className="absolute h-full rounded-full"
                                  style={{
                                    backgroundColor: item.color,
                                    width: `${item.percentage}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {profile.contributionData && profile.contributionData.length > 0 && (
                      <div>
                        <h3
                          className={cn(
                            "mb-2 text-xs font-medium uppercase text-muted-foreground",
                            currentTheme.textMuted,
                          )}
                        >
                          Activity
                        </h3>
                        <div className={cn("h-[40px] w-full overflow-hidden rounded-md p-2", currentTheme.textMuted)}>
                          <svg
                            className={cn("h-full w-full", currentTheme.textMuted)}
                            viewBox="0 0 100 30"
                            preserveAspectRatio="none"
                          >
                            <polyline
                              points={profile.contributionData
                                .map(
                                  (value, index) =>
                                    `${index * (100 / (profile.contributionData?.length || 1))},${30 - value * 30}`,
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
                              d={`M0,30 ${profile.contributionData
                                .map(
                                  (value, index) =>
                                    `L${index * (100 / (profile.contributionData?.length || 1))},${30 - value * 30}`,
                                )
                                .join(" ")} L100,30 Z`}
                              fill="currentColor"
                              className={currentTheme.graphBgColor}
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="repositories" className="mt-3">
                    {profile.pinnedRepos && profile.pinnedRepos.length > 0 ? (
                      <div className={cn("space-y-3", currentTheme.textMuted)}>
                        {profile.pinnedRepos.slice(0, 2).map((repo) => (
                          <div key={repo.name}>
                            <Card
                              className={cn(
                                "transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px]",
                                currentTheme.cardBg,
                                currentTheme.cardBorder,
                              )}
                            >
                              <CardContent className="p-2">
                                <div className={cn("flex items-start justify-between", currentTheme.textMuted)}>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                      <BookOpen
                                        className={cn("h-3.5 w-3.5 text-muted-foreground", currentTheme.textMuted)}
                                      />
                                      <Link
                                        href={`https://github.com/${profile.login}/${repo.name}`}
                                        target="_blank"
                                        className={cn("text-sm font-medium hover:underline", currentTheme.accentColor)}
                                      >
                                        {repo.name}
                                      </Link>
                                    </div>
                                    {repo.description && (
                                      <p
                                        className={cn(
                                          "line-clamp-1 text-xs text-muted-foreground",
                                          currentTheme.textMuted,
                                        )}
                                      >
                                        {repo.description}
                                      </p>
                                    )}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                                    <Link href={`https://github.com/${profile.login}/${repo.name}`} target="_blank">
                                      <ExternalLink className="h-3 w-3" />
                                    </Link>
                                  </Button>
                                </div>
                                <div className={cn("mt-2 flex items-center justify-between", currentTheme.textMuted)}>
                                  {repo.language && (
                                    <div className="flex items-center gap-1.5">
                                      <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: repo.languageColor }}
                                      />
                                      <span className="text-xs">{repo.language}</span>
                                    </div>
                                  )}
                                  <div
                                    className={cn(
                                      "flex items-center gap-3 text-xs text-muted-foreground",
                                      currentTheme.textMuted,
                                    )}
                                  >
                                    <div className={cn("flex items-center gap-1", currentTheme.textMuted)}>
                                      <Star className={cn("h-3 w-3", currentTheme.textMuted)} />
                                      <span className={cn("text-xs", currentTheme.textMuted)}>{repo.stars}</span>
                                    </div>
                                    <div className={cn("flex items-center gap-1", currentTheme.textMuted)}>
                                      <GitFork className={cn("h-3 w-3", currentTheme.textMuted)} />
                                      <span className={cn("text-xs", currentTheme.textMuted)}>{repo.forks}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                        {profile.pinnedRepos.length > 2 && (
                          <div className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("text-xs", currentTheme.accentColor)}
                              asChild
                            >
                              <Link href={`https://github.com/${profile.login}?tab=repositories`} target="_blank">
                                View all repositories
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex h-20 items-center justify-center text-sm text-muted-foreground",
                          currentTheme.textMuted,
                        )}
                      >
                        No repositories available
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter
              className={cn(
                "flex items-center justify-between border-t px-3 text-xs",
                currentTheme.id === "github-light" && "border-gray-100",
                currentTheme.id === "github-dark" && "border-gray-800",
                currentTheme.id === "ocean" && "border-blue-100",
                currentTheme.id === "forest" && "border-green-100",
                currentTheme.id === "sunset" && "border-orange-100",
              )}
            >
              <span className={cn("text-muted-foreground", currentTheme.textMuted)}>
                {getYearsOnGitHub(profile.createdAt)} years on GitHub
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                      <Link href={`https://github.com/${profile.login}`} target="_blank">
                        <Github className={cn("h-3.5 w-3.5", currentTheme.textMuted)} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View full profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
