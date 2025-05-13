import CardThemeCustomizer from "./Customizable";
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
            className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Crafted your way.
          </h1>
        </div>
        <p className="mx-auto text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
          Highly adaptable components designed for complete customization.
        </p>
      </header>

      <div className="w-full relative">
        <CardThemeCustomizer />
      </div>
    </section>
  );
};

export default Customize;
