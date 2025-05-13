import LampHeading from "../ui/lamp-heading";

export const LampHeadingDemo = () => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto p-8">
      <div className="p-12">
        <LampHeading
          text="Image Generation"
          className="text-2xl"
          gradientColors={{ from: "#ff3366", to: "#338ef7" }}
          lineHeight={2.5}
          glowIntensity={0.8}
          glowSize={44}
          direction="above"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8">
          <LampHeading
            text="AI Solutions"
            className="text-xl"
            gradientColors={{ from: "#00c6ff", to: "#0072ff" }}
            lineHeight={2.5}
            glowIntensity={0.8}
            glowSize={15}
          />
        </div>

        <div className="p-8">
          <LampHeading
            text="Data Analysis"
            className="text-xl"
            gradientColors={{ from: "#f857a6", to: "#ff5858" }}
            lineHeight={2}
            glowIntensity={0.6}
            glowSize={25}
          />
        </div>
      </div>
    </div>
  );
};
