import * as React from "react";
import { cn } from "@/lib/utils";
import { Event } from "@/lib/event";
import { CodeBlockCommand } from "@/components/components/code-block/code-block-command";
import { CopyButton } from "@/components/components/code-block/copy-button";

type CodeElementProps = React.HTMLAttributes<HTMLElement> & {
  "data-slot"?: string;
};

export const Pre = ({
  className,
  children,
  style,
  __rawString__,
  __npmCommand__,
  __pnpmCommand__,
  __yarnCommand__,
  __bunCommand__,
  __withMeta__,
  __src__,
  __event__,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & {
  __rawString__?: string;
  __npmCommand__?: string;
  __pnpmCommand__?: string;
  __yarnCommand__?: string;
  __bunCommand__?: string;
  __withMeta__?: boolean;
  __src__?: string;
  __event__?: Event["name"];
  __name__?: string;
}) => {
  const isNpmCommand =
    __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__;
  const codeBlockChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<CodeElementProps>(child)) {
      return child;
    }

    return React.cloneElement(child, {
      "data-slot": "code-block",
      style: {
        ...child.props.style,
        display: "grid",
      },
    });
  });

  if (isNpmCommand) {
    return (
      <div className="relative w-full max-w-full overflow-hidden block">
        <CodeBlockCommand
          __npmCommand__={__npmCommand__}
          __yarnCommand__={__yarnCommand__}
          __pnpmCommand__={__pnpmCommand__}
          __bunCommand__={__bunCommand__}
        />
      </div>
    );
  }

  return (
    <div className="group/pre relative overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      <pre
        className={cn(
          "m-0 max-h-[650px] w-full max-w-full overflow-x-auto bg-transparent p-4 pr-24 text-[13px] leading-6 [--code-padding-right:6rem] [&_code]:min-w-full [&_code]:bg-transparent [&_code]:p-0 [&_code]:leading-6 [&_code]:whitespace-pre [&_[data-line]]:min-h-6 [&_[data-line]]:pr-[var(--code-padding-right)] [&_[data-line]]:leading-6 scrollbar-no",
          className,
        )}
        style={{
          ...style,
          backgroundColor: "transparent",
        }}
        tabIndex={0}
        {...props}
      >
        {codeBlockChildren}
      </pre>
      {__rawString__ && (
        <>
          <CopyButton
            value={__rawString__}
            src={__src__ ?? "code-block"}
            event={__event__}
            aria-label="Copy"
            data-slot="copy-button"
            data-variant="ghost"
            data-size="icon-xs"
            className={cn(
              "group/button absolute right-3 top-3 z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-accent text-sm font-medium whitespace-nowrap text-muted-foreground opacity-0 outline-none transition-all select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:pointer-events-none disabled:opacity-50 group-hover/pre:opacity-100 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
              __withMeta__ && "top-12",
            )}
          />
          <div
            aria-hidden="true"
            data-fade-overlay="true"
            className={cn(
              "pointer-events-none absolute right-1.5 top-1.5 h-12 w-24 bg-gradient-to-l from-card to-transparent opacity-0 transition-opacity group-hover/pre:opacity-100",
              __withMeta__ && "top-11",
            )}
          />
        </>
      )}
    </div>
  );
};

export const Code = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      "relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] font-medium leading-snug text-foreground",
      className,
    )}
    {...props}
  />
);
