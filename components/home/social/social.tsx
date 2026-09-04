import { Button } from "@/components/ui/button";
import ThreeDLayeredCard from "@/registry/ui/3d-layered-card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { externalLinks } from "@/lib/links";

export default function Social() {
  return (
    <section className="relative pt-20 pb-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <div className="max-w-4xl flex flex-col items-center justify-center mx-auto">
            <h1 className="text-3xl sm:text-4xl text-center font-bold tracking-tight leading-tight mb-2 text-foreground">
              Follow us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <p className="text-sm text-muted-foreground mb-2">
                Follow for new updates
              </p>
              <Link
                href={externalLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="group border-border/60 bg-background text-foreground hover:bg-muted"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Twitter
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
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
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-sm text-muted-foreground mb-2">
                Follow me on LinkedIn.
              </p>
              <Link
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="group border-border/60 bg-background text-foreground hover:bg-muted"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
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
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-sm text-muted-foreground mb-2">
                Star the repo and follow us.
              </p>
              <Link
                href={externalLinks.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="group border-border/60 bg-background text-foreground hover:bg-muted"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    GitHub
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Button>
              </Link>
            </div>
          </ThreeDLayeredCard>
        </div>
      </div>
    </section>
  );
}
