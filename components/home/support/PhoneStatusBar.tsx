import { motion } from "framer-motion";
import { BatteryFull, Signal, Wifi } from "lucide-react";

export const PhoneStatusBar = () => {
    return (
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-6 flex items-center justify-between px-3 text-[10px] text-foreground/80"
        aria-hidden="true"
      >
        <span className="font-medium">9:41</span>
  
        {/* Dynamic island */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center gap-2">
          <motion.div
            className="h-3.5 w-24 rounded-full bg-zinc-900/90 dark:bg-zinc-100/15 border border-zinc-700/60 dark:border-white/15 shadow-inner"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-zinc-800/95 dark:bg-zinc-200/70 ring-2 ring-black/15 dark:ring-white/15 shadow-sm"
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
  