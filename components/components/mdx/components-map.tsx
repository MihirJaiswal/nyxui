import type React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TechStack from "./tech-stack";
import RepoDownload from "./repo-download";
import TemplateActions from "@/components/components/template/template-actions";
import TemplateFeatures from "@/components/components/template/template-features";
import TemplateShowcase from "@/components/components/template/template-showcase";
import TemplateSteps from "@/components/components/template/template-steps";
import { ComponentSource } from "@/components/components/code-block/component-source";
import { headings, text, table } from "./typography";
import { Code, Pre } from "./CodeBlock";
import { stepOverrides, tabsOverrides, LinkedCard } from "./tabs-overrides";
import TemplatePreview from "@/components/components/template/template-preview";

export const mdxComponents = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  TechStack,
  RepoDownload,
  TemplateActions,
  TemplateFeatures,
  TemplatePreview,
  TemplateShowcase,
  TemplateSteps,
  Image,

  ComponentSource: (props: React.ComponentProps<typeof ComponentSource>) => (
    <div className="w-full max-w-full overflow-hidden">
      <ComponentSource {...props} />
    </div>
  ),

  ...headings,
  ...text,
  ...table,

  ...stepOverrides,
  ...tabsOverrides,

  pre: Pre,
  code: Code,
  LinkedCard,
} as const;
