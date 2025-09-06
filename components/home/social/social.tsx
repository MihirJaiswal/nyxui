import { Button } from "@/components/ui/button";
import ThreeDLayeredCard from "@/registry/ui/3d-layered-card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Social() {
  return (
    <section className="relative pt-20 pb-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8 transition-all duration-1000 ">
          <div className="max-w-4xl flex flex-col items-center justify-center mx-auto">
            <h1 className="text-3xl sm:text-4xl text-center font-bold tracking-tight leading-tight mb-2">Follow us</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Join our social media for the latest updates.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12 z-20">
          <ThreeDLayeredCard
            logo="/assets/images/landing-page/twitterlogo.svg"
            logoSize={32}
            mainImage="/assets/images/landing-page/twitter.png"
            borderColor="#374153"
            borderWidth="1px"
            glowGradient="#9FA2AA"
            backgroundColor="bg-gradient-to-b from-gray-800 via-gray-900 to-black"
            shineIntensity={0.6}
          >
            <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm text-neutral-200 mb-2">
              Follow for new updates
              </p>
              <Link
                href="https://x.com/mihir_jaiswal_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="group relative overflow-hidden bg-gradient-to-r from-gray-500/90 via-gray-600/90 to-gray-700/90 backdrop-blur-sm border border-gray-400/30 hover:from-gray-400/90 hover:via-gray-500/90 hover:to-gray-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5 px-4 py-2 rounded-lg">
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Twitter
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </Button>
              </Link>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/landing-page/linkedinlogo.svg"
            logoSize={100}
            logoPosition={{ expanded: -12 }}
            mainImage="/assets/images/landing-page/linkedin.png"
            borderColor="#34CEEE"
            borderWidth="1px"
            glowGradient="#34CEEE"
            backgroundColor="bg-gradient-to-b from-blue-400 to-blue-600"
            shineIntensity={0.6}
          >
            <div className="flex flex-col items-center justify-center gap-1 ">
              <p className="text-sm text-neutral-200 mb-2">
                Follow me on LinkedIn.
              </p>
              <Link
                href={"https://www.linkedin.com/in/mihir-jaiswal-322898287/s"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500/90 via-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/30 hover:from-blue-400/90 hover:via-blue-500/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5 px-4 py-2 rounded-lg">
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Linkedin
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </Button>
              </Link>
            </div>
          </ThreeDLayeredCard>

          <ThreeDLayeredCard
            logo="/assets/images/landing-page/githublogo.svg"
            logoSize={44}
            mainImage="/assets/images/landing-page/github.png"
            borderColor="#404040"
            borderWidth="1px"
            glowGradient="#737373"
            backgroundColor="bg-gradient-to-b from-neutral-800 via-neutral-900 to-black"
            shineIntensity={0.6}
          >
            <div className="flex flex-col items-center justify-center gap-1 ">
              <p className="text-sm text-neutral-200 mb-2">
                Star the repo and follow us.
              </p>
              <Link
                href={"https://github.com/MihirJaiswal/nyxui"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="group relative overflow-hidden bg-gradient-to-r from-neutral-500/90 via-neutral-600/90 to-neutral-700/90 backdrop-blur-sm border border-neutral-400/30 hover:from-neutral-400/90 hover:via-neutral-500/90 hover:to-neutral-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5 px-4 py-2 rounded-lg">
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Github
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </Button>
              </Link>
            </div>
          </ThreeDLayeredCard>
        </div>
      </div>
    </section>
  );
}
