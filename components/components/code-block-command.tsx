"use client";

import { copyToClipboardWithMeta } from "./copy-button";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useConfig } from "../../hooks/use-config";
import { useMounted } from "../../hooks/use-mounted";
import { NpmCommands } from "../../types/unist";
import { CheckIcon, ClipboardIcon, Terminal } from "lucide-react";
import * as React from "react";

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);
  const mounted = useMounted();

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

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

    copyToClipboardWithMeta(command, {
      name: "copy_npm_command",
      properties: {
        command,
        pm: packageManager,
      },
    });
    setHasCopied(true);
  }, [packageManager, tabs]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full max-w-full mt-6 rounded-md overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg transition-all duration-200 hover:shadow-xl">
      <Tabs
        className="w-full max-w-full"
        defaultValue={packageManager}
        onValueChange={(value) => {
          console.log("value", value, packageManager);
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="flex items-center justify-between bg-black px-4 py-2 w-full sticky top-0 z-10">
          <TabsList className="flex h-8 gap-3 bg-zinc-950 p-1 rounded-md">
            {Object.entries(tabs).map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="relative font-mono text-xs text-zinc-400 bg-transparent border-0 rounded-md px-3 py-1 transition-all duration-150 hover:text-zinc-200 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center">
            <Terminal className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent
              key={key}
              value={key}
              className="mt-0 group bg-zinc-950"
            >
              <pre className="px-5 overflow-x-auto max-w-full">
                <code
                  className="relative font-mono text-sm leading-relaxed text-zinc-200 break-words whitespace-pre-wrap"
                  data-language="bash"
                >
                  {value?.split(" ").map((part, index) =>
                    index === 0 ? (
                      <span
                        key={index}
                        className="text-[#69C3FF] font-semibold tracking-wide"
                      >
                        {part}{" "}
                      </span>
                    ) : (
                      <span
                        key={index}
                        className="text-[#3CEC85] font-semibold tracking-wide"
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
        className="absolute right-3 top-3 z-10 h-7 w-7 rounded-md bg-zinc-800/70 text-zinc-400 backdrop-blur-sm transition-all duration-150 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3.5 [&_svg]:w-3.5"
        onClick={copyCommand}
      >
        <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
        {hasCopied ? (
          <CheckIcon className="text-emerald-400" />
        ) : (
          <ClipboardIcon />
        )}
      </Button>
    </div>
  );
}
