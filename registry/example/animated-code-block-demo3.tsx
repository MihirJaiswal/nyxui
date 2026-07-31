import { AnimatedCodeBlock } from "@/registry/ui/animated-code-block";

const exampleCode = `import { motion } from "motion/react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border p-6"
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  );
}`;

export default function AnimatedCodeBlockMinimalDemo(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-4xl p-5">
      <AnimatedCodeBlock
        code={exampleCode}
        theme="minimal"
        title="feature-card.tsx"
        typingSpeed={10}
        showLineNumbers
        autoPlay
        language="tsx"
        highlightLines={[12, 13, 14]}
      />
    </div>
  );
}
