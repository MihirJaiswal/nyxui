"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export type ShuffleLoaderProps = {
  count?: number;
  size?: number;
  color?: string;
  rounded?: number;
  className?: string;
  blockClassName?: string;
};

export function ShuffleLoader({
  count = 5,
  size = 32,
  color,
  rounded,
  className,
  blockClassName,
}: ShuffleLoaderProps) {
  const [blocks, setBlocks] = useState<{ id: number }[]>(() =>
    Array.from(Array(count).keys()).map((i) => ({ id: i })),
  );
  const blocksRef = useRef(blocks);
  blocksRef.current = blocks;
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    setBlocks(Array.from(Array(count).keys()).map((i) => ({ id: i })));
  }, [count]);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const pickTwoRandom = (arr: { id: number }[]) => {
    const idx1 = Math.floor(Math.random() * arr.length);
    let idx2 = Math.floor(Math.random() * arr.length);
    while (idx2 === idx1) idx2 = Math.floor(Math.random() * arr.length);
    return [arr[idx1], arr[idx2]] as const;
  };

  useEffect(() => {
    // Local cancellation flag — the ref was shared across effect runs, so a
    // new run resetting it would resurrect the previous still-awaiting loop.
    let cancelled = false;

    const getBlockEl = (id: number) =>
      scope.current?.querySelector<HTMLElement>(`[data-block-id="${id}"]`) ??
      null;

    const shuffle = async () => {
      // Wait one frame so React can paint the tiles before we query them.
      await new Promise((r) => requestAnimationFrame(r));
      for (;;) {
        if (cancelled || !scope.current) return;
        const current = blocksRef.current;
        if (current.length < 2) return;
        const [el1, el2] = pickTwoRandom(current);
        const node1 = getBlockEl(el1.id);
        const node2 = getBlockEl(el2.id);
        if (!node1 || !node2) {
          // DOM hasn't caught up with state yet — retry next tick.
          await delay(50);
          continue;
        }
        animate(node1, { y: -size }, { ease: "easeInOut", duration: 0.175 });
        await animate(
          node2,
          { y: size },
          { ease: "easeInOut", duration: 0.175 },
        );
        if (cancelled) return;
        await delay(175);
        if (cancelled) return;
        setBlocks((prev) => {
          const copy = [...prev];
          const idx1 = copy.findIndex((b) => b.id === el1.id);
          const idx2 = copy.findIndex((b) => b.id === el2.id);
          if (idx1 < 0 || idx2 < 0) return prev;
          copy[idx1] = el2;
          copy[idx2] = el1;
          return copy;
        });
        await delay(350);
        if (cancelled) return;
        animate(node1, { y: 0 }, { ease: "easeInOut", duration: 0.175 });
        await animate(node2, { y: 0 }, { ease: "easeInOut", duration: 0.175 });
        if (cancelled) return;
        await delay(175);
      }
    };

    void shuffle();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, size]);

  const tileStyle: React.CSSProperties = { width: size, height: size };
  if (color) tileStyle.backgroundColor = color;
  if (rounded != null) tileStyle.borderRadius = rounded;

  return (
    <div
      ref={scope}
      className={cn("flex divide-x divide-neutral-950", className)}
    >
      {blocks.map((b) => (
        <motion.div
          key={b.id}
          layout
          data-block-id={b.id}
          transition={{ ease: "easeInOut", duration: 0.175 }}
          style={tileStyle}
          className={cn(!color && "bg-white", blockClassName)}
        />
      ))}
    </div>
  );
}

export default ShuffleLoader;
