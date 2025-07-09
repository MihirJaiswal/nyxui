import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "animated-code-block",
    type: "registry:ui",
    title: "Animated Code Block",
    description:
      "A code display component with real-time typing effects. Supports syntax highlighting and customizable themes.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/ui/animated-code-block.tsx",
        type: "registry:ui",
        target: "components/ui/animated-code-block.tsx",
      },
    ],
  },
  {
    name: "animated-gradient-bg",
    type: "registry:ui",
    title: "Animated Gradient Background",
    description:
      "A dynamic animated gradient background component that supports various gradient patterns and animations.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/animated-gradient-bg.tsx",
        type: "registry:ui",
        target: "components/ui/animated-gradient-bg.tsx",
      },
    ],
  },
  {
    name: "animated-text",
    type: "registry:ui",
    title: "Animated Text",
    description:
      "A versatile text animation component that offers multiple animation types. Perfect for adding dynamic text effects to your UI.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/animated-text.tsx",
        type: "registry:ui",
        target: "components/ui/animated-text.tsx",
      },
    ],
  },
  {
    name: "bubble-background",
    type: "registry:ui",
    title: "Bubble Background",
    description:
      "An interactive fluid bubble background component with animated colorful blobs that respond to user interaction.",
    files: [
      {
        path: "registry/ui/bubble-background.tsx",
        type: "registry:ui",
        target: "components/ui/bubble-background.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-bounce-vertical": "bounceV 20s infinite ease-in-out",
        "animate-bounce-horizontal": "bounceH 30s infinite ease-in-out",
        "animate-move-in-circle": "moveInCircle 30s linear infinite",
      },
    },
    css: {
      "@keyframes bounceV": {
        "0%, 100%": {
          transform: "translateY(-50%)",
        },
        "50%": {
          transform: "translateY(50%)",
        },
      },
      "@keyframes bounceH": {
        "0%, 100%": {
          transform: "translateX(-50%) translateY(-10%)",
        },
        "50%": {
          transform: "translateX(50%) translateY(10%)",
        },
      },
      "@keyframes moveInCircle": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  {
    name: "cyberpunk-card",
    type: "registry:ui",
    title: "Cyberpunk Card",
    description:
      "A card component with a cyberpunk aesthetic. Features neon colors and a futuristic design.",
    files: [
      {
        path: "registry/ui/cyberpunk-card.tsx",
        type: "registry:ui",
        target: "components/ui/cyberpunk-card.tsx",
      },
    ],
  },
  {
    name: "dynamic-ripple",
    type: "registry:ui",
    title: "Dynamic Ripple",
    description:
      "A ripple effect component that follows the cursor and can be customized with various options.",
    files: [
      {
        path: "registry/ui/dynamic-ripple.tsx",
        type: "registry:ui",
        target: "components/ui/dynamic-ripple.tsx",
      },
    ],
  },
  {
    name: "github-profile-card",
    type: "registry:ui",
    title: "Github Profile Card",
    description:
      "A card component that displays a GitHub user's profile information. It includes their avatar, name, bio, and links to their GitHub profile.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/github-profile-card.tsx",
        type: "registry:ui",
        target: "components/ui/github-profile-card.tsx",
      },
    ],
  },
  {
    name: "github-repo-card",
    type: "registry:ui",
    title: "Github Repo Card",
    description:
      "A card component that displays information about a GitHub repository. It includes the repository name, description, stars, forks, and a link to the repository.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/github-repo-card.tsx",
        type: "registry:ui",
        target: "components/ui/github-repo-card.tsx",
      },
    ],
  },
  {
    name: "glitch-button",
    type: "registry:ui",
    title: "Glitch Button",
    description:
      "Cyberpunk-inspired button with dynamic glitch effects that can be triggered on hover or click.",
    files: [
      {
        path: "registry/ui/glitch-button.tsx",
        type: "registry:ui",
        target: "components/ui/glitch-button.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-glitch-layer-1": "glitchFx1 800ms infinite step-end",
        "animate-glitch-layer-2": "glitchFx2 900ms infinite step-end",
        "animate-glitch-layer-3": "glitchFx3 1000ms infinite step-end",
        "animate-glitch-skew": "glitchSkew 1200ms infinite step-end",
        "animate-flicker": "flickerAnimation 2s infinite",
        "animate-click-glitch": "clickGlitch 500ms step-end forwards",
      },
    },
    css: {
      "@keyframes glitchFx1": {
        "0%, 100%": { transform: "translateX(0)" },
        "10%": { transform: "translateX(0)" },
        "20%": { transform: "translateX(-4px)" },
        "30%": { transform: "translateX(0)" },
        "40%": { transform: "translateX(12px)" },
        "50%": { transform: "translateX(8px)" },
        "60%": { transform: "translateX(24px)" },
        "70%": { transform: "translateX(2px)" },
        "80%": { transform: "translateX(-4px)" },
        "90%": { transform: "translateX(0)" },
      },
      "@keyframes glitchFx2": {
        "0%": { transform: "translateX(4px)" },
        "10%": { transform: "translateX(-12px)" },
        "20%": { transform: "translateX(-2px)" },
        "30%": { transform: "translateX(1px)" },
        "40%, 50%, 60%, 70%": { transform: "translateX(0)" },
        "80%": { transform: "translateX(4px)" },
        "90%": { transform: "translateX(-2px)" },
        "100%": { transform: "translateX(-15px)" },
      },
      "@keyframes glitchFx3": {
        "0%": { transform: "translateX(4px)" },
        "10%": { transform: "translateX(0)" },
        "20%": { transform: "translateX(4px)" },
        "30%": { transform: "translateX(0)" },
        "40%": { transform: "translateX(-4px)" },
        "50%": { transform: "translateX(0)" },
        "60%": { transform: "translateX(-4px)" },
        "70%": { transform: "translateX(0)" },
        "80%": { transform: "translateX(12px)" },
        "90%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-12px)" },
      },
      "@keyframes glitchSkew": {
        "0%": { transform: "skew(0deg)" },
        "10%": { transform: "skew(1deg)" },
        "20%": { transform: "skew(-2deg)" },
        "30%": { transform: "skew(1.5deg)" },
        "40%": { transform: "skew(-1deg)" },
        "50%": { transform: "skew(2deg)" },
        "60%": { transform: "skew(-1.5deg)" },
        "70%": { transform: "skew(1.5deg)" },
        "80%": { transform: "skew(-2deg)" },
        "90%": { transform: "skew(1deg)" },
        "100%": { transform: "skew(0deg)" },
      },
      "@keyframes flickerAnimation": {
        "0%": { opacity: "1" },
        "19%": { opacity: "1" },
        "20%": { opacity: "0" },
        "21%": { opacity: "1" },
        "49%": { opacity: "1" },
        "50%": { opacity: "0.7" },
        "51%": { opacity: "1" },
        "79%": { opacity: "1" },
        "80%": { opacity: "0.8" },
        "81%": { opacity: "1" },
        "100%": { opacity: "1" },
      },
      "@keyframes clickGlitch": {
        "0%, 100%": { clipPath: "inset(0 0 0 0)" },
        "20%": { clipPath: "inset(20% 0 40% 0)" },
        "40%": { clipPath: "inset(50% 0 20% 0)" },
        "60%": { clipPath: "inset(30% 0 60% 0)" },
        "80%": { clipPath: "inset(10% 0 70% 0)" },
      },
    },
  },
  {
    name: "keyboard",
    type: "registry:ui",
    title: "Keyboard",
    description: "A keyboard component that simulates a physical keyboard.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/keyboard.tsx",
        type: "registry:ui",
        target: "components/ui/keyboard.tsx",
      },
    ],
  },
  {
    name: "ms-paint",
    type: "registry:ui",
    title: "MS Paint",
    description:
      "A customizable drawing canvas component with paint-like interface.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/ms-paint.tsx",
        type: "registry:ui",
        target: "components/ui/ms-paint.tsx",
      },
    ],
  },
  {
    name: "lamp-heading",
    type: "registry:ui",
    title: "Lamp Heading",
    description: "A heading component with a lamp effect.",
    files: [
      {
        path: "registry/ui/lamp-heading.tsx",
        type: "registry:ui",
        target: "components/ui/lamp-heading.tsx",
      },
    ],
  },
  {
    name: "liquid-metal-button",
    type: "registry:ui",
    title: "Liquid Metal Button",
    description: "A button component with a liquid metal effect.",
    files: [
      {
        path: "registry/ui/liquid-metal-button.tsx",
        type: "registry:ui",
        target: "components/ui/liquid-metal-button.tsx",
      },
    ],
  },
  {
    name: "image-comparison",
    type: "registry:ui",
    title: "Image Comparison",
    description:
      "A image comparison component that allows users to compare images.",
    files: [
      {
        path: "registry/ui/image-comparison.tsx",
        type: "registry:ui",
        target: "components/ui/image-comparison.tsx",
      },
    ],
  },
  {
    name: "image-scanner",
    type: "registry:ui",
    title: "Image Scanner",
    description: "A image scanner component that allows users to scan images.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/image-scanner.tsx",
        type: "registry:ui",
        target: "components/ui/image-scanner.tsx",
      },
    ],
  },
  {
    name: "majestic-card",
    type: "registry:ui",
    title: "Majestic Card",
    description: "A majestic card that that provide several effects.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/majestic-card.tsx",
        type: "registry:ui",
        target: "components/ui/majestic-card.tsx",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    title: "Marquee",
    description: "A customizable, interactive scrolling marquee component.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/marquee.tsx",
        type: "registry:ui",
        target: "components/ui/marquee.tsx",
      },
    ],
  },
  {
    name: "matrix-code-rain",
    type: "registry:ui",
    title: "Matrix Code Rain",
    description: "A matrix code rain that that provide several effects.",
    files: [
      {
        path: "registry/ui/matrix-code-rain.tsx",
        type: "registry:ui",
        target: "components/ui/matrix-code-rain.tsx",
      },
    ],
  },
  {
    name: "morphing-blob",
    type: "registry:ui",
    title: "Morphing Blob",
    description: "A morphing blob that that provide several effects.",
    dependencies: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
    files: [
      {
        "path": "registry/ui/morphing-blob.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-blob.tsx",
      },
    ],
  },
  {
    name: "music-player",
    type: "registry:ui",
    title: "Music Player",
    description: "A music player that that provide several effects.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/music-player.tsx",
        type: "registry:ui",
        target: "components/ui/music-player.tsx",
      },
    ],
  },
  {
    name: "reveal-card",
    type: "registry:ui",
    title: "Reveal Card",
    description: "A reveal card that that provide several effects.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/reveal-card.tsx",
        type: "registry:ui",
        target: "components/ui/reveal-card.tsx",
      },
    ],
  },
  {
    name: "scroll-animation-trigger",
    type: "registry:ui",
    title: "Scroll Animation Trigger",
    description:
      "A scroll animation trigger that that provide several effects.",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "registry/ui/scroll-animation-trigger.tsx",
        type: "registry:ui",
        target: "components/ui/scroll-animation-trigger.tsx",
      },
    ],
  },
  {
    name: "terminal",
    type: "registry:ui",
    title: "Terminal",
    description: "A terminal that that provide several effects.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ui/terminal.tsx",
        type: "registry:ui",
        target: "components/ui/terminal.tsx",
      },
    ],
  },
  {
    name: "water-ripple-effect",
    type: "registry:ui",
    title: "Water Ripple Effect",
    description: "A water ripple effect that that provide several effects.",
    dependencies: ["three"],
    files: [
      {
        path: "registry/ui/water-ripple-effect.tsx",
        type: "registry:ui",
        target: "components/ui/water-ripple-effect.tsx",
      },
    ],
  },
  {
    name: "custom-cursor",
    type: "registry:ui",
    title: "Custom Cursor",
    description: "A custom cursor that that provide several effects.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/custom-cursor.tsx",
        type: "registry:ui",
        target: "components/ui/custom-cursor.tsx",
        },
    ]
  },
  {
    name: "apple-glass-effect",
    type: "registry:ui",
    title: "Apple Glass Effect",
    description: "A apple glass effect that that provide several effects.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ui/apple-glass-effect.tsx",
        type: "registry:ui",
        target: "components/ui/apple-glass-effect.tsx",
      },
    ],
  }
];
