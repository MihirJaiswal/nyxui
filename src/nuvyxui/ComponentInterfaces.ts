interface Dependency {
  name: string;
  description: string;
  install: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
  };
  setup?: {
    description: string;
    file: string;
    code: string;
  };
}

export interface ComponentData {
  name: string;
  description: string;
  preview: React.ReactNode;
  usage: string;
  props: PropGroup[];
  examples: Example[];
  componentCode: string;
  dependencies: Dependency[];
  category: string;
  new?: boolean;
}

export interface PropGroup {
  name: string;
  items: Prop[];
}

export interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
  subProps?: Prop[];
}

export interface Example {
  name: string;
  preview: React.ReactNode;
  filename: string;
  code: string;
}
