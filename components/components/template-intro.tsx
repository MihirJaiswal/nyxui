import { ReactNode } from "react";

export default function TemplateIntro({ children }: { children: ReactNode }) {
  return (
    <p className="not-prose mb-10 text-lg leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
