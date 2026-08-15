import { Copy } from "lucide-react";
import Image from "next/image";

export function LandingFeatureGrid(): React.ReactElement {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60">
      <ul className="relative mx-auto grid max-w-295 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <li className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center border-l">
          <div className="rounded-full p-2.5">
            <Image
              src="/assets/images/landing-page/star.svg"
              alt="fdf"
              height={100}
              width={100}
              className="w-4"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Open source and free to use
          </p>
        </li>

        <li className="relative isolate flex flex-col items-center justify-center gap-3 overflow-hidden px-6 py-10 text-center">
          <span
            aria-hidden="true"
            className="absolute -bottom-44 left-1/2 h-25 w-72 -translate-x-1/2 bg-brand/70 clip-path: ellipse(48% 29% at 52% 50%); blur-3xl hidden dark:block"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-4 left-1/2 h-6 w-36 -translate-x-1/2 rounded-full bg-brand/35 blur-xl hidden dark:block"
          />
          <span className="relative z-10 font-caveat text-xl text-foreground/85">
            Give it a try
          </span>
          <code className="relative z-10 mt-2 text-xs text-muted-foreground">
            <span className="text-brand">npx</span> shadcn add
            @nyxui/interactive-terminal <Copy className="ml-1 inline size-3" />
          </code>
        </li>

        <li className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center border-r border-border/60">
          <div className="rounded-full p-2.5">
            <Image
              src="/assets/images/landing-page/grid.svg"
              alt="fdf"
              height={100}
              width={100}
              className="w-4"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Type-safe, customizable and easy to use
          </p>
        </li>
      </ul>
    </div>
  );
}
