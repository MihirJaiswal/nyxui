/**
 * Base metadata shared by all showcase items.
 * `isPro` marks premium items that require a nyxui Pro license.
 */
interface ShowCaseItemBase {
  title: string;
  tags: string[];
  description: string;
  image: string;
  heroImage?: string;
  isNew?: boolean;
  imageClassName?: string;
  isPro?: boolean;
  /** Marks the block whose image serves as its category's cover (e.g. sidebar hover preview). */
  isRepresentative?: boolean;
}

export interface Component extends ShowCaseItemBase {
  proUrl?: string;
}

export interface template extends ShowCaseItemBase {
  proUrl?: string;
}

export interface Block extends ShowCaseItemBase {
  proUrl?: string;
}

/**
 * Landing page for nyxui Pro. Premium items link here unless they
 * define a more specific `proUrl`.
 */
export const PRO_URL = "/pro";

interface Links {
  docs: string;
}

interface ComponentsData {
  links: Links;
  components: {
    [key: string]: Component;
  };
  templates: {
    [key: string]: template;
  };
  blocks: {
    [key: string]: Block;
  };
}

export const componentsData: ComponentsData = {
  links: {
    docs: "Introduction",
  },
  components: {
    "shining-card": {
      title: "Shining Card",
      tags: ["Cards", "Animation"],
      description:
        "A 3D mouse-tilt card with a sheen overlay that follows the cursor.",
      image: "/assets/images/showcase/components/shining-card.avif",
      imageClassName: "object-contain scale-95",
      isNew: true,
    },
    "typing-words": {
      title: "Typing Words",
      tags: ["Text Animation", "Animation"],
      description:
        "A typing headline that cycles words letter-by-letter with a 3D blur flip and a color-shifting caret.",
      image: "/assets/images/showcase/components/typing-words.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isNew: true,
    },
    "logo-cycle": {
      title: "Logo Cycle",
      tags: ["Logos", "Animation"],
      description:
        "A grid of logo cells where two pill-mounted logos counter-rotate past each other, swapping top and bottom.",
      image: "/assets/images/showcase/components/logo-cycle.avif",
      imageClassName: "object-conatain invert-100 dark:invert-0",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/logo-cycle.avif",
    },
    "ascii-text": {
      title: "Ascii Text",
      tags: ["Typography", "Animation"],
      description:
        "Renders text as animated ASCII block letters, with wave, scan, glitch, typewriter and pulse modes.",
      image: "/assets/images/showcase/components/ascii-text.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/ascii-text.avif",
    },
    "liquid-metal-button": {
      title: "Liquid Metal Button",
      tags: ["Buttons", "Animation"],
      description:
        "A pill button ringed by a flowing liquid-metal shader, with a click ripple and a CSS fallback when WebGL is unavailable.",
      image: "/assets/images/showcase/components/liquid-metal-button.avif",
      imageClassName: "object-cover dark:invert-100",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/liquid-metal-button.avif",
    },
    "shuffle-loader": {
      title: "Shuffle Loader",
      tags: ["Loaders", "Animation"],
      description:
        "A row of white blocks that continuously swap places with a lift-drop animation.",
      image: "/assets/images/showcase/components/shuffle-loader.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/shuffle-loader.avif",
    },
    "halo-ring": {
      title: "Halo Ring",
      tags: ["Effects", "Cards"],
      description:
        "Rotating conic-gradient border with a soft inner glow halo, for AI-brand card treatments.",
      // TODO: replace with a dedicated showcase image for halo-ring.
      image: "/assets/images/showcase/components/halo-ring.avif",
      imageClassName: "object-cover",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/halo-ring.avif",
    },
    "flip-text": {
      title: "Flip Text",
      tags: ["Typography", "Effects"],
      description:
        "Splits text into characters that roll up and away on hover while a duplicate layer flips in from below, staggered letter by letter.",
      // TODO: replace with a dedicated showcase image for flip-text.
      image: "/assets/images/showcase/components/flip-text.avif",
      imageClassName: "object-cover",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/flip-text.avif",
    },
    "pop-text": {
      title: "Pop Text",
      tags: ["Typography", "Interactive"],
      description:
        "A heading whose letters swell when hovered — the hovered letter is boldest and the effect fades across its neighbors.",
      // TODO: replace with a dedicated showcase image for pop-text.
      image: "/assets/images/showcase/components/pop-text.avif",
      imageClassName: "object-contain",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/pop-text.avif",
    },
    scribble: {
      title: "Scribble",
      tags: ["Typography", "Interactive"],
      description:
        "Hand-drawn scribble that draws itself around a word — circle, underline, box, or highlight.",
      image: "/assets/images/showcase/components/scribble.avif",
      imageClassName: "object-cover scale-90 invert-90 dark:invert-0",
      isNew: true,
      heroImage: "/assets/images/landing-page/hero/scribble.avif",
    },
    "water-ripple-effect": {
      title: "Water Ripple Effect",
      tags: ["Interactive", "Visual Effects", "Image"],
      description: "A mesmerizing water ripple effect for interactive images.",
      image: "/assets/images/showcase/components/water-ripple-effect.avif",
      isNew: true,
      imageClassName: "scale-85",
      heroImage: "/assets/images/landing-page/hero/water-ripple.avif",
    },
    "custom-cursor": {
      title: "Custom Cursor",
      tags: ["Cursor", "Animation", "Interactive"],
      description: "A customizable cursor that follows the mouse.",
      image: "/assets/images/showcase/components/custom-cursor.avif",
      isNew: true,
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/custom-cursor.avif",
    },
    "animated-code-block": {
      title: "Animated Code Block",
      tags: ["Animation", "Interactive"],
      description: "Code snippets with typing and highlighting effects.",
      image: "/assets/images/showcase/components/animated-code-block.avif",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/code-block.avif",
    },
    "cyberpunk-card": {
      title: "Cyberpunk Card",
      tags: ["Cards", "Futuristic"],
      description:
        "A futuristic card design with neon glow and tech aesthetics.",
      image: "/assets/images/showcase/components/cyberpunkcard.avif",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/cyberpunk-card.webp",
    },
    "grainy-background": {
      title: "Grainy Background",
      tags: ["Background", "Animation"],
      description: "Smooth shifting grainy background for modern UIs.",
      image: "/assets/images/showcase/components/grainy-background.avif",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/grainy-background.webp",
    },
    "animated-text": {
      title: "Animated Text",
      tags: ["Typography", "Animation"],
      description: "Text with various animation effects and transitions.",
      image: "/assets/images/showcase/components/animated-text.avif",
      imageClassName: "invert-100 dark:invert-0 object-cover",
      heroImage: "/assets/images/landing-page/hero/animated-text.avif",
    },
    "bubble-background": {
      title: "Bubble Background",
      tags: ["Background", "Interactive", "Animation"],
      description: "An interactive floating bubble animation for backgrounds.",
      image: "/assets/images/showcase/components/bubbles-background.avif",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/bubbles-background.avif",
    },
    "dynamic-ripple": {
      title: "Dynamic Ripple",
      tags: ["Effects", "Interactive"],
      description:
        "Interactive ripple effect that responds to cursor or touch.",
      image: "/assets/images/showcase/components/dynamic-ripple.avif",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/dynamic-ripple.avif",
    },
    "github-repo-card": {
      title: "GitHub Repo Card",
      tags: ["Cards", "GitHub"],
      description:
        "A card component that displays GitHub repository information.",
      image: "/assets/images/showcase/components/github-repo-card.avif",
      imageClassName: "scale-85",
      heroImage: "/assets/images/landing-page/hero/repo-card.avif",
    },
    "glitch-button": {
      title: "Glitch Button",
      tags: ["Buttons", "Effects", "Glitch"],
      description: "A button with a digital glitch effect on hover and click.",
      image: "/assets/images/showcase/components/glitch-button.avif",
      imageClassName: "scale-50",
      heroImage: "/assets/images/landing-page/hero/glitch-button.avif",
    },
    keyboard: {
      title: "Keyboard",
      tags: ["Interactive", "Tools", "Mock"],
      description: "Interactive keyboard component with customizable keys.",
      image: "/assets/images/showcase/components/keyboard.avif",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/keyboard.avif",
    },
    "ms-paint": {
      title: "MS Paint",
      tags: ["Interactive", "Tools", "Mock"],
      description: "A nostalgic MS Paint-like drawing tool.",
      image: "/assets/images/showcase/components/ms-paint.avif",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/ms-paint.avif",
    },
    "lamp-heading": {
      title: "Lamp Heading",
      tags: ["Typography", "Effects", "Futuristic"],
      description: "A heading component with a lamp effect.",
      image: "/assets/images/showcase/components/lamp-heading.avif",
      imageClassName: "invert-100 dark:invert-0 object-cover",
      heroImage: "/assets/images/landing-page/hero/lamp-heading.avif",
    },
    "image-comparison": {
      title: "Image Comparison",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for comparing two images side-by-side.",
      image: "/assets/images/showcase/components/image-comparison.avif",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/image-comparison.avif",
    },
    "image-scanner": {
      title: "Image Scanner",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for scanning images with a futuristic effect.",
      image: "/assets/images/showcase/components/image-scanner.avif",
      imageClassName: "scale-80 contrast-105",
      heroImage: "/assets/images/landing-page/hero/image-scanner.webp",
    },
    "glow-card": {
      title: "Glow Card",
      tags: ["Cards", "Effects", "Animation", "Interactive"],
      description: "A card component with subtle animation and transitions.",
      image: "/assets/images/showcase/components/glow-card.avif",
      imageClassName: "scale-90 rounded-3xl p-3 overflow-hidden",
      heroImage: "/assets/images/landing-page/hero/glow-card.avif",
    },
    marquee: {
      title: "Marquee",
      tags: ["Interactive", "Animation"],
      description: "A customizable, interactive scrolling marquee component.",
      image: "/assets/images/showcase/components/marquee.avif",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/marquee.avif",
    },
    "matrix-code-rain": {
      title: "Matrix Code Rain",
      tags: ["Background", "Effects", "Animation"],
      description: "A component that simulates a matrix code rain effect.",
      image: "/assets/images/showcase/components/matrix-code-rain.avif",
      imageClassName: "object-cover scale-101 invert dark:invert-0",
      heroImage: "/assets/images/landing-page/hero/matrix-code-rain.avif",
    },
    "morphing-blob": {
      title: "Morphing Blob",
      tags: ["Background", "Effects", "Animation"],
      description: "A dynamic blob powered by Three.js and shaders.",
      image: "/assets/images/showcase/components/morphing-blob.avif",
      heroImage: "/assets/images/landing-page/hero/morphing-blob.avif",
    },
    "music-player": {
      title: "Music Player",
      tags: ["Interactive", "Media", "Player"],
      description:
        "An immersive music player with morphing collapse/expand animation, glass controls, and queue management.",
      image: "/assets/images/showcase/components/music-player.avif",
      imageClassName: "scale-90 dark:contrast-105",
      heroImage: "/assets/images/landing-page/hero/music-player.avif",
    },
    "reveal-card": {
      title: "Reveal Card",
      tags: ["Cards", "Effects", "3D", "Interactive"],
      description: "A card with reveal animations that show content on hover.",
      image: "/assets/images/showcase/components/reveal-card.avif",
      imageClassName: "scale-95 -mt-5",
      heroImage: "/assets/images/landing-page/hero/reveal-card.avif",
    },
    terminal: {
      title: "Terminal",
      tags: ["Interactive", "Mock", "Tools"],
      description:
        "A command-line interface with typing animations and responses.",
      image: "/assets/images/showcase/components/interactive-terminal.avif",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/terminal.avif",
    },
    "apple-glass-effect": {
      title: "Apple Glass Effect",
      tags: ["Effects", "Glassmorphism", "Interactive"],
      description: "A customizable Apple Glass effect component.",
      image: "/assets/images/showcase/components/apple-glass-effect.avif",
      isNew: true,
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/apple-glass-effect.avif",
    },
    "3d-layered-card": {
      title: "3D Layered Card",
      tags: ["Card", "3D", "Animation", "Interactive"],
      description: "A 3D card with layered effects and animations.",
      image: "/assets/images/showcase/components/3d-layered-card.avif",
      isNew: true,
      imageClassName: "scale-95",
      heroImage: "/assets/images/landing-page/hero/3d-layered-card.avif",
    },
  },
  templates: {
    "singlepage-portfolio": {
      title: "Single Page Portfolio",
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant single page portfolio template.",
      image: "/assets/images/showcase/templates/single-page-portfolio.avif",
      imageClassName: "object-cover",
    },
    "minimalist-portfolio": {
      title: "Minimalist Portfolio",
      isNew: true,
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant minimalist portfolio template.",
      image: "/assets/images/showcase/templates/minimalist-portfolio.avif",
      imageClassName: "object-cover",
    },
  },
  blocks: {
    "mfa-code": {
      title: "MFA Code",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A six-digit multifactor code auto-filling box-by-box with focus pops and a typing indicator, resolving to a verified state on loop.",
      image: "/assets/images/showcase/blocks/mfa-code.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/mfa-code",
    },
    "fraud-feed": {
      title: "Fraud Feed",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A sign-up attempt feed where verified rows check off and fraudulent rows flash red, strike through, and get blocked with an X badge.",
      image: "/assets/images/showcase/blocks/fraud-feed.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/fraud-feed",
    },
    "bot-radar": {
      title: "Bot Radar",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A rotating radar sweep with rings and crosshairs where user blips glow emerald and bot blips flash red with a blocked label.",
      image: "/assets/images/showcase/blocks/bot-radar.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/bot-radar",
    },
    "otp-notification": {
      title: "OTP Notification",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A phone receiving an OTP notification whose code digits fly out one-by-one into surrounding app tiles, each flashing as it lands.",
      image: "/assets/images/showcase/blocks/otp-notification.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/otp-notification",
    },
    "magic-link": {
      title: "Magic Link",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "An ID card sliding into a scanner where a beam sweep reveals a scrambling verification code, then a checkmark and verified user appear.",
      image: "/assets/images/showcase/blocks/magic-link.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/magic-link",
    },
    "api-keys": {
      title: "API Keys",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A user connected to a blinking server rack by packet-traveling rails while a live API key scrambles into place in an issued chip.",
      image: "/assets/images/showcase/blocks/api-keys.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/api-keys",
    },
    "session-list": {
      title: "Session List",
      isRepresentative: true,
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A device session list with a pulsing active row and a revoke flow — one row flashes, slides out with a toast, then returns.",
      image: "/assets/images/showcase/blocks/session-list.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/session-list",
    },
    "feature-section-01": {
      title: "Feature Section 01",
      isRepresentative: true,
      tags: ["Feature", "Section", "Pro"],
      description:
        "A three-card feature section with animated assets — a typewriter prompt, a browser design mock with a draw-in frame, and an infrastructure sidebar with a looping highlight.",
      image: "/assets/images/showcase/blocks/feature-section-01.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-01",
    },
    "feature-section-02": {
      title: "Feature Section 02",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A security feature section arranging the auth mockups — security dial, fraud feed, MFA code, session list, and bot radar — in an asymmetric grid.",
      image: "/assets/images/showcase/blocks/feature-section-02.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-02",
    },
    "feature-section-03": {
      title: "Feature Section 03",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A developer-experience feature section with code diff, pipeline run, merge flow, and CLI mockups woven into a bento of narrative cards.",
      image: "/assets/images/showcase/blocks/feature-section-03.avif",
      imageClassName: "object-contain",
      isPro: true,
      proUrl: "/blocks/feature-section-03",
    },
    "feature-section-04": {
      title: "Feature Section 04",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A collaboration feature section arranging live-cursor, kanban, command-palette, and drag-reorder mockups in a bento grid.",
      image: "/assets/images/showcase/blocks/feature-section-04.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-04",
    },
    "feature-section-05": {
      title: "Feature Section 05",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A payments feature section weaving bank-card, transaction-integrity, encryption, fraud-shield, and volume-chart mockups into a bento.",
      image: "/assets/images/showcase/blocks/feature-section-05.avif",
      imageClassName: "object-contain",
      isPro: true,
      proUrl: "/blocks/feature-section-05",
    },
    "feature-section-06": {
      title: "Feature Section 06",
      tags: ["Feature", "Section", "Pro"],
      description:
        "An integrations feature section: a full-bleed marquee band over a three-up of network, SSO, and handoff mockups.",
      image: "/assets/images/showcase/blocks/feature-section-06.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-06",
    },
    "feature-section-07": {
      title: "Feature Section 07",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A growth & onboarding feature section pairing a milestone timeline hero with star-rating and swipe-card mockups.",
      image: "/assets/images/showcase/blocks/feature-section-07.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-07",
    },
    "feature-section-08": {
      title: "Feature Section 08",
      tags: ["Feature", "Section", "Pro"],
      description:
        "An access & keys feature section — a masonry wall of MFA, magic-link, password, OTP, and API-key interaction cards.",
      image: "/assets/images/showcase/blocks/feature-section-08.avif",
      imageClassName: "object-cover obeject-top",
      isPro: true,
      proUrl: "/blocks/feature-section-08",
    },
    "feature-section-09": {
      title: "Feature Section 09",
      tags: ["Feature", "Section", "Pro"],
      description:
        "A developer-tooling feature section showcasing nyxui components: terminal, animated code block, GitHub repo card, and keyboard.",
      image: "/assets/images/showcase/blocks/feature-section-09.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-09",
    },
    "feature-section-10": {
      title: "Feature Section 10",
      tags: ["Feature", "Section", "Pro"],
      description:
        "An AI-agent feature section with a macOS chat-window mockup, a Quick AI search prompt, and an animated tool-workflow demo.",
      image: "/assets/images/showcase/blocks/feature-section-10.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/feature-section-10",
    },
    "logo-cloud-1": {
      title: "Logo Cloud 1",
      tags: ["Logo Cloud", "Section", "Pro"],
      description:
        "A social-proof logo cloud with a copy rail beside a grid of logo tiles that flip between sets with a blur transition, over a live stats marquee.",
      image: "/assets/images/showcase/blocks/logo-cloud-1.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/logo-cloud-1",
    },
    "logo-cloud-2": {
      title: "Logo Cloud 2",
      tags: ["Logo Cloud", "Section", "Pro"],
      description:
        "A trusted-by logo cloud: copy column with an accent word beside a bordered grid of logo tiles that blur-and-drop in one-by-one on scroll.",
      image: "/assets/images/showcase/blocks/logo-cloud-2.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/logo-cloud-2",
    },
    "hover-image-links": {
      title: "Hover Image Links",
      isRepresentative: true,
      tags: ["Section", "Links", "Pro"],
      description:
        "A link list where hovering rows scatters the heading letters and reveals a floating image that chases the cursor.",
      image: "/assets/images/showcase/blocks/hover-image-link.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/hover-image-links",
    },
    "character-selector": {
      title: "Character Selector",
      tags: ["Section", "Selector", "Pro"],
      description:
        "A gacha-style deploy scene — three equip slots open a blurred roster overlay with GSAP timelines, star-tier cards, and swap logic.",
      image: "/assets/images/showcase/blocks/character-selector.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/character-selector",
    },
    "logo-cloud-3": {
      title: "Logo Cloud 3",
      tags: ["Logo Cloud", "Section", "Pro"],
      description:
        "A brand-icon grid where each tile's overlay wipes in from the nearest edge on hover using a clip-path animation.",
      image: "/assets/images/showcase/blocks/logo-cloud-3.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/logo-cloud-3",
    },
    "logo-cloud-4": {
      title: "Logo Cloud 4",
      tags: ["Logo Cloud", "Section", "Pro"],
      description:
        "A trusted-by logo grid where tiles randomly swap to a different unused logo from the full set with a slide-and-fade transition, plus a hover wash under each cell.",
      image: "/assets/images/showcase/blocks/logo-cloud-4.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/logo-cloud-4",
    },
    "logo-cloud-5": {
      title: "Logo Cloud 5",
      isRepresentative: true,
      tags: ["Logo Cloud", "Section", "Pro"],
      description:
        "A centered logo cloud of two staggered, overlapping-circle rows with edge fades and a pill CTA.",
      image: "/assets/images/showcase/blocks/logo-cloud-5.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/logo-cloud-5",
    },
    "footer-01": {
      title: "Footer 01",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A marketing footer with blur-staggered link groups, brand column with socials, and a legal bar with a pulsing status dot.",
      image: "/assets/images/showcase/blocks/footer-01.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-01",
    },
    "footer-02": {
      title: "Footer 02",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A dark minimal footer with staggered link columns and a giant gradient-masked outline wordmark above the legal row.",
      image: "/assets/images/showcase/blocks/footer-02.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-02",
    },
    "footer-03": {
      title: "Footer 03",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A compact footer with a top nav brand row, five-column dashed-divider link grid, and a legal strip.",
      image: "/assets/images/showcase/blocks/footer-03.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-03",
    },
    "footer-04": {
      title: "Footer 04",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A dense six-column footer with a legal blurb, gradient social pills, and an inline newsletter form with success state.",
      image: "/assets/images/showcase/blocks/footer-04.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-04",
    },
    "footer-05": {
      title: "Footer 05",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A two-column footer with brand block on the left and three link columns with dotted vertical rules on the right.",
      image: "/assets/images/showcase/blocks/footer-05.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-05",
    },
    "footer-06": {
      title: "Footer 06",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A contact-first footer: address, email and phone in the brand column, three link groups, and a legal row under a rule.",
      image: "/assets/images/showcase/blocks/footer-06.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-06",
    },
    "footer-07": {
      title: "Footer 07",
      tags: ["Footer", "Section", "Pro"],
      description:
        "An oversized CTA card overlapping a dark rounded footer with a name block, socials, newsletter, nav, and back-to-top.",
      image: "/assets/images/showcase/blocks/footer-07.avif",
      imageClassName: "object-cover",
      isPro: true,
      isRepresentative: true,
      proUrl: "/blocks/footer-07",
    },
    "footer-08": {
      title: "Footer 08",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A divided four-column footer with three link columns plus a stack of compliance badge cards, and a centered legal line.",
      image: "/assets/images/showcase/blocks/footer-08.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-08",
    },
    "footer-09": {
      title: "Footer 09",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A responsive footer with accordion navigation on mobile, four link columns on desktop, and a giant gradient wordmark.",
      image: "/assets/images/showcase/blocks/footer-09.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-09",
    },
    "footer-10": {
      title: "Footer 10",
      tags: ["Footer", "Section", "Pro"],
      description:
        "A studio-style contact footer with an oversized mailto link, four link columns, a scrolling background wordmark, and a live status bar.",
      image: "/assets/images/showcase/blocks/footer-10.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/footer-10",
    },
    "line-chart": {
      title: "Line Chart",
      tags: ["Interactions", "Charts", "Pro"],
      description:
        "A pure CSS/SVG dual-series line chart with horizontal grid, axis labels, crosshair hover, and a tooltip with series values and total.",
      image: "/assets/images/showcase/blocks/line-chart.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/line-chart",
    },
    "radar-chart": {
      title: "Mockup: Radar Chart",
      tags: ["Mockups", "Charts", "Pro"],
      description:
        "A pure CSS/SVG radar chart with grid rings, axis spokes, a filled score polygon, and hover tooltips per vertex.",
      image: "/assets/images/showcase/blocks/radar-chart.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/radar-chart",
    },
    "sso-orbit": {
      title: "Mockup: SSO Orbit",
      tags: ["Mockups", "Pro"],
      description:
        "An animated social SSO card \u2014 social provider orbs shuffle around a glowing cloud while pulses travel along connection lines.",
      image: "/assets/images/showcase/blocks/sso-orbit.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/sso-orbit",
    },
    "security-dial": {
      title: "Mockup: Security Dial",
      tags: ["Interactions", "Pro"],
      description:
        "A fingerprint drawing itself inside a scanning dial, with brackets pulsing and compliance chips (SOC 2, CCPA, ISO) staggering in.",
      image: "/assets/images/showcase/blocks/security-dial.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/security-dial",
    },
    "password-dial": {
      title: "Mockup: Password Dial",
      tags: ["Interactions", "Pro"],
      description:
        "A password field typing masked dots while a needle gauge sweeps from weak to strong and a breach-check chip flips to clear.",
      image: "/assets/images/showcase/blocks/password-dial.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/password-dial",
    },
    "clerk-cli": {
      title: "Mockup: CLI",
      tags: ["Interactions", "Pro"],
      description:
        "A terminal window typing a CLI command char-by-char with staggered output lines and a blinking cursor, looping forever.",
      image: "/assets/images/showcase/blocks/cli.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/clerk-cli",
    },
    "glow-keyboard": {
      title: "Glow Keyboard",
      tags: ["Interactions", "Pro"],
      description:
        "A Raycast-style mac keyboard where ⌘C glows red at its border while hovered.",
      image: "/assets/images/showcase/blocks/glow-keyboard.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/glow-keyboard",
    },
    "realtime-cursor": {
      title: "Realtime Cursor",
      tags: ["Interactions", "Pro"],
      description:
        "A multiplayer-style cursor with a typing-indicator badge — drive its transform from pointer events to mimic live collaboration.",
      image: "/assets/images/showcase/blocks/realtime-cursor.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/realtime-cursor",
    },
    "password-strength": {
      title: "Password Strength",
      tags: ["Interactions", "Auth", "Pro"],
      description:
        "A password field auto-typing a passphrase that climbs a four-segment strength meter with crack-time estimates and a rule checklist.",
      image: "/assets/images/showcase/blocks/password-strength.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/password-strength",
    },
    "auth-bento": {
      title: "Mockup: Auth Bento",
      tags: ["Bento", "Mockups", "Pro"],
      description:
        "The full authentication bento grid — 11 hover-gated mockup cards arranged in a 3×4 bento layout with a wide API keys + CLI bottom row.",
      image: "/assets/images/showcase/blocks/auth-bento.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/auth-bento",
    },
    "hero-section-02": {
      title: "Hero Section 02",
      tags: ["Section", "Pro"],
      description:
        "A hero with an animated image carousel that cross-fades between light and dark screenshots.",
      image: "/assets/images/showcase/blocks/hero-section-02.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-02",
    },
    "hero-section-03": {
      title: "Hero Section 03",
      tags: ["Section", "Pro"],
      description:
        "A hero with a radial sky gradient background, floating badge and animated glow shapes.",
      image: "/assets/images/showcase/blocks/hero-section-03.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-03",
    },
    "hero-section-04": {
      title: "Hero Section 04",
      tags: ["Section", "Pro"],
      description:
        "A hero with app store badges and a staggered reveal of the product mock below.",
      image: "/assets/images/showcase/blocks/hero-section-04.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-04",
    },
    "hero-section-05": {
      title: "Hero Section 05",
      tags: ["Section", "Pro"],
      isRepresentative: true,
      description:
        "A hero with a bold headline, feature checklist and a browser-framed screenshot.",
      image: "/assets/images/showcase/blocks/hero-section-05.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-05",
    },
    "hero-section-06": {
      title: "Hero Section 06",
      tags: ["Section", "Pro"],
      description:
        "A hero with a perspective-tilted dashboard mock that floats over a gradient backdrop.",
      image: "/assets/images/showcase/blocks/hero-section-06.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-06",
    },
    "hero-section-07": {
      title: "Hero Section 07",
      tags: ["Section", "Pro"],
      description:
        "A hero with inline highlighted heading, icon grid and scroll-driven parallax decorations.",
      image: "/assets/images/showcase/blocks/hero-section-07.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-07",
    },
    "hero-section-08": {
      title: "Hero Section 08",
      tags: ["Section", "Pro"],
      description:
        "A split hero with logo cloud, marketing copy and a stacked product preview.",
      image: "/assets/images/showcase/blocks/hero-section-08.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-08",
    },
    "hero-section-09": {
      title: "Hero Section 09",
      tags: ["Section", "Pro"],
      description:
        "A hero with motion-staggered heading reveal and a glowing product screenshot.",
      image: "/assets/images/showcase/blocks/hero-section-09.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-09",
    },
    "hero-section-10": {
      title: "Hero Section 10",
      tags: ["Section", "Animation", "Pro"],
      description:
        "A full-screen hero with a breathing animated radial-gradient background, staggered entrance, and pill CTAs.",
      image: "/assets/images/showcase/blocks/hero-section-10.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-10",
    },
    "hero-section-12": {
      title: "Hero Section 12",
      tags: ["Hero", "Pro"],
      description:
        "A two-column landing hero with massive typography, social proof avatars, an interactive tech stack, and a stack of live visual demos.",
      image: "/assets/images/showcase/blocks/hero-section-12.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/hero-section-12",
    },
    "analog-clock": {
      title: "Mockup: Analog Clock",
      isRepresentative: true,
      tags: ["Mockups", "Pro"],
      description:
        "A live-ticking analog clock face with metallic bezel, glass sheen, and smooth-sweep hands driven by system time.",
      image: "/assets/images/showcase/blocks/analog-clock.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/analog-clock",
    },
    "command-palette": {
      title: "Mockup: Command Palette",
      tags: ["Mockups", "Pro"],
      description:
        "A simulated cursor opening a command palette, typing a query, and picking a result on a GSAP loop.",
      image: "/assets/images/showcase/blocks/command-palette.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/command-palette",
    },
    "handoff-menu": {
      title: "Mockup: Handoff Menu",
      tags: ["Mockups", "Pro"],
      description:
        "AI handoff menu items that form a column and scroll on a loop — run in Opencode, Cursor, Claude, Codex, or Zed.",
      image: "/assets/images/showcase/blocks/handoff-menu.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/handoff-menu",
    },
    "integration-marquee": {
      title: "Mockup: Integration Marquee",
      tags: ["Mockups", "Pro"],
      description:
        "Three rows of integration icon tiles scrolling in alternating directions on a 3D-tilted plane.",
      image: "/assets/images/showcase/blocks/integration-marquee.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/integration-marquee",
    },
    "contribution-heatmap": {
      title: "Mockup: Contribution Heatmap",
      tags: ["Interactions", "Pro"],
      description:
        "A GitHub-style contribution heatmap with staggered cell reveal, count-up total, hover tooltips, and four color themes.",
      image: "/assets/images/showcase/blocks/contribution-heatmap.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/contribution-heatmap",
    },
    "milestone-timeline": {
      title: "Mockup: Milestone Timeline",
      tags: ["Mockups", "Pro"],
      description:
        "A horizontal milestone track filled up to today, with checkmarked, glowing, and hollow checkpoints on alternating cards.",
      image: "/assets/images/showcase/blocks/milestone-timeline.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/milestone-timeline",
    },
    "page-summary": {
      title: "Mockup: Page Summary",
      tags: ["Mockups", "Pro"],
      description:
        "A page mockup feeding an AI summary bubble whose bullets reveal word-by-word with a blur-to-sharp fade.",
      image: "/assets/images/showcase/blocks/page-summary.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/page-summary",
    },
    "pipeline-run": {
      title: "Mockup: Pipeline Run",
      tags: ["Mockups", "Pro"],
      description:
        "A CI pipeline with Build, parallel Verify jobs, and a waiting Deploy stage, connected by fanned dashed elbows.",
      image: "/assets/images/showcase/blocks/pipeline-run.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/pipeline-run",
    },
    "tilt-bank-card": {
      title: "Mockup: Tilt Bank Card",
      tags: ["Interactions", "Pro"],
      description:
        "A flat-color fintech bank card with mouse-tracked 3D tilt and a moving shine highlight.",
      image: "/assets/images/showcase/blocks/tilt-bank-card.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/tilt-bank-card",
    },
    "kanban-flow": {
      title: "Mockup: Kanban Flow",
      tags: ["Mockups", "Pro"],
      description:
        "A three-column kanban board where task cards slide across columns on a GSAP timeline, picking up checkmarks in Done.",
      image: "/assets/images/showcase/blocks/kanban-flow.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/kanban-flow",
    },
    "merge-flow": {
      title: "Mockup: Merge Flow",
      tags: ["Mockups", "Pro"],
      description:
        "Four files flowing rightward into a merging badge, then a beam carrying on to a merged-result icon that pops into a dashed placeholder slot.",
      image: "/assets/images/showcase/blocks/merge-flow.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/merge-flow",
    },
    "network-mesh": {
      title: "Mockup: Network Mesh",
      tags: ["Mockups", "Pro"],
      description:
        "A hub node connected to satellite icons by curved animated beams, with a faint mesh perimeter linking the ring.",
      image: "/assets/images/showcase/blocks/network-mesh.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/network-mesh",
    },
    "revenue-chart": {
      title: "Mockup: Revenue Chart",
      tags: ["Mockups", "Pro"],
      description: "A bar chart with a highlighted peak and summary legend.",
      image: "/assets/images/showcase/blocks/revenue-chart.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/revenue-chart",
    },
    "storage-tank": {
      title: "Mockup: Storage Tank",
      tags: ["Mockups", "Pro"],
      description:
        "A capsule storage tank filling with glossy liquid and a curved meniscus surface, with the percentage in the headspace above.",
      image: "/assets/images/showcase/blocks/storage-tank.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/storage-tank",
    },
    "drag-reorder": {
      title: "Mockup: Drag Reorder",
      tags: ["Mockups", "Pro"],
      description:
        "A cursor grabbing a list row by its handle, dragging it past the row below to swap places, then reversing back.",
      image: "/assets/images/showcase/blocks/drag-reorder.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/drag-reorder",
    },
    "swipe-cards": {
      title: "Mockup: Swipe Cards",
      tags: ["Mockups", "Pro"],
      description:
        "A cursor swiping the front card of a stack sideways with a LIKE stamp, flying off screen while the next card scales up to take the front.",
      image: "/assets/images/showcase/blocks/swipe-cards.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/swipe-cards",
    },
    "star-rating": {
      title: "Mockup: Star Rating",
      tags: ["Mockups", "Pro"],
      description:
        "A hover-fill star preview that fills progressively as the cursor sweeps across, locking in on click with a pop and a thank-you message.",
      image: "/assets/images/showcase/blocks/star-rating.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/star-rating",
    },
    "code-diff": {
      title: "Mockup: Code Diff",
      tags: ["Mockups", "Pro"],
      description:
        "A terminal-style code diff viewer with syntax-highlighted add/del lines, staggered reveal animation, and a copy button.",
      image: "/assets/images/showcase/blocks/code-diff.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/code-diff",
    },
    "txn-integrity": {
      title: "Mockup: Txn Integrity",
      tags: ["Mockups", "Pro"],
      description:
        "A transaction ID scrambling char-by-char into its final form with a blinking cursor, status dot, and minted state.",
      image: "/assets/images/showcase/blocks/txn-integrity.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/txn-integrity",
    },
    "encryption-card": {
      title: "Mockup: Encryption Card",
      tags: ["Mockups", "Pro"],
      description:
        "Plaintext tiles transforming into scrambling cipher tiles character-by-character, with active pop and settled cyan states.",
      image: "/assets/images/showcase/blocks/encryption-card.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/encryption-card",
    },
    "signed-payload": {
      title: "Mockup: Signed Payload",
      tags: ["Mockups", "Pro"],
      description:
        "A document filling in, a hash lighting up left-to-right, and an RSA-2048 stamp dropping in as the signature verifies.",
      image: "/assets/images/showcase/blocks/signed-payload.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/signed-payload",
    },
    "fraud-shield": {
      title: "Mockup: Fraud Shield",
      tags: ["Mockups", "Pro"],
      description:
        "A scanning spinner flagging malicious activity while blocked emails reveal one-by-one with red X badges.",
      image: "/assets/images/showcase/blocks/fraud-shield.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/fraud-shield",
    },
    "collab-cursors": {
      title: "Mockup: Collab Cursors",
      tags: ["Mockups", "Pro"],
      description:
        "Two named multiplayer cursors wandering a shared canvas on independent timelines, each selecting different shapes.",
      image: "/assets/images/showcase/blocks/collab-cursor.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/collab-cursors",
    },
    "study-streak": {
      title: "Mockup: Study Streak",
      tags: ["Mockups", "Pro"],
      description:
        "A study streak card with a progress ring and week of day pills — completed, pulsing today, and hollow upcoming.",
      image: "/assets/images/showcase/blocks/study-streak.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/study-streak",
    },
    "navigation-1": {
      title: "Navigation 1",
      tags: ["Navigation", "Pro"],
      description:
        "A corner hamburger toggle that springs into a full-screen violet menu with staggered links, socials, and a contact CTA.",
      image: "/assets/images/showcase/blocks/navigation-1.avif",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/navigation-1",
    },
    "navigation-2": {
      title: "Navigation 2",
      tags: ["Navigation", "Pro"],
      description:
        "A floating icon toolbar that springs open to reveal a content panel above the active icon.",
      image: "/assets/images/showcase/blocks/navigation-2.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-2",
    },
    "navigation-3": {
      title: "Navigation 3",
      tags: ["Navigation", "Pro"],
      description:
        "A full-screen nav that slides in with a liquid 50vw border-radius reveal and staggered oversized links.",
      image: "/assets/images/showcase/blocks/navigation-3.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-3",
    },
    "navigation-4": {
      title: "Navigation 4",
      tags: ["Navigation", "Pro"],
      description:
        "A Mintlify-style navigation dropdown with a sliding highlight pill and directional slide animations between tab panels.",
      image: "/assets/images/showcase/blocks/navigation-4.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-4",
    },
    "navigation-5": {
      title: "Navigation 5",
      tags: ["Navigation", "Pro"],
      description:
        "A floating pill navbar that animates its width, condenses on scroll, and collapses into a mobile sheet.",
      image: "/assets/images/showcase/blocks/navigation-5.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-5",
    },
    "navigation-6": {
      title: "Navigation 6",
      tags: ["Navigation", "Pro"],
      description:
        "A column of fixed side lines that stretch toward the cursor with springs, expanding into labeled nav links on hover.",
      image: "/assets/images/showcase/blocks/navigation-6.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-6",
    },
    "navigation-7": {
      title: "Navigation 7",
      isRepresentative: true,
      tags: ["Navigation", "Pro"],
      description:
        "A glass pill mega-menu navbar that intensifies on scroll, with spring mega-dropdowns, staggered item reveals, and a mobile accordion sheet.",
      image: "/assets/images/showcase/blocks/navigation-7.png",
      imageClassName: "object-cover invert-100 dark:invert-0",
      isPro: true,
      proUrl: "/blocks/navigation-7",
    },
    "navigation-8": {
      title: "Navigation 8",
      tags: ["Navigation", "Pro"],
      description:
        "A top navbar that hides on scroll-down and reveals on scroll-up, with a full-screen mobile menu and animated dropdown indicators.",
      image: "/assets/images/showcase/blocks/navigation-8.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-8",
    },
    "navigation-9": {
      title: "Navigation 9",
      tags: ["Navigation", "Pro"],
      description:
        "A fixed floating navbar that shrinks on scroll, with hover mega-dropdowns featuring promo art panels and an animated mobile accordion.",
      image: "/assets/images/showcase/blocks/navigation-9.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-9",
    },
    "navigation-10": {
      title: "Navigation 10",
      tags: ["Navigation", "Pro"],
      description:
        "A rounded navbar with ridge shadows and dual-column mega-menu dropdowns featuring a blog panel, directional panel transitions, and a mobile accordion.",
      image: "/assets/images/showcase/blocks/navigation-10.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/navigation-10",
    },
    "bento-section-01": {
      title: "Bento Section 01",
      tags: ["Bento", "Pro"],
      description:
        "Developer-stats bento — a Unified Performance Stats visual with the GitHub Repo Card, Terminal, and Matrix Code Rain components.",
      image: "/assets/images/showcase/blocks/bento-section-01.avif",
      imageClassName: "object-contain",
      isPro: true,
      proUrl: "/blocks/bento-section-01",
    },
    "bento-section-02": {
      title: "Bento Section 02",
      isRepresentative: true,
      tags: ["Bento", "Pro"],
      description:
        "Assist AI bento — a five-card 'This AI can do a lot' grid with typewriter notepad, chat thread, gradient chart + tooltip, web-search panel, and code editor.",
      image: "/assets/images/showcase/blocks/bento-section-02.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/bento-section-02",
    },
    "bento-section-04": {
      title: "Bento Section 04",
      tags: ["Bento", "Pro"],
      description:
        "Services bento — a browser mockup with CTA, a progress gauge with a cycling notification stack, an animated world map, a glow keyboard, and an animated component graphic.",
      image: "/assets/images/showcase/blocks/bento-section-04.avif",
      imageClassName: "object-contain",
      isPro: true,
      proUrl: "/blocks/bento-section-04",
    },
    "pricing-01": {
      title: "Pricing Section 01",
      isRepresentative: true,
      tags: ["Pricing", "Pro"],
      description:
        "Three-tier pricing — animated grainy plan cards with hex icons, feature lists, and renewal footer.",
      image: "/assets/images/showcase/blocks/pricing-section-01.avif",
      imageClassName: "object-cover",
      isPro: true,
      proUrl: "/blocks/pricing-01",
    },
  },
};
