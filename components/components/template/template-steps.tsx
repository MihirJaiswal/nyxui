interface TemplateStepsProps {
  items: string[];
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function TemplateSteps({ items }: TemplateStepsProps) {
  return (
    <div className="not-prose mt-3 mb-12 flex flex-col gap-2 leading-relaxed text-muted-foreground">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="text-muted-foreground/70">{index + 1}.</span>
          <span>{renderInlineCode(item)}</span>
        </div>
      ))}
    </div>
  );
}
