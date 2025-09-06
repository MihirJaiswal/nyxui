import { motion } from "motion/react";
import { 
  MessageCircle, 
  MoreHorizontal, 
  Share2, 
  ThumbsUp, 
  Check, 
  User,
  Linkedin
} from "lucide-react";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { Ripple } from "@/components/ui/ripple";
import Image from "next/image";
import Logo from "@/components/global/Logo";

// LinkedIn Post Component
const LinkedInPost = () => {
  return (
    <motion.article
      initial={{ y: 5 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group/post border border-zinc-300 dark:border-zinc-800/70 bg-gradient-to-br from-transparent via-transparent to-transparent dark:from-white/10 dark:via-white/5  backdrop-blur-sm px-4 pt-4 pb-2 mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-zinc-700/90 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/5 focus-within:border-blue-600/60 motion-safe:transition-transform rounded-lg relative"
      tabIndex={-1}
      whileHover={{ scale: 1.01 }}
    >
      <div>
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/avtars/10.jpg"
            width={40}
            height={40}
            loading="lazy"
            alt='User avatar'
            className="h-10 w-10 rounded-full border border-zinc-800/60 shadow-sm object-cover"
          />
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
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">
            Product Designer • 2h
            </p>
          </div>
        </div>
        <div className="w-full">
          <p className="mt-3 text-sm text-pretty leading-relaxed text-zinc-800 dark:text-white/90">🚀 Just came across Nyx UI, - a sleek collection of modern components!<br /> It is a React component library that makes building modern web interfaces so much faster. <br /> <span className="text-blue-500">#webdev #UI #frontend</span></p>
            <motion.div
              className="mt-3 flex items-center justify-center p-3 overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-800/70 shadow-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Logo height={80} width={80}/>
            </motion.div>
          <div className="mt-2 flex items-center justify-between text-[12px] text-zinc-400">
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-blue-50/10 hover:text-blue-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="font-medium text-xs">Like</span>
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-blue-50/10 hover:text-blue-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <MessageCircle className="h-3 w-3" />
              <span className="font-medium text-xs">Comment</span>
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-blue-50/10 hover:text-blue-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Share2 className="h-3 w-3" />
              <span className="font-medium text-xs">Share</span>
            </motion.button>
          </div>
        </div>
        <motion.button
          className="absolute top-4 right-4 rounded-lg p-2 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
};

// Main Combined Component
const LinkedInPhoneComponent = ({ shouldReduceMotion = false }) => {
  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? { y: -4 }
          : {
              y: -12,
              rotateX: -8,
              rotateY: 6,
              rotateZ: 2,
              scale: 1.02,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      }}
      className="group/phone bg-white dark:bg-black h-120 w-72 border-4 border-zinc-800/80 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent dark:from-zinc-900/20 dark:via-zinc-900/10 dark:to-zinc-900/5 backdrop-blur-md relative overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
      }}
      tabIndex={0}
      aria-label="Reveal LinkedIn post"
    >
      <PhoneStatusBar />

      {/* Overlay with LinkedIn logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-black/90 backdrop-blur-sm transition-all duration-300 opacity-100 scale-100 group-hover/phone:opacity-0 group-hover/phone:scale-95 group-focus-within/phone:opacity-0 group-focus-within/phone:scale-95"
      >
        <div className="flex flex-col items-center gap-3 text-white/90">
          <div className="relative flex h-[500px] w-72 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black">
            <div className="h-24 w-24 rounded-full p-2 grid place-items-center ring-1 ring-blue-500/10 bg-blue-500/5">
              <Linkedin className="h-14 w-14 text-blue-600 fill-blue-600" />
            </div>
            <Ripple color="#155dfc" />
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 opacity-0 translate-y-1 transition-all duration-300 group-hover/phone:opacity-100 group-hover/phone:translate-y-0 group-focus-within/phone:opacity-100 group-focus-within/phone:translate-y-0">
        {/* Enhanced header */}
        <motion.div
          className="mt-6 flex items-end justify-between gap-x-2 px-3 py-2 border-y border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <Linkedin
            className="h-6 w-6 text-blue-600 fill-blue-600"
            aria-hidden="true"
          />
          <div className="h-6 w-6 rounded-full border border-zinc-600 flex items-center justify-center bg-white dark:bg-black">
            <User className="h-4 w-4 fill-zinc-300" />
          </div>
        </motion.div>

        <motion.div
          className="h-full overflow-y-auto px-2 pb-16 pt-2"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <LinkedInPost />
        </motion.div>

        {/* Enhanced glass reflection */}
        <motion.div
          className="pointer-events-none hidden dark:block absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover/phone:opacity-100 group-focus-within/phone:opacity-100"
          initial={false} 
          whileHover={{
            background: [
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
            ],
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            },
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default LinkedInPhoneComponent;