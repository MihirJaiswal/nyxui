import { BentoGrid } from "./bento-grid";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TwitterCard } from "./TweetCard";
import Blob from "./Blob";
import { TerminalKeyboardDemo } from "./keybord-termial";
import { Rbutton } from "@/components/ui/Rbutton";
import { Sparkles } from "@/components/ui/particles";
import DownloadCompleteSection from "./ProgressSteps";
import AnimatedChatDemo from "./Chat";

export const ComponentsDemo = () => {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-6 lg:px-12 xl:px-22 py-20">
      <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl sm:text-5xl text-center lg:text-5xl font-extrabold tracking-tight leading-tight">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 mt-2 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
        These are a few components that you can easily plug into your next
        project.
      </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        <BentoGrid
          className="md:col-span-2 hover:scale-[1.01] overflow-hidden  rounded-3xl transition-all duration-300 h-[480px] border border-neutral-200 dark:border-neutral-800"
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          component={
            <TerminalKeyboardDemo />
          }
        />
        <BentoGrid
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]  border border-neutral-200 dark:border-neutral-800"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={
            <>
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-b from-pink-200/40 via-pink-200/40 to-purple-400/40 dark:from-black dark:via-black dark:to-black relative"
              >
                <Blob />
              </div>
              <div className='absolute -bottom-68 h-full w-full max-w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#DA33FF,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#4e1674] after:bg-[#20082b]'>
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Sparkles
                    density={800}
                    speed={1.2}
                    size={1.2}
                    direction='top'
                    opacitySpeed={2}
                    color='#DA33FF'
                    className='w-full h-full'
                  />
                </div>
              </div>
            </>
          }
        />
        <BentoGrid
          className="rounded-2xl sm:p-4 p-0 md:p-0 overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800 bg-purple-200 dark:bg-purple-950"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={<TwitterCard />}
        />
        <BentoGrid
          enableDescription={false}
          enableTitle={false} 
          height="h-110"
          className="rounded-2xl flex items-start justify-end transition-all duration-500  hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800 tracking-wider "
          component={
            <AnimatedChatDemo/>
          }
        /> <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl bento-download-trigger !p-0 overflow-hidden bg-white dark:bg-black transition-all duration-300 hover:scale-[1.02] border border-neutral-200 dark:border-neutral-800"
          component={
            <div className="h-full flex !p-0 items-center justify-center">
              <DownloadCompleteSection />
            </div>
          }
        />
      </div>
      <div className="relative mt-12 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 px-8">
        <Link href="/components" rel="noopener noreferrer">
          <Rbutton className="bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer relative transition duration-200 p-px font-semibold text-white px-4 py-2 h-14 w-full items-center justify-center rounded-2xl text-center text-sm sm:w-52">
            All Components
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Rbutton>
        </Link>
      </div>
    </div>
  );
};