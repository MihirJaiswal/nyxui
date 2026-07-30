"use client";
import { useState } from "react";
import {
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  Twitter,
  Check,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share2,
  ThumbsUp,
  BatteryFull,
  Signal,
  Wifi,
  User,
} from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Platform = "twitter" | "linkedin" | "github";

// ---------------------------------------------------------------------------
// PhoneStatusBar (inlined)
// ---------------------------------------------------------------------------
function PhoneStatusBar() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-6 items-center justify-between px-3 text-[10px] text-foreground/80"
      aria-hidden="true"
    >
      <span className="font-medium">9:41</span>

      {/* Dynamic island */}
      <div className="absolute left-1/2 top-1.5 flex -translate-x-1/2 items-center gap-2">
        <motion.div
          className="h-3.5 w-24 rounded-full border border-zinc-700/60 bg-zinc-900/90 shadow-inner dark:border-white/15 dark:bg-zinc-100/15"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        <motion.div
          className="h-2.5 w-2.5 rounded-full bg-zinc-800/95 ring-2 ring-black/15 shadow-sm dark:bg-zinc-200/70 dark:ring-white/15"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryFull className="h-3 w-3" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Simple placeholder logo (inlined so we don't depend on @/components/global)
// ---------------------------------------------------------------------------
function SimpleLogo({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 363 347"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
    >
      <g
        transform="translate(0,347) scale(0.1,-0.1)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M203 3373 l-83 -4 0 -1629 c0 -897 -1 -1633 -2 -1637 -4 -10 470 -16 529 -8 l43 6 2 1285 3 1285 104 -143 c58 -79 256 -345 440 -592 l335 -449 35 43 c20 23 95 124 168 223 l132 181 -47 66 c-110 155 -507 700 -632 865 -74 99 -191 255 -260 348 l-124 167 -281 -2 c-154 -1 -317 -4 -362 -5z" />
        <path d="M2614 2623 c-79 -114 -701 -984 -891 -1248 -138 -192 -337 -466 -517 -710 -187 -256 -406 -561 -406 -568 0 -9 716 -9 758 -1 26 5 78 72 398 513 203 278 459 628 569 776 473 636 964 1313 965 1328 0 4 -182 7 -403 7 l-404 0 -69 -97z" />
        <path d="M3289 2118 c-124 -167 -264 -358 -312 -424 l-88 -122 0 -363 c1 -332 -1 -362 -15 -344 -9 11 -68 93 -131 183 -64 89 -119 165 -123 167 -10 6 -350 -451 -349 -468 1 -20 483 -652 497 -651 6 1 176 2 377 3 l365 1 2 1158 c2 636 3 1158 2 1160 -1 1 -102 -134 -225 -300z" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Simple ripple effect (inlined, CSS-based)
// ---------------------------------------------------------------------------
function RippleCircle({ color = "#155dfc" }: { color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: color }}
          initial={{ width: 40, height: 40, opacity: 0.5 }}
          animate={{
            width: [40, 200, 280],
            height: [40, 200, 280],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// LinkedIn Post (inlined, simplified)
// ---------------------------------------------------------------------------
function LinkedInPost() {
  return (
    <motion.article
      initial={{ y: 5 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group/post relative mb-3 rounded-lg border border-zinc-300 px-4 pb-2 pt-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/90 hover:shadow-lg dark:border-zinc-800/70 dark:from-white/10 dark:via-white/5"
      tabIndex={-1}
      whileHover={{ scale: 1.01 }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-zinc-800/60 bg-gradient-to-br from-blue-400 to-purple-500 shadow-sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold leading-none">Alex Johnson</p>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Check
                  className="h-3.5 w-3.5 text-blue-600"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
            <p className="mt-1 text-[11px] font-medium text-zinc-400">
              Product Designer &bull; 2h
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="w-full">
          <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-800 dark:text-white/90">
            {" "}
            Just came across Nyx UI - a sleek collection of modern components!
            <br />
            It is a React component library that makes building modern web
            interfaces so much faster.
            <br />
            <span className="text-blue-500">#webdev #UI #frontend</span>
          </p>

          {/* Logo card */}
          <motion.div
            className="mt-3 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-300 p-3 shadow-sm dark:border-zinc-800/70"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <SimpleLogo size={80} />
          </motion.div>

          {/* Action buttons */}
          <div className="mt-2 flex items-center justify-between text-[12px] text-zinc-400">
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-blue-50/10 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="text-xs font-medium">Like</span>
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-blue-50/10 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs font-medium">Comment</span>
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-blue-50/10 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Share2 className="h-3 w-3" />
              <span className="text-xs font-medium">Share</span>
            </motion.button>
          </div>
        </div>

        {/* More button */}
        <motion.button
          className="absolute right-4 top-4 rounded-lg p-2 transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label="More options"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <MoreHorizontal className="h-4 w-4 text-zinc-400" />
        </motion.button>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// LinkedIn Phone (inlined, simplified)
// ---------------------------------------------------------------------------
function LinkedInPhone() {
  return (
    <motion.div
      whileHover={{
        y: -12,
        rotateX: -8,
        rotateY: 6,
        rotateZ: 2,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      }}
      className="group/phone relative h-120 w-72 overflow-hidden rounded-3xl border-4 border-zinc-800/80 bg-white backdrop-blur-md dark:bg-black"
      style={{ transformStyle: "preserve-3d" }}
      tabIndex={0}
      aria-label="Reveal LinkedIn post"
    >
      <PhoneStatusBar />

      {/* Overlay with LinkedIn logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex scale-100 items-center justify-center bg-white opacity-100 backdrop-blur-sm transition-all duration-300 group-hover/phone:scale-95 group-hover/phone:opacity-0 group-focus-within/phone:scale-95 group-focus-within/phone:opacity-0 dark:bg-black/90"
      >
        <div className="relative flex h-[500px] w-72 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-blue-500/5 p-2 ring-1 ring-blue-500/10">
            <Linkedin className="h-14 w-14 fill-blue-600 text-blue-600" />
          </div>
          <RippleCircle color="#155dfc" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover/phone:translate-y-0 group-hover/phone:opacity-100 group-focus-within/phone:translate-y-0 group-focus-within/phone:opacity-100">
        {/* Header bar */}
        <motion.div
          className="mt-6 flex items-end justify-between gap-x-2 border-y border-zinc-300 px-3 py-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <Linkedin
            className="h-6 w-6 fill-blue-600 text-blue-600"
            aria-hidden="true"
          />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-white dark:bg-black">
            <User className="h-4 w-4 fill-zinc-300" />
          </div>
        </motion.div>

        {/* Scrollable content */}
        <motion.div
          className="h-full overflow-y-auto px-2 pb-16 pt-2"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <LinkedInPost />
        </motion.div>

        {/* Glass reflection */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover/phone:opacity-100 group-focus-within/phone:opacity-100 dark:block"
          initial={false}
          whileHover={{
            background: [
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
            ],
            transition: { duration: 1.5, repeat: Infinity },
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// X Post (inlined, simplified)
// ---------------------------------------------------------------------------
function XPost() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      className="group/post mb-3 rounded-lg border border-zinc-300 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/90 hover:shadow-lg dark:border-zinc-800/70 dark:from-white/10 dark:via-white/5"
      whileHover={{ scale: 1.01 }}
    >
      <div className="relative flex items-start gap-2">
        <div className="h-8 w-8 rounded-full border border-zinc-800/60 bg-gradient-to-br from-orange-400 to-pink-500 shadow-sm" />

        <div className="w-full">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">@novas_ux</span>
            <span className="text-[11px] font-medium text-zinc-400">
              &bull; 1 hr
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-800 dark:text-white/90">
            {" "}
            Say hello to Nyx UI - A sleek collection of modern components!!
            <br />
            The components are clean, responsive, and easy to customize.
            <br />
            <span className="text-blue-500">#frontend #UI #webdev</span>
          </p>

          {/* Logo card */}
          <motion.div
            className="mt-3 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-300 p-3 shadow-sm dark:border-zinc-800/70"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <SimpleLogo size={80} />
          </motion.div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-between text-[12px] text-zinc-400">
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-50/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <MessageCircle className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-50/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Repeat2 className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-red-50/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Heart className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-50/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* More button */}
        <motion.button
          className="absolute right-0 top-0 rounded-lg p-2 transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label="More options"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <MoreHorizontal className="h-4 w-4 text-zinc-400" />
        </motion.button>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// X Phone (inlined, simplified)
// ---------------------------------------------------------------------------
function XPhone() {
  return (
    <motion.div
      whileHover={{
        y: -15,
        rotateX: -10,
        rotateY: -8,
        rotateZ: -2,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      }}
      className="group/phone relative h-120 w-72 overflow-hidden rounded-3xl border-4 border-zinc-800/80 bg-white backdrop-blur-md dark:bg-black"
      style={{ transformStyle: "preserve-3d" }}
      tabIndex={0}
      aria-label="Reveal X post"
    >
      <PhoneStatusBar />

      {/* Overlay with X logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex scale-100 items-center justify-center bg-white opacity-100 backdrop-blur-sm transition-all duration-300 group-hover/phone:scale-95 group-hover/phone:opacity-0 group-focus-within/phone:scale-95 group-focus-within/phone:opacity-0 dark:bg-black/90"
      >
        <div className="relative flex h-[500px] w-72 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-zinc-500/5 p-2 ring-1 ring-zinc-500/10">
            <Twitter className="h-14 w-14 fill-black text-black dark:fill-white dark:text-white" />
          </div>
          <RippleCircle color="#71717b" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover/phone:translate-y-0 group-hover/phone:opacity-100 group-focus-within/phone:translate-y-0 group-focus-within/phone:opacity-100">
        {/* Header bar */}
        <motion.div
          className="mt-6 flex items-center gap-2 border-y border-zinc-300 px-3 py-2 backdrop-blur-sm dark:border-zinc-800/60 dark:from-black/80 dark:to-black/60"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <Twitter className="h-6 w-6" aria-hidden="true" />
          <span className="text-lg font-medium">Posts</span>
        </motion.div>

        {/* Scrollable content */}
        <motion.div
          className="h-full overflow-y-auto px-2 pb-16 pt-2"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <XPost />
        </motion.div>

        {/* Glass reflection */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tr from-transparent via-transparent to-white/[0.08] opacity-0 group-hover/phone:opacity-100 group-focus-within/phone:opacity-100 dark:block"
          initial={false}
          whileHover={{
            background: [
              "linear-gradient(45deg, transparent 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0.08) 0%, transparent 50%, transparent 100%)",
            ],
            transition: { duration: 1.5, repeat: Infinity },
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Share button row (inlined)
// ---------------------------------------------------------------------------
interface ShareButtonProps {
  platform: Platform;
  label: string;
  icon: React.ReactNode;
  onClick: (platform: Platform) => void;
  disabled: boolean;
  hoverClass: string;
}

function ShareButton({
  platform,
  label,
  icon,
  onClick,
  disabled,
  hoverClass,
}: ShareButtonProps) {
  return (
    <motion.div
      className="flex w-full items-center gap-2 overflow-hidden rounded-sm border shadow-sm transition-shadow duration-200 hover:shadow-md md:w-96"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <button
        onClick={() => onClick(platform)}
        disabled={disabled}
        aria-label={label}
        className={`flex w-full cursor-pointer items-center gap-3 border-none px-4 py-3 transition-colors duration-200 ${hoverClass}`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex flex-1 items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <ExternalLink className="h-4 w-4 opacity-80" />
        </div>
      </button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Support block
// ---------------------------------------------------------------------------
export function Support() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: Platform) => {
    setIsSharing(true);
    // Simulated share action (no window.open / external URLs)
    setTimeout(() => {
      setIsSharing(false);
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden px-6 py-20">
      <div className="relative z-10 flex flex-col justify-start border border-neutral-200/60 px-4 py-2 backdrop-blur-sm md:px-6 lg:px-8 dark:bg-neutral-950/80 dark:text-white bg-white dark:border-neutral-800/60">
        {/* Corner decorations */}
        <div className="absolute -top-0.5 left-0 z-12 h-0.5 w-4 border-t border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -left-0.5 z-12 h-4 w-0.5 border-l border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 right-0 z-12 h-0.5 w-4 border-t border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -right-0.5 z-12 h-4 w-0.5 border-r border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>

        <div className="absolute -bottom-0.5 left-0 z-12 h-0.5 w-4 border-b border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -left-0.5 z-12 h-4 w-0.5 border-l border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 right-0 z-12 h-0.5 w-4 border-b border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -right-0.5 z-12 h-4 w-0.5 border-r border-neutral-600 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-400"></div>

        {/* LinkedIn Phone */}
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-4 hidden lg:block xl:translate-x-4">
          <div style={{ perspective: 1000 }}>
            <LinkedInPhone />
          </div>
        </motion.div>

        {/* X Phone */}
        <motion.div className="absolute bottom-0 right-5 hidden lg:block xl:right-15">
          <div style={{ perspective: 1200 }}>
            <XPhone />
          </div>
        </motion.div>

        {/* Support section */}
        <div className="flex flex-col items-center justify-center gap-6 py-10 lg:w-[40%]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-600">
              <Heart className="mt-1 h-8 w-8 fill-white text-white" />
            </div>
            <motion.h2
              className="text-balance text-center text-4xl font-bold"
              whileInView={{ scale: [0.98, 1.02, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Support Us
            </motion.h2>
            <motion.p className="max-w-xs text-center text-neutral-600 dark:text-neutral-400 sm:max-w-md">
              Help Nyx UI grow by sharing with your network. We&apos;ve prepared
              ready-to-use posts for you, just click share.
            </motion.p>

            <ShareButton
              platform="linkedin"
              label="Share on LinkedIn"
              icon={<Linkedin className="h-5 w-5 cursor-pointer" />}
              onClick={handleShare}
              disabled={isSharing}
              hoverClass="hover:bg-blue-300 dark:hover:bg-blue-700 bg-transparent"
            />

            <ShareButton
              platform="twitter"
              label="Share on X"
              icon={<Twitter className="h-5 w-5 cursor-pointer" />}
              onClick={handleShare}
              disabled={isSharing}
              hoverClass="hover:bg-zinc-300 dark:hover:bg-zinc-700"
            />

            <ShareButton
              platform="github"
              label="Star on Github"
              icon={<Github className="h-5 w-5 cursor-pointer" />}
              onClick={handleShare}
              disabled={isSharing}
              hoverClass="hover:bg-gray-300 dark:hover:bg-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
