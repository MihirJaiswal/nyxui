"use client";

import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useConfig } from "../../hooks/use-config";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { useMounted } from "../../hooks/use-mounted";
import { trackEvent } from "../../lib/event";
import { NpmCommands } from "../../types/unist";
import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const { copy, hasCopied } = useCopyToClipboard();
  const mounted = useMounted();

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copy(command).then(() => {
      trackEvent({
        name: "copy_npm_command",
        properties: {
          command,
          pm: packageManager,
        },
      });
    });
  }, [copy, packageManager, tabs]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <Tabs
        className="w-full max-w-full gap-0"
        defaultValue={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <TabsList className="mb-4 flex h-auto w-fit items-center gap-1 rounded-xl border border-border/70 bg-zinc-50 p-1 dark:border-white/5 dark:bg-[#111111]">
          {packageManagers.map((manager) => (
            <TabsTrigger
              key={manager}
              value={manager}
              className="relative h-auto rounded-lg border-0 bg-transparent px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-none transition-colors duration-200 hover:text-foreground data-[state=active]:bg-[#FF4F11] data-[state=active]:text-white data-[state=active]:shadow-none dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              <span className="relative z-10">{manager}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {packageManagers.map((manager) => {
          const value = tabs[manager];

          return (
            <TabsContent
              key={manager}
              value={manager}
              className="relative mt-0 group"
            >
              <pre className="overflow-x-auto whitespace-nowrap rounded-xl border border-border/70 bg-white p-4 pr-14 font-mono text-[13px] text-muted-foreground dark:border-white/5 dark:bg-[#0F0F0F] dark:text-neutral-400">
                <code
                  className="relative font-mono text-[13px] leading-relaxed text-muted-foreground dark:text-neutral-400"
                  data-language="bash"
                >
                  {value?.split(" ").map((part, index) =>
                    index === 0 ? (
                      <span
                        key={index}
                        className="font-semibold tracking-wide text-[#FF4F11]"
                      >
                        {part}{" "}
                      </span>
                    ) : (
                      <span
                        key={index}
                        className="text-muted-foreground dark:text-neutral-400"
                      >
                        {part}{" "}
                      </span>
                    ),
                  )}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-3 bottom-3 z-10 h-8 w-8 rounded-md border border-border/70 bg-white text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95 dark:border-white/5 dark:bg-[#1A1A1A] dark:text-neutral-400 dark:hover:bg-[#252525] dark:hover:text-neutral-200 [&_svg]:h-4 [&_svg]:w-4"
        onClick={copyCommand}
      >
        <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
        {hasCopied ? <CheckIcon className="text-emerald-400" /> : <CopyIcon />}
      </Button>
    </div>
  );
}
