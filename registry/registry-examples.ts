import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "ascii-text-demo",
    type: "registry:example",
    title: "Ascii Text Demo",
    description:
      "Gallery of Ascii Text animation modes. Click any card to copy its JSX.",
    dependencies: ["lucide-react", "sonner"],
    registryDependencies: ["https://nyxui.com/r/ascii-text.json"],
    files: [
      {
        path: "registry/example/ascii-text-demo.tsx",
        type: "registry:example",
        target: "components/ascii-text-demo.tsx",
      },
    ],
  },
  {
    name: "liquid-metal-button-demo",
    type: "registry:example",
    title: "Liquid Metal Button Demo",
    description:
      "Gallery of Liquid Metal Button variants. Click any card to copy its JSX.",
    dependencies: ["lucide-react", "sonner"],
    registryDependencies: ["https://nyxui.com/r/liquid-metal-button.json"],
    files: [
      {
        path: "registry/example/liquid-metal-button-demo.tsx",
        type: "registry:example",
        target: "components/liquid-metal-button-demo.tsx",
      },
    ],
  },
  {
    name: "halo-ring-demo",
    type: "registry:example",
    title: "Halo Ring Demo",
    description:
      "Example of an AI chat card wrapped in a rotating conic gradient halo.",
    registryDependencies: ["https://nyxui.com/r/halo-ring.json"],
    files: [
      {
        path: "registry/example/halo-ring-demo.tsx",
        type: "registry:example",
        target: "components/halo-ring-demo.tsx",
      },
    ],
  },
  {
    name: "flip-text-demo",
    type: "registry:example",
    title: "Flip Text Demo",
    description:
      "Example showing links whose characters flip away and back in on hover.",
    registryDependencies: ["https://nyxui.com/r/flip-text.json"],
    files: [
      {
        path: "registry/example/flip-text-demo.tsx",
        type: "registry:example",
        target: "components/flip-text-demo.tsx",
      },
    ],
  },
  {
    name: "pop-text-demo",
    type: "registry:example",
    title: "Pop Text Demo",
    description: "Example showing letters that swell when hovered.",
    registryDependencies: ["https://nyxui.com/r/pop-text.json"],
    files: [
      {
        path: "registry/example/pop-text-demo.tsx",
        type: "registry:example",
        target: "components/pop-text-demo.tsx",
      },
    ],
  },
  {
    name: "pop-text-demo1",
    type: "registry:example",
    title: "Pop Text Custom Demo",
    description: "A stylized rose-colored pop-text example.",
    registryDependencies: ["https://nyxui.com/r/pop-text.json"],
    files: [
      {
        path: "registry/example/pop-text-demo1.tsx",
        type: "registry:example",
        target: "components/pop-text-demo1.tsx",
      },
    ],
  },
  {
    name: "scribble-demo",
    type: "registry:example",
    title: "Scribble Variants Demo",
    description:
      "Example showing circle, underline, box and highlight scribbles in one heading.",
    registryDependencies: ["https://nyxui.com/r/scribble.json"],
    files: [
      {
        path: "registry/example/scribble-demo.tsx",
        type: "registry:example",
        target: "components/scribble-demo.tsx",
      },
    ],
  },
  {
    name: "scribble-demo1",
    type: "registry:example",
    title: "Scribble Demo",
    description:
      "Example showing a hand-drawn circle drawn around a word in a heading.",
    registryDependencies: ["https://nyxui.com/r/scribble.json"],
    files: [
      {
        path: "registry/example/scribble-demo1.tsx",
        type: "registry:example",
        target: "components/scribble-demo1.tsx",
      },
    ],
  },
  {
    name: "scribble-demo2",
    type: "registry:example",
    title: "Scribble Custom Color Demo",
    description:
      "Example showing a hand-drawn circle with custom stroke color and width.",
    registryDependencies: ["https://nyxui.com/r/scribble.json"],
    files: [
      {
        path: "registry/example/scribble-demo2.tsx",
        type: "registry:example",
        target: "components/scribble-demo2.tsx",
      },
    ],
  },
  {
    name: "animated-code-block-demo",
    type: "registry:example",
    title: "Animated Code Block Demo",
    description: "Example showing a code block with typing animation effects.",
    registryDependencies: ["https://nyxui.com/r/animated-code-block.json"],
    files: [
      {
        path: "registry/example/animated-code-block-demo.tsx",
        type: "registry:example",
        target: "components/animated-code-block-demo.tsx",
      },
    ],
  },
  {
    name: "animated-code-block-demo1",
    type: "registry:example",
    title: "Animated Code Block Parchment Demo",
    description: "Example showing the code block with the parchment theme.",
    registryDependencies: ["https://nyxui.com/r/animated-code-block.json"],
    files: [
      {
        path: "registry/example/animated-code-block-demo1.tsx",
        type: "registry:example",
        target: "components/animated-code-block-demo1.tsx",
      },
    ],
  },
  {
    name: "animated-code-block-demo2",
    type: "registry:example",
    title: "Animated Code Block Terminal Demo",
    description: "Example showing the code block with the terminal theme.",
    registryDependencies: ["https://nyxui.com/r/animated-code-block.json"],
    files: [
      {
        path: "registry/example/animated-code-block-demo2.tsx",
        type: "registry:example",
        target: "components/animated-code-block-demo2.tsx",
      },
    ],
  },
  {
    name: "animated-code-block-demo3",
    type: "registry:example",
    title: "Animated Code Block Minimal Demo",
    description: "Example showing the code block with the minimal theme.",
    registryDependencies: ["https://nyxui.com/r/animated-code-block.json"],
    files: [
      {
        path: "registry/example/animated-code-block-demo3.tsx",
        type: "registry:example",
        target: "components/animated-code-block-demo3.tsx",
      },
    ],
  },
  {
    name: "grainy-background-demo",
    type: "registry:example",
    title: "Grainy Background Demo",
    description: "Example showing an animated grainy background.",
    registryDependencies: ["https://nyxui.com/r/grainy-background.json"],
    files: [
      {
        path: "registry/example/grainy-background-demo.tsx",
        type: "registry:example",
        target: "components/grainy-background-demo.tsx",
      },
    ],
  },
  {
    name: "grainy-background-demo1",
    type: "registry:example",
    title: "Grainy Background Hero Demo",
    description:
      "Example showing a dark aurora grainy background used as a hero section with headline and CTAs.",
    registryDependencies: ["https://nyxui.com/r/grainy-background.json"],
    files: [
      {
        path: "registry/example/grainy-background-demo1.tsx",
        type: "registry:example",
        target: "components/grainy-background-demo1.tsx",
      },
    ],
  },
  {
    name: "animated-text-demo",
    type: "registry:example",
    title: "Animated Text Demo",
    description: "Example showing various text animations.",
    registryDependencies: ["https://nyxui.com/r/animated-text.json"],
    files: [
      {
        path: "registry/example/animated-text-demo.tsx",
        type: "registry:example",
        target: "components/animated-text-demo.tsx",
      },
    ],
  },
  {
    name: "bubble-background-demo",
    type: "registry:example",
    title: "Bubble Background Demo",
    description: "Example showing an interactive fluid background.",
    registryDependencies: ["https://nyxui.com/r/bubble-background.json"],
    files: [
      {
        path: "registry/example/bubble-background-demo.tsx",
        type: "registry:example",
        target: "components/bubble-background-demo.tsx",
      },
    ],
  },
  {
    name: "cyberpunk-card-demo",
    type: "registry:example",
    title: "Cyberpunk Card Demo",
    description: "Example showing a cyberpunk card.",
    registryDependencies: ["https://nyxui.com/r/cyberpunk-card.json"],
    files: [
      {
        path: "registry/example/cyberpunk-card-demo.tsx",
        type: "registry:example",
        target: "components/cyberpunk-card-demo.tsx",
      },
    ],
  },
  {
    name: "dynamic-ripple-demo",
    type: "registry:example",
    title: "Dynamic Ripple Demo",
    description: "Example showing a dynamic ripple effect.",
    registryDependencies: ["https://nyxui.com/r/dynamic-ripple.json"],
    files: [
      {
        path: "registry/example/dynamic-ripple-demo.tsx",
        type: "registry:example",
        target: "components/dynamic-ripple-demo.tsx",
      },
    ],
  },
  {
    name: "github-repo-card-demo",
    type: "registry:example",
    title: "Github Repo Card Demo",
    description: "Example showing a GitHub repo card.",
    registryDependencies: ["https://nyxui.com/r/github-repo-card.json"],
    files: [
      {
        path: "registry/example/github-repo-card-demo.tsx",
        type: "registry:example",
        target: "components/github-repo-card-demo.tsx",
      },
    ],
  },
  {
    name: "github-repo-card-demo1",
    type: "registry:example",
    title: "Github Repo Card Demo 1",
    description: "Example showing a GitHub repo card.",
    registryDependencies: ["https://nyxui.com/r/github-repo-card.json"],
    files: [
      {
        path: "registry/example/github-repo-card-demo1.tsx",
        type: "registry:example",
        target: "components/github-repo-card-demo1.tsx",
      },
    ],
  },
  {
    name: "github-repo-card-demo2",
    type: "registry:example",
    title: "Github Repo Card Demo 2",
    description: "Example showing a GitHub repo card.",
    registryDependencies: ["https://nyxui.com/r/github-repo-card.json"],
    files: [
      {
        path: "registry/example/github-repo-card-demo2.tsx",
        type: "registry:example",
        target: "components/github-repo-card-demo2.tsx",
      },
    ],
  },
  {
    name: "github-repo-card-demo3",
    type: "registry:example",
    title: "Github Repo Card Demo 3",
    description:
      "Example showing a GitHub repo card with the modern-light theme.",
    registryDependencies: ["https://nyxui.com/r/github-repo-card.json"],
    files: [
      {
        path: "registry/example/github-repo-card-demo3.tsx",
        type: "registry:example",
        target: "components/github-repo-card-demo3.tsx",
      },
    ],
  },
  {
    name: "glitch-button-demo",
    type: "registry:example",
    title: "Glitch Button Demo",
    description: "Example showing a glitch button.",
    registryDependencies: ["https://nyxui.com/r/glitch-button.json"],
    files: [
      {
        path: "registry/example/glitch-button-demo.tsx",
        type: "registry:example",
        target: "components/glitch-button-demo.tsx",
      },
    ],
  },
  {
    name: "keyboard-demo",
    type: "registry:example",
    title: "Keyboard Demo",
    description: "Example showing a interactive keyboard.",
    registryDependencies: ["https://nyxui.com/r/keyboard.json"],
    files: [
      {
        path: "registry/example/keyboard-demo.tsx",
        type: "registry:example",
        target: "components/keyboard-demo.tsx",
      },
    ],
  },
  {
    name: "keyboard-demo1",
    type: "registry:example",
    title: "Keyboard Demo 1",
    description: "Example showing a interactive keyboard.",
    registryDependencies: ["https://nyxui.com/r/keyboard.json"],
    files: [
      {
        path: "registry/example/keyboard-demo1.tsx",
        type: "registry:example",
        target: "components/keyboard-demo1.tsx",
      },
    ],
  },
  {
    name: "keyboard-demo2",
    type: "registry:example",
    title: "Keyboard Demo 2",
    description: "Example showing a interactive keyboard.",
    registryDependencies: ["https://nyxui.com/r/keyboard.json"],
    files: [
      {
        path: "registry/example/keyboard-demo2.tsx",
        type: "registry:example",
        target: "components/keyboard-demo2.tsx",
      },
    ],
  },
  {
    name: "keyboard-demo3",
    type: "registry:example",
    title: "Keyboard Demo 3",
    description: "Example showing a interactive keyboard.",
    registryDependencies: ["https://nyxui.com/r/keyboard.json"],
    files: [
      {
        path: "registry/example/keyboard-demo3.tsx",
        type: "registry:example",
        target: "components/keyboard-demo3.tsx",
      },
    ],
  },
  {
    name: "ms-paint-demo",
    type: "registry:example",
    title: "MS Paint Demo",
    description: "Example showing a MS Paint clone.",
    registryDependencies: ["https://nyxui.com/r/ms-paint.json"],
    files: [
      {
        path: "registry/example/ms-paint-demo.tsx",
        type: "registry:example",
        target: "components/ms-paint-demo.tsx",
      },
    ],
  },
  {
    name: "lamp-heading-demo",
    type: "registry:example",
    title: "Lamp Heading Demo",
    description: "Example showing a lamp heading.",
    registryDependencies: ["https://nyxui.com/r/lamp-heading.json"],
    files: [
      {
        path: "registry/example/lamp-heading-demo.tsx",
        type: "registry:example",
        target: "components/lamp-heading-demo.tsx",
      },
    ],
  },
  {
    name: "image-comparison-demo",
    type: "registry:example",
    title: "Image Comparison Demo",
    description: "Example showing a image comparison.",
    registryDependencies: ["https://nyxui.com/r/image-comparison.json"],
    files: [
      {
        path: "registry/example/image-comparison-demo.tsx",
        type: "registry:example",
        target: "components/image-comparison-demo.tsx",
      },
    ],
  },
  {
    name: "image-scanner-demo",
    type: "registry:example",
    title: "Image Scanner Demo",
    description: "Example showing a image scanner.",
    registryDependencies: ["https://nyxui.com/r/image-scanner.json"],
    files: [
      {
        path: "registry/example/image-scanner-demo.tsx",
        type: "registry:example",
        target: "components/image-scanner-demo.tsx",
      },
    ],
  },
  {
    name: "image-scanner-demo1",
    type: "registry:example",
    title: "Image Scanner Demo 1",
    description: "Example showing a image scanner.",
    registryDependencies: ["https://nyxui.com/r/image-scanner.json"],
    files: [
      {
        path: "registry/example/image-scanner-demo1.tsx",
        type: "registry:example",
        target: "components/image-scanner-demo1.tsx",
      },
    ],
  },
  {
    name: "glow-card-demo",
    type: "registry:example",
    title: "Glow Card Demo",
    description: "Example showing a glow card.",
    registryDependencies: ["https://nyxui.com/r/glow-card.json"],
    files: [
      {
        path: "registry/example/glow-card-demo.tsx",
        type: "registry:example",
        target: "components/glow-card-demo.tsx",
      },
    ],
  },
  {
    name: "glow-card-demo1",
    type: "registry:example",
    title: "Glow Card Demo 1",
    description: "Example showing a glow card.",
    registryDependencies: ["https://nyxui.com/r/glow-card.json"],
    files: [
      {
        path: "registry/example/glow-card-demo1.tsx",
        type: "registry:example",
        target: "components/glow-card-demo1.tsx",
      },
    ],
  },
  {
    name: "marquee-demo",
    type: "registry:example",
    title: "Marquee Demo",
    description: "Example showing a marquee.",
    registryDependencies: ["https://nyxui.com/r/marquee.json"],
    files: [
      {
        path: "registry/example/marquee-demo.tsx",
        type: "registry:example",
        target: "components/marquee-demo.tsx",
      },
    ],
  },
  {
    name: "marquee-demo1",
    type: "registry:example",
    title: "Marquee Demo 1",
    description: "Example showing a marquee.",
    registryDependencies: ["https://nyxui.com/r/marquee.json"],
    files: [
      {
        path: "registry/example/marquee-demo1.tsx",
        type: "registry:example",
        target: "components/marquee-demo1.tsx",
      },
    ],
  },
  {
    name: "marquee-demo2",
    type: "registry:example",
    title: "Marquee Demo 2",
    description: "Example showing a marquee.",
    registryDependencies: ["https://nyxui.com/r/marquee.json"],
    files: [
      {
        path: "registry/example/marquee-demo2.tsx",
        type: "registry:example",
        target: "components/marquee-demo2.tsx",
      },
    ],
  },
  {
    name: "matrix-code-rain-demo",
    type: "registry:example",
    title: "Matrix Code Rain Demo",
    description: "Example showing a matrix code rain.",
    registryDependencies: ["https://nyxui.com/r/matrix-code-rain.json"],
    files: [
      {
        path: "registry/example/matrix-code-rain-demo.tsx",
        type: "registry:example",
        target: "components/matrix-code-rain-demo.tsx",
      },
    ],
  },
  {
    name: "morphing-blob-demo",
    type: "registry:example",
    title: "Morphing Blob Demo",
    description: "Example showing a morphing blob.",
    registryDependencies: ["https://nyxui.com/r/morphing-blob.json"],
    files: [
      {
        path: "registry/example/morphing-blob-demo.tsx",
        type: "registry:example",
        target: "components/morphing-blob-demo.tsx",
      },
    ],
  },
  {
    name: "music-player-demo",
    type: "registry:example",
    title: "Music Player Demo",
    description: "Example showing a music player.",
    registryDependencies: ["https://nyxui.com/r/music-player.json"],
    files: [
      {
        path: "registry/example/music-player-demo.tsx",
        type: "registry:example",
        target: "components/music-player-demo.tsx",
      },
    ],
  },
  {
    name: "reveal-card-demo",
    type: "registry:example",
    title: "Reveal Card Demo",
    description: "Example showing a reveal card.",
    registryDependencies: ["https://nyxui.com/r/reveal-card.json"],
    files: [
      {
        path: "registry/example/reveal-card-demo.tsx",
        type: "registry:example",
        target: "components/reveal-card-demo.tsx",
      },
    ],
  },
  {
    name: "terminal-demo",
    type: "registry:example",
    title: "Terminal Demo",
    description: "Example showing a terminal.",
    registryDependencies: ["https://nyxui.com/r/terminal.json"],
    files: [
      {
        path: "registry/example/terminal-demo.tsx",
        type: "registry:example",
        target: "components/terminal-demo.tsx",
      },
    ],
  },
  {
    name: "terminal-demo1",
    type: "registry:example",
    title: "Terminal Demo 1",
    description: "Example showing a terminal.",
    registryDependencies: ["https://nyxui.com/r/terminal.json"],
    files: [
      {
        path: "registry/example/terminal-demo1.tsx",
        type: "registry:example",
        target: "components/terminal-demo1.tsx",
      },
    ],
  },
  {
    name: "terminal-demo2",
    type: "registry:example",
    title: "Terminal Demo 2",
    description: "Example showing a terminal with the default theme.",
    registryDependencies: ["https://nyxui.com/r/terminal.json"],
    files: [
      {
        path: "registry/example/terminal-demo2.tsx",
        type: "registry:example",
        target: "components/terminal-demo2.tsx",
      },
    ],
  },
  {
    name: "terminal-demo3",
    type: "registry:example",
    title: "Terminal Demo 3",
    description: "Example showing a terminal with the synthwave theme.",
    registryDependencies: ["https://nyxui.com/r/terminal.json"],
    files: [
      {
        path: "registry/example/terminal-demo3.tsx",
        type: "registry:example",
        target: "components/terminal-demo3.tsx",
      },
    ],
  },
  {
    name: "water-ripple-effect-demo",
    type: "registry:example",
    title: "Water Ripple Effect Demo",
    description: "Example showing a water ripple effect.",
    registryDependencies: ["https://nyxui.com/r/water-ripple-effect.json"],
    files: [
      {
        path: "registry/example/water-ripple-effect-demo.tsx",
        type: "registry:example",
        target: "components/water-ripple-effect-demo.tsx",
      },
    ],
  },
  {
    name: "custom-cursor-demo",
    type: "registry:example",
    title: "Custom Cursor Demo",
    description: "Example showing a custom cursor.",
    registryDependencies: ["https://nyxui.com/r/custom-cursor.json"],
    files: [
      {
        path: "registry/example/custom-cursor-demo.tsx",
        type: "registry:example",
        target: "components/custom-cursor-demo.tsx",
      },
    ],
  },
  {
    name: "apple-glass-effect-demo",
    type: "registry:example",
    title: "Apple Glass Effect Demo",
    description: "Example showing an Apple Glass Effect.",
    registryDependencies: ["https://nyxui.com/r/apple-glass-effect.json"],
    files: [
      {
        path: "registry/example/apple-glass-effect-demo.tsx",
        type: "registry:example",
        target: "components/apple-glass-effect-demo.tsx",
      },
    ],
  },
  {
    name: "3d-layered-card-demo",
    type: "registry:example",
    title: "3D Layered Card Demo",
    description: "Example showing a 3D layered card.",
    registryDependencies: ["https://nyxui.com/r/3d-layered-card.json"],
    files: [
      {
        path: "registry/example/3d-layered-card-demo.tsx",
        type: "registry:example",
        target: "components/3d-layered-card-demo.tsx",
      },
    ],
  },
  {
    name: "shining-card-demo",
    type: "registry:example",
    title: "Shining Card Demo",
    description: "Example of Shining Card.",
    registryDependencies: ["https://nyxui.com/r/shining-card.json"],
    files: [
      {
        path: "registry/example/shining-card-demo.tsx",
        type: "registry:example",
        target: "components/shining-card-demo.tsx",
      },
    ],
  },
  {
    name: "typing-words-demo",
    type: "registry:example",
    title: "Typing Words Demo",
    description: "Example of Typing Words.",
    registryDependencies: ["https://nyxui.com/r/typing-words.json"],
    files: [
      {
        path: "registry/example/typing-words-demo.tsx",
        type: "registry:example",
        target: "components/typing-words-demo.tsx",
      },
    ],
  },
  {
    name: "logo-cycle-demo",
    type: "registry:example",
    title: "Logo Cycle Demo",
    description: "Example of Logo Cycle.",
    registryDependencies: ["https://nyxui.com/r/logo-cycle.json"],
    files: [
      {
        path: "registry/example/logo-cycle-demo.tsx",
        type: "registry:example",
        target: "components/logo-cycle-demo.tsx",
      },
    ],
  },
  {
    name: "shuffle-loader-demo",
    type: "registry:example",
    title: "Shuffle Loader Demo",
    description: "Example of Shuffle Loader.",
    registryDependencies: ["https://nyxui.com/r/shuffle-loader.json"],
    files: [
      {
        path: "registry/example/shuffle-loader-demo.tsx",
        type: "registry:example",
        target: "components/shuffle-loader-demo.tsx",
      },
    ],
  },
];
