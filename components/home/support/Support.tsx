'use client'
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { BsChatSquareHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import LinkedInPhoneComponent from "./LinkedinPhone";
import XPhoneComponent from "./XPhone";

// Define the platform type
type Platform = 'twitter' | 'linkedin' | 'github';

export default function SupportSection() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: Platform) => {
    setIsSharing(true);
    
    const url = window.location.origin;
    
    // Pre-written posts for each platform
    const posts: Record<Platform, string> = {
      twitter: "🚀 Say hello to Nyx UI - a sleek collection of modern components!! \n\n✨ Modern Components\n🔧 Playground for Customization\n📱 Fully Responsive \n\nif you value both speed and design when creating web apps, this is something for you.",
      
      linkedin: "🚀 Just came across Nyx UI, - a sleek collection of modern components! 🚀 \n\nIt’s a React component library that makes building modern web interfaces so much faster. The components are clean, responsive, and easy to customize\n\nNyx UI brings:\n⚡ A growing collection of pre-built components\n📱 Beautiful, responsive designs\n🔧 Easy customization of components using its playground\n\nDevelopers, if you value both speed and design when creating web apps, this is something you’ll want to explore.\n\n#WebDevelopment #React #UI #Frontend #WebDesign #nyxui",
      
      github: "Check out this amazing UI component library!"
    };
    
    const shareUrls: Record<Platform, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(posts.twitter)}&url=${encodeURIComponent(url)}&hashtags=design,frontend,webdev`,
      linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(posts.linkedin + '\n\n' + url)}`,
      github: 'https://github.com/MihirJaiswal/nyxui'
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setIsSharing(false);
    }, 1000);
  };

  return (
    <div className="w-full pt-20 pb-24 overflow-hidden px-6 xl:px-22 xl:container mx-auto">
      <div className="relative flex flex-col justify-start z-10 px-4 sm:px-6 md:px-8 lg:px-8 py-2 dark:bg-neutral-950/80 dark:text-white bg-white border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
        
        {/* Enhanced corner decorations with glow */}
        <div className="absolute -top-0.5 left-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 right-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>

        <div className="absolute -bottom-0.5 left-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 right-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>

        {/* LinkedIn Phone - Enhanced */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-4 xl:translate-x-4 hidden lg:block"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        >
          <div style={{ perspective: 1000 }}>
            <LinkedInPhoneComponent/>
          </div>
        </motion.div>

        {/* X Phone - Enhanced */}
        <motion.div
          className="absolute bottom-0 right-5 xl:right-15 hidden lg:block"
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        >
          <div style={{ perspective: 1200 }}>
            <XPhoneComponent/>
          </div>
        </motion.div>

        {/* Enhanced support section */}
        <div className="flex flex-col items-center justify-center gap-6 py-10 lg:w-[40%]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-pink-600">
              <BsChatSquareHeartFill className="h-8 w-8 text-white mt-1" />
            </div>
            <motion.h2
              className="text-balance text-center text-4xl font-bold"
              whileInView={{ scale: [0.98, 1.02, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Support Us
            </motion.h2>
            <motion.p className="text-center text-neutral-600 dark:text-neutral-400 sm:max-w-md max-w-xs">
              Help Nyx UI grow by sharing with your network. We&apos;ve prepared
              ready-to-use posts for you, just click share.
            </motion.p>
            <motion.div
              className="flex items-center gap-2 mt-2 border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full sm:w-96"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button 
                onClick={() => handleShare('linkedin')}
                disabled={isSharing}
                className="flex items-center gap-3 hover:bg-blue-300 dark:hover:bg-blue-700 px-4 py-3 w-full cursor-pointer transition-colors duration-200 border-none bg-transparent"
              >
                <div className="flex-shrink-0">
                  <FaLinkedinIn
                    className="h-5 w-5 cursor-pointer"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Share on LinkedIn
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </div>
              </button>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full sm:w-96"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button 
                onClick={() => handleShare('twitter')}
                disabled={isSharing}
                className="flex items-center gap-3 hover:bg-zinc-300 dark:hover:bg-zinc-700 px-4 py-3 w-full cursor-pointer transition-colors duration-200 border-none"
              >
                <div className="flex-shrink-0">
                  <FaXTwitter
                    className="h-5 w-5 cursor-pointer"
                    title="Share on X"
                    aria-label="Share on X"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Share on X
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </div>
              </button>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full sm:w-96"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button 
                onClick={() => handleShare('github')}
                disabled={isSharing}
                className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-800 px-4 py-3 w-full cursor-pointer transition-colors duration-200 border-none"
              >
                <div className="flex-shrink-0">
                  <FaGithub
                    className="h-5 w-5 cursor-pointer"
                    title="Star on Github"
                    aria-label="Star on Github"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Star on Github
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}