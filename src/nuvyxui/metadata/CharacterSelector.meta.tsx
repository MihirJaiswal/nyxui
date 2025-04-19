import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import CharacterSelectorDemo from "@/nuvyxui/demos/CharacterSelectorDemo";

import CharacterSelectorSource from "!!raw-loader!@/nuvyxui/components/CharacterSelector.tsx";
import CharacterSelectorDemoSource from "!!raw-loader!@/nuvyxui/demos/CharacterSelectorDemo.tsx";

export const characterSelectorData: ComponentData = {
  name: "Character Selector",
  description:
    "A highly customizable character selection component with grid and dialog interfaces.",
  preview: <CharacterSelectorDemo />,
  usage: CharacterSelectorDemoSource,
  componentCode: CharacterSelectorSource,
  dependencies: [
    {
      name: "UI Components",
      description: "Various UI components from the shadcn/ui library",
      install: {
        npm: "npx shadcn@latest init",
        pnpm: "pnpm dlx shadcn@latest init",
        yarn: "npx shadcn@latest init",
        bun: "bunx --bun shadcn@latest init",
      },
    },
    {
      name: "Framer Motion + Lucide React + Utility Functions",
      description: "Utility functions for conditional class name merging.",
      install: {
        npm: "npm install framer-motion lucide-react clsx tailwind-merge",
        pnpm: "pnpm add framer-motion lucide-react clsx tailwind-merge",
        yarn: "yarn add framer-motion lucide-react clsx tailwind-merge",
        bun: "bun add framer-motion lucide-react clsx tailwind-merge",
      },
      setup: {
        description: "Create a utils.ts file with the cn utility function",
        file: "/lib/utils.ts",
        code: `import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  
    export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
    }`,
      },
    },
  ],
  props: [
    {
      name: "CharacterSelector",
      items: [
        {
          name: "cardsCount",
          type: "number",
          default: "3",
          description: "Number of character cards to display in the main view",
        },
        {
          name: "cardImage",
          type: "string",
          default: "undefined",
          description: "Fallback image URL for empty card slots",
        },
        {
          name: "characterImages",
          type: "Character[]",
          default: "[]",
          description:
            "Array of character objects with id, name, and image properties",
        },
        {
          name: "gridColumns",
          type: "number",
          default: "4",
          description: "Number of columns in the selection grid",
        },
        {
          name: "multiSelect",
          type: "boolean",
          default: "true",
          description:
            "Whether multiple characters can be selected simultaneously",
        },
        {
          name: "enableSearch",
          type: "boolean",
          default: "true",
          description:
            "Whether to show a search input for filtering characters",
        },
        {
          name: "lazyLoad",
          type: "boolean",
          default: "true",
          description:
            "Whether to load characters gradually for better performance",
        },
        {
          name: "animationType",
          type: '"fade" | "slide" | "scale" | "none"',
          default: '"fade"',
          description: "Type of animation for character transitions",
        },
        {
          name: "enableConfirmation",
          type: "boolean",
          default: "true",
          description:
            "Whether to show a confirmation dialog before finalizing selection",
        },
        {
          name: "enableReset",
          type: "boolean",
          default: "true",
          description: "Whether to show a reset button to clear selections",
        },
        {
          name: "customClass",
          type: "string",
          default: '""',
          description: "Additional CSS class names for the component",
        },
        {
          name: "cardHeight",
          type: "string | number",
          default: '"auto"',
          description: "Height of character cards in the main view",
        },
        {
          name: "cardWidth",
          type: "string | number",
          default: '"auto"',
          description: "Width of character cards in the main view",
        },
        {
          name: "dialogCardHeight",
          type: "string | number",
          default: '"auto"',
          description: "Height of character cards in the dialog grid",
        },
        {
          name: "dialogCardWidth",
          type: "string | number",
          default: '"auto"',
          description: "Width of character cards in the dialog grid",
        },
        {
          name: "cardBorderRadius",
          type: "string | number",
          default: "16",
          description: "Border radius of character cards",
        },
        {
          name: "cardGap",
          type: "string | number",
          default: "16",
          description: "Gap between character cards",
        },
        {
          name: "displayMode",
          type: '"grid" | "flex"',
          default: '"grid"',
          description: "Layout mode for character cards",
        },
        {
          name: "cardAspectRatio",
          type: "string",
          default: '"1/1"',
          description: "Aspect ratio for character cards",
        },
        {
          name: "hoverEffect",
          type: '"scale" | "glow" | "lift" | "none"',
          default: '"scale"',
          description: "Visual effect when hovering over a character card",
        },
        {
          name: "selectedEffect",
          type: '"border" | "overlay" | "checkmark" | "multiple"',
          default: '"multiple"',
          description: "Visual effect for selected character cards",
        },
        {
          name: "backgroundColor",
          type: "string",
          default: '""',
          description: "Background color for character cards",
        },
        {
          name: "textColor",
          type: "string",
          default: '""',
          description: "Text color for character names",
        },
        {
          name: "imageObjectFit",
          type: '"cover" | "contain" | "fill" | "none"',
          default: '"cover"',
          description: "CSS object-fit property for character images",
        },
        {
          name: "shadowEffect",
          type: '"none" | "subtle" | "medium" | "strong"',
          default: '"medium"',
          description: "Shadow effect for character cards",
        },
        {
          name: "selectionIndicatorPosition",
          type: '"topLeft" | "topRight" | "bottomLeft" | "bottomRight"',
          default: '"topRight"',
          description: "Position of the selection indicator on selected cards",
        },
        {
          name: "selectionIndicatorSize",
          type: "string | number",
          default: "24",
          description: "Size of the selection indicator",
        },
        {
          name: "animationDuration",
          type: "number",
          default: "200",
          description: "Duration of animations in milliseconds",
        },
        {
          name: "cardPadding",
          type: "string | number",
          default: "0",
          description: "Padding inside character cards",
        },
        {
          name: "gridAutoFlow",
          type: '"row" | "column" | "dense"',
          default: '"row"',
          description: "CSS grid-auto-flow property for character grid",
        },
        {
          name: "gridAutoRows",
          type: "string",
          default: '"auto"',
          description: "CSS grid-auto-rows property for character grid",
        },
        {
          name: "gridAutoColumns",
          type: "string",
          default: '"auto"',
          description: "CSS grid-auto-columns property for character grid",
        },
        {
          name: "enableCardShadow",
          type: "boolean",
          default: "true",
          description: "Whether to apply shadow effects to cards",
        },
        {
          name: "enableCardBorder",
          type: "boolean",
          default: "true",
          description: "Whether to apply borders to cards",
        },
        {
          name: "borderColor",
          type: "string",
          default: '""',
          description: "Border color for character cards",
        },
        {
          name: "nameVisibility",
          type: '"always" | "hover" | "selected" | "never"',
          default: '"hover"',
          description: "When to display character names",
        },
        {
          name: "emptyCardStyle",
          type: '"minimal" | "dashed" | "highlighted" | "custom"',
          default: '"minimal"',
          description: "Style variant for empty card slots",
        },
        {
          name: "cancelButtonText",
          type: "string",
          default: '"Cancel"',
          description: "Text for the cancel button",
        },
        {
          name: "confirmButtonText",
          type: "string",
          default: '"Confirm"',
          description: "Text for the confirm button",
        },
        {
          name: "resetButtonText",
          type: "string",
          default: '"Reset"',
          description: "Text for the reset button",
        },
        {
          name: "dialogTitle",
          type: "string",
          default: '"Select Characters"',
          description: "Title text for the selection dialog",
        },
        {
          name: "noResultsText",
          type: "string",
          default: '"No characters found"',
          description: "Text displayed when no characters match the search",
        },
        {
          name: "clearFiltersText",
          type: "string",
          default: '"Clear filters"',
          description: "Text for the button to clear search filters",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Search characters..."',
          description: "Placeholder text for the search input",
        },
        {
          name: "showDialogHeader",
          type: "boolean",
          default: "true",
          description: "Whether to show the dialog header",
        },
        {
          name: "showDialogFooter",
          type: "boolean",
          default: "true",
          description: "Whether to show the dialog footer",
        },
        {
          name: "showSelectionCount",
          type: "boolean",
          default: "true",
          description: "Whether to show the count of selected characters",
        },
        {
          name: "maxDialogHeight",
          type: "string | number",
          default: '"90vh"',
          description: "Maximum height of the selection dialog",
        },
        {
          name: "dialogWidth",
          type: "string | number",
          default: '"800px"',
          description: "Width of the selection dialog",
        },
        {
          name: "onSelectionChange",
          type: "(selectedCharacters: Character[]) => void",
          default: "undefined",
          description: "Callback function when selection changes",
        },
        {
          name: "onConfirm",
          type: "(selectedCharacters: Character[]) => void",
          default: "undefined",
          description: "Callback function when selection is confirmed",
        },
      ],
    },
    {
      name: "Character Type",
      items: [
        {
          name: "id",
          type: "string",
          default: "required",
          description: "Unique identifier for the character",
        },
        {
          name: "name",
          type: "string",
          default: "required",
          description: "Display name of the character",
        },
        {
          name: "image",
          type: "string",
          default: "required",
          description: "URL of the character's image",
        },
        {
          name: "category",
          type: "string",
          default: "undefined",
          description: "Optional category for grouping characters",
        },
        {
          name: "demoImage",
          type: "string",
          default: "undefined",
          description:
            "Optional alternate image URL for display in selection grid",
        },
      ],
    },
  ],
  category: "Interactive tools",
  examples: [],
};
