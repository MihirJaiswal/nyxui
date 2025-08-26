import { type Registry } from "shadcn/registry";

export const blocks: Registry["items"] = [
  {
    name: "footer",
    type: "registry:ui",
    title: "Footer",
    description: "A simple footer component i will add some more modern components in the future.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/blocks/footer.tsx",
        type: "registry:ui",
        target: "components/blocks/footer.tsx",
      },
    ],
  }
];



