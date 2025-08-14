import type { ComponentRegistry } from "./types";

export const componentRegistry: ComponentRegistry = {
  "cyberpunk-card": {
    name: "Cyberpunk Card",
    component: "CyberpunkCard",
    props: {
      // Content
      children: {
        type: "textarea",
        default: `<div className="space-y-4">
  <h3 className="text-xl font-bold">Cyberpunk Card</h3>
  <p className="text-sm opacity-90">
    A futuristic card component with neon effects, animations, and cyberpunk aesthetics.
  </p>
  <div className="flex gap-2">
    <button className="px-4 py-2 bg-current/20 rounded text-sm hover:bg-current/30 transition-colors">
      Action
    </button>
    <button className="px-4 py-2 border border-current/30 rounded text-sm hover:border-current/50 transition-colors">
      Secondary
    </button>
  </div>
</div>`,
        label: "Children Content",
        description: "JSX content to display inside the card",
        category: "Content",
        placeholder: "Enter JSX content...",
      },

      // Theme & Colors
      theme: {
        type: "select",
        default: "neon-blue",
        options: [
          "neon-blue",
          "neon-pink",
          "neon-green",
          "neon-orange",
          "neon-purple",
          "neon-cyan",
          "neon-red",
          "matrix-green",
          "cyber-red",
          "hologram",
          "custom",
        ],
        label: "Color Theme",
        description:
          "Pre-built color schemes for different cyberpunk aesthetics",
        category: "Appearance",
      },
      customColors: {
        type: "object",
        default: {
          primary: "#3b82f6",
          secondary: "#1e40af",
          accent: "#60a5fa",
        },
        label: "Custom Colors",
        description: "Define custom color scheme when theme is set to 'custom'",
        category: "Appearance",
        conditional: {
          property: "theme",
          value: "custom",
        },
      },

      // Visual Styling
      borderStyle: {
        type: "select",
        default: "solid",
        options: [
          "solid",
          "dashed",
          "glitch",
          "corners",
          "animated",
          "circuit",
        ],
        label: "Border Style",
        description: "Different border appearances and animations",
        category: "Appearance",
      },
      rounded: {
        type: "select",
        default: "md",
        options: ["none", "sm", "md", "lg"],
        label: "Border Radius",
        description: "Corner rounding amount",
        category: "Appearance",
      },

      // Glow Effects
      glow: {
        type: "boolean",
        default: true,
        label: "Enable Glow",
        description: "Enable glowing shadow effect around the card",
        category: "Effects",
      },
      glowIntensity: {
        type: "select",
        default: 3,
        options: [1, 2, 3, 4, 5],
        label: "Glow Intensity",
        description: "Intensity of the glow effect (1=subtle, 5=intense)",
        category: "Effects",
        conditional: {
          property: "glow",
          value: true,
        },
      },

      // Background Effects
      backgroundEffect: {
        type: "select",
        default: "none",
        options: [
          "none",
          "circuit",
          "matrix",
          "scanlines",
          "particles",
          "waves",
        ],
        label: "Background Effect",
        description: "Animated background patterns and textures",
        category: "Effects",
      },

      // Interactive Effects
      colorShift: {
        type: "boolean",
        default: true,
        label: "Color Shift on Hover",
        description: "Enable rainbow color shifting when hovering",
        category: "Interactions",
      },
      lightTrail: {
        type: "boolean",
        default: true,
        label: "Mouse Light Trail",
        description: "Enable light trail that follows mouse movement",
        category: "Interactions",
      },

      // Animation Effects
      pulseAnimation: {
        type: "boolean",
        default: false,
        label: "Pulse Animation",
        description: "Enable continuous pulsing animation",
        category: "Animations",
      },
      glitchEffect: {
        type: "boolean",
        default: false,
        label: "Glitch Effect",
        description: "Enable glitch distortion on hover",
        category: "Animations",
      },
      hologramFlicker: {
        type: "boolean",
        default: false,
        label: "Hologram Flicker",
        description: "Enable hologram-like flickering effect",
        category: "Animations",
      },
      dataStream: {
        type: "boolean",
        default: false,
        label: "Data Stream Line",
        description: "Show animated data stream line at top",
        category: "Animations",
      },
      animationSpeed: {
        type: "select",
        default: "normal",
        options: ["slow", "normal", "fast"],
        label: "Animation Speed",
        description: "Overall speed of all animations",
        category: "Animations",
      },

      // State
      loading: {
        type: "boolean",
        default: false,
        label: "Loading State",
        description: "Show loading animation overlay",
        category: "State",
      },
    },
  },

  "animated-code-block": {
    name: "Animated Code Block",
    component: "AnimatedCodeBlock",
    props: {
      // Content
      code: {
        type: "textarea",
        default: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`The 10th Fibonacci number is: \${result}\`);`,
        label: "Code Content",
        description: "The code to display and animate",
        category: "Content",
        placeholder: "Enter your code here...",
      },
      language: {
        type: "select",
        default: "javascript",
        options: [
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "css",
          "scss",
          "json",
          "python",
          "bash",
          "sql",
          "yaml",
          "markdown",
        ],
        label: "Programming Language",
        description: "Language for syntax highlighting",
        category: "Content",
      },
      title: {
        type: "string",
        default: "Code",
        label: "Title",
        description: "Title displayed in the header",
        category: "Content",
      },

      // Appearance
      theme: {
        type: "select",
        default: "dark",
        options: ["dark", "terminal", "cyberpunk", "nightowl"],
        label: "Theme",
        description: "Visual theme for the code block",
        category: "Appearance",
      },
      showLineNumbers: {
        type: "boolean",
        default: true,
        label: "Show Line Numbers",
        description: "Display line numbers on the left side",
        category: "Appearance",
      },
      blurEffect: {
        type: "boolean",
        default: false,
        label: "Blur Effect",
        description: "Add a subtle blur overlay effect",
        category: "Appearance",
      },

      // Animation
      autoPlay: {
        type: "boolean",
        default: true,
        label: "Auto Play",
        description: "Start typing animation automatically",
        category: "Animation",
      },
      typingSpeed: {
        type: "number",
        default: 50,
        min: 10,
        max: 200,
        step: 10,
        label: "Typing Speed (ms)",
        description: "Speed of the typing animation in milliseconds",
        category: "Animation",
      },
      loop: {
        type: "boolean",
        default: false,
        label: "Loop Animation",
        description: "Restart animation when it completes",
        category: "Animation",
      },

      // Features
      showControls: {
        type: "boolean",
        default: true,
        label: "Show Controls",
        description: "Display play/pause and other control buttons",
        category: "Features",
      },
      highlightLines: {
        type: "object",
        default: [3, 7],
        label: "Highlight Lines",
        description: "Array of line numbers to highlight",
        category: "Features",
      },
    },
  },

  "keyboard": {
    name: "Interactive Keyboard",
    component: "InteractiveKeyboard",
    props: {
      // Layout
      layout: {
        type: "select",
        default: "standard",
        options: ["standard", "compact"],
        label: "Layout",
        description: "Keyboard layout type",
        category: "Layout",
      },
      showFunctionKeys: {
        type: "boolean",
        default: true,
        label: "Show Function Keys",
        description: "Display F1-F12 function keys row",
        category: "Layout",
      },
      showNavigationCluster: {
        type: "boolean",
        default: true,
        label: "Show Navigation Cluster",
        description: "Display navigation keys (Insert, Delete, etc.)",
        category: "Layout",
      },

      // Appearance
      theme: {
        type: "select",
        default: "cyberpunk",
        options: [
          "cyberpunk",
          "minimal",
          "retro",
          "mechanical",
          "neon",
          "pastel",
        ],
        label: "Theme",
        description: "Visual theme for the keyboard",
        category: "Appearance",
      },
      keyColor: {
        type: "color",
        default: "#2a2a2a",
        label: "Key Color",
        description: "Base color for keyboard keys",
        category: "Appearance",
      },
      keyTextColor: {
        type: "color",
        default: "#ffffff",
        label: "Key Text Color",
        description: "Color of text on keys",
        category: "Appearance",
      },
      accentColor: {
        type: "color",
        default: "#6366f1",
        label: "Accent Color",
        description: "Color for highlights and special elements",
        category: "Appearance",
      },
      keyPressedColor: {
        type: "color",
        default: "#333333",
        label: "Pressed Key Color",
        description: "Color when keys are pressed",
        category: "Appearance",
      },

      // 3D Effects
      perspective: {
        type: "number",
        default: 1000,
        min: 500,
        max: 2000,
        step: 100,
        label: "Perspective",
        description: "3D perspective value for the keyboard",
        category: "3D Effects",
      },
      rotateX: {
        type: "number",
        default: 10,
        min: 0,
        max: 45,
        step: 5,
        label: "Rotation X",
        description: "X-axis rotation in degrees",
        category: "3D Effects",
      },

      // Interaction
      allowPhysicalKeyboard: {
        type: "boolean",
        default: true,
        label: "Physical Keyboard",
        description: "Respond to physical keyboard input",
        category: "Interaction",
      },
      keyPressAnimationDuration: {
        type: "number",
        default: 150,
        min: 50,
        max: 500,
        step: 50,
        label: "Animation Duration (ms)",
        description: "Duration of key press animation",
        category: "Interaction",
      },

      // Active Keys
      activeKeys: {
        type: "object",
        default: ["KeyW", "KeyA", "KeyS", "KeyD"],
        label: "Active Keys",
        description: "Array of key codes to highlight as active",
        category: "Active Keys",
      },
      activeKeyGlowColor: {
        type: "color",
        default: "#6366f1",
        label: "Active Key Glow Color",
        description: "Color for active key glow effect",
        category: "Active Keys",
      },
      activeKeyGlowIntensity: {
        type: "number",
        default: 0.8,
        min: 0.1,
        max: 1.0,
        step: 0.1,
        label: "Glow Intensity",
        description: "Intensity of the active key glow effect",
        category: "Active Keys",
      },
    },
  },

  "3d-layered-card": {
    name: "3D Layered Card",
    component: "ThreeDLayeredCard",
    props: {
      // Content
      logo: {
        type: "string",
        default:
          "https://raw.githubusercontent.com/MihirJaiswal/nyxui/1ea447828a11aeb31e46b57a06d74916ff2dcf65/public/assets/images/3d-layered-card/snaplogo.svg",
        label: "Logo Image",
        description: "URL for the logo image",
        category: "Content",
      },
      mainImage: {
        type: "string",
        default:
          "https://raw.githubusercontent.com/MihirJaiswal/nyxui/refs/heads/main/public/assets/images/3d-layered-card/snap.png",
        label: "Main Image",
        description: "URL for the main character/content image",
        category: "Content",
      },
      title: {
        type: "string",
        default: "3D Card Title",
        label: "Title",
        description: "Title text displayed on the card",
        category: "Content",
      },
      children: {
        type: "textarea",
        default: `<div className="text-center space-y-2">
  <h3 className="text-lg font-bold">Expanded Content</h3>
  <p className="text-sm opacity-90">
    This content appears when the card is expanded.
  </p>
</div>`,
        label: "Expanded Content",
        description: "JSX content shown when card is expanded",
        category: "Content",
        placeholder: "Enter expanded content...",
      },
      height: {
        type: "object",
        default: { collapsed: 130, expanded: 300 },
        label: "Height",
        description: "Height for collapsed and expanded states",
        category: "Dimensions",
      },
      logoPosition: {
        type: "object",
        default: { expanded: 15 },
        label: "Logo Position",
        description: "Top position of logo when expanded",
        category: "Dimensions",
      },
      // Dimensions
      width: {
        type: "number",
        default: 288,
        min: 200,
        max: 500,
        step: 10,
        label: "Width (px)",
        description: "Card width in pixels",
        category: "Dimensions",
      },
      logoSize: {
        type: "number",
        default: 64,
        min: 32,
        max: 128,
        step: 8,
        label: "Logo Size (px)",
        description: "Size of the logo in pixels",
        category: "Dimensions",
      },
      titlePosition: {
        type: "number",
        default: 90,
        min: 60,
        max: 120,
        step: 5,
        label: "Title Position",
        description: "Vertical position of title from top",
        category: "Dimensions",
      },

      // Heights
      collapsedHeight: {
        type: "number",
        default: 130,
        min: 100,
        max: 200,
        step: 10,
        label: "Collapsed Height",
        description: "Height when card is collapsed",
        category: "Dimensions",
      },
      expandedHeight: {
        type: "number",
        default: 300,
        min: 250,
        max: 500,
        step: 10,
        label: "Expanded Height",
        description: "Height when card is expanded",
        category: "Dimensions",
      },

      // Styling
      backgroundColor: {
        type: "string",
        default: "bg-gradient-to-b from-[#FF9901] via-[#DF911A] to-[#724f13]",
        label: "Background",
        description: "Background gradient or color class",
        category: "Styling",
      },
      textColor: {
        type: "color",
        default: "#ffffff",
        label: "Text Color",
        description: "Color of text elements",
        category: "Styling",
      },
      borderColor: {
        type: "color",
        default: "",
        label: "Border Color",
        description: "Optional border color",
        category: "Styling",
      },
      borderWidth: {
        type: "string",
        default: "0",
        label: "Border Width",
        description: "Border width (e.g., '2px')",
        category: "Styling",
      },

      // Effects
      shineIntensity: {
        type: "number",
        default: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Shine Intensity",
        description: "Intensity of the shine effect",
        category: "Effects",
      },
      glowColor: {
        type: "string",
        default: "rgba(255, 165, 0, 0.1)",
        label: "Glow Color",
        description: "Color of the glow effect",
        category: "Effects",
      },
      glowGradient: {
        type: "color",
        default: "#fde047",
        label: "Glow Gradient",
        description: "Gradient color for glow effects",
        category: "Effects",
      },
    },
  },

  "lamp-heading": {
    name: "Lamp Heading",
    component: "LampHeading",
    props: {
      // Content
      text: {
        type: "string",
        default: "Lamp Heading",
        label: "Heading Text",
        description: "The text to display with lamp effect",
        category: "Content",
      },
      textSize: {
        type: "select",
        default: "4xl",
        options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
        label: "Text Size",
        description: "Size of the heading text",
        category: "Content",
      },

      // Lamp Properties
      direction: {
        type: "select",
        default: "below",
        options: ["above", "below"],
        label: "Light Direction",
        description: "Direction of the lamp light effect",
        category: "Lamp",
      },
      lampHeight: {
        type: "number",
        default: 80,
        min: 40,
        max: 150,
        step: 10,
        label: "Lamp Height",
        description: "Height of the lamp light cone",
        category: "Lamp",
      },
      lineHeight: {
        type: "number",
        default: 4,
        min: 2,
        max: 10,
        step: 1,
        label: "Line Height",
        description: "Height of the underline",
        category: "Lamp",
      },

      // Colors
      gradientColors: {
        type: "object",
        default: { from: "#FF33C7", via: "#CD35FF", to: "#4533F7" },
        label: "Gradient Colors",
        description: "Colors for the gradient effect (from, via, to)",
        category: "Colors",
      },

      // Effects
      glowIntensity: {
        type: "number",
        default: 1.0,
        min: 0.1,
        max: 2.0,
        step: 0.1,
        label: "Glow Intensity",
        description: "Intensity of the glow effect",
        category: "Effects",
      },
      glowSize: {
        type: "number",
        default: 30,
        min: 10,
        max: 60,
        step: 5,
        label: "Glow Size",
        description: "Size of the glow effect",
        category: "Effects",
      },
      showParticles: {
        type: "boolean",
        default: true,
        label: "Show Particles",
        description: "Display floating particles",
        category: "Effects",
      },
      showLightRays: {
        type: "boolean",
        default: false,
        label: "Show Light Rays",
        description: "Display light ray effects",
        category: "Effects",
      },
      pulseEffect: {
        type: "boolean",
        default: true,
        label: "Pulse Effect",
        description: "Enable pulsing animation",
        category: "Effects",
      },

      // Animation
      animationSpeed: {
        type: "number",
        default: 4,
        min: 1,
        max: 10,
        step: 1,
        label: "Animation Speed",
        description: "Speed of animations",
        category: "Animation",
      },
      particleCount: {
        type: "number",
        default: 8,
        min: 0,
        max: 20,
        step: 1,
        label: "Particle Count",
        description: "Number of floating particles",
        category: "Animation",
      },

      // Interaction
      interactive: {
        type: "boolean",
        default: true,
        label: "Interactive",
        description: "Enable hover interactions",
        category: "Interaction",
      },
    },
  },

  "morphing-blob": {
    name: "Morphing Blob",
    component: "MorphingBlob",
    props: {
      // Dimensions
      size: {
        type: "number",
        default: 400,
        min: 200,
        max: 800,
        step: 50,
        label: "Size (px)",
        description: "Size of the blob container",
        category: "Dimensions",
      },

      // Appearance
      theme: {
        type: "select",
        default: "aurora",
        options: ["primary", "aurora", "cosmic", "liquid", "danger"],
        label: "Color Theme",
        description: "Color scheme for the blob",
        category: "Appearance",
      },

      // Animation
      complexity: {
        type: "number",
        default: 3,
        min: 1,
        max: 10,
        step: 1,
        label: "Complexity",
        description: "Complexity of the morphing animation",
        category: "Animation",
      },
      speed: {
        type: "number",
        default: 3,
        min: 1,
        max: 10,
        step: 1,
        label: "Speed",
        description: "Speed of the morphing animation",
        category: "Animation",
      },

      // Particles
      particleCount: {
        type: "number",
        default: 150,
        min: 50,
        max: 300,
        step: 25,
        label: "Particle Count",
        description: "Number of floating particles",
        category: "Particles",
      },

      // Effects
      enableEffects: {
        type: "boolean",
        default: true,
        label: "Enable Effects",
        description:
          "Enable post-processing effects (bloom, chromatic aberration)",
        category: "Effects",
      },

      // Content
      children: {
        type: "textarea",
        default: `<div className="text-center text-white z-10 relative">
  <h2 className="text-2xl font-bold mb-2">NYX UI</h2>
</div>`,
        label: "Content",
        description: "Content to display over the blob",
        category: "Content",
        placeholder: "Enter content to overlay...",
      },
    },
  },

  "github-repo-card": {
    name: "GitHub Repo Card",
    component: "GitHubRepoCard",
    props: {
      // Repository Data
      repo: {
        type: "object",
        default: {
          name: "freeCodeCamp",
          owner: "freeCodeCamp",
          ownerAvatar:
            "https://avatars.githubusercontent.com/u/9892522?s=48&v=4",
          description:
            "An awesome open source project with modern features and clean architecture.",
          stars: 426,
          forks: 412,
          watchers: 85,
          issues: 23,
          language: "TypeScript",
          updatedAt: "2024-01-15T10:30:00Z",
          topics: ["react", "typescript", "nextjs", "tailwind"],
          activityData: [
            0.2, 0.5, 0.8, 0.3, 0.9, 0.6, 0.4, 0.7, 0.1, 0.8, 0.5, 0.9,
          ],
          isPrivate: false,
        },
        label: "Repository Data",
        description: "Complete repository information object",
        category: "Data",
      },

      // Appearance
      theme: {
        type: "select",
        default: "modern-light",
        options: [
          "modern-dark",
          "modern-light",
          "cyberpunk",
          "neo-brutalist",
          "aurora",
          "forest",
        ],
        label: "Theme",
        description: "Visual theme for the repository card",
        category: "Appearance",
      },
    },
  },

  "glow-card": {
    name: "Glow Card",
    component: "GlowCard",
    props: {
      // Content
      children: {
        type: "textarea",
        default: `<div className="text-center space-y-4">
  <h3 className="text-2xl font-bold">Glow Card</h3>
  <p className="text-sm opacity-90">
    Interactive card with stunning visual effects and mouse tracking.
  </p>
  <button className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
    Interact with me
  </button>
</div>`,
        label: "Children Content",
        description: "JSX content to display inside the card",
        category: "Content",
        placeholder: "Enter JSX content...",
      },

      // Visual Effects
      variant: {
        type: "select",
        default: "liquid",
        options: ["liquid", "laser", "cosmic", "glitch"],
        label: "Effect Variant",
        description: "Type of visual effect to display",
        category: "Effects",
      },
      intensity: {
        type: "number",
        default: 0.8,
        min: 0.1,
        max: 2.0,
        step: 0.1,
        label: "Effect Intensity",
        description: "Intensity of the visual effects",
        category: "Effects",
      },

      // Colors
      liquidColor: {
        type: "color",
        default: "#3b82f6",
        label: "Liquid Color",
        description: "Primary color for liquid effect",
        category: "Colors",
        conditional: {
          property: "variant",
          value: "liquid",
        },
      },
      laserColor: {
        type: "color",
        default: "#ff0000",
        label: "Laser Color",
        description: "Color for laser crosshairs",
        category: "Colors",
        conditional: {
          property: "variant",
          value: "laser",
        },
      },
      glitchColor1: {
        type: "color",
        default: "#ff0064",
        label: "Glitch Color 1",
        description: "First color for glitch effect",
        category: "Colors",
        conditional: {
          property: "variant",
          value: "glitch",
        },
      },
      glitchColor2: {
        type: "color",
        default: "#00ff64",
        label: "Glitch Color 2",
        description: "Second color for glitch effect",
        category: "Colors",
        conditional: {
          property: "variant",
          value: "glitch",
        },
      },

      // Behavior
      disabled: {
        type: "boolean",
        default: false,
        label: "Disabled",
        description: "Disable all interactive effects",
        category: "Behavior",
      },
      allowCustomBackground: {
        type: "boolean",
        default: false,
        label: "Custom Background",
        description: "Allow custom background instead of default",
        category: "Behavior",
      },
    },
  },

  "music-player": {
    name: "Music Player",
    component: "MusicPlayer",
    props: {
      // Current Track
      currentTrack: {
        type: "object",
        default: {
          id: "sample-track",
          title: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          artwork:
            "https://raw.githubusercontent.com/MihirJaiswal/nyxui/refs/heads/main/public/assets/images/music-player/song.jpg",
          duration: 240,
        },
        label: "Current Track",
        description: "Currently playing track information",
        category: "Track Data",
      },
      queue: {
        type: "object",
        default: [
          {
            id: "track-1",
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            artwork:
              "https://raw.githubusercontent.com/MihirJaiswal/nyxui/refs/heads/main/public/assets/images/music-player/song.jpg",
            duration: 240,
          },
          {
            id: "track-2",
            title: "Digital Horizon",
            artist: "Cyber Musician",
            album: "Virtual Reality",
            artwork: "/placeholder.svg?height=300&width=300",
            duration: 195,
          },
        ],
        label: "Queue",
        description: "Array of tracks in the playlist",
        category: "Track Data",
      },
      currentIndex: {
        type: "number",
        default: 0,
        min: 0,
        max: 10,
        step: 1,
        label: "Current Index",
        description: "Index of current track in queue",
        category: "Track Data",
      },

      // Appearance
      theme: {
        type: "select",
        default: "default",
        options: ["default", "spotify", "cosmic", "midnight"],
        label: "Theme",
        description: "Visual theme for the music player",
        category: "Appearance",
      },

      // Playback
      initialTime: {
        type: "number",
        default: 0,
        min: 0,
        max: 300,
        step: 1,
        label: "Initial Time (s)",
        description: "Starting playback time in seconds",
        category: "Playback",
      },
      autoPlay: {
        type: "boolean",
        default: false,
        label: "Auto Play",
        description: "Start playing automatically",
        category: "Playback",
      },

      // Features
      showEqualizer: {
        type: "boolean",
        default: true,
        label: "Show Equalizer",
        description: "Display animated equalizer bars",
        category: "Features",
      },
    },
  },

  "animated-grainy-bg": {
    name: "Animated Grainy Background",
    component: "AnimatedGrainyBg",
    props: {
      // Content
      children: {
        type: "textarea",
        default: `<div className="flex items-center justify-center h-[400px] w-[600px] text-center space-y-4">
  <div className="flex flex-col items-center justify-center gap-2">
    <h2 className="text-4xl font-bold mb-4">Animated Background</h2>
    <p className="text-lg opacity-90">
      Dynamic gradient background with grain texture effects
    </p>
  </div>
</div>`,
        label: "Children Content",
        description: "Content to display over the background",
        category: "Content",
        placeholder: "Enter content...",
      },

      // Colors
      colors: {
        type: "object",
        default: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
        label: "Colors",
        description: "Array of colors for the gradient animation",
        category: "Colors",
      },
      darkMode: {
        type: "boolean",
        default: false,
        label: "Dark Mode",
        description: "Use dark color scheme",
        category: "Colors",
      },

      // Animation
      animationType: {
        type: "select",
        default: "mesh",
        options: ["flow", "mesh", "waves", "aurora", "spiral", "pulse"],
        label: "Animation Type",
        description: "Type of gradient animation pattern",
        category: "Animation",
      },
      speed: {
        type: "number",
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        label: "Animation Speed",
        description: "Speed of the animation (1 = normal)",
        category: "Animation",
      },
      animate: {
        type: "boolean",
        default: true,
        label: "Enable Animation",
        description: "Enable or disable animation",
        category: "Animation",
      },

      // Grain Effects
      grainType: {
        type: "select",
        default: "digital",
        options: ["digital", "plasma", "scratches", "paper", "noise", "dust"],
        label: "Grain Type",
        description: "Type of grain texture overlay",
        category: "Grain",
      },
      grainIntensity: {
        type: "number",
        default: 60,
        min: 0,
        max: 100,
        step: 5,
        label: "Grain Intensity",
        description: "Intensity of the grain effect (0-100)",
        category: "Grain",
      },
      grainSize: {
        type: "number",
        default: 100,
        min: 50,
        max: 200,
        step: 10,
        label: "Grain Size",
        description: "Size of the grain texture",
        category: "Grain",
      },
      grainBlendMode: {
        type: "select",
        default: "soft-light",
        options: [
          "multiply",
          "overlay",
          "soft-light",
          "hard-light",
          "screen",
          "color-burn",
          "normal",
        ],
        label: "Grain Blend Mode",
        description: "How grain texture blends with background",
        category: "Grain",
      },

      // Layout
      size: {
        type: "select",
        default: "full",
        options: ["sm", "md", "lg", "full"],
        label: "Size",
        description: "Size of the background container",
        category: "Layout",
      },
      position: {
        type: "select",
        default: "relative",
        options: ["fixed", "absolute", "relative"],
        label: "Position",
        description: "CSS position property",
        category: "Layout",
      },
      zIndex: {
        type: "number",
        default: 0,
        min: -10,
        max: 50,
        step: 1,
        label: "Z-Index",
        description: "CSS z-index value",
        category: "Layout",
      },
    },
  },

  "water-ripple-effect": {
    name: "Water Ripple Effect",
    component: "WaterRippleEffect",
    props: {
      // Image
      imageSrc: {
        type: "string",
        default:
          "https://raw.githubusercontent.com/MihirJaiswal/nyxui/refs/heads/main/public/assets/images/water-ripple-effect/art.jpg",
        label: "Image Source",
        description: "URL of the image to apply ripple effect to",
        category: "Image",
      },

      // Dimensions
      width: {
        type: "number",
        default: 400,
        min: 200,
        max: 800,
        step: 50,
        label: "Width",
        description: "Width of the effect container",
        category: "Dimensions",
      },
      height: {
        type: "number",
        default: 400,
        min: 200,
        max: 800,
        step: 50,
        label: "Height",
        description: "Height of the effect container",
        category: "Dimensions",
      },
      scale: {
        type: "number",
        default: 1.0,
        min: 0.5,
        max: 2.0,
        step: 0.1,
        label: "Scale",
        description: "Scale factor for the entire effect",
        category: "Dimensions",
      },

      // Wave Effects
      waveIntensity: {
        type: "number",
        default: 0.006,
        min: 0,
        max: 0.02,
        step: 0.001,
        label: "Wave Intensity",
        description: "Intensity of the base wave distortion",
        category: "Wave Effects",
      },
      waveFrequency: {
        type: "number",
        default: 10.0,
        min: 5.0,
        max: 20.0,
        step: 0.5,
        label: "Wave Frequency",
        description: "Frequency of the wave patterns",
        category: "Wave Effects",
      },

      // Ripple Effects
      rippleIntensity: {
        type: "number",
        default: 0.012,
        min: 0,
        max: 0.03,
        step: 0.001,
        label: "Ripple Intensity",
        description: "Intensity of mouse-interactive ripples",
        category: "Ripple Effects",
      },
      rippleFrequency: {
        type: "number",
        default: 20.0,
        min: 10.0,
        max: 40.0,
        step: 1.0,
        label: "Ripple Frequency",
        description: "Frequency of the ripple patterns",
        category: "Ripple Effects",
      },
      hoverRippleMultiplier: {
        type: "number",
        default: 4.0,
        min: 1.0,
        max: 8.0,
        step: 0.5,
        label: "Hover Multiplier",
        description: "Multiplier for ripple intensity on hover",
        category: "Ripple Effects",
      },

      // Animation
      animationSpeed: {
        type: "number",
        default: 1.0,
        min: 0.1,
        max: 3.0,
        step: 0.1,
        label: "Animation Speed",
        description: "Speed of all animations",
        category: "Animation",
      },
      transitionSpeed: {
        type: "number",
        default: 0.08,
        min: 0.01,
        max: 0.2,
        step: 0.01,
        label: "Transition Speed",
        description: "Speed of hover transitions",
        category: "Animation",
      },

      // Distortion
      distortionAmount: {
        type: "number",
        default: 0.008,
        min: 0,
        max: 0.02,
        step: 0.001,
        label: "Distortion Amount",
        description: "Amount of overall distortion effect",
        category: "Distortion",
      },
    },
  },

  "custom-cursor": {
    name: "Custom Cursor",
    component: "Cursor",
    props: {
      // Content
      children: {
        type: "textarea",
        default: `<Cursor>
  <div className="h-96 w-[400px] bg-gradient-to-br from-blue-800 to-purple-900 rounded-lg flex items-center justify-center">
  <div className="text-center space-y-4">
    <h3 className="text-2xl font-bold text-white">Custom Cursor Area</h3>
    <p className="text-gray-200">Move your mouse around to see the custom cursor</p>
  </div>
</div>
</Cursor>
        `,
        label: "Children Content",
        description: "Content area where custom cursor will be active",
        category: "Content",
        placeholder: "Enter content...",
      },

      // Cursor Settings
      name: {
        type: "string",
        default: "User",
        label: "Cursor Name",
        description: "Name displayed next to the cursor",
        category: "Cursor",
      },
      cursorColor: {
        type: "select",
        default: "sky",
        options: [
          "sky",
          "red",
          "green",
          "blue",
          "purple",
          "pink",
          "yellow",
          "indigo",
        ],
        label: "Cursor Color",
        description: "Color scheme for the cursor",
        category: "Cursor",
      },

      // Custom SVG
      customSVG: {
        type: "textarea",
        default: "",
        label: "Custom SVG",
        description: "Custom SVG icon for the cursor (optional)",
        category: "Customization",
        placeholder: "Enter SVG code...",
      },
      svgClassName: {
        type: "string",
        default: "",
        label: "SVG Class Name",
        description: "Additional CSS classes for the cursor SVG",
        category: "Customization",
      },
    },
  },

  "apple-glass-effect": {
    name: "Glass Container",
    component: "GlassContainer",
    props: {
      // Content
      children: {
        type: "textarea",
        default: `<div className="text-center space-y-4">
  <h3 className="text-2xl font-bold">Glass Morphism</h3>
  <p className="text-sm opacity-90">
    Beautiful glass effect with backdrop blur and realistic lighting
  </p>
</div>`,
        label: "Children Content",
        description: "Content to display inside the glass container",
        category: "Content",
        placeholder: "Enter content...",
      },

      // Glass Variants
      variant: {
        type: "select",
        default: "default",
        options: ["default", "prominent", "regular", "thin"],
        label: "Glass Variant",
        description: "Predefined glass effect intensity",
        category: "Glass Effect",
      },
      blur: {
        type: "number",
        default: 20,
        min: 0,
        max: 50,
        step: 1,
        label: "Blur Amount",
        description: "Custom backdrop blur amount (overrides variant)",
        category: "Glass Effect",
      },
      opacity: {
        type: "number",
        default: 0.25,
        min: 0,
        max: 1,
        step: 0.05,
        label: "Glass Opacity",
        description: "Opacity of the glass overlay",
        category: "Glass Effect",
      },

      // Distortion
      distortion: {
        type: "select",
        default: "medium",
        options: ["none", "subtle", "medium", "strong"],
        label: "Glass Distortion",
        description: "Amount of glass distortion effect",
        category: "Glass Effect",
      },

      // Tint
      tint: {
        type: "select",
        default: "warm",
        options: ["neutral", "warm", "cool", "vibrant"],
        label: "Glass Tint",
        description: "Color tint for the glass effect",
        category: "Appearance",
      },

      // Features
      border: {
        type: "boolean",
        default: true,
        label: "Show Border",
        description: "Display glass border highlight",
        category: "Features",
      },
      hover: {
        type: "boolean",
        default: true,
        label: "Hover Effects",
        description: "Enable hover scale and shadow effects",
        category: "Features",
      },
      glassOverlay: {
        type: "boolean",
        default: true,
        label: "Glass Overlay",
        description: "Show the main glass overlay effect",
        category: "Features",
      },

      // Advanced Customization
      highlightColor: {
        type: "string",
        default: "rgba(255, 255, 255, 0.4)",
        label: "Highlight Color",
        description: "Color for specular highlights",
        category: "Advanced",
      },
      highlightOpacity: {
        type: "number",
        default: 1,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Highlight Opacity",
        description: "Opacity of highlight effects",
        category: "Advanced",
      },
      innerGlowColor: {
        type: "string",
        default: "rgba(255, 255, 255, 0.1)",
        label: "Inner Glow Color",
        description: "Color for inner glow effect",
        category: "Advanced",
      },
      innerGlowOpacity: {
        type: "number",
        default: 1,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Inner Glow Opacity",
        description: "Opacity of inner glow",
        category: "Advanced",
      },
      specularIntensity: {
        type: "number",
        default: 0.4,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Specular Intensity",
        description: "Intensity of specular reflections",
        category: "Advanced",
      },
    },
  },

  "bubble-background": {
    name: "Bubble Background",
    component: "BubbleBackground",
    props: {
      bgColorA: {
        type: "string",
        default: "rgb(108, 0, 162)",
        label: "Background Color A",
        description: "First gradient color for background",
        category: "Colors",
      },
      bgColorB: {
        type: "string",
        default: "rgb(0, 17, 82)",
        label: "Background Color B",
        description: "Second gradient color for background",
        category: "Colors",
      },
      "bubbleColors.colorA": {
        type: "string",
        default: "18, 113, 255",
        label: "Bubble Color A",
        description: "First bubble color (RGB values)",
        category: "Colors",
      },
      "bubbleColors.colorB": {
        type: "string",
        default: "221, 74, 255",
        label: "Bubble Color B",
        description: "Second bubble color (RGB values)",
        category: "Colors",
      },
      "bubbleColors.colorC": {
        type: "string",
        default: "100, 220, 255",
        label: "Bubble Color C",
        description: "Third bubble color (RGB values)",
        category: "Colors",
      },
      "bubbleColors.colorD": {
        type: "string",
        default: "200, 50, 50",
        label: "Bubble Color D",
        description: "Fourth bubble color (RGB values)",
        category: "Colors",
      },
      "bubbleColors.colorE": {
        type: "string",
        default: "180, 180, 50",
        label: "Bubble Color E",
        description: "Fifth bubble color (RGB values)",
        category: "Colors",
      },
      "bubbleColors.interactive": {
        type: "string",
        default: "148, 100, 255",
        label: "Interactive Bubble Color",
        description: "Mouse-following bubble color (RGB values)",
        category: "Colors",
      },
      blendMode: {
        type: "select",
        options: [
          "normal",
          "multiply",
          "screen",
          "overlay",
          "soft-light",
          "hard-light",
          "color-dodge",
          "color-burn",
        ],
        default: "hard-light",
        label: "Blend Mode",
        description: "CSS mix-blend-mode for bubbles",
        category: "Effects",
      },
      bubbleSize: {
        type: "string",
        default: "80%",
        label: "Bubble Size",
        description: "Size of the bubbles (CSS value)",
        category: "Layout",
      },
    },
  },
  "animated-text": {
    name: "Animate Text",
    component: "AnimateText",
    props: {
      text: {
        type: "string",
        default: "Animated Text",
        label: "Text Content",
        description: "The text to animate",
        category: "Content",
      },
      type: {
        type: "select",
        options: [
          "blink",
          "rise",
          "expand",
          "glide",
          "cascade",
          "flicker",
          "elastic",
          "float",
        ],
        default: "elastic",
        label: "Animation Type",
        description: "Type of text animation",
        category: "Animation",
      },
      delay: {
        type: "number",
        default: 0,
        min: 0,
        max: 5,
        step: 0.1,
        label: "Delay",
        description: "Animation delay in seconds",
        category: "Animation",
      },
      duration: {
        type: "number",
        default: 0.5,
        min: 0.1,
        max: 3,
        step: 0.1,
        label: "Duration",
        description: "Animation duration in seconds",
        category: "Animation",
      },
      custom: {
        type: "number",
        default: 1,
        min: 1,
        max: 5,
        step: 1,
        label: "Custom Multiplier",
        description: "Custom animation multiplier",
        category: "Animation",
      },
    },
  },
  "glitch-button": {
    name: "Glitch Button",
    component: "GlitchButton",
    props: {
      children: {
        type: "string",
        default: "GLITCH",
        label: "Button Text",
        description: "Text content of the button",
        category: "Content",
      },
      glitchOnHover: {
        type: "boolean",
        default: true,
        label: "Glitch on Hover",
        description: "Enable glitch effect on hover",
        category: "Behavior",
      },
      glitchAlways: {
        type: "boolean",
        default: false,
        label: "Always Glitch",
        description: "Keep glitch effect always active",
        category: "Behavior",
      },
      "glitchColors.primary": {
        type: "string",
        default: "#ef00ef",
        label: "Primary Glitch Color",
        description: "Primary color for glitch effect",
        category: "Colors",
      },
      "glitchColors.secondary": {
        type: "string",
        default: "#00ffff",
        label: "Secondary Glitch Color",
        description: "Secondary color for glitch effect",
        category: "Colors",
      },
      borderColor: {
        type: "string",
        default: "white",
        label: "Border Color",
        description: "Color of the button border",
        category: "Colors",
      },
    },
  },
  "dynamic-ripple": {
    name: "Dynamic Ripple",
    component: "DynamicRipple",
    props: {
      children: {
        type: "textarea",
        default: `<div className="text-center flex items-center justify-center  h-[400px] w-full p-12 border space-y-4">
        <div className='py-12'>
        <h3 className="text-2xl font-bold">Dynamic Ripple Effect</h3>
        <p className="text-sm opacity-90">
          Click on the button below to see the ripple effect
        </p>
        </div>
      </div>`,
        label: "Content",
        description: "Content inside the ripple container",
        category: "Content",
      },
      theme: {
        type: "select",
        options: ["blue", "purple", "green", "amber", "rose", "custom"],
        default: "blue",
        label: "Theme",
        description: "Color theme for ripples",
        category: "Colors",
      },
      "customColors.primary": {
        type: "string",
        default: "rgba(59, 130, 246, 0.7)",
        label: "Custom Primary Color",
        description: "Primary color for custom theme",
        category: "Colors",
        conditional: { property: "theme", value: "custom" },
      },
      "customColors.secondary": {
        type: "string",
        default: "rgba(6, 182, 212, 0.7)",
        label: "Custom Secondary Color",
        description: "Secondary color for custom theme",
        category: "Colors",
        conditional: { property: "theme", value: "custom" },
      },
      intensity: {
        type: "select",
        options: [1, 2, 3, 4, 5],
        default: 3,
        label: "Intensity",
        description: "Intensity of ripple effects",
        category: "Effects",
      },
      speed: {
        type: "select",
        options: [1, 2, 3, 4, 5],
        default: 3,
        label: "Speed",
        description: "Speed of ripple animations",
        category: "Effects",
      },
      reactToCursor: {
        type: "boolean",
        default: true,
        label: "React to Cursor",
        description: "Create ripples on mouse movement",
        category: "Behavior",
      },
      autoAnimate: {
        type: "boolean",
        default: true,
        label: "Auto Animate",
        description: "Automatically generate ripples",
        category: "Behavior",
      },
      rounded: {
        type: "select",
        options: ["none", "sm", "md", "lg", "xl", "full"],
        default: "lg",
        label: "Border Radius",
        description: "Border radius of the container",
        category: "Layout",
      },
      gradientOverlay: {
        type: "boolean",
        default: true,
        label: "Gradient Overlay",
        description: "Add gradient overlay effect",
        category: "Effects",
      },
    },
  },
  "terminal": {
    name: "Interactive Terminal",
    component: "InteractiveTerminal",
    props: {
      command: {
        type: "string",
        default: "npm i name",
        label: "Command",
        description: "Command to execute in the terminal",
      },
      steps: {
        type: "object",
        default: [
          "Installing dependencies...",
          "Resolving packages...",
          "Building project...",
        ],
        label: "Execution Steps",
        description: "Steps shown during command execution",
      },
      finalMessage: {
        type: "string",
        default: "✅ Installation completed successfully!",
        label: "Final Message",
        description: "Message shown when command completes",
      },
      stepDelay: {
        type: "number",
        default: 1000,
        min: 100,
        max: 5000,
        label: "Step Delay (ms)",
        description: "Delay between execution steps",
      },
      typingDelay: {
        type: "number",
        default: 100,
        min: 50,
        max: 500,
        label: "Typing Delay (ms)",
        description: "Delay between typed characters",
      },
      promptSymbol: {
        type: "string",
        default: "$",
        label: "Prompt Symbol",
        description: "Terminal prompt symbol",
      },
      inputPlaceholder: {
        type: "string",
        default: "Type your command here...",
        label: "Input Placeholder",
        description: "Placeholder text for input field",
      },
      autoExecute: {
        type: "boolean",
        default: false,
        label: "Auto Execute",
        description: "Automatically execute command on mount",
      },
      repeat: {
        type: "boolean",
        default: false,
        label: "Repeat",
        description: "Repeat command execution continuously",
      },
      theme: {
        type: "select",
        default: "default",
        options: ["default", "dark", "matrix", "retro"],
        label: "Theme",
        description: "Terminal color theme",
      },
    },
  },
  "matrix-code-rain": {
    name: "Matrix Code Rain",
    component: "MatrixCodeRain",
    props: {
      color: {
        type: "color",
        default: "#00ff00",
        label: "Rain Color",
        description: "Color of the falling characters",
      },
      charset: {
        type: "string",
        default: "0123#!$^&456789ABCDEFRLY",
        label: "Character Set",
        description: "Characters used in the rain effect",
      },
      fontSize: {
        type: "number",
        default: 16,
        min: 10,
        max: 32,
        label: "Font Size",
        description: "Size of the falling characters",
      },
      fps: {
        type: "number",
        default: 20,
        min: 5,
        max: 60,
        label: "Frame Rate",
        description: "Animation frame rate",
      },
      opacity: {
        type: "number",
        default: 0.05,
        min: 0.01,
        max: 0.2,
        step: 0.01,
        label: "Trail Opacity",
        description: "Opacity of character trails",
      },
      fullScreen: {
        type: "boolean",
        default: false,
        label: "Full Screen",
        description: "Cover the entire viewport",
      },
      width: {
        type: "string",
        default: "100%",
        label: "Width",
        description: "Container width (CSS value)",
      },
      height: {
        type: "string",
        default: "400px",
        label: "Height",
        description: "Container height (CSS value)",
      },
    },
  },
  "liquid-metal-button": {
    name: "Liquid Metal Button",
    component: "LiquidMetalButton",
    props: {
      children: {
        type: "string",
        default: "Liquid Metal",
        label: "Button Text",
        description: "Text content of the button",
      },
      theme: {
        type: "select",
        default: "silver",
        options: [
          "silver",
          "gold",
          "copper",
          "mercury",
          "steel",
          "emerald",
          "sapphire",
        ],
        label: "Metal Theme",
        description: "Different metallic appearances",
      },
      size: {
        type: "select",
        default: "md",
        options: ["sm", "md", "lg"],
        label: "Size",
        description: "Button size variant",
      },
      disabled: {
        type: "boolean",
        default: false,
        label: "Disabled",
        description: "Disable button interactions",
      },
      customColor: {
        type: "color",
        default: "#c0c0c0",
        label: "Custom Color",
        description: "Custom metallic color",
        conditional: {
          property: "theme",
          value: "custom",
        },
      },
    },
  },
  "image-scanner": {
    name: "Image Scanner",
    component: "ImageScanner",
    props: {
      image: {
        type: "string",
        default:
          "https://raw.githubusercontent.com/MihirJaiswal/nyxui/refs/heads/main/public/assets/images/image-scanner/img.jpg",
        label: "Image URL",
        description: "Source image to scan",
      },
      alt: {
        type: "string",
        default: "Scanning image",
        label: "Alt Text",
        description: "Alternative text for accessibility",
      },
      scanSpeed: {
        type: "number",
        default: 2,
        label: "Scan Speed",
        description: "Animation speed (0.5-5)",
      },
      scanColor: {
        type: "select",
        default: "emerald",
        options: ["emerald", "blue", "purple", "amber", "red", "cyan", "pink"],
        label: "Scan Color",
        description: "Color theme for scan effects",
      },
      scanType: {
        type: "select",
        default: "default",
        options: ["default", "grid", "radar", "pulse", "wave", "matrix"],
        label: "Scan Type",
        description: "Type of scanning animation",
      },
      autoScan: {
        type: "boolean",
        default: true,
        label: "Auto Scan",
        description: "Start scanning automatically",
      },
      scanDelay: {
        type: "number",
        default: 0.5,
        label: "Scan Delay",
        description: "Delay before auto scan starts (seconds)",
      },
      scanAtScroll: {
        type: "boolean",
        default: false,
        label: "Scan at Scroll",
        description: "Trigger scan when scrolled into view",
      },
      showDataOverlay: {
        type: "boolean",
        default: true,
        label: "Show Data Overlay",
        description: "Display scanning data overlay",
      },
      showProgress: {
        type: "boolean",
        default: true,
        label: "Show Progress",
        description: "Display scan progress indicator",
      },
      scanIntensity: {
        type: "select",
        default: "medium",
        options: ["low", "medium", "high", "extreme"],
        label: "Scan Intensity",
        description: "Intensity of scan effects",
      },
      showScanResults: {
        type: "boolean",
        default: true,
        label: "Show Scan Results",
        description: "Display detected objects/anomalies",
      },
      scanResults: {
        type: "textarea",
        default:[{"id":"target-1","type":"object","confidence":95,"position":{"x":25,"y":30},"label":"Target Alpha"},{"id":"anomaly-1","type":"anomaly","confidence":78,"position":{"x":65,"y":45},"label":"Anomaly Beta"},{"id":"data-1","type":"data","confidence":89,"position":{"x":40,"y":70},"label":"Data Node"},{"id":"threat-1","type":"threat","confidence":85,"position":{"x":80,"y":20},"label":"Security Risk"}],
        label: "Scan Results (JSON)",
        description:
          "Custom scan results as JSON string. Leave empty to use auto-generated results.",
        conditional: {
          property: "showScanResults",
          value: true,
        },
      },
      loop: {
        type: "boolean",
        default: false,
        label: "Loop",
        description: "Continuously repeat scan animation",
      },
      disableClickToScan: {
        type: "boolean",
        default: false,
        label: "Disable Click to Scan",
        description: "Prevent manual scan triggering",
      },
      className: {
        type: "string",
        default: "",
        label: "Custom Class",
        description: "Additional CSS classes",
      },
    },
  },
};
