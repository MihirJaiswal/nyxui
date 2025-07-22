import { AnimatedGrainyBg, GrainyAnimatedBgProps } from "../ui/animated-grainy-bg";


export default function GrainyBgDemo() {
  const animationTypes: Array<GrainyAnimatedBgProps["animationType"]> = [
    "flow",
    "mesh",
    "waves",
    "aurora",
    "spiral",
    "pulse",
  ]

  const grainTypes: Array<GrainyAnimatedBgProps["grainType"]> = [
    "digital",
    "plasma",
    "scratches",
    "paper",
    "noise",
    "dust",
  ]


  return (
    <>
    <div className="min-h-screen">
       <div className="mb-16">
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Animation Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {animationTypes.map((animationType) => (
            <div key={animationType} className="relative">
              <AnimatedGrainyBg
                animationType={animationType}
                grainType="paper"
                grainIntensity={40}
                colors={["#1b078c", "#a3079e", "#c20673", "#06d4b8"]}
                speed={1.5}
                style={{ 
                  height: "200px",
                  width: "300px",
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-black capitalize">{animationType}</h3>
                    <p className="text-sm text-neutral-800 mt-1">Animation Pattern</p>
                  </div>
                </div>
              </AnimatedGrainyBg>
            </div>
          ))}
        </div>
      </div>

      {/* Grain Types Demo */}
     
        <h2 className="text-2xl font-bold mb-8 text-center">Grain Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {grainTypes.map((grainType) => (
            <div key={grainType} className="relative">
              <AnimatedGrainyBg
                animationType="mesh"
                grainType={grainType}
                grainIntensity={60}
                colors={["#1b078c", "#a3079e", "#c20673", "#06d4b8"]}
                speed={0.8}
                style={{ height: "200px" }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center ">
                    <h3 className="text-lg font-semibold text-white capitalize">{grainType}</h3>
                    <p className="text-sm text-neutral-200 mt-1">Grain Texture</p>
                  </div>
                </div>
              </AnimatedGrainyBg>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
