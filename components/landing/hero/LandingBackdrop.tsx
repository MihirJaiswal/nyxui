export function LandingBackdrop(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-0 h-[180px] w-screen -translate-x-1/2 bg-size-[3px_3px] bg-[linear-gradient(to_right,--theme(--color-foreground/0.05)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/0.05)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_55%_at_50%_0%,black_0%,transparent_100%)]"
    />
  );
}
