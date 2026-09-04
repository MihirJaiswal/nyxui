interface TemplateFeaturesProps {
  items: string[];
}

export default function TemplateFeatures({ items }: TemplateFeaturesProps) {
  return (
    <ul className="not-prose mt-3 mb-12 flex flex-col gap-2 leading-relaxed text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
