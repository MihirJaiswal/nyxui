"use client";

import { useEffect, useRef } from "react";

type Target = Window | Document | HTMLElement | null;
type RefTarget = React.RefObject<HTMLElement | null>;
type Element = Target | RefTarget;

function isRefObject(element: Element | undefined): element is RefTarget {
  return (
    element != null &&
    typeof element === "object" &&
    "current" in element &&
    !("addEventListener" in element)
  );
}

function resolveTarget(element: Element | undefined): EventTarget | null {
  if (element == null) return window;
  if (isRefObject(element)) {
    return element.current;
  }
  return element as EventTarget;
}

export function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element?: Element,
  options?: AddEventListenerOptions,
): void {
  const savedHandler = useRef(handler);
  const usingRef = isRefObject(element);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = resolveTarget(element);
    if (target == null) return;

    const listener = (event: Event) => savedHandler.current(event);

    target.addEventListener(eventName, listener, options);
    return () => {
      target.removeEventListener(eventName, listener, options);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    eventName,
    usingRef ? null : element,
    options?.capture,
    options?.passive,
    options?.once,
    options?.signal,
  ]);
}
