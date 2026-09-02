export interface Component {
  title: string;
  tags: string[];
  description: string;
  image: string;
  heroImage?: string;
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
      image: "/assets/images/showcase/components/water-ripple-effect.jpeg",
      isNew: true,
      imageClassName: "scale-85",
      heroImage: "/assets/images/landing-page/hero/water-ripple.webp",
    },
    "custom-cursor": {
      title: "Custom Cursor",
      tags: ["Cursor", "Animation", "Interactive"],
      description: "A customizable cursor that follows the mouse.",
      image: "/assets/images/showcase/components/custom-cursor.png",
      isNew: true,
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/custom-cursor.webp",
    },
    "animated-code-block": {
      title: "Animated Code Block",
      tags: ["Animation", "Interactive"],
      description: "Code snippets with typing and highlighting effects.",
      image: "/assets/images/showcase/components/animated-code-block.png",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/code-block.webp",
    },
    "cyberpunk-card": {
      title: "Cyberpunk Card",
      tags: ["Cards", "Futuristic"],
      description:
        "A futuristic card design with neon glow and tech aesthetics.",
      image: "/assets/images/showcase/components/cyberpunkcard.png",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/cyberpunk-card.webp",
    },
    "grainy-background": {
      title: "Grainy Background",
      tags: ["Background", "Animation"],
      description: "Smooth shifting grainy background for modern UIs.",
      image: "/assets/images/showcase/components/grainy-background.png",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/grainy-background.webp",
    },
    "animated-text": {
      title: "Animated Text",
      tags: ["Typography", "Animation"],
      description: "Text with various animation effects and transitions.",
      image: "/assets/images/showcase/components/animated-text.png",
      imageClassName: "invert-100 dark:invert-0 object-cover",
      heroImage: "/assets/images/landing-page/hero/animated-text.webp",
    },
    "bubble-background": {
      title: "Bubble Background",
      tags: ["Background", "Interactive", "Animation"],
      description: "An interactive floating bubble animation for backgrounds.",
      image: "/assets/images/showcase/components/bubbles-background.png",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/bubbles-background.webp",
    },
    "dynamic-ripple": {
      title: "Dynamic Ripple",
      tags: ["Effects", "Interactive"],
      description:
        "Interactive ripple effect that responds to cursor or touch.",
      image: "/assets/images/showcase/components/dynamic-ripple.png",
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/dynamic-ripple.webp",
    },
    "github-repo-card": {
      title: "GitHub Repo Card",
      tags: ["Cards", "GitHub"],
      description:
        "A card component that displays GitHub repository information.",
      image: "/assets/images/showcase/components/github-repo-card.png",
      imageClassName: "scale-85",
      heroImage: "/assets/images/landing-page/hero/repo-card.webp",
    },
    "glitch-button": {
      title: "Glitch Button",
      tags: ["Buttons", "Effects", "Glitch"],
      description: "A button with a digital glitch effect on hover and click.",
      image: "/assets/images/showcase/components/glitch-button.png",
      imageClassName: "scale-50",
      heroImage: "/assets/images/landing-page/hero/glitch-button.webp",
    },
    keyboard: {
      title: "Keyboard",
      tags: ["Interactive", "Tools", "Mock"],
      description: "Interactive keyboard component with customizable keys.",
      image: "/assets/images/showcase/components/keyboard.png",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/keyboard.webp",
    },
    "ms-paint": {
      title: "MS Paint",
      tags: ["Interactive", "Tools", "Mock"],
      description: "A nostalgic MS Paint-like drawing tool.",
      image: "/assets/images/showcase/components/ms-paint.png",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/ms-paint.webp",
    },
    "lamp-heading": {
      title: "Lamp Heading",
      tags: ["Typography", "Effects", "Futuristic"],
      description: "A heading component with a lamp effect.",
      image: "/assets/images/showcase/components/lamp-heading.png",
      imageClassName: "invert-100 dark:invert-0 object-cover",
      heroImage: "/assets/images/landing-page/hero/lamp-heading.webp",
    },
    "image-comparison": {
      title: "Image Comparison",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for comparing two images side-by-side.",
      image: "/assets/images/showcase/components/image-comparison.png",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/image-comparison.webp",
    },
    "image-scanner": {
      title: "Image Scanner",
      tags: ["Interactive", "Image", "Media"],
      description: "A component for scanning images with a futuristic effect.",
      image: "/assets/images/showcase/components/image-scanner.png",
      imageClassName: "scale-80 contrast-105",
      heroImage: "/assets/images/landing-page/hero/image-scanner.webp",
    },
    "glow-card": {
      title: "Glow Card",
      tags: ["Cards", "Effects", "Animation", "Interactive"],
      description: "A card component with subtle animation and transitions.",
      image: "/assets/images/showcase/components/glow-card.png",
      imageClassName: "scale-90 rounded-3xl p-3 overflow-hidden",
      heroImage: "/assets/images/landing-page/hero/glow-card.webp",
    },
    marquee: {
      title: "Marquee",
      tags: ["Interactive", "Animation"],
      description: "A customizable, interactive scrolling marquee component.",
      image: "/assets/images/showcase/components/marquee.png",
      imageClassName: "scale-90",
      heroImage: "/assets/images/landing-page/hero/marquee.webp",
    },
    "matrix-code-rain": {
      title: "Matrix Code Rain",
      tags: ["Background", "Effects", "Animation"],
      description: "A component that simulates a matrix code rain effect.",
      image: "/assets/images/showcase/components/matrix-code-rain.png",
      imageClassName: "object-cover scale-101 invert dark:invert-0",
      heroImage: "/assets/images/landing-page/hero/matrix-code-rain.webp",
    },
    "morphing-blob": {
      title: "Morphing Blob",
      tags: ["Background", "Effects", "Animation"],
      description: "A dynamic blob powered by Three.js and shaders.",
      image: "/assets/images/showcase/components/morphing-blob.png",
      heroImage: "/assets/images/landing-page/hero/morphing-blob.webp",
    },
    "music-player": {
      title: "Music Player",
      tags: ["Interactive", "Media", "Player"],
      description:
        "An immersive music player with morphing collapse/expand animation, glass controls, and queue management.",
      image: "/assets/images/showcase/components/music-player.png",
      imageClassName: "scale-90 dark:contrast-105",
      heroImage: "/assets/images/landing-page/hero/music-player.webp",
    },
    "reveal-card": {
      title: "Reveal Card",
      tags: ["Cards", "Effects", "3D", "Interactive"],
      description: "A card with reveal animations that show content on hover.",
      image: "/assets/images/showcase/components/reveal-card.png",
      imageClassName: "scale-95 -mt-5",
      heroImage: "/assets/images/landing-page/hero/reveal-card.webp",
    },
    terminal: {
      title: "Terminal",
      tags: ["Interactive", "Mock", "Tools"],
      description:
        "A command-line interface with typing animations and responses.",
      image: "/assets/images/showcase/components/interactive-terminal.png",
      imageClassName: "scale-80",
      heroImage: "/assets/images/landing-page/hero/terminal.webp",
    },
    "apple-glass-effect": {
      title: "Apple Glass Effect",
      tags: ["Effects", "Glassmorphism", "Interactive"],
      description: "A customizable Apple Glass effect component.",
      image: "/assets/images/showcase/components/apple-glass-effect.png",
      isNew: true,
      imageClassName: "object-cover scale-101",
      heroImage: "/assets/images/landing-page/hero/apple-glass-effect.webp",
    },
    "3d-layered-card": {
      title: "3D Layered Card",
      tags: ["Card", "3D", "Animation", "Interactive"],
      description: "A 3D card with layered effects and animations.",
      image: "/assets/images/showcase/components/3d-layered-card.png",
      isNew: true,
      imageClassName: "scale-95",
      heroImage: "/assets/images/landing-page/hero/3d-layered-card.webp",
    },
  },
  templates: {
    "singlepage-portfolio": {
      title: "Single Page Portfolio",
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant single page portfolio template.",
      image: "/assets/images/showcase/templates/single-page-portfolio.png",
      imageClassName: "object-cover",
    },
    "minimalist-portfolio": {
      title: "Minimalist Portfolio",
      isNew: true,
      tags: ["Portfolio", "Template", "Minimalist", "Single Page"],
      description: "A simple, elegant minimalist portfolio template.",
      image: "/assets/images/showcase/templates/minimalist-portfolio.png",
      imageClassName: "object-cover",
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
