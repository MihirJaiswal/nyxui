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
  const [copyCount, setCopyCount] = React.useState(0);
  const hasCopied = copyCount > 0;
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (copyCount === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (isMountedRef.current) {
        setCopyCount(0);
      }
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [copyCount, timeout]);

  const legacyCopy = React.useCallback((value: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);

    let succeeded = false;
    try {
      const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent);

      if (isIOS) {
        textarea.contentEditable = "true";
        textarea.readOnly = false;
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        textarea.setSelectionRange(0, textarea.value.length);
      } else {
        textarea.select();
      }

      succeeded = document.execCommand("copy");
    } catch {
      succeeded = false;
    } finally {
      document.body.removeChild(textarea);
    }

    return succeeded;
  }, []);

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
        succeeded = legacyCopy(value);
      }

      if (!succeeded) {
        throw new Error("Failed to copy");
      }

      if (!isMountedRef.current) {
        return;
      }

      onCopy?.(value);
      setCopyCount((c) => c + 1);
    },
    [onCopy, legacyCopy],
  );

  return { copy, hasCopied };
}
