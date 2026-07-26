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
      let succeeded = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value);
          succeeded = true;
        } catch {
          // fall through to legacy method
        }
      }

      if (!succeeded) {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          succeeded = document.execCommand("copy");
        } catch {
          succeeded = false;
        }
        document.body.removeChild(textarea);
      }

      if (!succeeded) {
        throw new Error("Failed to copy");
      }

      onCopy?.(value);
      setHasCopied(true);
    },
    [onCopy],
  );

  return { copy, hasCopied };
}
