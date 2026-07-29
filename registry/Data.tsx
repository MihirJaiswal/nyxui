export interface Component {
  title: string;
  tags: string[];
  description: string;
  image: string;
  isNew?: boolean;
  imageClassName?: string;
}

export interface template {
  title: string;
  tags: string[];
  description: string;
  image: string;
  isNew?: boolean;
  imageClassName?: string;
}

export interface Block {
  title: string;
  tags: string[];
  description: string;
  image: string;
  isNew?: boolean;
  imageClassName?: string;
}

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
    "water-ripple-effect": {
      title: "Water Ripple Effect",
      tags: ["Interactive", "Visual Effects", "Image"],
      description: "A mesmerizing water ripple effect for interactive images.",
      image: "/assets/images/showcase/components/water-ripple-effect.png",
      isNew: true,
      imageClassName: "scale-85",
    },
    "custom-cursor": {
      title: "Custom Cursor",
      tags: ["Cursor", "Animation", "Interactive"],
      description: "A customizable cursor that follows the mouse.",
      image: "/assets/images/showcase/components/custom-cursor.png",
      isNew: true,
      imageClassName: "",
    },
    "animated-code-block": {
      title: "Animated Code Block",
      tags: ["Animation", "Interactive"],
      description: "Code snippets with typing and highlighting effects.",
      image: "/assets/images/showcase/components/animated-code-block.png",
    },
    "cyberpunk-card": {
      title: "Cyberpunk Card",
      tags: ["Cards", "Futuristic"],
      description:
        "A futuristic card design with neon glow and tech aesthetics.",
      image: "/assets/images/showcase/components/cyberpunkcard.png",
      imageClassName: "scale-90",
    },
    "grainy-background": {
      title: "Grainy Background",
      tags: ["Background", "Animation"],
      description: "Smooth shifting grainy background for modern UIs.",
      image: "/assets/images/showcase/components/grainy-background.png",
      imageClassName: "object-cover scale-101",
    },
    "animated-text": {
      title: "Animated Text",
      tags: ["Typography", "Animation"],
      description: "Text with various animation effects and transitions.",
      image: "/assets/images/showcase/components/animated-text.png",
      imageClassName: "invert-100 dark:invert-0 object-cover",
    },
    "bubble-background": {
      title: "Bubble Background",
      tags: ["Background", "Interactive", "Animation"],
      description: "An interactive floating bubble animation for backgrounds.",
      image: "/assets/images/showcase/components/bubbles-background.png",
      imageClassName: "object-cover scale-101",
    },
    "dynamic-ripple": {
      title: "Dynamic Ripple",
      tags: ["Effects", "Interactive"],
      description:
        "Interactive ripple effect that responds to cursor or touch.",
      image: "/assets/images/showcase/components/dynamic-ripple.png",
      imageClassName: "object-cover scale-101",
    },
    "github-repo-card": {
      title: "GitHub Repo Card",
      tags: ["Cards", "GitHub"],
      description:
        "A card component that displays GitHub repository information.",
      image: "/assets/images/showcase/components/github-repo-card.png",
    },
    "glitch-button": {
      title: "Glitch Button",
      tags: ["Buttons", "Effects", "Glitch"],
      description: "A button with a digital glitch effect on hover and click.",
      image: "/assets/images/showcase/components/glitch-button.png",
      imageClassName: "scale-50",
    },
    keyboard: {
      title: "Keyboard",
      tags: ["Interactive", "Tools", "Mock"],
      description: "Interactive keyboard component with customizable keys.",
      image: "/assets/images/showcase/components/keyboard.png",
    },
    "ms-paint": {
      title: "MS Paint",
      tags: ["Interactive", "Tools", "Mock"],
      description: "A nostalgic MS Paint-like drawing tool.",
      image: "/assets/images/showcase/components/ms-paint.png",
      imageClassName: "scale-80",
    },
    "lamp-heading": {
      title: "Lamp Heading",
      tags: ["Typography", "Effects", "Futuristic"],
      description: "A heading component with a lamp effect.",
      image: "/assets/images/showcase/components/lamp-heading.png",
      imageClassName: "invert-100 dark:invert-0 object-cover",
    },
    "liquid-metal-button": {
      title: "Liquid Metal Button",
      tags: ["Buttons", "Effects", "Interactive"],
      description: "A button with fluid metallic animation effects.",
      image: "/assets/images/showcase/components/liquid-metal-button.png",
    },
    "image-comparison": {
      title: "Image Comparison",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for comparing two images side-by-side.",
      image: "/assets/images/showcase/components/image-comparison.png",
      imageClassName: "scale-80",
    },
    "image-scanner": {
      title: "Image Scanner",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for scanning images with a futuristic effect.",
      image: "/assets/images/showcase/components/image-scanner.png",
      imageClassName: "scale-80 contrast-105",
    },
    "glow-card": {
      title: "Glow Card",
      tags: ["Cards", "Effects", "Animation", "Interactive"],
      description: "A card component with subtle animation and transitions.",
      image: "/assets/images/showcase/components/glow-card.png",
      imageClassName: "scale-90 rounded-3xl p-3 overflow-hidden",
    },
    marquee: {
      title: "Marquee",
      tags: ["Interactive", "Animation"],
      description: "A customizable, interactive scrolling marquee component.",
      image: "/assets/images/showcase/components/marquee.png",
      imageClassName: "invert-100 grayscale dark:invert-0 object-cover",
    },
    "matrix-code-rain": {
      title: "Matrix Code Rain",
      tags: ["Background", "Effects", "Animation"],
      description: "A component that simulates a matrix code rain effect.",
      image: "/assets/images/showcase/components/matrix-code-rain.png",
      imageClassName: "object-cover scale-101",
    },
    "morphing-blob": {
      title: "Morphing Blob",
      tags: ["Background", "Effects", "Animation"],
      description: "A dynamic blob powered by Three.js and shaders.",
      image: "/assets/images/showcase/components/morphing-blob.png",
    },
    "music-player": {
      title: "Music Player",
      tags: ["Interactive", "Media", "Player"],
      description:
        "A customizable music player component with multiple themes.",
      image: "/assets/images/showcase/components/music-player.png",
    },
    "reveal-card": {
      title: "Reveal Card",
      tags: ["Cards", "Effects", "3D", "Interactive"],
      description: "A card with reveal animations that show content on hover.",
      image: "/assets/images/showcase/components/reveal-card.png",
      imageClassName: "scale-95",
    },
    "scroll-animation-trigger": {
      title: "Scroll Animation Trigger",
      tags: ["Interactive", "Animation", "Scroll", "Effects"],
      description: "Elements that animate when scrolled into view.",
      image: "/assets/images/showcase/components/scroll-animation-trigger.png",
    },
    terminal: {
      title: "Terminal",
      tags: ["Interactive", "Mock", "Tools"],
      description:
        "A command-line interface with typing animations and responses.",
      image: "/assets/images/showcase/components/interactive-terminal.png",
    },
    "apple-glass-effect": {
      title: "Apple Glass Effect",
      tags: ["Effects", "Glassmorphism", "Interactive"],
      description: "A customizable Apple Glass effect component.",
      image: "/assets/images/showcase/components/apple-glass-effect.png",
      isNew: true,
      imageClassName: "object-cover scale-101",
    },
    "3d-layered-card": {
      title: "3D Layered Card",
      tags: ["Card", "3D", "Animation", "Interactive"],
      description: "A 3D card with layered effects and animations.",
      image: "/assets/images/showcase/components/3d-layered-card.png",
      isNew: true,
      imageClassName: "scale-95",
    },
  },
  templates: {
    "singlepage-portfolio": {
      title: "Single Page Portfolio",
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant single page portfolio template.",
      image: "/assets/images/showcase/templates/single-page-portfolio.png",
    },
    "minimalist-portfolio": {
      title: "Minimalist Portfolio",
      isNew: true,
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant minimalist portfolio template.",
      image: "/assets/images/showcase/templates/minimalist-portfolio.png",
    },
  },
  blocks: {
    footer: {
      title: "Footer",
      tags: ["Footer", "Section"],
      description: "A simple footer component.",
      image: "/assets/images/showcase/blocks/footer.png",
      isNew: true,
    },
  },
};
