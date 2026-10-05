"use client";

import {
  SiAnthropic,
  SiCss3,
  SiFigma,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinear,
  SiNextdotjs,
  SiNotion,
  SiOpenai,
  SiReact,
  SiSlack,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { LogoCycle } from "@/registry/ui/logo-cycle";

export const LogoCycleDemo = () => {
  return (
    <div className="w-120 py-10">
      <LogoCycle
        columns={2}
        duration={8}
        pairs={[
          {
            top: (
              <SiNextdotjs className="text-neutral-900 dark:text-neutral-100" />
            ),
            bottom: (
              <SiVercel className="text-neutral-900 dark:text-neutral-100" />
            ),
          },
          {
            top: <SiReact className="text-[#58C4DC]" />,
            bottom: <SiTypescript className="text-[#3178C6]" />,
          },
          {
            top: <SiTailwindcss className="text-[#0DA5E9]" />,
            bottom: <SiCss3 className="text-[#1572B6]" />,
          },
          {
            top: <SiJavascript className="text-[#F7DF1E]" />,
            bottom: <SiHtml5 className="text-[#E34F26]" />,
          },
          {
            top: <SiFramer className="text-[#0055FF]" />,
            bottom: <SiFigma className="text-[#F24E1E]" />,
          },
          {
            top: (
              <SiOpenai className="text-neutral-900 dark:text-neutral-100" />
            ),
            bottom: <SiAnthropic className="text-[#D97706]" />,
          },
          {
            top: (
              <SiGithub className="text-neutral-900 dark:text-neutral-100" />
            ),
            bottom: <SiLinear className="text-[#5E6AD2]" />,
          },
          {
            top: <SiStripe className="text-[#635BFF]" />,
            bottom: <SiSupabase className="text-[#3ECF8E]" />,
          },
        ]}
      />
    </div>
  );
};
