"use client";

import { useMemo, useState } from "react";
import { Check, Code2, Copy, Eye, RotateCcw, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const RADIUS_OPTIONS = ["sm", "md", "lg"] as const;

type RadiusOption = (typeof RADIUS_OPTIONS)[number];
type ViewMode = "preview" | "code";

const RADIUS_CLASSES: Record<RadiusOption, string> = {
  sm: "rounded-lg",
  md: "rounded-2xl",
  lg: "rounded-3xl",
};

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="text-xs text-foreground/70">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full border transition-colors",
          checked ? "border-brand/70 bg-brand/25" : "border-border bg-muted",
        )}
      >
        <motion.span
          className="absolute top-0.5 size-3.5 rounded-full bg-foreground"
          animate={{ left: checked ? 17 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
  );
}

function ControlPanel({
  animated,
  glow,
  radius,
  onAnimatedChange,
  onGlowChange,
  onRadiusChange,
  onReset,
}: {
  animated: boolean;
  glow: number;
  radius: RadiusOption;
  onAnimatedChange: (checked: boolean) => void;
  onGlowChange: (value: number) => void;
  onRadiusChange: (radius: RadiusOption) => void;
  onReset: () => void;
}): React.ReactElement {
  return (
    <aside className="border-b border-border/60 bg-card/40 lg:border-r lg:border-b-0">
      <div className="flex h-12 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="text-xs font-medium">Glow Card</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset playground controls"
          className="text-muted-foreground transition-colors hover:text-brand"
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>

      <div className="grid gap-5 p-4 sm:grid-cols-3 lg:grid-cols-1 lg:p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="landing-glow"
              className="text-xs text-foreground/70"
            >
              Glow intensity
            </label>
            <output className="font-mono text-[10px] text-brand">
              {glow}%
            </output>
          </div>
          <input
            id="landing-glow"
            type="range"
            min="10"
            max="100"
            value={glow}
            onChange={(event) => onGlowChange(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted"
            style={{ accentColor: "var(--brand)" }}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-xs text-foreground/70">Corner radius</legend>
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-border/60 bg-background/70 p-1">
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onRadiusChange(option)}
                className={cn(
                  "rounded-md py-1.5 font-mono text-[10px] uppercase transition-colors",
                  radius === option
                    ? "bg-brand text-brand-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center">
          <Toggle
            checked={animated}
            label="Motion enabled"
            onChange={onAnimatedChange}
          />
        </div>
      </div>
    </aside>
  );
}

function PlaygroundPreview({
  animated,
  glow,
  radius,
}: {
  animated: boolean;
  glow: number;
  radius: RadiusOption;
}): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const canAnimate = animated && !shouldReduceMotion;

  return (
    <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-background px-8 py-14">
      <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-border/50" />
      <span className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-border/50" />
      <span className="pointer-events-none absolute left-4 top-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
        Live canvas · 100%
      </span>

      <div className="relative w-full max-w-sm">
        <motion.div
          aria-hidden="true"
          className={cn(
            "absolute inset-4 bg-brand blur-3xl",
            RADIUS_CLASSES[radius],
          )}
          animate={{
            opacity: glow / 180,
            scale: canAnimate ? [0.92, 1.08, 0.92] : 1,
          }}
          transition={
            canAnimate
              ? { duration: 3.2, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.2 }
          }
        />

        <motion.article
          className={cn(
            "relative overflow-hidden border border-brand/45 bg-card/95 p-6 shadow-2xl backdrop-blur",
            RADIUS_CLASSES[radius],
          )}
          animate={{ y: canAnimate ? [0, -6, 0] : 0 }}
          transition={
            canAnimate
              ? { duration: 3.2, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.2 }
          }
        >
          <div className="mb-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand">
              <Sparkles className="size-3" /> Live signal
            </span>
            <span className="size-2 rounded-full bg-brand shadow-lg" />
          </div>
          <p className="max-w-xs text-2xl font-medium tracking-tight text-foreground">
            Shape the component until it feels like yours.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="h-1 flex-1 rounded-full bg-brand" />
            <span className="h-1 w-12 rounded-full bg-foreground/15" />
            <span className="h-1 w-6 rounded-full bg-foreground/10" />
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export function PlaygroundDemo(): React.ReactElement {
  const [animated, setAnimated] = useState(true);
  const [copied, setCopied] = useState(false);
  const [glow, setGlow] = useState(62);
  const [radius, setRadius] = useState<RadiusOption>("lg");
  const [view, setView] = useState<ViewMode>("preview");

  const code = useMemo(
    () =>
      `<GlowCard\n  glowIntensity={${glow}}\n  radius="${radius}"\n  animated={${animated}}\n/>`,
    [animated, glow, radius],
  );

  const reset = (): void => {
    setAnimated(true);
    setGlow(62);
    setRadius("lg");
  };

  const copyCode = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl">
      <div className="flex h-13 items-center justify-between border-b border-border/60 px-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="size-2 rounded-full bg-brand/70" />
          </div>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
            nyx / playground
          </span>
        </div>

        <div className="flex rounded-lg border border-border/60 bg-background/60 p-1">
          {(["preview", "code"] as const).map((mode) => {
            const Icon = mode === "preview" ? Eye : Code2;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] capitalize transition-colors",
                  view === mode
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3" />
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[16rem_1fr]">
        <ControlPanel
          animated={animated}
          glow={glow}
          radius={radius}
          onAnimatedChange={setAnimated}
          onGlowChange={setGlow}
          onRadiusChange={setRadius}
          onReset={reset}
        />

        <div className="min-w-0">
          {view === "preview" ? (
            <PlaygroundPreview
              animated={animated}
              glow={glow}
              radius={radius}
            />
          ) : (
            <div className="relative flex min-h-80 items-center bg-background p-6 sm:p-10">
              <pre className="w-full overflow-x-auto font-mono text-sm leading-7 text-foreground/75">
                <code>
                  <span className="text-brand">{code.split("\n")[0]}</span>
                  {`\n${code.split("\n").slice(1).join("\n")}`}
                </code>
              </pre>
              <button
                type="button"
                onClick={copyCode}
                className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-brand"
                aria-label="Copy generated component code"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border/60 bg-background/45 px-4 py-3">
        <code className="min-w-0 truncate font-mono text-[10px] text-muted-foreground">
          <span className="text-brand">props</span> · intensity={glow} · radius=
          {radius} · motion={animated ? "on" : "off"}
        </code>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-brand">
          Synced live
        </span>
      </div>
    </div>
  );
}
