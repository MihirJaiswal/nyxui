import { type Registry } from "shadcn/registry";

export const blocks: Registry["items"] = [
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
