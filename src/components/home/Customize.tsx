import CardThemeCustomizer from './Customizable';
import { Tiles } from '../ui/Tiles';

const Customize = () => {
  return (
    <section
      className="w-full py-8 md:py-20 flex flex-col items-center justify-center gap-12 max-w-7xl mx-auto relative"
      aria-labelledby="customize-heading"
    >
      <header className="flex flex-col items-center text-center w-full px-4 gap-3">
  <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
    <h1
      id="customize-heading"
      className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
    >
      Crafted{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        your
      </span>{" "}
      way.
    </h1>
  </div>
  <p className="mx-auto text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
  Highly adaptable components designed for complete customization.
  </p>
</header>

      <div className="w-full relative">
        <div className="absolute -top-44 md:-top-12 left-0 hidden lg:block w-96 h-96 opacity-60 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={75} cols={75} className="scale-110" />
          <div className="absolute inset-0 md:bg-gradient-to-tr dark:from-zinc-950 from-white via-transparent to-background" />
          <div className="absolute inset-0 md:bg-gradient-to-tr dark:from-zinc-950 from-white via-transparent to-background" />
        </div>
        <CardThemeCustomizer />
      </div>
    </section>
  );
};

export default Customize;