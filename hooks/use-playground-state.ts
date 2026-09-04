"use client";

import {
  useState,
  useEffect,
  useRef,
  startTransition,
  useCallback,
} from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import type { ComponentConfig, ComponentPropValue } from "@/types/playground";
import { componentRegistry } from "@/components/playground/registry";
import { generatePlaygroundCode, type CodeVariant } from "@/lib/codegen";
import { playgroundComponentHref } from "@/lib/links";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  generateDefaultConfig,
  encodeConfig,
  decodeConfig,
  PLAYGROUND_STORAGE_KEY,
} from "@/lib/config-utils";

export function usePlaygroundState(initialComponent?: string) {
  const [selectedComponent, setSelectedComponent] = useState<string>(
    initialComponent || "",
  );
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>(() =>
    initialComponent ? generateDefaultConfig(initialComponent) : {},
  );
  const [showCode, setShowCode] = useState(false);
  const isManualSelectionRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { copy: copyLink, hasCopied: linkCopied } = useCopyToClipboard({
    timeout: 2000,
    onCopy: () => toast("Playground link copied"),
  });
  const { copy: copyCodeToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  // Sync from URL search params (back/forward, external links).
  useEffect(() => {
    if (isManualSelectionRef.current) {
      isManualSelectionRef.current = false;
      return;
    }

    const componentFromUrl = searchParams.get("component") || initialComponent;
    const configFromUrl = decodeConfig(searchParams.get("config"));

    if (componentFromUrl && componentRegistry[componentFromUrl]) {
      if (componentFromUrl !== selectedComponent) {
        setComponentConfig(
          configFromUrl ?? generateDefaultConfig(componentFromUrl),
        );
        setSelectedComponent(componentFromUrl);
      } else if (configFromUrl) {
        setComponentConfig(configFromUrl);
      }
      return;
    }

    if (selectedComponent) {
      setSelectedComponent("");
      setComponentConfig({});
    }
  }, [searchParams, initialComponent, selectedComponent]);

  // Persist to localStorage so a refresh restores the last session.
  useEffect(() => {
    if (selectedComponent) {
      localStorage.setItem(
        PLAYGROUND_STORAGE_KEY,
        JSON.stringify({
          component: selectedComponent,
          config: componentConfig,
        }),
      );
    }
  }, [selectedComponent, componentConfig]);

  const handleComponentSelect = useCallback(
    (componentKey: string) => {
      if (componentKey === selectedComponent) return;

      isManualSelectionRef.current = true;

      if (componentRegistry[componentKey]) {
        setComponentConfig(generateDefaultConfig(componentKey));
        setSelectedComponent(componentKey);

        startTransition(() => {
          router.replace(playgroundComponentHref(componentKey), {
            scroll: false,
          });
        });
      }
    },
    [selectedComponent, router],
  );

  const handlePropertyChange = useCallback(
    (property: string, value: ComponentPropValue) => {
      setComponentConfig((prev) => ({
        ...prev,
        [property]: value,
      }));
    },
    [],
  );

  const handleResetCurrent = useCallback(() => {
    if (!selectedComponent) {
      return;
    }

    setComponentConfig(generateDefaultConfig(selectedComponent));
    toast("Component props reset");
  }, [selectedComponent]);

  const handleResetProperty = useCallback(
    (property: string) => {
      const prop = componentRegistry[selectedComponent]?.props[property];

      if (!prop) {
        return;
      }

      setComponentConfig((prev) => ({
        ...prev,
        [property]: prop.default,
      }));
    },
    [selectedComponent],
  );

  const handleReset = useCallback(() => {
    setSelectedComponent("");
    setComponentConfig({});
    localStorage.removeItem(PLAYGROUND_STORAGE_KEY);
    router.replace("/playground", { scroll: false });
  }, [router]);

  const handleCopyCode = useCallback(
    async (variant: CodeVariant = "jsx") => {
      const component = componentRegistry[selectedComponent];
      const code = component
        ? generatePlaygroundCode(component, componentConfig, variant)
        : "";

      try {
        await copyCodeToClipboard(code);
        toast(
          variant === "install"
            ? "Install command copied"
            : variant === "full"
              ? "Full example copied"
              : "JSX copied",
        );
      } catch (err) {
        toast("Failed to copy code");
        console.error("Clipboard error:", err);
      }
    },
    [selectedComponent, componentConfig, copyCodeToClipboard],
  );

  const handleCopyLink = useCallback(() => {
    if (!selectedComponent) {
      return;
    }

    const url = new URL(window.location.href);
    url.pathname = "/playground";
    url.searchParams.set("component", selectedComponent);
    url.searchParams.set("config", encodeConfig(componentConfig));

    copyLink(url.toString()).catch(() => toast("Failed to copy link"));
  }, [selectedComponent, componentConfig, copyLink]);

  return {
    selectedComponent,
    componentConfig,
    showCode,
    setShowCode,
    linkCopied,
    handleComponentSelect,
    handlePropertyChange,
    handleResetCurrent,
    handleResetProperty,
    handleReset,
    handleCopyCode,
    handleCopyLink,
  };
}
