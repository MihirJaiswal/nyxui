import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { cn } from "../../../lib/utils";
import { JSX } from "react";
import { NextjsIcon } from "../../global/icons/NextjsIcon";
import { ReactIcon } from "../../global/icons/ReactIcon";
import { TypescriptIcon } from "../../global/icons/TypescriptIcon";
import { TailwindcssIcon } from "../../global/icons/TailwindcssIcon";
import { MotionIcon } from "../../global/icons/MotionIcon";
import { ShadcnIcon } from "../../global/icons/ShadcnIcon";

type TechComponentType = {
  name: string;
  icon: JSX.Element;
};

type TechComponents = Record<string, TechComponentType>;

const techComponents: TechComponents = {
  nextjs: {
    name: "Next.js 14",
    icon: <NextjsIcon className="size-8 bg-white rounded p-1" />,
  },
  react: {
    name: "React",
    icon: <ReactIcon className="size-8" />,
  },
  typescript: {
    name: "Typescript ",
    icon: <TypescriptIcon className="size-8" />,
  },
  tailwindcss: {
    name: "Tailwind CSS",
    icon: <TailwindcssIcon className="size-8" />,
  },
  motion: {
    name: "Motion",
    icon: <MotionIcon className="size-8" />,
  },
  shadcn: {
    name: "shadcn",
    icon: <ShadcnIcon className="size-8 bg-white rounded p-1" />,
  },
};

export default function TechStack({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row gap-6 mt-8 pb-10", className)}>
      {technologies.map((tech) => (
        <Tooltip key={tech}>
          <TooltipTrigger>{techComponents[tech].icon}</TooltipTrigger>
          <TooltipContent>
            <p>{techComponents[tech].name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
