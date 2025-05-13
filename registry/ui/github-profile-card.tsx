"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { AtSign, Calendar, ExternalLink, Github, MapPin } from "lucide-react";
import Image from "next/image";

export type ThemeOption = {
  id: string;
  name: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
  badgeBg: string;
  statsBg: string;
};

export const themes: ThemeOption[] = [
  {
    id: "modern-light",
    name: "Modern Light",
    cardBg: "bg-white",
    cardBorder: "border border-gray-100",
    cardShadow:
      "shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/60",
    accentColor: "text-violet-600",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-500",
    badgeBg: "bg-violet-50",
    statsBg: "bg-gray-50/80",
  },
  {
    id: "gradient-blue",
    name: "Gradient Blue",
    cardBg:
      "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
    cardBorder: "border border-blue-100/80 dark:border-blue-800/30",
    cardShadow:
      "shadow-lg shadow-blue-200/30 hover:shadow-xl hover:shadow-blue-200/40 dark:shadow-blue-900/20 dark:hover:shadow-blue-900/30",
    accentColor: "text-blue-600 dark:text-blue-400",
    textPrimary: "text-gray-900 dark:text-white",
    textSecondary: "text-gray-600 dark:text-gray-300",
    badgeBg: "bg-blue-100/80 dark:bg-blue-800/30",
    statsBg: "bg-blue-50/50 dark:bg-blue-900/30",
  },
  {
    id: "gradient-purple",
    name: "Gradient Purple",
    cardBg:
      "bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950",
    cardBorder: "border border-purple-100/80 dark:border-purple-800/30",
    cardShadow:
      "shadow-lg shadow-purple-200/30 hover:shadow-xl hover:shadow-purple-200/40 dark:shadow-purple-900/20 dark:hover:shadow-purple-900/30",
    accentColor: "text-purple-600 dark:text-purple-400",
    textPrimary: "text-gray-900 dark:text-white",
    textSecondary: "text-gray-600 dark:text-gray-300",
    badgeBg: "bg-purple-100/80 dark:bg-purple-800/30",
    statsBg: "bg-purple-50/50 dark:bg-purple-900/30",
  },
  {
    id: "minimal-black",
    name: "Minimal Black",
    cardBg: "bg-black",
    cardBorder: "border border-zinc-800",
    cardShadow:
      "shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50",
    accentColor: "text-white",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    badgeBg: "bg-zinc-900",
    statsBg: "bg-zinc-900/70",
  },
];

export type ProfileData = {
  login: string;
  name: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
  languages?: Array<{
    name: string;
    color: string;
    percentage: number;
  }>;
  contributionData?: Array<number>;
};
interface GitHubRepo {
  language: string | null;
  languages_url: string;
}

interface LanguageData {
  [key: string]: number;
}

interface GitHubProfileCardProps {
  username?: string;
  githubToken?: string;
  manualMode?: boolean;
  profileData?: ProfileData;
  themeId?: string;
}

export function GitHubProfileCard({
  username,
  githubToken,
  manualMode = false,
  profileData,
  themeId = "github-light",
}: GitHubProfileCardProps) {
  const currentTheme = useMemo(
    () => themes.find((theme) => theme.id === themeId) || themes[0],
    [themeId],
  );
  const [loading, setLoading] = useState(!manualMode);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(
    manualMode ? profileData || null : null,
  );

  const fetchProfileData = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {};
      if (githubToken) {
        headers.Authorization = `token ${githubToken}`;
      }

      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`,
        { headers },
      );
      if (!profileResponse.ok) {
        throw new Error(
          `Failed to fetch profile data: ${profileResponse.status}`,
        );
      }
      const profileData = await profileResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers },
      );
      if (!reposResponse.ok) {
        throw new Error(
          `Failed to fetch repositories: ${reposResponse.status}`,
        );
      }
      const reposData = (await reposResponse.json()) as GitHubRepo[];

      const languageMap = new Map<string, number>();
      let totalSize = 0;

      await Promise.all(
        reposData.map(async (repo: GitHubRepo) => {
          if (!repo.language) return;

          const langResponse = await fetch(repo.languages_url, { headers });
          if (!langResponse.ok) return;

          const langData = (await langResponse.json()) as LanguageData;

          Object.entries(langData).forEach(
            ([lang, bytes]: [string, number]) => {
              const currentBytes = languageMap.get(lang) || 0;
              languageMap.set(lang, currentBytes + bytes);
              totalSize += bytes;
            },
          );
        }),
      );

      const languageColors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        Go: "#00ADD8",
        Ruby: "#701516",
        PHP: "#4F5D95",
        C: "#555555",
        "C++": "#f34b7d",
        "C#": "#178600",
        Swift: "#ffac45",
        Kotlin: "#A97BFF",
        Rust: "#dea584",
        Dart: "#00B4AB",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Shell: "#89e051",
        Jupyter: "#DA5B0B",
        R: "#198CE7",
        Scala: "#c22d40",
      };

      const languages = Array.from(languageMap.entries())
        .map(([name, bytes]: [string, number]) => ({
          name,
          color: languageColors[name] || "#858585",
          percentage: Math.round((bytes / totalSize) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);

      const contributionData = Array.from({ length: 12 }, () => Math.random());

      const transformedProfile: ProfileData = {
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
        contributionData: contributionData,
      };

      setProfile(transformedProfile);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setLoading(false);
    }
  }, [username, githubToken]);

  useEffect(() => {
    if (manualMode && profileData) {
      setProfile(profileData);
      setLoading(false);
      return;
    }

    if (!manualMode && username) {
      fetchProfileData();
    }
  }, [manualMode, profileData, username, fetchProfileData]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
  }, []);

  const getYearsOnGitHub = useCallback((dateString: string) => {
    const joinDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffYears);
  }, []);
  const ProfileHeader = useMemo(() => {
    if (!profile) return null;
    return (
      <div className="p-4">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-start w-full justify-between">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={profile.avatarUrl || "/placeholder.svg"}
                  alt={`Profile picture of ${profile.name}`}
                  width={48}
                  height={48}
                  loading="lazy"
                  quality={100}
                  className="h-12 w-12 rounded-full border-2 border-white/80 dark:border-gray-800/80 shadow-sm object-cover"
                />
              </div>
              <div>
                <h2
                  className={`text-lg font-bold leading-tight truncate ${currentTheme.textPrimary}`}
                >
                  {profile.name}
                </h2>
                <div
                  className={`flex items-center text-sm ${currentTheme.textSecondary}`}
                >
                  <AtSign className="mr-1 h-3 w-3" aria-hidden="true" />
                  <span>{profile.login}</span>
                </div>
              </div>
            </div>
            <Link
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${currentTheme.accentColor} ${currentTheme.badgeBg} hover:opacity-90 transition-opacity`}
              aria-label={`Follow ${profile.name} on GitHub`}
            >
              <Github className="h-3 w-3" aria-hidden="true" />
              Follow
            </Link>
          </div>
          {profile.bio && (
            <p
              className={`my-2 text-xs line-clamp-2 ${currentTheme.textSecondary}`}
            >
              {profile.bio}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs">
          {profile.location && (
            <div
              className={`flex items-center gap-1 ${currentTheme.textSecondary}`}
            >
              <MapPin className="h-3 w-3" aria-hidden="true" />
              <span>{profile.location}</span>
            </div>
          )}
          <div
            className={`flex items-center gap-1 ${currentTheme.textSecondary}`}
          >
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <span>Joined {formatDate(profile.createdAt)}</span>
          </div>
        </div>
      </div>
    );
  }, [profile, currentTheme, formatDate]);

  const ProfileStats = useMemo(() => {
    if (!profile) return null;

    return (
      <div className="px-4 md:max-w-md">
        <div
          className={`flex justify-center gap-4 sm:gap-8 md:gap-20 px-2 sm:px-6 md:px-12 py-2.5 ${currentTheme.statsBg} rounded-md`}
        >
          <div className="flex flex-col">
            <span
              className={`text-sm sm:text-base text-center font-semibold ${currentTheme.textPrimary}`}
            >
              {profile.followers.toLocaleString()}
            </span>
            <span
              className={`text-xs text-center ${currentTheme.textSecondary}`}
            >
              followers
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm sm:text-base text-center font-semibold ${currentTheme.textPrimary}`}
            >
              {profile.following.toLocaleString()}
            </span>
            <span
              className={`text-xs text-center ${currentTheme.textSecondary}`}
            >
              following
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm sm:text-base text-center font-semibold ${currentTheme.textPrimary}`}
            >
              {profile.publicRepos.toLocaleString()}
            </span>
            <span
              className={`text-xs text-center ${currentTheme.textSecondary}`}
            >
              repositories
            </span>
          </div>
        </div>
      </div>
    );
  }, [profile, currentTheme]);

  const ActivityGraph = useMemo(() => {
    if (!profile?.contributionData || profile.contributionData.length === 0)
      return null;

    return (
      <div className="px-4 pt-3">
        <h3
          className={`text-xs font-medium uppercase mb-1.5 ${currentTheme.textSecondary}`}
        >
          Activity
        </h3>
        <div
          className={`h-[36px] w-full overflow-hidden rounded-md ${currentTheme.badgeBg} p-2`}
          aria-label="Contribution activity over time"
          role="img"
        >
          <svg
            className="h-full w-full"
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
              className={currentTheme.accentColor}
            />
            <path
              d={`M0,30 ${profile.contributionData
                .map(
                  (value, index) =>
                    `L${index * (100 / (profile.contributionData?.length || 1))},${30 - value * 30}`,
                )
                .join(" ")} L100,30 Z`}
              fill="currentColor"
              className={`${currentTheme.accentColor} opacity-10`}
            />
          </svg>
        </div>
      </div>
    );
  }, [profile?.contributionData, currentTheme]);

  const Languages = useMemo(() => {
    if (!profile?.languages || profile.languages.length === 0) return null;

    return (
      <div className="px-4 py-3">
        <h3
          className={`text-xs font-medium uppercase mb-1.5 ${currentTheme.textSecondary}`}
        >
          Top Languages
        </h3>
        <div className="space-y-2">
          {profile.languages.slice(0, 3).map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className={`font-medium ${currentTheme.textPrimary}`}>
                    {item.name}
                  </span>
                </div>
                <span className={`font-medium ${currentTheme.textPrimary}`}>
                  {item.percentage}%
                </span>
              </div>
              <div
                className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200/30 dark:bg-gray-700/30"
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.name} ${item.percentage}%`}
              >
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
    );
  }, [profile?.languages, currentTheme]);

  const Footer = useMemo(() => {
    if (!profile) return null;

    return (
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          currentTheme.cardBorder.includes("border-")
            ? currentTheme.cardBorder.split(" ")[1]
            : "border-gray-100"
        }`}
      >
        <span className={`text-xs ${currentTheme.textSecondary}`}>
          {getYearsOnGitHub(profile.createdAt)} years on GitHub
        </span>
        <Link
          href={`https://github.com/${profile.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${currentTheme.textSecondary} transition-colors`}
          aria-label="View full GitHub profile"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    );
  }, [profile, currentTheme, getYearsOnGitHub]);

  if (loading) {
    return (
      <div
        className={`w-full max-w-md rounded-md ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} overflow-hidden transition-all duration-300 p-1 md:p-2`}
        role="alert"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="p-4">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-start w-full justify-between">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="hidden md:block h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
            <div className="h-4 w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-4 md:max-w-md">
          <div
            className={`flex justify-center gap-4 sm:gap-8 md:gap-20 px-2 sm:px-6 md:px-12 py-4 ${currentTheme.statsBg} rounded-md`}
          >
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col items-center gap-1">
                <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pt-3">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div
            className={`h-[36px] w-full rounded-md ${currentTheme.badgeBg} animate-pulse`}
          />
        </div>
        <div className="px-4 py-3">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex items-center justify-between px-4 py-2 ${currentTheme.cardBorder.includes("border-") ? currentTheme.cardBorder.split(" ")[1] : "border-gray-100"}`}
        >
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`w-full max-w-md rounded-md ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} overflow-hidden transition-all duration-300 p-1 md:p-2`}
        role="alert"
        aria-live="assertive"
      >
        <div className="p-6 flex flex-col items-center justify-center">
          <div className={`rounded-full p-3 ${currentTheme.badgeBg} mb-3`}>
            <svg
              className={`h-8 w-8 ${currentTheme.accentColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3
            className={`text-lg font-semibold ${currentTheme.textPrimary} mb-1 text-center`}
          >
            Profile Not Found
          </h3>
          <p
            className={`text-sm ${currentTheme.textSecondary} text-center mb-4`}
          >
            {error.includes("404")
              ? "This GitHub username doesn't exist or is not publicly available."
              : error}
          </p>
          <button
            onClick={() => {
              if (username) fetchProfileData();
            }}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${currentTheme.accentColor} ${currentTheme.badgeBg} hover:opacity-90 transition-opacity`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;
  return (
    <div
      className={`w-full max-w-md rounded-md ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} overflow-hidden transition-all duration-300 p-1 md:p-2`}
      role="region"
      aria-label={`GitHub profile for ${profile.name}`}
    >
      {ProfileHeader}
      {ProfileStats}
      {ActivityGraph}
      {Languages}
      {Footer}
    </div>
  );
}
