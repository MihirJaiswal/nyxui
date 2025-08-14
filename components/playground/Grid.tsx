"use client";
import { Code2 } from "lucide-react";
import { RetroGrid } from "../ui/retro-grid";
import { motion } from "framer-motion"
import { AnimateText } from "@/registry/ui/animated-text";

export function Grid() {
  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-sm border bg-white dark:bg-black">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto relative z-10"
          >
            {/* Interactive Logo */}
            <motion.div
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="relative z-10 flex items-center gap-2">
                  <Code2 className="w-12 h-12 text-primary" />
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="text-4xl lg:text-5xl uppercase font-black mb-4 text-black dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimateText text="Playground" className="font-bold text-6xl" />
            </motion.div>
          </motion.div>
      <RetroGrid />
    </div>
  );
}
