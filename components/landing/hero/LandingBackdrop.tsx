/**
 * Paper-style drafting-table backdrop, ported 1:1 from the paper.design
 * reference markup. All layers are pointer-events-none and aria-hidden.
 * `laptop:` breakpoints map to `lg:`, `bg-cream`/`paper-50` map to
 * `bg-background`.
 */
export function LandingBackdrop(): React.ReactElement {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/layout/grid.svg')] bg-size-[120px_120px] bg-position-[calc(50%+60px)_0px] bg-repeat opacity-30 lg:block dark:invert"
      />

      {/* Dotted verticals — full-height columns of dots, starting 64px below the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-0 hidden bg-[url('/layout/dots-y.svg')] bg-repeat opacity-30 lg:block dark:invert"
        style={{ backgroundPosition: "calc(50% + 60px) 0px" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 hidden w-7.5 bg-[url('/layout/ruler-x.svg')] bg-size-[30px_120px] bg-position-[0_-60px] bg-repeat-y opacity-40 lg:block dark:opacity-20 dark:invert"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 right-0 z-0 hidden w-7.5 scale-x-[-1] bg-[url('/layout/ruler-x.svg')] bg-size-[30px_120px] bg-position-[0_-60px] bg-repeat-y opacity-40 lg:block dark:opacity-20 dark:invert"
      />

      {/* Corner masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-1 h-15 w-15 bg-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-1 h-15 w-15 bg-background"
      />

      {/* Cover below 540px so the backdrop terminates */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-122.5 bottom-0 left-0 z-2 hidden w-screen lg:block"
      >
        <div className="absolute inset-0 bg-background" />
      </div>
    </>
  );
}
