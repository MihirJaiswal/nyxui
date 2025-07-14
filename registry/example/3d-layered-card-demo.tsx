import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import ThreeDLayeredCard from "../ui/3d-layered-card";

function ThreeDLayeredCardDemo() {
  return (
    <div className="flex items-center justify-center relative z-1">
      <div className="overflow-hidden flex flex-col items-center justify-center gap-3 relative py-24 px-4">
        <div className="flex gap-3">
          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/snaplogo.png"
            logoSize={32}
            mainImage="/assets/images/3d-layered-card/snap.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Snapchat"
            backgroundColor="bg-gradient-to-b from-[#FF9901] via-[#FF9901] to-[#9b600b]"
            shineIntensity={0.6}
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-yellow-900/40 backdrop-blur-3xl text-gray-200 border-yellow-500/30 py-[1px] relative"
              >
                REVENUE
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                The addictive habbits of sending snaps. 
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">4 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/macdlogo.png"
            logoSize={44}
            mainImage="/assets/images/3d-layered-card/macd.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="McDonald's"
            backgroundColor="bg-gradient-to-b from-red-600 to-red-500"
            shineIntensity={0.6}
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-yellow-900/40 backdrop-blur-3xl text-gray-200 border-yellow-500/30 py-[1px] relative"
              >
                ONBOARDING
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                The Psychology Behind McDonald's $2 Meal.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">5 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/linkedinlogo.png"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/linkedin.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="LinkedIn"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-blue-400 to-blue-600"
            glowGradient="#34CEEE"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-blue-900/40 backdrop-blur-3xl text-gray-200 border-blue-500/30 py-[1px] relative"
              >
                RETENTION
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                How Linkedin Increased Notification.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">3 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>
        </div>

        <div className="flex gap-3">
          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/tinderlogo.png"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/tinder.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Tinder"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-red-400 to-rose-500"
            glowGradient="#F3B4C7"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <Badge
                variant="secondary"
                className="bg-rose-950/30 backdrop-blur-3xl text-gray-200 border-pink-800/30 py-[1px] relative"
              >
                MOST POPULAR
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                How Tinder Converts 8% of singles into Customers.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">5 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/instalogo.png"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/insta.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Instagram"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-br from-purple-700 via-pink-600 to-[#9D5D3F]"
            glowGradient="#E583E2"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <Badge
                variant="secondary"
                className="bg-pink-950/40 backdrop-blur-3xl text-gray-200 border-pink-900/30 py-[1px] relative"
              >
                MOST POPULAR
              </Badge>
              <h1 className="text-white text-[16px] font-semibold tracking-tight leading-tight text-center">
                The Scary Future Of Instagram.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">5 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/youtubelogo.svg"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/youtube.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="YouTube"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-white via-gray-100 to-neutral-600"
            glowGradient="#ffffff"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <Badge
                variant="secondary"
                className="bg-gray-600/40 backdrop-blur-3xl text-gray-200 border-gray-500/30 py-[1px] relative"
              >
                REVENUE
              </Badge>
              <h1 className="text-white text-[16px] font-semibold tracking-wide leading-tight text-center">
                Youtube's Attempt To Solve The Paradox of Choice.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">5 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>
        </div>
        <div className="flex gap-3">
          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/spotifylogo.png"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/spotify.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Spotify"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-green-400 to-green-800"
            glowGradient="#52EBB1"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-green-950/40 backdrop-blur-3xl text-gray-200 border-green-500/30 py-[1px] relative"
              >
                ONBOARDING
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                Spotify and the Power of Personalization in Music.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">4 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/amazonlogo.png"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/amazon.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Amazon"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-gray-600 via-gray-700"
            glowGradient="#8CA1BB"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-gray-700/40 backdrop-blur-3xl text-gray-200 border-gray-300/30 py-[1px] relative"
              >
                REVENUE
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center max-w-sm">
                The Psychology Behind Amazon's Purchase.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">5 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/3d-layered-card/redditlogo.png"
            logoSize={90}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/3d-layered-card/reddit.png"
            borderColor="#ffffff"
            borderWidth="1px"
            title="Reddit"
            shineIntensity={0.6}
            backgroundColor="bg-gradient-to-b from-[#FF3203] to-[#FF3203]"
            glowGradient="#F27323"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-4">
              <Badge
                variant="secondary"
                className="bg-orange-950/40 backdrop-blur-3xl text-gray-200 border-orange-500/30 py-[1px] relative"
              >
                REVENUE
              </Badge>
              <h1 className="text-white text-[17px] font-semibold tracking-wide leading-tight text-center">
                Snapchat: The Power of User-Generated Content.
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-2.5 w-2.5 text-gray-100" />
                <span className="text-gray-100 text-xs">4 min</span>
              </div>
            </div>
          </ThreeDLayeredCard>
        </div>
      </div>
    </div>
  );
}

export default ThreeDLayeredCardDemo;
