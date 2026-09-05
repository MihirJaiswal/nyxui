"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";

export function PlaygroundShowcase(): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      video.src = "/assets/videos/playground-demo-dark.mp4";
      video.load();
      video.play().catch(() => {
        // autoplay may be blocked until user interacts;
      });
    };

    if (document.readyState === "complete") {
      loadVideo();
    } else {
      window.addEventListener("load", loadVideo);
      return () => window.removeEventListener("load", loadVideo);
    }
  }, []);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60">
      <div className="relative mx-auto max-w-295 border-x border-border/60">
        <div className="grid gap-10 border-b border-border/60 px-6 py-10 sm:py-16 md:grid-cols-[1fr_0.8fr] md:px-12 md:py-20">
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand">
              The Nyx playground
            </p>
            <h2 className="max-w-xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              A playground,
              <br />
              not a{" "}
              <span className="font-caveat text-brand text-6xl">showroom.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Choose any component, tune its props, test every state, and copy
              production-ready code without leaving the canvas.
            </p>
            <MorphLink href={siteLinks.playground} className="mt-7 w-fit">
              <div className="flex items-center gap-1">
                <span>Open the playground</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
          </div>
        </div>

        <div>
          <div className="w-[91.5%] mx-auto">
            <video
              ref={videoRef}
              poster="/assets/videos/playground-demo-dark-poster.jpg"
              className="w-full"
              muted
              loop
              playsInline
              controls
              preload="none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
