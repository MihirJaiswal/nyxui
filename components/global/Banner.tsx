export const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 px-4 py-1 font-sans text-sm font-medium tracking-tight text-white">
      <h1 className="text-center">
        Introducing{" "}
        <span className="rounded-sm px-1 py-[3px] font-bold">Nyx UI v1.2.0</span>{" "}
        <span className="hidden md:inline">
          - Modern components to craft stunning websites effortlessly.
        </span>
      </h1>
    </div>
  );
};
