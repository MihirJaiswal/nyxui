export function LandingHeroIntro(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <h1 className="text-balance text-5xl font-medium dark:font-normal tracking-[-0.03em] sm:text-7xl leading-[0.68]">
        Build interfaces
        <br />
        that feel{" "}
        <span className="font-caveat text-brand tracking-[-0.04em] text-6xl sm:text-8xl font-bold">
          alive.
        </span>
      </h1>
      <p className="mx-auto pt-2 max-w-4xl text-pretty text-foreground/80 text-sm sm:text-xl lg:text-2xl">
        Easily plug in the latest trending components without stressing over
        design or animations.
      </p>
    </div>
  );
}
