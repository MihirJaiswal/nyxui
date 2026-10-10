import { type Registry } from "shadcn/registry";

/**
 * nyxui PRO demo registry — paid component demos (props vary render). PRIVATE REPO ONLY.
 * Previews render live on the deployed site; source reaches entitled customers
 * only through /api/pro/source/[name].
 * Blocks take no props — they render themselves directly, no demo entries needed.
 */
export const proExamples: Registry["items"] = [
  {
    name: "navigation-1-demo",
    type: "registry:example",
    title: "Corner Nav Demo",
    description:
      "Example showing a corner hamburger toggle that springs into a full-screen menu.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["@nyxui-pro/navigation-1"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-1/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-1/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-6-demo",
    type: "registry:example",
    title: "Side Stagger Navigation Demo",
    description:
      "Example showing fixed side lines that stretch toward the cursor and expand into labeled links on hover.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/navigation-6"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-6/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-6/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-3-demo",
    type: "registry:example",
    title: "Liquid Side Nav Demo",
    description:
      "Example showing a full-screen nav that slides in with a liquid border-radius reveal.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["@nyxui-pro/navigation-3"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-3/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-3/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-4-demo",
    type: "registry:example",
    title: "Morphing Navigation Demo",
    description:
      "Example showing a hover-driven navigation dropdown with directional slide animations.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-4"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-4/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-4/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-5-demo",
    type: "registry:example",
    title: "Pill Navbar Demo",
    description:
      "Example showing a floating pill navbar that condenses on scroll.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-5"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-5/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-5/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-7-demo",
    type: "registry:example",
    title: "Navigation 7 Demo",
    description:
      "Example showing a glass pill mega-menu navbar that intensifies on scroll.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-7"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-7/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-7/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-8-demo",
    type: "registry:example",
    title: "Navigation 8 Demo",
    description:
      "Example showing a top navbar with a full-screen mobile menu and hover pill.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-8"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-8/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-8/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-9-demo",
    type: "registry:example",
    title: "Navigation 9 Demo",
    description:
      "Example showing a fixed floating navbar that shrinks on scroll with hover mega-dropdowns.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-9"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-9/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-9/demo.tsx",
      },
    ],
  },
  {
    name: "navigation-10-demo",
    type: "registry:example",
    title: "Navigation 10 Demo",
    description:
      "Example showing a rounded navbar with ridge shadows and dual-column mega-menu dropdowns.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/navigation-10"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-10/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-10/demo.tsx",
      },
    ],
  },
  {
    name: "mfa-code-demo",
    type: "registry:example",
    title: "MFA Code Demo",
    description:
      "Example showing a six-digit multifactor code auto-filling box-by-box.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/mfa-code"],
    files: [
      {
        path: "registry/pro/blocks/interactions/mfa-code-demo.tsx",
        type: "registry:example",
        target: "components/mfa-code-demo.tsx",
      },
    ],
  },
  {
    name: "fraud-feed-demo",
    type: "registry:example",
    title: "Fraud Feed Demo",
    description:
      "Example showing a sign-up attempt feed where fraudulent rows get blocked.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/fraud-feed"],
    files: [
      {
        path: "registry/pro/blocks/interactions/fraud-feed-demo.tsx",
        type: "registry:example",
        target: "components/fraud-feed-demo.tsx",
      },
    ],
  },
  {
    name: "session-list-demo",
    type: "registry:example",
    title: "Session List Demo",
    description:
      "Example showing a device session list with active device monitoring.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/session-list"],
    files: [
      {
        path: "registry/pro/blocks/interactions/session-list-demo.tsx",
        type: "registry:example",
        target: "components/session-list-demo.tsx",
      },
    ],
  },
  {
    name: "character-selector-demo",
    type: "registry:example",
    title: "Character Selector Demo",
    description:
      "Example showing a gacha-style deploy scene with three equip slots and a GSAP roster overlay.",
    dependencies: ["gsap"],
    registryDependencies: ["@nyxui-pro/character-selector"],
    files: [
      {
        path: "registry/pro/blocks/section/character-selector/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/character-selector/demo.tsx",
      },
    ],
  },
  {
    name: "bot-radar-demo",
    type: "registry:example",
    title: "Bot Radar Demo",
    description: "Example showing a rotating radar sweep that hunts bot blips.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/bot-radar"],
    files: [
      {
        path: "registry/pro/blocks/interactions/bot-radar-demo.tsx",
        type: "registry:example",
        target: "components/bot-radar-demo.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-2-demo",
    type: "registry:example",
    title: "Expandable Toolbar Demo",
    description:
      "Example showing a floating toolbar that expands into a content panel.",
    registryDependencies: ["@nyxui-pro/navigation-2"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-2/demo.tsx",
        type: "registry:example",
        target: "components/pro/blocks/navigation-2/demo.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "otp-notification-demo",
    type: "registry:example",
    title: "OTP Notification Demo",
    description:
      "Example showing a phone receiving a one-time passcode notification.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/otp-notification"],
    files: [
      {
        path: "registry/pro/blocks/interactions/otp-notification-demo.tsx",
        type: "registry:example",
        target: "components/otp-notification-demo.tsx",
      },
    ],
  },
  {
    name: "magic-link-demo",
    type: "registry:example",
    title: "Magic Link Demo",
    description:
      "Example showing an ID card scanned by a beam sweep revealing a verification code.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/magic-link"],
    files: [
      {
        path: "registry/pro/blocks/interactions/magic-link-demo.tsx",
        type: "registry:example",
        target: "components/magic-link-demo.tsx",
      },
    ],
  },
  {
    name: "api-keys-demo",
    type: "registry:example",
    title: "API Keys Demo",
    description:
      "Example showing a user connected to a server rack by packet-traveling rails.",
    dependencies: ["motion"],
    registryDependencies: ["@nyxui-pro/api-keys"],
    files: [
      {
        path: "registry/pro/blocks/interactions/api-keys-demo.tsx",
        type: "registry:example",
        target: "components/api-keys-demo.tsx",
      },
    ],
  },
  {
    name: "glow-keyboard-demo",
    type: "registry:example",
    title: "Glow Keyboard Demo",
    description:
      "Example showing a mac keyboard where ⌘C glows red at its border while hovered.",
    registryDependencies: ["@nyxui-pro/glow-keyboard"],
    files: [
      {
        path: "registry/pro/blocks/interactions/glow-keyboard-demo.tsx",
        type: "registry:example",
        target: "components/glow-keyboard-demo.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "realtime-cursor-demo",
    type: "registry:example",
    title: "Realtime Cursor Demo",
    description:
      "Example showing a primary cursor with a typing indicator plus a ghost cursor that trails behind and reveals its label on card hover.",
    registryDependencies: ["@nyxui-pro/realtime-cursor"],
    files: [
      {
        path: "registry/pro/blocks/interactions/realtime-cursor-demo.tsx",
        type: "registry:example",
        target: "components/realtime-cursor-demo.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "password-strength-demo",
    type: "registry:example",
    title: "Password Strength Demo",
    description:
      "Example showing a password field auto-typing a passphrase that climbs a strength meter.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["@nyxui-pro/password-strength"],
    files: [
      {
        path: "registry/pro/blocks/interactions/password-strength-demo.tsx",
        type: "registry:example",
        target: "components/password-strength-demo.tsx",
      },
    ],
    meta: { pro: true },
  },
];
