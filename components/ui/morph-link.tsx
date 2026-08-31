"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface MorphLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export function MorphLink({
  children,
  className,
  ...props
}: MorphLinkProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center gap-2 rounded-md pr-5 pl-2 py-1.5 text-sm text-foreground/75 transition-colors duration-300 hover:text-background ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <motion.span
          layout
          className="bg-brand"
          style={
            isHovered
              ? { width: "100%", height: "100%", borderRadius: 6 }
              : { marginLeft: 8, width: 12, height: 12, borderRadius: 2 }
          }
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <span className="relative z-10 size-3 shrink-0" aria-hidden />
      <span className="relative z-10 text-shadow-2xs dark:text-shadow-none">
        {children}
      </span>
    </Link>
  );
}
