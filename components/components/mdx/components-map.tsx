import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TechStack from "./tech-stack";
import RepoDownload from "./repo-download";
import TemplateActions from "../template/template-actions";
import TemplateFeatures from "../template/template-features";
import TemplateShowcase from "../template/template-showcase";
import TemplateSteps from "../template/template-steps";
import { ComponentSource } from "../code-block/component-source";
import { headings, text, table } from "./typography";
import { Code, Pre } from "./CodeBlock";
import { stepOverrides, tabsOverrides, LinkedCard } from "./tabs-overrides";
import TemplatePreview from "../template/template-preview";

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
