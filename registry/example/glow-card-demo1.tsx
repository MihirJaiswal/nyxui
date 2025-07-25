import { Badge } from "@/components/ui/badge"
import { Target, Star, Moon, Skull, Droplet } from "lucide-react"
import Image from "next/image"
import { GlowCard } from "../ui/glow-card"

export default function GlowCardDemo1() {
  return (
    <div className="w-full">
      {/* Desktop: Overlapping layout, Mobile: Grid layout */}
      <div className="relative w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:hidden gap-6 lg:gap-8">
          <div className="w-full max-w-sm mx-auto">
            <GlowCard variant="glitch" glitchColor1="#ff0064" glitchColor2="#00ff64" className="w-full h-auto min-h-[400px] sm:min-h-[40px]">
              <div className="h-full flex flex-col ">
                <div className="h-40 sm:h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-pink-600 to-green-600 flex items-center justify-center">
                  <Image
                    src="/assets/images/glow-card/deoxys.jpg"
                    alt="Digital Matrix"
                    width={200}
                    height={200}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-white">
                  <Badge className="mb-3 bg-pink-500/20 text-pink-300 border-pink-500/30">
                    <Target className="w-3 h-3 mr-1" />
                    Psychic
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Deoxys</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-4">
                    An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 mr-1" />
                    <span>Generation 3</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Card 2 - Darkrai */}
          <div className="w-full max-w-sm mx-auto">
            <GlowCard variant="laser" laserColor="#ef4444" className="w-full h-auto min-h-[400px] sm:min-h-[450px]">
              <div className="h-full flex flex-col">
                <div className="h-40 sm:h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                  <Image
                    src="/assets/images/glow-card/darkrai.jpg"
                    alt="Laser Targeting"
                    width={200}
                    height={200}
                    quality={100}
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
                <div className="flex-1 text-white">
                  <Badge className="mb-3 bg-red-500/20 text-red-300 border-red-500/30">
                    <Moon className="w-3 h-3 mr-1" />
                    Dark
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Darkrai</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-4">
                    It chases people and Pokémon from its territory by causing them to experience deep, nightmarish slumbers.
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mr-1" />
                    <span>Generation 4</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Card 3 - Lunala */}
          <div className="w-full max-w-sm mx-auto">
            <GlowCard variant="cosmic" className="w-full h-auto min-h-[400px] sm:min-h-[450px]">
              <div className="h-full flex flex-col">
                <div className="h-40 sm:h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Image
                    src="/assets/images/glow-card/lunala.jpg"
                    alt="Cosmic Space"
                    width={200}
                    height={200}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-white">
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      <Skull className="w-3 h-3 mr-1" />
                      Ghost
                    </Badge>
                    <Badge className="bg-pink-500/20 text-purple-300 border-purple-500/30">
                      <Target className="w-3 h-3 mr-1" />
                      Psychic
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Lunala</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-4">
                    Said to live in another world, this Pokémon devours light, drawing the moonless dark veil of night over the brightness of day.
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-1" />
                    <span>Generation 7</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Card 4 - Suicune */}
          <div className="w-full max-w-sm mx-auto">
            <GlowCard variant="liquid" liquidColor="#0ea5e9" className="w-full h-auto min-h-[400px] sm:min-h-[450px]">
              <div className="h-full flex flex-col">
                <div className="h-40 sm:h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Image
                    width={200}
                    height={200}
                    quality={100}
                    src="/assets/images/glow-card/suicune.jpg"
                    alt="Liquid Dynamics"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-white">
                  <Badge className="mb-3 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Droplet className="w-3 h-3 mr-1" />
                    Water
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Suicune</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-4">
                    This Pokémon races across the land. It is said that north winds will somehow blow whenever it appears.
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-1" />
                    <span>Generation 2</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>

        {/* Desktop: Overlapping Layout (XL screens and up) */}
        <div className="hidden 2xl:block relative min-h-[600px] w-full">
          <div className="relative flex items-center justify-center min-h-[500px] w-full">
            {/* Card 1 - Deoxys */}
            <div
              className="absolute"
              style={{
                left: "0%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
              }}
            >
              <GlowCard variant="glitch" glitchColor1="#ff0064" glitchColor2="#00ff64" className="w-80 2xl:w-96 h-112">
                <div className="h-full flex flex-col">
                  <div className="h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-pink-600 to-green-600 flex items-center justify-center">
                    <Image
                      src="/assets/images/glow-card/deoxys.jpg"
                      alt="Digital Matrix"
                      width={200}
                      height={200}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-white">
                    <Badge className="mb-3 bg-pink-500/20 text-pink-300 border-pink-500/30">
                      <Target className="w-3 h-3 mr-1" />
                      Psychic
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">Deoxys</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-pink-400 mr-1" />
                      <span>Generation 3</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Card 2 - Darkrai */}
            <div
              className="absolute"
              style={{
                left: "20%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
              }}
            >
              <GlowCard variant="laser" laserColor="#ef4444" className="w-80 2xl:w-96 h-112">
                <div className="h-full flex flex-col">
                  <div className="h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    <Image
                      src="/assets/images/glow-card/darkrai.jpg"
                      alt="Laser Targeting"
                      width={200}
                      height={200}
                      quality={100}
                      className="w-full h-full object-cover filter contrast-125"
                    />
                  </div>
                  <div className="flex-1 text-white">
                    <Badge className="mb-3 bg-red-500/20 text-red-300 border-red-500/30">
                      <Moon className="w-3 h-3 mr-1" />
                      Dark
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">Darkrai</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      It chases people and Pokémon from its territory by causing them to experience deep, nightmarish slumbers.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-red-400 mr-1" />
                      <span>Generation 4</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Card 3 - Lunala */}
            <div
              className="absolute"
              style={{
                left: "40%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 30,
              }}
            >
              <GlowCard variant="cosmic" className="w-80 2xl:w-96 h-112">
                <div className="h-full flex flex-col">
                  <div className="h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Image
                      src="/assets/images/glow-card/lunala.jpg"
                      alt="Cosmic Space"
                      width={200}
                      height={200}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-white">
                    <div className="flex gap-2">
                      <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <Skull className="w-3 h-3 mr-1" />
                        Ghost
                      </Badge>
                      <Badge className="mb-3 bg-pink-500/20 text-purple-300 border-purple-500/30">
                        <Target className="w-3 h-3 mr-1" />
                        Psychic
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lunala</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Said to live in another world, this Pokémon devours light, drawing the moonless dark veil of night over the brightness of day.
                    </p>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Star className="w-4 h-4 text-purple-400 mr-1" />
                      <span>Generation 7</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Card 4 - Suicune */}
            <div
              className="absolute"
              style={{
                left: "60%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 40,
              }}
            >
              <GlowCard variant="liquid" liquidColor="#0ea5e9" className="w-80 2xl:w-96 h-112">
                <div className="h-full flex flex-col">
                  <div className="h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <Image
                      width={200}
                      height={200}
                      quality={100}
                      src="/assets/images/glow-card/suicune.jpg"
                      alt="Liquid Dynamics"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-white">
                    <Badge className="mb-3 bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <Droplet className="w-3 h-3 mr-1" />
                      Water
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">Suicune</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      This Pokémon races across the land. It is said that north winds will somehow blow whenever it appears.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-blue-400 mr-1" />
                      <span>Generation 2</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}