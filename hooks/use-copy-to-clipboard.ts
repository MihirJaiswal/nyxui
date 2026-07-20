"use client";

import * as React from "react";

interface UseCopyToClipboardOptions {
  timeout?: number;
  onCopy?: (value: string) => void;
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: UseCopyToClipboardOptions = {}) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (!hasCopied) {
      return;
    }

    const timer = window.setTimeout(() => setHasCopied(false), timeout);
    return () => window.clearTimeout(timer);
  }, [hasCopied, timeout]);

  const copy = React.useCallback(
    async (value: string) => {
      await navigator.clipboard.writeText(value);
      onCopy?.(value);
      setHasCopied(true);
    },
    [onCopy],
  );

  return { copy, hasCopied };
}
