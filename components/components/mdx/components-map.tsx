import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Callout } from "../callout";
import TechStack from "../tech-stack";
import RepoDownload from "../repo-download";
import TemplateActions from "../template-actions";
import TemplateFeatures from "../template-features";
import TemplateIntro from "../template-intro";
import TemplatePreview from "../template-preview";
import TemplateShowcase from "../template-showcase";
import TemplateSteps from "../template-steps";
import { ComponentSource } from "../component-source";
import { headings, text, table } from "./typography";
import { Code, Pre } from "./CodeBlock";
import { stepOverrides, tabsOverrides, LinkedCard } from "./tabs-overrides";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Callout,
  TechStack,
  RepoDownload,
  TemplateActions,
  TemplateFeatures,
  TemplateIntro,
  TemplatePreview,
  TemplateShowcase,
  TemplateSteps,
  Image,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentSource: (props: any) => (
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
