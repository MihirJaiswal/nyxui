import { type Registry } from "shadcn/registry";

export const blocks: Registry["items"] = [
  {
    name: "hover-image-links",
    type: "registry:ui",
    title: "Hover Image Links",
    description:
      "A link list where hovering rows scatters the heading letters and reveals a floating image that chases the cursor.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/blocks/hover-image-links.tsx",
        type: "registry:ui",
        target: "components/blocks/hover-image-links.tsx",
      },
    ],
  },
  {
    name: "clip-path-links",
    type: "registry:ui",
    title: "Clip Path Links",
    description:
      "A grid of link tiles with a directional clip-path wipe that follows the cursor's entry and exit edge.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/blocks/clip-path-links.tsx",
        type: "registry:ui",
        target: "components/blocks/clip-path-links.tsx",
      },
    ],
  },
  {
    name: "morphing-navigation",
    type: "registry:ui",
    title: "Morphing Navigation",
    description:
      "A hover-driven navigation dropdown with directional slide animations between tab panels.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/blocks/morphing-navigation.tsx",
        type: "registry:ui",
        target: "components/blocks/morphing-navigation.tsx",
      },
    ],
  },
  {
    name: "expandable-toolbar",
    type: "registry:ui",
    title: "Expandable Toolbar",
    description:
      "A floating icon toolbar that springs open to reveal a content panel above the active icon.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/blocks/expandable-toolbar.tsx",
        type: "registry:ui",
        target: "components/blocks/expandable-toolbar.tsx",
      },
    ],
  },
  {
    name: "footer",
    type: "registry:ui",
    title: "Footer",
    description:
      "A modern footer with responsive accordion navigation, social links and a large wordmark.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/blocks/footer.tsx",
        type: "registry:ui",
        target: "components/blocks/footer.tsx",
      },
    ],
  },
];
