import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  MoreHorizontal, 
  Repeat2, 
  Share2 
} from "lucide-react";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { FaXTwitter } from "react-icons/fa6";
import { Ripple } from "@/components/ui/ripple";
import Image from "next/image";
import Logo from "@/components/global/Logo";

// X Post Component
const XPost = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      className="group/post border border-zinc-800/70 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm p-4 mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-zinc-700/90 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/5 motion-safe:transition-transform rounded-lg"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start gap-2 relative">
        <Image
          src="/assets/images/avtars/5.jpeg"
          alt="User avatar"
          width={32}
          height={32}
          loading="lazy"
          className="h-8 w-8 rounded-full border border-zinc-800/60 shadow-sm object-cover"
        />
        <div className="w-full">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">@novas_ux</span>
            <span className="text-zinc-400 text-[11px] font-medium">
              • 1 hr
            </span>
          </div>
          <p className="mt-3 text-sm text-pretty leading-relaxed text-white/90">🚀 Say hello to Nyx UI - A sleek collection of modern components!! <br /> The components are clean, responsive, and easy to customize. 🔥 <br /> <span className="text-blue-500">#frontend #UI #webdev</span></p>
          
            <motion.div
              className="mt-3 overflow-hidden rounded-lg border border-zinc-800/70 shadow-sm flex items-center justify-center p-3"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Logo height={80} width={80} />
            </motion.div>
          <div className="mt-4 flex items-center justify-between text-[12px] text-zinc-400">
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-gray-50/10 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <MessageCircle className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-gray-50/10 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Repeat2 className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-red-50/10 hover:text-red-500 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Heart className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-gray-50/10 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        <motion.button
          className="absolute top-0 right-0 rounded-lg p-2 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
const XPhoneComponent = ({ shouldReduceMotion = false }) => {
  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? { y: -4 }
          : {
              y: -15,
              rotateX: -10,
              rotateY: -8,
              rotateZ: -2,
              scale: 1.03,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      }}
      className="group/phone bg-black h-120 w-72 border-4 border-zinc-800/80 rounded-3xl relative bg-gradient-to-bl from-zinc-900/20 via-zinc-900/10 to-zinc-900/5 backdrop-blur-md overflow-hidden shadow-2xl"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        transformStyle: "preserve-3d",
      }}
      tabIndex={0}
      aria-label="Reveal X post"
    >
      <PhoneStatusBar />

      {/* Overlay with X logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300 opacity-100 scale-100 group-hover/phone:opacity-0 group-hover/phone:scale-95 group-focus-within/phone:opacity-0 group-focus-within/phone:scale-95"
      >
        <div className="relative flex h-[500px] w-72 flex-col items-center justify-center overflow-hidden rounded-lg border bg-black">
          <div className="h-24 w-24 rounded-full p-2 grid place-items-center ring-1 ring-zinc-500/10 bg-zinc-500/5">
            <FaXTwitter className="h-14 w-14 text-white fill-white" />
          </div>
          <Ripple color="#71717b" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 opacity-0 translate-y-1 transition-all duration-300 group-hover/phone:opacity-100 group-hover/phone:translate-y-0 group-focus-within/phone:opacity-100 group-focus-within/phone:translate-y-0">
        {/* Enhanced header */}
        <motion.div
          className="mt-6 flex items-center gap-2 px-3 py-2 border-y border-zinc-800/60 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <FaXTwitter
            className="h-6 w-6 text-white"
            aria-hidden="true"
          />
          <span className="text-lg font-medium text-white">Posts</span>
        </motion.div>

        <motion.div
          className="h-full overflow-y-auto px-2 pb-16 pt-2"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <XPost/>
        </motion.div>

        {/* Enhanced glass reflection with animated shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.08] opacity-0 group-hover/phone:opacity-100 group-focus-within/phone:opacity-100"
          initial={false}
          whileHover={{
            background: [
              "linear-gradient(45deg, transparent 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0.08) 0%, transparent 50%, transparent 100%)",
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

export default XPhoneComponent;