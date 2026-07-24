import { ReactNode } from "react";

export default function TemplateActions({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-10 mb-10 flex flex-wrap items-center gap-4">
      {children}
    </div>
  );
}
