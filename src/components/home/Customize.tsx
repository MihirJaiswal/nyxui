import CardThemeCustomizer from './Customizable';
import { Tiles } from '../ui/Tiles';

const Customize = () => {
  return (
    <section
      className="w-full py-8 md:py-20 flex flex-col items-center justify-center gap-12 max-w-7xl mx-auto relative"
      aria-labelledby="customize-heading"
    >
      <header className="flex flex-col px-4 gap-6 items-center text-center w-full">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center flex-wrap">
          <h1
            id="customize-heading"
            className="tracking-tight font-bold text-4xl lg:text-7xl leading-tight"
          >
            Crafted{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              your
            </span>{" "}
            way.
          </h1>
        </div>
        <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mt-2">
          Customize your experience with our intuitive theme editor. Choose colors, styles, and layouts that reflect your unique personality.
        </p>
      </header>
      <div className="w-full relative">
        <div className="absolute -top-44 md:-top-12 -left-12 hidden lg:block w-96 h-96 opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 md:bg-gradient-to-br dark:from-zinc-950 from-white via-transparent to-background" />
        </div>
        <CardThemeCustomizer />
      </div>
    </section>
  );
};

export default Customize;