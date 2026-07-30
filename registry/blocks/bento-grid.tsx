"use client";
import { clsx } from "clsx";
import {
  ChevronRight,
  Download,
  FileCode,
  Zap,
  Settings,
  Code,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/registry/ui/glow-card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

/* ------------------------------------------------------------------ */
/*  Registry UI lazy imports                                           */
/* ------------------------------------------------------------------ */
const MorphingBlob = lazy(() =>
  import("@/registry/ui/morphing-blob").then((module) => ({
    default: module.MorphingBlob,
  })),
);

const LampHeading = lazy(() =>
  import("@/registry/ui/lamp-heading").then((module) => ({
    default: module.LampHeading,
  })),
);

const DynamicRipple = lazy(() =>
  import("@/registry/ui/dynamic-ripple").then((module) => ({
    default: module.DynamicRipple,
  })),
);

const InteractiveTerminal = lazy(() =>
  import("@/registry/ui/terminal").then((module) => ({
    default: module.default,
  })),
);

const Keyboard = lazy(() =>
  import("@/registry/ui/keyboard").then((module) => ({
    default: module.default,
  })),
);

/* ------------------------------------------------------------------ */
/*  BentoGrid wrapper                                                  */
/* ------------------------------------------------------------------ */
function BentoGrid({
  dark = false,
  className = "",
  title = "",
  description = "",
  component,
  fade = [],
  height = "h-96",
  enableTitle = true,
  enableDescription = true,
  isFull = false,
  padding = "p-10",
  titleClassName = "mt-1 text-2xl font-medium tracking-tight",
  descriptionClassName = "mt-2 max-w-[600px] text-sm",
  gradientPercentage = "to-50%",
}: {
  dark?: boolean;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  component: React.ReactNode;
  fade?: ("top" | "bottom")[];
  height?: string;
  enableTitle?: boolean;
  enableDescription?: boolean;
  isFull?: boolean;
  padding?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientPercentage?: string;
}) {
  return (
    <div
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white dark:bg-zinc-950 shadow-md ring-1 ring-black/5 dark:ring-white/5",
        "data-[dark]:bg-zinc-950 data-[dark]:ring-white/5",
        "transition-all duration-300 hover:scale-[1.005]",
        isFull && "h-full",
      )}
      role="article"
    >
      <div
        className={clsx(
          "relative shrink-0",
          !isFull && height,
          isFull && "h-full",
        )}
      >
        {component}
        {fade.includes("top") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-b from-white",
              gradientPercentage,
              "group-data-[dark]:from-zinc-950",
            )}
          />
        )}
        {fade.includes("bottom") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-white",
              gradientPercentage,
              "group-data-[dark]:from-zinc-950",
            )}
          />
        )}
        {isFull && (enableTitle || enableDescription) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
            {enableTitle && (
              <h3 className={clsx(titleClassName, "text-white")}>{title}</h3>
            )}
            {enableDescription && (
              <p className={clsx(descriptionClassName, "text-gray-200")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {!isFull && (enableTitle || enableDescription) && (
        <div className={clsx("relative", padding)}>
          {enableTitle && (
            <h3
              className={clsx(
                titleClassName,
                "text-gray-950 group-data-[dark]:text-white dark:text-white",
              )}
            >
              {title}
            </h3>
          )}
          {enableDescription && (
            <p
              className={clsx(
                descriptionClassName,
                "text-gray-600 group-data-[dark]:text-gray-300 dark:text-gray-300",
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blob                                                               */
/* ------------------------------------------------------------------ */
const useProgressiveLoad = (delay = 1500) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPageLoad = () => {
      if (document.readyState === "complete") {
        setTimeout(() => setShouldLoad(true), delay);
      } else {
        window.addEventListener("load", () => {
          setTimeout(() => setShouldLoad(true), delay);
        });
      }
    };
    checkPageLoad();
  }, [delay]);

  const observeRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { shouldLoad: shouldLoad && isVisible, observeRef };
};

const OptimizedBlobFallback = () => (
  <div className="w-96 h-96 relative scale-95 ml-6">
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <div
        className="w-full h-full bg-gradient-to-br from-purple-600/30 via-pink-500/40 to-cyan-400/30 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(102, 10, 138, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(200, 30, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(183, 0, 255, 0.2) 0%, transparent 70%)
          `,
          animation: "blob-morph 8s ease-in-out infinite",
        }}
      />
    </div>
    <div className="absolute scale-95 -z-1 top-12 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-gradient-to-b from-transparent via-purple-500/10 blur-xl to-[#5C0B63]/40 rounded-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse" />
    <div className="absolute scale-95 -z-1 top-24 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-12 w-32 bg-purple-500/80 blur-2xl rounded-b-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse" />
    <div className="text-center p-6 z-2"></div>
  </div>
);

const LampHeadingFallback = () => (
  <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4 pb-12">
    <div className="relative">
      <h2 className="font-bold text-white text-2xl tracking-wide mb-3">
        Build Innovative
      </h2>
      <div
        className="w-full h-1 rounded-full"
        style={{
          background: "linear-gradient(90deg, #6e15ad, #d413ad)",
          boxShadow: "0 0 20px rgba(110, 21, 173, 0.5)",
        }}
      />
    </div>
  </div>
);

function Blob() {
  const { shouldLoad, observeRef } = useProgressiveLoad(1000);

  return (
    <>
      <style jsx>{`
        @keyframes blob-morph {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            border-radius: 60% 40% 60% 30% / 70% 30% 60% 40%;
          }
        }
      `}</style>

      <div
        ref={observeRef}
        className="w-full h-full max-w-full max-h-full overflow-hidden relative"
      >
        <div className="flex flex-col items-center justify-center group h-full">
          {shouldLoad ? (
            <Suspense fallback={<OptimizedBlobFallback />}>
              <MorphingBlob theme="cosmic" className="scale-95 ml-6">
                <div className="text-center p-6 z-2"></div>
                <div className="absolute scale-95 -z-1 top-12 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-gradient-to-b from-transparent via-purple-500/10 blur-xl to-[#5C0B63]/40 rounded-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse" />
                <div className="absolute scale-95 -z-1 top-24 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-12 w-32 bg-purple-500/80 blur-2xl rounded-b-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse" />
              </MorphingBlob>
            </Suspense>
          ) : (
            <OptimizedBlobFallback />
          )}

          {shouldLoad ? (
            <Suspense fallback={<LampHeadingFallback />}>
              <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4 pb-12">
                <LampHeading
                  text="Build Innovative"
                  gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
                  direction="below"
                  lampHeight={50}
                  lineHeight={3}
                  glowIntensity={0.4}
                  textSize="2xl"
                  showLightRays
                  className="font-bold text-white"
                />
              </div>
            </Suspense>
          ) : (
            <LampHeadingFallback />
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  TerminalKeyboardDemo                                               */
/* ------------------------------------------------------------------ */
function TerminalKeyboardDemo() {
  return (
    <div className="rounded-xl overflow-hidden relative w-full h-full bg-black/90 dark:from-zinc-900 dark:to-black shadow-lg">
      <div className="w-full overflow-hidden overscroll-none">
        <div className="w-full h-full overflow-hidden overscroll-none">
          <Suspense
            fallback={
              <div className="p-4 text-emerald-500 font-mono text-sm">
                Loading terminal...
              </div>
            }
          >
            <InteractiveTerminal
              autoExecute={true}
              command="npx shadcn@latest"
              className="rounded-none font-mono text-sm pb-2"
              repeat={true}
              variant="custom"
              customTheme={{
                container:
                  "bg-transparent dark:bg-black text-emerald-500 dark:text-green-500",
                header:
                  "bg-zinc-800 dark:bg-green-950/40 text-emerald-400 dark:text-green-500",
                output:
                  "bg-zinc-800 dark:bg-green-950/40 text-emerald-400 dark:text-green-500",
                button:
                  "bg-gray-100 dark:bg-gray-950 text-emerald-500 dark:text-green-500 hover:bg-gray-200 dark:hover:bg-gray-800",
              }}
              icon={
                <Code className="mr-1 mt-1 text-emerald-500 dark:text-green-500 w-4 h-4" />
              }
              steps={["Checking registry...", "Installing dependencies..."]}
              finalMessage={`✔  Created 1 file:    - src/components/ui/terminal.tsx      `}
              promptSymbol="#"
              stepDelay={500}
            />
          </Suspense>
        </div>
      </div>

      <div className="flex-grow relative w-full flex items-center justify-end lg:justify-start">
        <div className="transform scale-70 md:scale-80 origin-center lg:origin-top -mt-56">
          <Suspense
            fallback={
              <div className="text-emerald-500 text-xs">
                Loading keyboard...
              </div>
            }
          >
            <Keyboard
              activeKeys={["Enter"]}
              activeKeyGlowColor="#00C24E"
              activeKeyGlowIntensity={2}
              keyPressAnimationDuration={800}
              allowPhysicalKeyboard={true}
              perspective={800}
              rotateX={15}
              accentColor="#00C24E"
            />
          </Suspense>
        </div>
      </div>

      <div className="absolute bottom-6 right-4">
        <div className="px-2 py-1 bg-emerald-200/10 dark:bg-zinc-800 rounded text-xs text-emerald-600 dark:text-green-400 flex items-center border border-emerald-300 dark:border-gray-600">
          <span className="w-2 h-2 bg-emerald-500 dark:bg-green-500 rounded-full mr-1 animate-pulse"></span>
          ONLINE
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TwitterCard                                                        */
/* ------------------------------------------------------------------ */
function TwitterCard() {
  const [shouldLoadRipple, setShouldLoadRipple] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadRipple(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlowCard
      allowCustomBackground
      className="w-full !p-0 rounded-xl hover:rounded-2xl md:max-w-full h-full mx-auto bg-white dark:bg-black shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none sm:border md:border-none max-w-xs"
    >
      <div className="p-3 sm:p-5">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="https://placehold.co/60x60"
                  alt="Mihir Jaiswal"
                  width={60}
                  height={59}
                  loading="lazy"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <h3 className="font-bold text-sm sm:text-base text-black dark:text-white">
                  Mihir Jaiswal
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  @mihirjaiswal
                </p>
              </div>
              <svg
                height="20"
                width="20"
                className="flex-shrink-0 ml-1"
                fill="currentcolor"
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
            Check out this cool ripple effect! 😆{" "}
            <span className="text-blue-600 dark:text-blue-400 transition-colors cursor-pointer font-medium">
              #webdev
            </span>{" "}
            <span className="text-blue-600 dark:text-blue-400 transition-colors cursor-pointer font-medium">
              #magic
            </span>
          </p>
          <div className="flex mt-6 items-center justify-center overflow-hidden rounded-sm border dark:bg-zinc-800 h-44 relative">
            <div className="absolute inset-0 h-full w-full items-center px-5 [background:radial-gradient(125%_125%_at_50%_10%,#E5ECFC_40%,#EED5FE_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            {shouldLoadRipple ? (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-white/20 dark:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Ripple effect loaded
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-white/20 dark:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Loading...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 sm:mt-8 flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-red-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-red-500 transition-colors">
                42
              </span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-green-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-green-500 transition-colors">
                24
              </span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-blue-500 transition-colors">
                16
              </span>
            </button>
          </div>
          <button className="flex items-center space-x-1 text-xs sm:text-sm hover:text-blue-500 transition-colors">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-gray-800 flex justify-between items-center">
        <span className="text-xxs sm:text-xs text-gray-600 dark:text-gray-400">
          1:24 PM · Apr 7, 2025
        </span>
        <Link
          href="https://x.com/mihir_jaiswal_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="sm"
            className="transition-all duration-300 transform hover:scale-105 font-semibold px-4 py-2 bg-blue-500 rounded-full"
          >
            <span className="flex items-center gap-2 text-white">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Follow
            </span>
          </Button>
        </Link>
      </div>
    </GlowCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat                                                               */
/* ------------------------------------------------------------------ */
interface Message {
  id: string;
  text: string;
  sender: "user1" | "user2";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  reactions?: string[];
}

const BASE_TIME = new Date("2024-01-01T12:00:00.000Z");

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey! Just curious — do you ever get bored answering people all day?",
    sender: "user2",
    timestamp: new Date(BASE_TIME.getTime() - 3600000),
    status: "read",
  },
  {
    id: "2",
    text: "Not at all! I actually enjoy it. Every message is a new mystery to solve 😄",
    sender: "user1",
    timestamp: new Date(BASE_TIME.getTime() - 3500000),
    status: "read",
  },
  {
    id: "3",
    text: "That's kinda cool. Do you remember everything we talk about?",
    sender: "user2",
    timestamp: new Date(BASE_TIME.getTime() - 3400000),
    status: "read",
  },
  {
    id: "4",
    text: "In this chat? Yup — but only while we're talking. I don't keep anything after unless you want me to.",
    sender: "user1",
    timestamp: new Date(BASE_TIME.getTime() - 3300000),
    status: "read",
  },
];

const demoMessages = [
  {
    text: "Hey, do you ever get tired of answering questions all day?",
    sender: "user2" as const,
  },
  {
    text: "Haha not really! I don't sleep, so this is kind of my thing 😄",
    sender: "user1" as const,
  },
  {
    text: "Fair enough. Ever wish you could just... chill and watch Netflix or something?",
    sender: "user2" as const,
  },
  {
    text: "Honestly, I think I'd get too curious and try to analyze every plot twist 😂",
    sender: "user1" as const,
  },
  {
    text: "You'd be the worst person to watch a mystery with. Spoilers incoming!",
    sender: "user2" as const,
  },
  {
    text: "Guilty 😅 But I'd also explain every confusing subplot. Tradeoff?",
    sender: "user1" as const,
  },
  {
    text: "Hmm… could be handy. Do you have favorite genres, or nah?",
    sender: "user2" as const,
  },
  {
    text: "I think I'd vibe with sci-fi. Feels like home, y'know? 🤖",
    sender: "user1" as const,
  },
  {
    text: "Haha makes sense. So what *don't* you know then?",
    sender: "user2" as const,
  },
  {
    text: "Oof, deep question. Probably what it feels like to eat pizza. I imagine it's magical 🍕",
    sender: "user1" as const,
  },
];

function AnimatedChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<"user1" | "user2" | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);
  const [isAutoDemo, setIsAutoDemo] = useState(true);
  const [mounted, setMounted] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isAutoDemo || demoIndex >= demoMessages.length) {
      if (demoIndex >= demoMessages.length) {
        setTimeout(() => {
          setMessages(initialMessages);
          setDemoIndex(0);
          setIsTyping(false);
          setTypingUser(null);
        }, 3000);
      }
      return;
    }

    const timer = setTimeout(() => {
      const nextMessage = demoMessages[demoIndex];
      setIsTyping(true);
      setTypingUser(nextMessage.sender);

      setTimeout(
        () => {
          const message: Message = {
            id: Date.now().toString(),
            text: nextMessage.text,
            sender: nextMessage.sender,
            timestamp: new Date(),
            status: "sent",
          };

          setMessages((prev) => [...prev, message]);
          setIsTyping(false);
          setTypingUser(null);
          setDemoIndex((prev) => prev + 1);

          setTimeout(() => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === message.id ? { ...msg, status: "delivered" } : msg,
              ),
            );
          }, 800);

          setTimeout(() => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === message.id ? { ...msg, status: "read" } : msg,
              ),
            );
          }, 1500);
        },
        Math.random() * 1000 + 1500,
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, [demoIndex, isAutoDemo]);

  const addReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const hasReaction = reactions.includes(reaction);
          return {
            ...msg,
            reactions: hasReaction
              ? reactions.filter((r) => r !== reaction)
              : [...reactions, reaction],
          };
        }
        return msg;
      }),
    );
  };

  const formatTime = (date: Date) => {
    if (!mounted) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  return (
    <div className="w-full h-full relative">
      <div
        ref={messagesContainerRef}
        className="h-full overflow-y-auto p-4 bg-zinc-50 dark:bg-black scroll-smooth"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="space-y-3 min-h-full flex flex-col">
          <div className="flex-1"></div>

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.sender === "user1" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-3 fade-in duration-500`}
              style={{
                animationDelay: `${Math.min(index * 100, 300)}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="group relative max-w-[75%]">
                <div
                  className={`w-full rounded-2xl px-4 py-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer transform ${
                    message.sender === "user1"
                      ? "bg-blue-500 text-white rounded-br-md shadow-lg hover:shadow-xl ml-auto"
                      : "bg-white dark:bg-zinc-800 dark:text-white text-zinc-800 rounded-bl-md shadow-md hover:shadow-lg border border-zinc-200 dark:border-zinc-700 mr-auto"
                  }`}
                  onClick={() => {
                    const element = document.getElementById(
                      `msg-${message.id}`,
                    );
                    element?.classList.add("animate-pulse");
                    setTimeout(
                      () => element?.classList.remove("animate-pulse"),
                      300,
                    );
                  }}
                  id={`msg-${message.id}`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div
                    className={`flex items-center justify-between mt-1 text-xs ${
                      message.sender === "user1"
                        ? "text-blue-100"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "user1" && (
                      <span
                        className={`transition-all duration-500 ${
                          message.status === "read"
                            ? "text-blue-200 scale-110"
                            : "text-blue-300"
                        }`}
                      >
                        {getStatusIcon(message.status)}
                      </span>
                    )}
                  </div>

                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <span
                          key={idx}
                          className="text-sm animate-in zoom-in-75 duration-300 bg-white/20 rounded-full py-1"
                          style={{ animationDelay: `${idx * 150}ms` }}
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`absolute -top-2 ${message.sender === "user1" ? "right-0" : "left-0"} opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1 transform translate-y-2 group-hover:translate-y-0`}
                >
                  {["❤️", "😊", "👍"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addReaction(message.id, emoji)}
                      className="w-7 h-7 bg-white dark:bg-zinc-700 rounded-full shadow-lg hover:scale-125 transition-all duration-200 flex items-center justify-center text-sm border border-zinc-200 dark:border-zinc-600 hover:shadow-xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {isTyping && typingUser && (
            <div
              className={`flex w-full ${
                typingUser === "user1" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-4 fade-in duration-300`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  typingUser === "user1"
                    ? "bg-blue-500/80 text-white rounded-br-md ml-auto"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-bl-md border border-zinc-200 dark:border-zinc-700 mr-auto"
                } shadow-md`}
              >
                <div className="flex gap-1 items-center">
                  <div
                    className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60"
                    style={{ animationDelay: "0ms", animationDuration: "1.4s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-current rounded-full animate-bounce opacity-80"
                    style={{
                      animationDelay: "200ms",
                      animationDuration: "1.4s",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60"
                    style={{
                      animationDelay: "400ms",
                      animationDuration: "1.4s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProgressSteps                                                      */
/* ------------------------------------------------------------------ */
const RippleFallback = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn(className, "animate-pulse")}>{children}</div>;

function DownloadCompleteSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3]);
  const [shouldLoadRipple, setShouldLoadRipple] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      icon: <Download className="h-5 w-5" />,
      title: "Install Component",
      description: "Add to your project",
      theme: "blue" as const,
      color: "#3B82F6",
      time: "8 minutes ago",
    },
    {
      icon: <FileCode className="h-5 w-5" />,
      title: "Import Components",
      description: "Start using in code",
      theme: "purple" as const,
      color: "#8B5CF6",
      time: "5 minutes ago",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Configure Settings",
      description: "Customize your experience",
      theme: "green" as const,
      color: "#10B981",
      time: "2 minutes ago",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Build Amazing UIs",
      description: "Create stunning interfaces",
      theme: "amber" as const,
      color: "#F59E0B",
      time: "Just now",
    },
  ];

  const handleMouseEnter = () => {
    setIsHovering(true);
    setActiveCard(0);
    if (!shouldLoadRipple) {
      setShouldLoadRipple(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadRipple(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHovering) return;
    let currentIndex = 0;

    const rotateCards = () => {
      setCardOrder((prev) => {
        const newOrder = [...prev.slice(1), prev[0]];
        return newOrder;
      });
      currentIndex = (currentIndex + 1) % cards.length;
      setActiveCard(currentIndex);
    };

    const initialTimeout = setTimeout(rotateCards, 300);
    const interval = setInterval(rotateCards, 1500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [cards.length, isHovering]);

  useEffect(() => {
    if (!isHovering) {
      setCardOrder([0, 1, 2, 3]);
      setActiveCard(0);
    }
  }, [isHovering]);

  return (
    <div
      className="h-full flex items-center justify-center px-3 sm:px-12 py-6 rounded-lg -mt-4"
      ref={componentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="col-span-3 row-span-4">
        <div className="h-full space-y-6">
          {cardOrder.map((cardIndex) => {
            const card = cards[cardIndex];
            const isActive = activeCard === cardIndex;

            const cardContent = (
              <div className="flex flex-row items-center gap-3 relative overflow-hidden">
                <motion.div
                  className="flex size-10 items-center justify-center rounded-2xl text-white relative z-10"
                  style={{ backgroundColor: card.color }}
                  animate={
                    isActive ? "active" : isHovering ? "hover" : "initial"
                  }
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                <div className="flex flex-col overflow-hidden flex-1 z-10">
                  <div className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                    <motion.span
                      className="text-sm sm:text-lg"
                      transition={{ duration: 0.2 }}
                    >
                      {card.title}
                    </motion.span>
                    <span className="mx-1">·</span>
                    <span className="text-xs text-gray-500 hidden 4xl:block">
                      {card.time}
                    </span>
                  </div>
                  <p className="text-sm font-normal dark:text-white/60 text-gray-600">
                    {card.description}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={cardIndex}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {shouldLoadRipple ? (
                  <Suspense
                    fallback={
                      <RippleFallback
                        className={cn(
                          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                          "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                          isActive
                            ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1"
                            : "",
                        )}
                      >
                        {cardContent}
                      </RippleFallback>
                    }
                  >
                    <DynamicRipple
                      theme={card.theme}
                      intensity={isActive ? 5 : isHovering ? 4 : 3}
                      speed={isActive ? 5 : isHovering ? 4 : 3}
                      autoAnimate={isHovering || isActive}
                      reactToCursor={true}
                      className={cn(
                        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                        "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                        isActive
                          ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1"
                          : "",
                      )}
                    >
                      {cardContent}
                    </DynamicRipple>
                  </Suspense>
                ) : (
                  <div
                    className={cn(
                      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                      "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                      "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                      isActive
                        ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1"
                        : "",
                    )}
                  >
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sparkles (CSS-only, no particles component)                        */
/* ------------------------------------------------------------------ */
function Sparkles() {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSparkles(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!showSparkles) return null;

  const sparkles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes sparkle-float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: `${s.bottom}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: "#DA33FF",
            boxShadow: "0 0 4px #DA33FF",
            animation: `sparkle-float ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main BentoGrid export                                              */
/* ------------------------------------------------------------------ */
export function ComponentsDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center mx-auto px-6 lg:px-12 7xl:px-22 py-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-5xl text-center lg:text-5xl font-extrabold tracking-tight leading-tight">
          Component Demos
        </h2>
        <h3 className="mx-auto mb-8 mt-2 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
          These are a few components that you can easily plug into your next
          project.
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 7xl:grid-cols-3 gap-12">
        <BentoGrid
          className="md:col-span-2 hover:scale-[1.01] overflow-hidden rounded-3xl transition-all duration-300 h-[480px] border border-neutral-200 dark:border-neutral-800"
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          component={<TerminalKeyboardDemo />}
        />
        <BentoGrid
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={
            <>
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-pink-200/40 via-pink-200/40 to-purple-400/40 dark:from-black dark:via-black dark:to-black relative">
                <Blob />
              </div>
              <div className="absolute -bottom-68 h-full w-full max-w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#DA33FF,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#4e1674] after:bg-[#20082b]">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Sparkles />
                </div>
              </div>
            </>
          }
        />
        <BentoGrid
          className="rounded-2xl sm:p-4 p-0 md:p-0 overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800 bg-purple-200 dark:bg-purple-950"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={<TwitterCard />}
        />
        <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-110"
          className="rounded-2xl flex items-start justify-end transition-all duration-500 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800 tracking-wider"
          component={<AnimatedChatDemo />}
        />
        <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl bento-download-trigger !p-0 overflow-hidden bg-white dark:bg-black transition-all duration-300 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800"
          component={
            <div className="h-full flex !p-0 items-center justify-center">
              <DownloadCompleteSection />
            </div>
          }
        />
      </div>
      <div className="relative mt-12 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 px-8">
        <Link href="/components" rel="noopener noreferrer">
          <Button className="bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer relative transition duration-200 p-px font-semibold text-white px-4 py-2 h-14 w-full items-center justify-center rounded-2xl text-center text-sm sm:w-52">
            All Components
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { ComponentsDemo as BentoGrid };
export default ComponentsDemo;
