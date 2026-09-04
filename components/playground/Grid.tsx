"use client";
import { Code2 } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { motion } from "framer-motion";
import { AnimateText } from "@/registry/ui/animated-text";

export function Grid() {
  return (
    <div className="relative flex h-[35vh] lg:h-[85vh] w-full flex-col items-center justify-center overflow-hidden rounded-xl rounded-b-none border-0 border-b border-border bg-muted mb-2 lg:rounded-xl lg:border lg:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        {/* Interactive Logo */}
        <motion.div
          className="relative mb-6 lg:mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-14 h-14 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent"
              animate={{ y: [-100, 100] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="relative z-10 flex items-center gap-2">
              <Code2 className="w-5 h-5 md:h-9 md:w-9 lg:w-12 lg:h-12 text-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="text-2xl md:text-4xl lg:text-5xl uppercase font-black mb-4 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimateText
            text="Playground"
            className="font-bold text-2xl lg:text-6xl"
          />
        </motion.div>
      </motion.div>
      <RetroGrid />
    </div>
  );
}
