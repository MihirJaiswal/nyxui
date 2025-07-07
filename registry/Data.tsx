export interface Component {
  title: string;
  tags: string[];
  description: string;
  image: string;
  isNew?: boolean;
}

interface Links {
  documentation: string;
}

interface ComponentsData {
  links: Links;
  components: {
    [key: string]: Component;
  };
  templates: Record<string, unknown>;
}

export const componentsData: ComponentsData = {
  links: {
    documentation: "Introduction",
  },
  components: {
    
    "water-ripple-effect": {
      title: "Water Ripple Effect",
      tags: ["Interactive", "Visual Effects", "Image"],
      description: "A mesmerizing water ripple effect for Images.",
      image: "/assets/images/showcase/water-ripple-effect.png",
      isNew: true,
    },
    "custom-cursor": {
      title: "Custom Cursor",
      tags: ["Cursor", "Animation", "Interactive"],
      description: "A customizable cursor that follows the mouse.",
      image: "/assets/images/showcase/custom-cursor.png",
      isNew: true,
    },
    "animated-code-block": {
      title: "Animated Code Block",
      tags: ["Animation", "Interactive"],
      description: "Code snippets with typing and highlishting effects.",
      image: "/assets/images/showcase/animated-code-block.png",
    },
    "cyberpunk-card": {
      title: "Cyberpunk Card",
      tags: ["Cards", "Futuristic"],
      description:
        "A futuristic card design with neon glow and tech aeshetics.",
      image: "/assets/images/showcase/cyberpunkcard.png",
    },
    "animated-gradient-bg": {
      title: "Animated Gradient Background",
      tags: ["Background", "Animation"],
      description: "Smooth shifting gradient background for modern UIs.",
      image: "/assets/images/showcase/animated-gradient-background.png",
    },
    "animated-text": {
      title: "Animated Text",
      tags: ["Typography", "Animation"],
      description: "Text with various animation effects and transitions.",
      image: "/assets/images/showcase/animated-text.png",
    },
    "bento-grid": {
      title: "Bento Grid",
      tags: ["Layout", "Grid"],
      description: "Modern grid layout inspired by Bento Box designs.",
      image: "/assets/images/showcase/bento-grid.png",
    },
    "bubble-background": {
      title: "Bubble Background",
      tags: ["Background", "Interactive", "Animation"],
      description: "Floating bubbles interactive animation for bg.",
      image: "/assets/images/showcase/bubbles-background.png",
    },
    "dynamic-ripple": {
      title: "Dynamic Ripple",
      tags: ["Effects", "Interactive"],
      description:
        "Interactive ripple effect that responds to cursor or touch.",
      image: "/assets/images/showcase/dynamic-ripple.png",
    },
    "github-profile-card": {
      title: "GitHub Profile Card",
      tags: ["Cards", "GitHub", "Profile"],
      description:
        "A card component that displays GitHub user profile information.",
      image: "/assets/images/showcase/github-profile-card.png",
    },
    "github-repo-card": {
      title: "GitHub Repo Card",
      tags: ["Cards", "GitHub"],
      description:
        "A card component that displays GitHub repository information.",
      image: "/assets/images/showcase/github-repo-card.png",
    },
    "glitch-button": {
      title: "Glitch Button",
      tags: ["Buttons", "Effects", "Glitch"],
      description: "A button with a digital glitch effect on hover and click.",
      image: "/assets/images/showcase/glitch-button.png",
    },
    "keyboard": {
      title: "Keyboard",
      tags: ["Interactive", "Tools", "Mock"],
      description: "Interactive keyboard component with customizable keys.",
      image: "/assets/images/showcase/keyboard.png",
      isNew: true,
    },
    "ms-paint": {
      title: "MS Paint",
      tags: ["Interactive", "Tools", "Mock"],
      description: "A nostalgic MS Paint-like drawing tool.",
      image: "/assets/images/showcase/ms-paint.png",
    },
    "lamp-heading": {
      title: "Lamp Heading",
      tags: ["Typography", "Effects", "Futuristic"],
      description: "A heading component with a lamp effect.",
      image: "/assets/images/showcase/lamp-heading.png",
    },
    "liquid-metal-button": {
      title: "Liquid Metal Button",
      tags: ["Buttons", "Effects", "Interactive"],
      description: "A button with fluid mettallic animation effects.",
      image: "/assets/images/showcase/liquid-metal-button.png",
    },
    "image-comparison": {
      title: "Image Comparison",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for comparing two images side-by-side.",
      image: "/assets/images/showcase/image-comparison.png",
    },
    "image-scanner": {
      title: "Image Scanner",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for scanning images with a futuristic effect.",
      image: "/assets/images/showcase/image-scanner.png",
    },
    "majestic-card": {
      title: "Majestic Card",
      tags: ["Cards", "Effects", "Animation", "Interactive"],
      description: "A card component with subtle animation and transitions.",
      image: "/assets/images/showcase/majestic-card.png",
    },
    "marquee": {
      title: "Marquee",
      tags: ["Interactive", "Interactive", "Animation"],
      description: "A customizable, interactive scrolling marquee component.",
      image: "/assets/images/showcase/marquee.png",
    },
    "matrix-code-rain": {
      title: "Matrix Code Rain",
      tags: ["Background", "Effects", "Animation"],
      description: "A component that simulates a matrix code rain effect.",
      image: "/assets/images/showcase/matrix-code-rain.png",
    },
    "morphing-blob": {
      title: "Morphing Blob",
      tags: ["Background", "Effects", "Animation"],
      description:
        "Organic shape that continuously morphs with smooth transitions.",
      image: "/assets/images/showcase/morphing-blob.png",
    },
    "music-player": {
      title: "Music Player",
      tags: ["Interactive", "Media", "Player"],
      description:
        "A customizable music player component with multiple themes.",
      image: "/assets/images/showcase/music-player.png",
    },
    "reveal-card": {
      title: "Reveal Card",
      tags: ["Cards", "Effects", "3d", "Interactive"],
      description: "Card with reveal animations that shows content on hover.",
      image: "/assets/images/showcase/reveal-card.png",
    },
    "scroll-animation-trigger": {
      title: "Scroll Animation Trigger",
      tags: ["Interactive", "Animation", "Scroll", "Effects"],
      description: "Elements that animate when scrolled into view.",
      image: "/assets/images/showcase/scroll-animation-trigger.png",
    },
    "terminal": {
      title: "Terminal",
      tags: ["Interactive", "Mock", "Tools"],
      description:
        "Command line interface with typing animations and responses",
      image: "/assets/images/showcase/interactive-terminal.png",
    },
  },
  templates: {
    "portfolio": { 
      title: "Minimalist Portfolio",
      isNew: true,
      tags: ["Portfolio", "Template", "Minimalist", "One Page" ],
      description: "A simple, elegant one-page portfolio template.",
      image: "/assets/images/templates/minimalist-portfolio.png",
      },
  },
};
