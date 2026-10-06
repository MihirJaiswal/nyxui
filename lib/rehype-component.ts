import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "@/types/unist";

import RegistryJson from "@/registry.json";

/**
 * registry.json is generated, so TypeScript infers its type from whatever
 * happens to be in the file. The public mirror drops every pro item, which
 * leaves no item carrying `meta` and makes `item.meta` a type error there
 * while compiling fine here. Pin the shape so both trees agree.
 */
type RegistryFile = {
  path: string;
  type?: string;
  target?: string;
};

type RegistryItem = {
  name: string;
  files: RegistryFile[];
  meta?: { pro?: boolean } | null;
};

const Registry = RegistryJson as unknown as { items: RegistryItem[] };

function pushSourceNodes(
  node: UnistNode,
  files: { path: string }[],
  event: string,
) {
  if (files.length > 1) {
    node.children?.push(
      u("element", {
        tagName: "FileCodeViewer",
        properties: {
          files: files.map((file) => {
            const source = fs.readFileSync(
              path.join(process.cwd(), file.path),
              "utf8",
            );
            return {
              path: file.path,
              name: file.path.split("/").pop(),
              code: source,
            };
          }),
        },
        children: [],
      }),
    );
    return;
  }

  const src = files[0].path;
  const filePath = path.join(process.cwd(), src);
  let source = fs.readFileSync(filePath, "utf8");
  source = source.replaceAll("export default", "export");

  node.children?.push(
    u("element", {
      tagName: "pre",
      properties: {
        __src__: src,
      },
      children: [
        u("element", {
          tagName: "code",
          properties: {
            className: ["language-tsx"],
          },
          data: {
            meta: `event="${event}"`,
          },
          children: [
            {
              type: "text",
              value: source,
            },
          ],
        }),
      ],
    }),
  );
}

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (!name && !srcPath) {
          return null;
        }

        // Pro items: never inline source. Render the paywall gate instead.
        const proItem = Registry.items.find(
          (item) => item.name === name && item.meta?.pro === true,
        );
        if (proItem) {
          node.children?.push(
            u("element", {
              tagName: "ProCodeGate",
              properties: {
                name: name as string,
              },
              children: [],
            }),
          );
          return null;
        }

        try {
          let src: string;

          if (srcPath) {
            src = srcPath as string;
          } else {
            const component = Registry.items.find((item) => item.name === name);

            if (!component) {
              return null;
            }

            src = fileName
              ? component.files.find((file) => {
                  return (
                    file.path.endsWith(`${fileName}.tsx`) ||
                    file.path.endsWith(`${fileName}.ts`)
                  );
                })?.path || component.files[0].path
              : component.files[0].path;
          }

          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          source = source.replaceAll("export default", "export");

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_source_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentPreview" || node.name === "BlockPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const component = Registry.items.find((item) => item.name === name);

          if (!component) {
            return null;
          }

          // Pro items: keep the live preview, gate the code tab.
          if (component.meta?.pro === true) {
            node.children?.push(
              u("element", {
                tagName: "ProCodeGate",
                properties: {
                  name: name as string,
                },
                children: [],
              }),
            );
            return null;
          }

          pushSourceNodes(node, component.files, "copy_usage_code");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}
