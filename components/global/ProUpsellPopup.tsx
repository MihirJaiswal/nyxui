"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";

const SESSION_KEY = "nyxui-pro-popup-dismissed";

export function ProUpsellPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    setOpen(true);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && !pathname.startsWith("/preview") && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 start-6 z-50 w-[240px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl smooth-shadow-ring-lg bg-white text-neutral-900 dark:bg-neutral-900/60 dark:text-white"
        >
          {/* Banner image backdrop */}
          <div className="relative h-36 overflow-hidden">
            <Image
              src="/banner.avif"
              alt=""
              aria-hidden
              fill
              sizes="240px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute end-2 top-2 z-10 inline-flex size-6 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-semibold text-base">
                Build faster with Nyx UI Pro
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Premium blocks, templates, and patterns. Copy, paste, ship.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={dismiss}>
                Close
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href="/pro" onClick={dismiss}>
                  Explore Pro
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
