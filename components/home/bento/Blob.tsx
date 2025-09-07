'use client'
import { lazy, Suspense, useState, useEffect, useCallback } from "react";

const MorphingBlob = lazy(() => 
  import("@/registry/ui/morphing-blob").then(module => ({
    default: module.MorphingBlob
  }))
);

const LampHeading = lazy(() => 
  import("@/registry/ui/lamp-heading").then(module => ({
    default: module.LampHeading
  }))
);

const useProgressiveLoad = (delay = 1500) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPageLoad = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => setShouldLoad(true), delay);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => setShouldLoad(true), delay);
        });
      }
    };

    checkPageLoad();
  }, [delay]);

  const observeRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { shouldLoad: shouldLoad && isVisible, observeRef };
};

const OptimizedBlobFallback = () => (
  <div className="w-96 h-96 relative scale-95 ml-6">
    {/* Main blob shape */}
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <div 
        className="w-full h-full bg-gradient-to-br from-purple-600/30 via-pink-500/40 to-cyan-400/30 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(102, 10, 138, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(200, 30, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(183, 0, 255, 0.2) 0%, transparent 70%)
          `,
          animation: 'blob-morph 8s ease-in-out infinite'
        }}
      />
    </div>
    {/* Background effects */}
    <div className="absolute scale-95 -z-1 top-12 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-gradient-to-b from-transparent via-purple-500/10 blur-xl to-[#5C0B63]/40 rounded-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"/>
    <div className="absolute scale-95 -z-1 top-24 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-12 w-32 bg-purple-500/80 blur-2xl rounded-b-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"/>
    
    <div className="text-center p-6 z-2">
    </div>
  </div>
);

const LampHeadingFallback = () => (
  <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4 pb-12">
    {/* Simple fallback for LampHeading */}
    <div className="relative">
      <h2 className="font-bold text-white text-2xl tracking-wide mb-3">
        Build Innovative
      </h2>
      <div 
        className="w-full h-1 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #6e15ad, #d413ad)',
          boxShadow: '0 0 20px rgba(110, 21, 173, 0.5)'
        }}
      />
    </div>
  </div>
);

const Blob = () => {
  const { shouldLoad, observeRef } = useProgressiveLoad(1000);

  return (
    <>
      <style jsx>{`
        @keyframes blob-morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
          75% { border-radius: 60% 40% 60% 30% / 70% 30% 60% 40%; }
        }
      `}</style>

      <div 
        ref={observeRef}
        className="w-full h-full max-w-full max-h-full overflow-hidden relative"
      > 
        <div className="flex flex-col items-center justify-center group h-full">
          
          {shouldLoad ? (
            <Suspense fallback={<OptimizedBlobFallback />}>
              <MorphingBlob theme="cosmic" className="scale-95 ml-6">
                <div className="text-center p-6 z-2">
                  {/* <MoonIcon className="h-10 w-10 mx-auto mb-3 mr-3 text-white" /> */}
                </div>
                
                <div className="absolute scale-95 -z-1 top-12 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-gradient-to-b from-transparent via-purple-500/10 blur-xl to-[#5C0B63]/40 rounded-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"/>
                <div className="absolute scale-95 -z-1 top-24 left-1/2 -ml-2 -translate-x-1/2 -translate-y-1/2 h-12 w-32 bg-purple-500/80 blur-2xl rounded-b-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"/>
              </MorphingBlob>
            </Suspense>
          ) : (
            <OptimizedBlobFallback />
          )}

          {shouldLoad ? (
            <Suspense fallback={<LampHeadingFallback />}>
              <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4 pb-12">
                <LampHeading
                  text="Build Innovative"
                  gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
                  direction="below"
                  lampHeight={50}
                  lineHeight={3}
                  glowIntensity={0.4}
                  textSize="2xl"
                  showLightRays
                  className="font-bold text-white"
                />
              </div>
            </Suspense>
          ) : (
            <LampHeadingFallback />
          )}
        </div>
      </div>
    </>
  );
};

export default Blob;  