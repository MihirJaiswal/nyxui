"use client";

import dynamic from "next/dynamic";

export type BentoComponentName =
  | "Custom Pointer"
  | "Glitch Button"
  | "Image Ripple"
  | "Keyboard"
  | "Terminal";

const CustomPointerPreview = dynamic(
  () =>
    import("@/components/home/feature/CustomPointer").then(
      (module) => module.CustomPointer,
    ),
  { ssr: false },
);

const ImageRipplePreview = dynamic(
  () => import("@/components/home/bento/ImageRipple"),
  { ssr: false },
);

const InteractiveKeyboard = dynamic(() => import("@/registry/ui/keyboard"), {
  ssr: false,
});

const InteractiveTerminal = dynamic(() => import("@/registry/ui/terminal"), {
  ssr: false,
});

const GlitchButton = dynamic(
  () =>
    import("@/registry/ui/glitch-button").then((module) => module.GlitchButton),
  { ssr: false },
);

interface BentoComponentPreviewProps {
  name: BentoComponentName;
}

export function BentoComponentPreview({
  name,
}: BentoComponentPreviewProps): React.ReactElement {
  if (name === "Image Ripple") {
    return (
      <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded-2xl">
        <div className="origin-center">
          <ImageRipplePreview />
        </div>
      </div>
    );
  }

  if (name === "Custom Pointer") {
    return (
      <div className="absolute inset-4 overflow-hidden rounded-2xl">
        <CustomPointerPreview />
      </div>
    );
  }

  if (name === "Keyboard") {
    return (
      <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded-2xl">
        <div className="w-max origin-center scale-50">
          <InteractiveKeyboard
            layout="standard"
            showFunctionKeys
            showNavigationCluster
            allowPhysicalKeyboard
            rotateX={0}
            className="p-0"
          />
        </div>
      </div>
    );
  }

  if (name === "Terminal") {
    return (
      <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded-2xl p-4">
        <div className="w-full origin-center scale-x-90 scale-y-80">
          <InteractiveTerminal
            command="npx shadcn add @nyxui/keyboard"
            steps={[
              "Connecting to the Nyx registry…",
              "Resolving keyboard component…",
              "Installing dependencies…",
              "Writing component files…",
              "Updating imports…",
            ]}
            finalMessage="Keyboard added. Ready to customize."
            autoExecute
            repeat
            repeatDelay={4200}
            stepDelay={650}
            typingDelay={28}
            title="nyx install"
            variant="retro"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded-2xl p-6">
      <GlitchButton
        glitchAlways
        className="rounded-xl bg-zinc-900 px-6 py-4 text-lg sm:text-2xl border"
      >
        Ship it
      </GlitchButton>
    </div>
  );
}
