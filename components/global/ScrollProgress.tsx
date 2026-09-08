"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    let hideTimeout: ReturnType<typeof setTimeout>;
    let raf = 0;

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        thumb.style.display = "none";
        return;
      }
      thumb.style.display = "";

      const progress = window.scrollY / maxScroll;
      // thumb height = viewport / content ratio, min 40px
      const height = Math.max((clientHeight / scrollHeight) * clientHeight, 40);
      const maxTop = clientHeight - height;

      thumb.style.height = `${height}px`;
      thumb.style.transform = `translateY(${progress * maxTop}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        update();
        thumb.dataset.visible = "true";
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          thumb.dataset.visible = "false";
        }, 800);
      });
    };

    update();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={thumbRef} className="scrollbar-thumb-floating" aria-hidden />
  );
}
