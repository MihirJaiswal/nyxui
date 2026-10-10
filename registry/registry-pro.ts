import { type Registry } from "shadcn/registry";

/**
 * nyxui PRO registry — paid blocks. PRIVATE REPO ONLY.
 *
 * These items are:
 *   - included in __registry__/index.tsx (live previews on the deployed site)
 *   - served as source to entitled customers by /api/pro/source/[name],
 *     which reads registry/pro/** off disk — there is no pre-built JSON
 *   - NEVER written to public/r/, public/registry.json, or
 *     __registry__/index.public.tsx (the pro-free mirror index)
 */
export const pro: Registry["items"] = [
  {
    name: "scale-container",
    type: "registry:component",
    title: "Scale Container",
    description:
      "Fits fixed-size mock art into a fluid container by scaling it with CSS container queries. Shared by the mockup and interaction blocks.",
    files: [
      {
        path: "registry/pro/lib/scale-container.tsx",
        type: "registry:component",
        target: "components/pro/blocks/scale-container.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "line-chart",
    type: "registry:ui",
    title: "Line Chart",
    description:
      "A pure CSS/SVG dual-series line chart with horizontal grid, axis labels, crosshair hover, and a tooltip with series values and total.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/interactions/line-chart.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/interactions/line-chart.tsx",
      },
    ],
  },
  {
    name: "radar-chart",
    type: "registry:ui",
    title: "Mockup: Radar Chart",
    description:
      "A pure CSS/SVG radar chart with grid rings, axis spokes, a filled score polygon, and hover tooltips per vertex.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/mockups/radar-chart/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/radar-chart/index.tsx",
      },
    ],
  },
  {
    name: "sso-orbit",
    type: "registry:ui",
    title: "Mockup: SSO Orbit",
    description:
      "An animated social SSO card \u2014 social provider orbs shuffle around a glowing cloud while pulses travel along connection lines.",
    dependencies: ["@gsap/react", "gsap", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/mockups/sso-orbit/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/sso-orbit/index.tsx",
      },
    ],
  },
  {
    name: "mfa-code",
    type: "registry:ui",
    title: "MFA Code",
    description:
      "A six-digit multifactor code auto-filling box-by-box with focus pops and a typing indicator, resolving to a verified state on loop.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/mfa-code/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/mfa-code/index.tsx",
      },
    ],
  },
  {
    name: "fraud-feed",
    type: "registry:ui",
    title: "Fraud Feed",
    description:
      "A sign-up attempt feed where verified rows check off and fraudulent rows flash red, strike through, and get blocked with an X badge.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/fraud-feed/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/fraud-feed/index.tsx",
      },
    ],
  },
  {
    name: "security-dial",
    type: "registry:ui",
    title: "Mockup: Security Dial",
    description:
      "A fingerprint drawing itself inside a scanning dial, with brackets pulsing and compliance chips (SOC 2, CCPA, ISO) staggering in.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/security-dial/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/security-dial/index.tsx",
      },
    ],
  },
  {
    name: "session-list",
    type: "registry:ui",
    title: "Session List",
    description:
      "A device session list with a pulsing active row and a revoke flow — one row flashes, slides out with a toast, then returns.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/session-list/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/session-list/index.tsx",
      },
    ],
  },
  {
    name: "bot-radar",
    type: "registry:ui",
    title: "Bot Radar",
    description:
      "A rotating radar sweep with rings and crosshairs where user blips glow emerald and bot blips flash red with a blocked label.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/bot-radar/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/bot-radar/index.tsx",
      },
    ],
  },
  {
    name: "otp-notification",
    type: "registry:ui",
    title: "OTP Notification",
    description:
      "A phone receiving an OTP notification whose code digits fly out one-by-one into surrounding app tiles, each flashing as it lands.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/otp-notification/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/otp-notification/index.tsx",
      },
    ],
  },
  {
    name: "magic-link",
    type: "registry:ui",
    title: "Magic Link",
    description:
      "An ID card sliding into a scanner where a beam sweep reveals a scrambling verification code, then a checkmark and verified user appear.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/magic-link/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/magic-link/index.tsx",
      },
    ],
  },
  {
    name: "password-dial",
    type: "registry:ui",
    title: "Mockup: Password Dial",
    description:
      "A password field typing masked dots while a needle gauge sweeps from weak to strong and a breach-check chip flips to clear.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/password-dial/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/password-dial/index.tsx",
      },
    ],
  },
  {
    name: "api-keys",
    type: "registry:ui",
    title: "API Keys",
    description:
      "A user connected to a blinking server rack by packet-traveling rails while a live API key scrambles into place in an issued chip.",
    dependencies: ["motion"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/interactions/api-keys/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/api-keys/index.tsx",
      },
    ],
  },
  {
    name: "glow-keyboard",
    type: "registry:ui",
    title: "Glow Keyboard",
    description:
      "A Raycast-style mac keyboard where ⌘C glows red at its border while hovered.",
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/interactions/glow-keyboard/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/glow-keyboard/index.tsx",
      },
    ],
  },
  {
    name: "realtime-cursor",
    type: "registry:ui",
    title: "Realtime Cursor",
    description:
      "A multiplayer-style cursor with a typing-indicator badge — drop into any container and drive its transform from pointer events.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/interactions/realtime-cursor/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/realtime-cursor/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "password-strength",
    type: "registry:ui",
    title: "Password Strength",
    description:
      "A password field auto-typing a passphrase that climbs a four-segment strength meter, checks off character rules, and resolves to a strong/verified state on loop.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/password-strength/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/password-strength/index.tsx",
      },
    ],
  },
  {
    name: "clerk-cli",
    type: "registry:ui",
    title: "Mockup: CLI",
    description:
      "A terminal window typing a CLI command char-by-char with staggered output lines and a blinking cursor, looping forever.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/interactions/clerk-cli/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/clerk-cli/index.tsx",
      },
    ],
  },
  {
    name: "auth-bento",
    type: "registry:ui",
    title: "Mockup: Auth Bento",
    description:
      "The full authentication bento grid — 11 hover-gated mockup cards (MFA, fraud, security, sessions, SSO, radar, OTP, magic links, passwords, API keys, CLI) arranged in a 3×4 bento layout.",
    dependencies: ["motion", "gsap", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/bento/auth-bento/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/auth-bento/page.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/auth-bento/index.ts",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/meteor.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/meteor.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/bento-card.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/bento-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/mfa-code.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/mfa-code.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/fraud-feed.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/fraud-feed.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/security-dial.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/security-dial.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/session-list.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/session-list.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/sso-orbit.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/sso-orbit.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/bot-radar.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/bot-radar.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/otp-notification.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/auth-bento/components/otp-notification.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/magic-link.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/magic-link.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/password-dial.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/password-dial.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/api-keys.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/api-keys.tsx",
      },
      {
        path: "registry/pro/blocks/bento/auth-bento/components/clerk-cli.tsx",
        type: "registry:component",
        target: "components/pro/blocks/auth-bento/components/clerk-cli.tsx",
      },
    ],
  },
  {
    name: "hero-section-02",
    type: "registry:ui",
    title: "Hero Section 02",
    description:
      "A hero with an animated image carousel that cross-fades between light and dark screenshots.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-02/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-02/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-02/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/components/comic-button.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-02/components/comic-button.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/components/comic-text.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-02/components/comic-text.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/components/image-tabs-panel.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-02/components/image-tabs-panel.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/components/text-generate-effect.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-02/components/text-generate-effect.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-02/components/version-badge.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-02/components/version-badge.tsx",
      },
    ],
  },
  {
    name: "hero-section-03",
    type: "registry:ui",
    title: "Hero Section 03",
    description:
      "A hero with a radial sky gradient background, floating badge and animated glow shapes.",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-03/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-03/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-03/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/syntax-tokens.ts",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/syntax-tokens.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/beam-cover.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/beam-cover.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/code-line.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/code-line.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/code-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/code-card.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/comment-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/comment-card.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-03/components/review-grid.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-03/components/review-grid.tsx",
      },
    ],
  },
  {
    name: "hero-section-04",
    type: "registry:ui",
    title: "Hero Section 04",
    description:
      "A hero with app store badges and a staggered reveal of the product mock below.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-04/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-04/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-04/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/scribble-highlight.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/scribble-highlight.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/brand-mark.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/brand-mark.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/logo-cloud.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/logo-cloud.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/animated-avatar-group.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/animated-avatar-group.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/hero-squares-background.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/hero-squares-background.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-04/components/screenshot-shelf.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-04/components/screenshot-shelf.tsx",
      },
    ],
  },
  {
    name: "hero-section-05",
    type: "registry:ui",
    title: "Hero Section 05",
    description:
      "A hero with a bold headline, feature checklist and a browser-framed screenshot.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-05/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-05/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-05/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-05/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-05/components/nav.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-05/components/nav.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-05/components/hero-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-05/components/hero-card.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-05/components/glow.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-05/components/glow.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-05/components/analytics-chart.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-05/components/analytics-chart.tsx",
      },
    ],
  },
  {
    name: "hero-section-06",
    type: "registry:ui",
    title: "Hero Section 06",
    description:
      "A left-aligned hero with a badge, gradient headline and a 3D-tilted app dashboard mock whose panels slide in on view.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-06/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-06/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-06/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/chart-geometry.ts",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/chart-geometry.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/badge.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-06/components/badge.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/sparkline.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/sparkline.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/revenue-chart.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/revenue-chart.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/kpi-grid.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-06/components/kpi-grid.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/traffic-sources.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/traffic-sources.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/icon-rail.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/icon-rail.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/topbar.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-06/components/topbar.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-06/components/dashboard-mockup.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-06/components/dashboard-mockup.tsx",
      },
    ],
  },
  {
    name: "hero-section-07",
    type: "registry:ui",
    title: "Hero Section 07",
    description:
      "An enterprise-security hero with a serif/sans headline, notched CTAs, a soft radial-gradient backdrop and a tilt-framed product screenshot.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-07/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-07/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-07/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/components/radial-glow.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-07/components/radial-glow.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/components/notched-cta.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-07/components/notched-cta.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/components/dashed-rail.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-07/components/dashed-rail.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/components/screenshot-frame.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-07/components/screenshot-frame.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-07/components/tilt.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-07/components/tilt.tsx",
      },
    ],
  },
  {
    name: "hero-section-08",
    type: "registry:ui",
    title: "Hero Section 08",
    description:
      "A GitHub-style developer-platform hero: bold headline, green sign-up CTA, a contribution/streak grid and a blur-flip trusted-by logo cloud.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-08/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-08/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-08/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-08/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-08/components/logo-cloud.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-08/components/logo-cloud.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-08/components/ribbon-canvas.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-08/components/ribbon-canvas.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-08/components/contribution-heatmap.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-08/components/contribution-heatmap.tsx",
      },
    ],
  },
  {
    name: "hero-section-09",
    type: "registry:ui",
    title: "Hero Section 09",
    description:
      "A generative-AI hero with a per-character colour-cycling headline, liquid-glass CTAs, an ambient pulse backdrop and floating parallax art cards around a glass-framed dashboard mockup.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-09/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-09/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-09/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-09/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-09/components/colourful-text.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-09/components/colourful-text.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-09/components/glass.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-09/components/glass.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-09/components/floating-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-09/components/floating-card.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-09/components/ambient-background.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-09/components/ambient-background.tsx",
      },
    ],
  },
  {
    name: "hero-section-10",
    type: "registry:ui",
    title: "Hero Section 10",
    description:
      "A full-screen hero with a breathing animated radial-gradient background, staggered entrance, and pill CTAs.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-10/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-10/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-10/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-10/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-10/components/animated-gradient-background.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-10/components/animated-gradient-background.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-10/components/folder.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-10/components/folder.tsx",
      },
    ],
  },
  {
    name: "hero-section-12",
    type: "registry:ui",
    title: "Hero Section 12",
    description:
      "A two-column landing hero with massive typography, social proof, stats row, and a stack of live visual demos (glass music player, growth area chart, gantt timeline, collab code editor, star rating).",
    dependencies: ["motion", "lucide-react", "react-icons"],
    registryDependencies: [
      "button",
      "badge",
      "glitch-button",
      "star-rating",
      "scale-container",
    ],
    files: [
      {
        path: "registry/pro/blocks/hero/hero-section-12/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-12/page.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/hero-section-12/index.ts",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/collab-editor.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/collab-editor.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/glass-music-player.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/glass-music-player.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/growth-chart.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/growth-chart.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/timeline.tsx",
        type: "registry:component",
        target: "components/pro/blocks/hero-section-12/components/timeline.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/tech-stack.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/tech-stack.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/social-proof.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/social-proof.tsx",
      },
      {
        path: "registry/pro/blocks/hero/hero-section-12/components/animated-background.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/hero-section-12/components/animated-background.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "analog-clock",
    type: "registry:ui",
    title: "Mockup: Analog Clock",
    description:
      "A live-ticking analog clock face with metallic bezel, glass sheen, and smooth-sweep hands driven by system time.",
    dependencies: [],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/analog-clock/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/analog-clock/index.tsx",
      },
    ],
  },
  {
    name: "command-palette",
    type: "registry:ui",
    title: "Mockup: Command Palette",
    description:
      "A simulated cursor opening a command palette, typing a query, and picking a result on a GSAP loop.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/command-palette/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/command-palette/index.tsx",
      },
    ],
  },
  {
    name: "integration-marquee",
    type: "registry:ui",
    title: "Mockup: Integration Marquee",
    description:
      "Three rows of integration icon tiles scrolling in alternating directions on a 3D-tilted plane.",
    dependencies: ["react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/integration-marquee/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/integration-marquee/index.tsx",
      },
    ],
  },
  {
    name: "contribution-heatmap",
    type: "registry:ui",
    title: "Mockup: Contribution Heatmap",
    description:
      "A GitHub-style contribution heatmap with staggered cell reveal, count-up total, hover tooltips, and four color themes.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/interactions/contribution-heatmap/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/contribution-heatmap/index.tsx",
      },
    ],
  },
  {
    name: "milestone-timeline",
    type: "registry:ui",
    title: "Mockup: Milestone Timeline",
    description:
      "A horizontal milestone track filled up to today, with checkmarked, glowing, and hollow checkpoints on alternating cards.",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/pro/blocks/mockups/milestone-timeline/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/milestone-timeline/index.tsx",
      },
    ],
  },
  {
    name: "pipeline-run",
    type: "registry:ui",
    title: "Mockup: Pipeline Run",
    description:
      "A CI pipeline with Build, parallel Verify jobs, and a waiting Deploy stage, connected by fanned dashed elbows.",
    dependencies: [],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/pipeline-run/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/pipeline-run/index.tsx",
      },
    ],
  },
  {
    name: "tilt-bank-card",
    type: "registry:ui",
    title: "Mockup: Tilt Bank Card",
    description:
      "A flat-color fintech bank card with mouse-tracked 3D tilt and a moving shine highlight.",
    dependencies: ["motion"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/interactions/tilt-bank-card/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/tilt-bank-card/index.tsx",
      },
    ],
  },
  {
    name: "handoff-menu",
    type: "registry:ui",
    title: "Mockup: Handoff Menu",
    description:
      "AI handoff menu items that form a column and scroll on a loop — run in Opencode, Cursor, Claude, Codex, or Zed.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/handoff-menu/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/handoff-menu/index.tsx",
      },
    ],
  },
  {
    name: "page-summary",
    type: "registry:ui",
    title: "Mockup: Page Summary",
    description:
      "A page mockup feeding an AI summary bubble whose bullets reveal word-by-word with a blur-to-sharp fade.",
    dependencies: ["motion"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/page-summary/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/page-summary/index.tsx",
      },
    ],
  },
  {
    name: "kanban-flow",
    type: "registry:ui",
    title: "Mockup: Kanban Flow",
    description:
      "A three-column kanban board where task cards slide across columns on a GSAP timeline, picking up checkmarks in Done.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/kanban-flow/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/kanban-flow/index.tsx",
      },
    ],
  },
  {
    name: "merge-flow",
    type: "registry:ui",
    title: "Mockup: Merge Flow",
    description:
      "Four files flowing rightward into a merging badge, then a beam carrying on to a merged-result icon that pops into a dashed placeholder slot.",
    dependencies: ["motion"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/merge-flow/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/merge-flow/index.tsx",
      },
    ],
  },
  {
    name: "network-mesh",
    type: "registry:ui",
    title: "Mockup: Network Mesh",
    description:
      "A hub node connected to satellite icons by curved animated beams, with a faint mesh perimeter linking the ring.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/network-mesh/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/network-mesh/index.tsx",
      },
    ],
  },
  {
    name: "revenue-chart",
    type: "registry:ui",
    title: "Mockup: Revenue Chart",
    description: "A bar chart with a highlighted peak and summary legend.",
    dependencies: [],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/revenue-chart/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/revenue-chart/index.tsx",
      },
    ],
  },
  {
    name: "storage-tank",
    type: "registry:ui",
    title: "Mockup: Storage Tank",
    description:
      "A capsule storage tank filling with glossy liquid and a curved meniscus surface, with the percentage in the headspace above.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/mockups/storage-tank/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/storage-tank/index.tsx",
      },
    ],
  },
  {
    name: "collab-cursors",
    type: "registry:ui",
    title: "Mockup: Collab Cursors",
    description:
      "Two named multiplayer cursors wandering a shared canvas on independent timelines, each selecting different shapes.",
    dependencies: ["gsap", "@gsap/react"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/collab-cursors/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/collab-cursors/index.tsx",
      },
    ],
  },
  {
    name: "drag-reorder",
    type: "registry:ui",
    title: "Mockup: Drag Reorder",
    description:
      "A cursor grabbing a list row by its handle, dragging it past the row below to swap places, then reversing back.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/drag-reorder/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/drag-reorder/index.tsx",
      },
    ],
  },
  {
    name: "swipe-cards",
    type: "registry:ui",
    title: "Mockup: Swipe Cards",
    description:
      "A cursor swiping the front card of a stack sideways with a LIKE stamp, flying off screen while the next card scales up to take the front.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/swipe-cards/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/swipe-cards/index.tsx",
      },
    ],
  },
  {
    name: "star-rating",
    type: "registry:ui",
    title: "Mockup: Star Rating",
    description:
      "A hover-fill star preview that fills progressively as the cursor sweeps across, locking in on click with a pop and a thank-you message.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/star-rating/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/star-rating/index.tsx",
      },
    ],
  },
  {
    name: "code-diff",
    type: "registry:ui",
    title: "Mockup: Code Diff",
    description:
      "A terminal-style code diff viewer with syntax-highlighted add/del lines, staggered reveal animation, and a copy button.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/mockups/code-diff/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/code-diff/index.tsx",
      },
    ],
  },
  {
    name: "txn-integrity",
    type: "registry:ui",
    title: "Mockup: Txn Integrity",
    description:
      "A transaction ID scrambling char-by-char into its final form with a blinking cursor, status dot, and minted state.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/mockups/txn-integrity/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/txn-integrity/index.tsx",
      },
    ],
  },
  {
    name: "encryption-card",
    type: "registry:ui",
    title: "Mockup: Encryption Card",
    description:
      "Plaintext tiles transforming into scrambling cipher tiles character-by-character, with active pop and settled cyan states.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/mockups/encryption-card/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/encryption-card/index.tsx",
      },
    ],
  },
  {
    name: "signed-payload",
    type: "registry:ui",
    title: "Mockup: Signed Payload",
    description:
      "A document filling in, a hash lighting up left-to-right, and an RSA-2048 stamp dropping in as the signature verifies.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/mockups/signed-payload/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/signed-payload/index.tsx",
      },
    ],
  },
  {
    name: "fraud-shield",
    type: "registry:ui",
    title: "Mockup: Fraud Shield",
    description:
      "A scanning spinner flagging malicious activity while blocked emails reveal one-by-one with red X badges.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/mockups/fraud-shield/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/fraud-shield/index.tsx",
      },
    ],
  },
  {
    name: "study-streak",
    type: "registry:ui",
    title: "Mockup: Study Streak",
    description: "An inbox window with a rising sign-ups trend chart.",
    dependencies: ["react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/mockups/study-streak/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/study-streak/index.tsx",
      },
    ],
  },
  {
    name: "navigation-1",
    type: "registry:ui",
    title: "Corner Nav",
    description:
      "A corner hamburger toggle that springs into a full-screen violet menu with staggered links, socials, and a contact CTA.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-1/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-1/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-1/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-1/index.ts",
      },
    ],
  },
  {
    name: "navigation-6",
    type: "registry:ui",
    title: "Side Stagger Navigation",
    description:
      "A column of fixed side lines that stretch toward the cursor with springs, expanding into labeled nav links on hover.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-6/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-6/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-6/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-6/index.ts",
      },
    ],
  },
  {
    name: "navigation-3",
    type: "registry:ui",
    title: "Liquid Side Nav",
    description:
      "A full-screen nav that slides in with a liquid 50vw border-radius reveal and staggered oversized links.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-3/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-3/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-3/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-3/index.ts",
      },
    ],
  },
  {
    name: "navigation-4",
    type: "registry:ui",
    title: "Morphing Navigation",
    description:
      "A Mintlify-style navigation dropdown with a sliding highlight pill and directional slide animations between tab panels.",
    dependencies: ["motion", "lucide-react", "next-themes"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-4/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-4/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-4/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-4/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-4/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-4/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-5",
    type: "registry:ui",
    title: "Pill Navbar",
    description:
      "A floating pill navbar that animates its width, condenses on scroll, and collapses into a mobile sheet.",
    dependencies: ["motion", "lucide-react", "next-themes"],
    registryDependencies: ["sheet"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-5/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-5/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-5/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-5/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-5/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-5/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-7",
    type: "registry:ui",
    title: "Navigation 7",
    description:
      "A glass pill mega-menu navbar that intensifies on scroll, with spring mega-dropdowns, staggered item reveals, an amber active indicator, and a mobile accordion sheet.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-7/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-7/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-7/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-7/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-7/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-7/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-8",
    type: "registry:ui",
    title: "Navigation 8",
    description:
      "A top navbar that hides on scroll-down and reveals on scroll-up, with a full-screen mobile menu and animated dropdown indicators.",
    dependencies: ["motion", "lucide-react", "next-themes"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-8/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-8/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-8/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-8/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-8/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-8/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-9",
    type: "registry:ui",
    title: "Navigation 9",
    description:
      "A fixed floating navbar that shrinks on scroll, with hover mega-dropdowns featuring promo art panels and an animated mobile accordion.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-9/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-9/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-9/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-9/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-9/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-9/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-10",
    type: "registry:ui",
    title: "Navigation 10",
    description:
      "A rounded navbar with ridge shadows and dual-column mega-menu dropdowns featuring a blog panel, directional panel transitions, and a mobile accordion.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-10/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-10/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-10/logo.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-10/logo.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-10/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-10/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "hover-image-links",
    type: "registry:ui",
    title: "Hover Image Links",
    description:
      "A link list where hovering rows scatters the heading letters and reveals a floating image that chases the cursor.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/section/hover-image-links/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/hover-image-links/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "character-selector",
    type: "registry:ui",
    title: "Character Selector",
    description:
      "A gacha-style deploy scene — three equip slots open a blurred roster overlay with GSAP timelines, star-tier cards, and swap logic.",
    dependencies: ["gsap"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/section/character-selector/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/character-selector/page.tsx",
      },
      {
        path: "registry/pro/blocks/section/character-selector/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/character-selector/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "logo-cloud-3",
    type: "registry:ui",
    title: "Logo Cloud 3",
    description:
      "A brand-icon grid where each tile's overlay wipes in from the nearest edge on hover using a clip-path animation.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/logo-cloud/logo-cloud-3/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/logo-cloud-3/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "logo-cloud-4",
    type: "registry:ui",
    title: "Logo Cloud 4",
    description:
      "A trusted-by logo grid where tiles randomly swap to a different unused logo from the full set with a slide-and-fade transition, plus a hover wash under each cell.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/logo-cloud/logo-cloud-4/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/logo-cloud-4/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "logo-cloud-5",
    type: "registry:ui",
    title: "Logo Cloud 5",
    description:
      "A centered logo cloud of two overlapping-circle rows that stagger toward the edges, with edge fades and a pill CTA.",
    dependencies: ["react-icons", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/logo-cloud/logo-cloud-5/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/logo-cloud-5/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-01",
    type: "registry:ui",
    title: "Feature Section 01",
    description:
      "A three-card product feature section with animated assets: a typewriter prompt, a browser design mock with a draw-in frame and cursor, and an infrastructure sidebar with a looping highlight.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-01/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-01/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-01/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-01/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-01/components/shared.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-01/components/shared.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-01/components/typing-asset.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-01/components/typing-asset.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-01/components/design-asset.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-01/components/design-asset.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-01/components/e2e-asset.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-01/components/e2e-asset.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-02",
    type: "registry:ui",
    title: "Feature Section 02",
    description:
      "A security feature section arranging the auth mockups (security dial, fraud feed, MFA code, session list, bot radar) in an asymmetric grid.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-02/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-02/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-02/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/components/security-dial.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-02/components/security-dial.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/components/fraud-feed.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-02/components/fraud-feed.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/components/bot-radar.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-02/components/bot-radar.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/components/session-list.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-02/components/session-list.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-02/components/meteor.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-02/components/meteor.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-03",
    type: "registry:ui",
    title: "Feature Section 03",
    description:
      "A developer-experience feature section: a bento of code diff, pipeline run, merge flow, and CLI mockups with narrative cards.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["analog-clock", "code-diff", "merge-flow"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-03/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-03/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-03/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-03/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-03/components/flipping-images.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-03/components/flipping-images.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-04",
    type: "registry:ui",
    title: "Feature Section 04",
    description:
      "A collaboration feature section arranging live-cursor, kanban, command-palette, and drag-reorder mockups in a bento grid.",
    dependencies: [],
    registryDependencies: ["collab-cursors", "command-palette", "kanban-flow"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-04/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-04/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-04/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-04/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-05",
    type: "registry:ui",
    title: "Feature Section 05",
    description:
      "A payments feature section weaving bank-card, transaction-integrity, encryption, fraud-shield, and volume-chart mockups into a bento.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-05/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-05/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-05/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/components/skeleton-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-05/components/skeleton-card.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/components/empty-state-text.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-05/components/empty-state-text.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/components/empty-library.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-05/components/empty-library.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/components/empty-board.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-05/components/empty-board.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-05/components/empty-chart.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-05/components/empty-chart.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "logo-cloud-1",
    type: "registry:ui",
    title: "Logo Cloud 1",
    description:
      "A social-proof logo cloud with a copy rail beside a grid of logo tiles that flip between sets with a blur transition, over a live stats marquee.",
    dependencies: ["motion", "lucide-react", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/logo-cloud/logo-cloud-1/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/logo-cloud-1/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "logo-cloud-2",
    type: "registry:ui",
    title: "Logo Cloud 2",
    description:
      "A trusted-by logo cloud: copy column with an accent word beside a bordered grid of logo tiles that blur-and-drop in one-by-one on scroll.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/logo-cloud/logo-cloud-2/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/logo-cloud-2/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-01",
    type: "registry:ui",
    title: "Footer 01",
    description:
      "A marketing footer with blur-staggered link groups, brand column with socials, and a legal bar with a pulsing status dot.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-01/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-01/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-02",
    type: "registry:ui",
    title: "Footer 02",
    description:
      "A dark minimal footer with staggered link columns and a giant gradient-masked outline wordmark above the legal row.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-02/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-02/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-03",
    type: "registry:ui",
    title: "Footer 03",
    description:
      "A compact footer with a top nav brand row, five-column dashed-divider link grid, and a legal strip.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-03/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-03/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-04",
    type: "registry:ui",
    title: "Footer 04",
    description:
      "A dense six-column footer with a legal blurb, gradient social pills, and an inline newsletter form with success state.",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-04/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-04/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-05",
    type: "registry:ui",
    title: "Footer 05",
    description:
      "A minimal centered footer with wrap-around nav links, a copyright line, and a light/dark/system theme toggle.",
    dependencies: ["react-icons", "next-themes"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-05/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-05/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-06",
    type: "registry:ui",
    title: "Footer 06",
    description:
      "A contact-first footer: address, email and phone in the brand column, three link groups with staggered reveal and underline hovers, and a legal row under a rule.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-06/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-06/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-07",
    type: "registry:ui",
    title: "Footer 07",
    description:
      "An oversized CTA card overlapping a dark rounded footer with a name block, socials, newsletter, nav, and back-to-top.",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-07/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-07/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-08",
    type: "registry:ui",
    title: "Footer 08",
    description:
      "A divided four-column footer with three link columns plus a stack of compliance badge cards, and a centered legal line.",
    dependencies: [],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-08/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-08/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-09",
    type: "registry:ui",
    title: "Footer 09",
    description:
      "A responsive footer with accordion navigation on mobile, four link columns on desktop, and a giant gradient wordmark.",
    dependencies: ["react-icons"],
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-09/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-09/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "footer-10",
    type: "registry:ui",
    title: "Footer 10",
    description:
      "A studio-style contact footer with an oversized mailto link, four link columns, a scrolling background wordmark, and a live status bar.",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/pro/blocks/footer/footer-10/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/footer-10/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "navigation-2",
    type: "registry:ui",
    title: "Expandable Toolbar",
    description:
      "A floating icon toolbar that springs open to reveal a content panel above the active icon.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/pro/blocks/navigation/navigation-2/navbar.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-2/navbar.tsx",
      },
      {
        path: "registry/pro/blocks/navigation/navigation-2/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/navigation-2/index.ts",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "bento-section-01",
    type: "registry:ui",
    title: "Bento Section 01",
    description:
      "Component-showcase bento: an interactive terminal, integration marquee, X/Twitter card with a water-ripple image, an animated chat thread, and a ripple-styled download stack.",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: [
      "terminal",
      "integration-marquee",
      "water-ripple-effect",
      "dynamic-ripple",
    ],
    files: [
      {
        path: "registry/pro/blocks/bento/bento-section-01/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/bento-section-01/index.ts",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/bento-section-01/page.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/bento-grid.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/bento-grid.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/terminal-cell.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/terminal-cell.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/marquee-cell.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/marquee-cell.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/twitter-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/twitter-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/chat-demo.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/chat-demo.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-01/components/download-cards.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-01/components/download-cards.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "bento-section-02",
    type: "registry:ui",
    title: "Bento Section 02",
    description:
      "Assist AI bento — a five-card 'This AI can do a lot' grid with a typewriter notepad, chat thread, gradient chart with tooltip, web-search panel, and code editor.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/bento/bento-section-02/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/bento-section-02/index.ts",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/features.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/features.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/typewriter.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/typewriter.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/writing-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/writing-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/image-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/image-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/code-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/code-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/data-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/data-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/battery-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/battery-card.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-02/components/metrics-chart.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/bento-section-02/components/metrics-chart.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "bento-section-04",
    type: "registry:ui",
    title: "Bento Section 04",
    description:
      "A services bento: an orbiting AI-tools logo cluster with an animated beam, a real-time collaboration cursor mockup, an animated AI-workflow diagram with beam connectors, a glow keyboard, and an animated component graphic.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/bento/bento-section-04/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/bento-section-04/index.ts",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-04/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/bento-section-04/page.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-04/shared.tsx",
        type: "registry:component",
        target: "components/pro/blocks/bento-section-04/shared.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-04/glow-keyboard.tsx",
        type: "registry:component",
        target: "components/pro/blocks/bento-section-04/glow-keyboard.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-04/realtime-cursors.tsx",
        type: "registry:component",
        target: "components/pro/blocks/bento-section-04/realtime-cursors.tsx",
      },
      {
        path: "registry/pro/blocks/bento/bento-section-04/ai-tools.tsx",
        type: "registry:component",
        target: "components/pro/blocks/bento-section-04/ai-tools.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "pricing-01",
    type: "registry:ui",
    title: "Pricing Section 01",
    description:
      "Three-tier pricing: animated grainy-background plan cards with hex icons, feature lists, and renewal footer.",
    dependencies: ["lucide-react"],
    registryDependencies: ["grainy-background"],
    files: [
      {
        path: "registry/pro/blocks/pricing/pricing-01/index.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/pricing-01/index.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-06",
    type: "registry:ui",
    title: "Feature Section 06",
    description:
      "An integrations feature section: a full-bleed marquee band over a three-up of network, SSO, and handoff mockups.",
    dependencies: ["motion", "react-icons"],
    registryDependencies: ["sso-orbit", "network-mesh", "scale-container"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-06/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-06/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-06/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-06/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-06/components/integration-marquee.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-06/components/integration-marquee.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-06/components/animated-list.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-06/components/animated-list.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-06/components/handoff-menu.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-06/components/handoff-menu.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-07",
    type: "registry:ui",
    title: "Feature Section 07",
    description:
      "A growth & onboarding feature section pairing a milestone timeline hero with star-rating and swipe-card mockups.",
    dependencies: ["gsap", "@gsap/react", "react-icons"],
    registryDependencies: [
      "milestone-timeline",
      "star-rating",
      "scale-container",
    ],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-07/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-07/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-07/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-07/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-07/components/swipe-cards.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-07/components/swipe-cards.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-08",
    type: "registry:ui",
    title: "Feature Section 08",
    description:
      "An access & keys feature section — a masonry wall of MFA, magic-link, password, OTP, and API-key interaction cards.",
    dependencies: ["motion", "lucide-react", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-08/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-08/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-08/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-08/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-08/components/agent-list.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-08/components/agent-list.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-08/components/double-border-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-08/components/double-border-card.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-08/components/triage-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-08/components/triage-card.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-08/components/mcp-card.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-08/components/mcp-card.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-09",
    type: "registry:ui",
    title: "Feature Section 09",
    description:
      "A hiring feature section with a 3D pipeline timeline, a role overview panel, a cycling candidate-scoring visual, and an AI outreach compose box.",
    dependencies: ["motion", "lucide-react", "react-icons"],
    registryDependencies: ["scale-container"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-09/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-09/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-09/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-09/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-09/components/skeleton-one.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-09/components/skeleton-one.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-09/components/mode-picker.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-09/components/mode-picker.tsx",
      },
    ],
    meta: { pro: true },
  },
  {
    name: "feature-section-10",
    type: "registry:ui",
    title: "Feature Section 10",
    description:
      "An AI-agent feature section with a macOS chat-window mockup, a Quick AI search prompt, and an animated tool-workflow demo with collapsible activity groups.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/pro/blocks/feature/feature-section-10/index.ts",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-10/index.ts",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/page.tsx",
        type: "registry:ui",
        target: "components/pro/blocks/feature-section-10/page.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/chat-primitives.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/chat-primitives.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/demo-utils.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/demo-utils.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/sidebar.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/sidebar.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/ai-agent-visual.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/ai-agent-visual.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/quick-ai-visual.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/quick-ai-visual.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/ai-extensions-visual.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/ai-extensions-visual.tsx",
      },
      {
        path: "registry/pro/blocks/feature/feature-section-10/components/arrow-link.tsx",
        type: "registry:component",
        target:
          "components/pro/blocks/feature-section-10/components/arrow-link.tsx",
      },
    ],
    meta: { pro: true },
  },
];
