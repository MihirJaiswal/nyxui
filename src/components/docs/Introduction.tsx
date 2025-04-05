import Image from "next/image"
import { Separator } from "../ui/separator"

export default function IntroductionPage() {
  return (
    <div className="container max-w-5xl py-4 mx-auto">
      <div className="space-y-10">
        <div className="space-y-2" id="introduction">
          <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
          <p className="text-xl text-muted-foreground">
            Craft animated landing pages using ready-to-use components that you can simply copy and integrate into your applications.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl border shadow-md">
          <Image
            src="/docs-cover.webp"
            alt="Nyx UI Components Preview"
            width={1200}
            height={630}
            loading="lazy"
            quality={100}
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What is Nyx UI?</h2>
            <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
              Nyx UI is a top-notch set of reusable components designed for seamless integration into your web projects. It focuses on offering components, blocks, and templates ideal for building landing pages and marketing materials with a professional touch and meticulous design.
            </p>
          </div>
          <Separator className="md:col-span-3 my-2" />
          <div className="md:col-span-3" id="faq">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold">How user-friendly is it?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nyx UI offers a library of plug-and-play components that are ready to be integrated into your web projects. Every component is self-contained and developed using contemporary React techniques, ensuring a smooth implementation.
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold">Do you plan to release it on NPM?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely. We are currently finalizing the package and will soon make it available on NPM, which will simplify installation and future updates.
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold">Who can benefit from Nyx UI?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nyx UI is tailored for web developers and designers of any proficiency who want to create professional landing pages and marketing content without having to start from scratch.
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold">Can I personalize it?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Certainly! Each component is designed with customization at its core, allowing you to effortlessly adjust colors, dimensions, and behaviors to align with your brand and unique needs.
                </p>
              </div>
            </div>
          </div>

          <Separator className="md:col-span-3 my-2" />

          <div className="md:col-span-3" id="philosophy">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="leading-7">
                  I strongly believe that outstanding design forms the foundation of high-quality software. It plays a crucial role in building trust between a company and its users, who might initially be unfamiliar.
                </p>

                <p className="leading-7">
                  Poor design can tarnish your reputation, appearing unprofessional, incomplete, and untrustworthy. This may signal that the team behind it lacks attention to detail and undervalues the user experience.
                </p>

                <p className="leading-7">
                  On the other hand, superior design reflects a meticulous and committed team. It instills confidence in users, suggesting that if the team dedicates significant effort to every detail, they likely excel in other critical areas as well.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="leading-7">
                  Nyx UI exemplifies this belief by offering reusable React components that are both highly functional and visually appealing. Our dedication to quality design ensures that our components are sturdy, refined, and dependable.
                </p>

                <p className="leading-7">
                  Ultimately, our design philosophy at Nyx UI represents a broader commitment to excellence and customer service, reassuring users that they are in good hands.
                </p>
                
                <div className="flex items-center gap-2 mt-6">
                  <div className="w-16 h-1 bg-black dark:bg-white"></div>
                  <p className="font-medium">Design with purpose</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
