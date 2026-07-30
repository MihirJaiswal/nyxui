import { type Registry } from "shadcn/registry";

export const blocks: Registry["items"] = [
  {
    name: "footer",
    type: "registry:ui",
    title: "Footer",
    description:
      "A simple footer component i will add some more modern components in the future.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/footer.tsx",
        type: "registry:ui",
        target: "components/blocks/footer.tsx",
      },
    ],
  },
  {
    name: "hero",
    type: "registry:ui",
    title: "Hero",
    description:
      "A bold hero section with headline, CTA buttons, announcement badge, tech showcase, scanner, matrix rain, glass music player, and animated code block.",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: [
      "apple-glass-effect",
      "glitch-button",
      "matrix-code-rain",
    ],
    files: [
      {
        path: "registry/blocks/hero.tsx",
        type: "registry:ui",
        target: "components/blocks/hero.tsx",
      },
    ],
  },
  {
    name: "bento-grid",
    type: "registry:ui",
    title: "Bento Grid",
    description:
      "A bento-style grid showcasing component demos including terminal, blob, tweet card, chat, and download steps with dynamic ripple.",
    dependencies: ["lucide-react", "motion", "clsx"],
    registryDependencies: [
      "terminal",
      "keyboard",
      "morphing-blob",
      "lamp-heading",
      "glow-card",
      "dynamic-ripple",
    ],
    files: [
      {
        path: "registry/blocks/bento-grid.tsx",
        type: "registry:ui",
        target: "components/blocks/bento-grid.tsx",
      },
    ],
  },
  {
    name: "feature",
    type: "registry:ui",
    title: "Feature",
    description:
      "A two-column feature showcase with browser mockup, custom cursor, and music player theme customizer.",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["music-player", "custom-cursor"],
    files: [
      {
        path: "registry/blocks/feature.tsx",
        type: "registry:ui",
        target: "components/blocks/feature.tsx",
      },
    ],
  },
  {
    name: "cards",
    type: "registry:ui",
    title: "Cards",
    description:
      "A collection grid of cards linking to components, templates, and blocks with texture card styling.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/cards.tsx",
        type: "registry:ui",
        target: "components/blocks/cards.tsx",
      },
    ],
  },
  {
    name: "social",
    type: "registry:ui",
    title: "Social",
    description:
      "Social media cards with 3D layered card effects and platform icons.",
    dependencies: ["lucide-react"],
    registryDependencies: ["3d-layered-card"],
    files: [
      {
        path: "registry/blocks/social.tsx",
        type: "registry:ui",
        target: "components/blocks/social.tsx",
      },
    ],
  },
  {
    name: "support",
    type: "registry:ui",
    title: "Support",
    description:
      "A support section with share buttons for LinkedIn, X, and GitHub, and animated phone mockups.",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "registry/blocks/support.tsx",
        type: "registry:ui",
        target: "components/blocks/support.tsx",
      },
    ],
  },
];
