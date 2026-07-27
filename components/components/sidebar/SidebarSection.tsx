"use client";

import React from "react";
import { motion } from "motion/react";
import { CategoryHeading } from "@/components/global/CategoryHeading";

const SECTION_VARIANTS = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const SECTION_TRANSITION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => (
  <motion.div variants={SECTION_VARIANTS} transition={SECTION_TRANSITION}>
    <CategoryHeading title={title} />
    <div className="grid grid-flow-row auto-rows-max text-sm">{children}</div>
  </motion.div>
);
