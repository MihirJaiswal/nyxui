'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Minus } from 'lucide-react';
import { Separator } from "../ui/separator";

interface CategoryItem {
  name: string;
  href: string;
  isNew?: boolean;
}

interface CategoryType {
  category: string;
  items: CategoryItem[];
}

interface GettingStartedSection {
  title: string;
  items: CategoryItem[];
}

interface ComponentSidebarClientProps {
  categories: CategoryType[];
  gettingStartedSection: GettingStartedSection;
}

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({ 
  categories,
  gettingStartedSection 
}) => {
  const currentPath = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    if (!scrollContainer) return;
    
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear the existing timer
      clearTimeout(scrollTimer);
      
      // Set a new timer to hide the scrollbar after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimer);
    };
  }, []);
  
  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "h-full overflow-y-auto transition-all duration-300 py-2 md:py-3",
        isScrolling
          ? "pr-1 md:pr-2 hide-scrollbar scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30"
          : "pr-2 md:pr-3 scrollbar-no"
      )}
    >
      <div className="space-y-6 md:space-y-8 hide-scrollbar">
        {/* Getting Started Section */}
        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          <div className="font-bold tracking-wider px-1 md:px-2 text-sm md:text-base">
            {gettingStartedSection.title}
          </div>
          <div className="space-y-0.5">
            {gettingStartedSection.items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center w-full text-xs md:text-sm py-1.5 md:py-2 rounded-md transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {isActive && (
                    <Minus className="mr-1 text-purple-500" size={20} fill="#9C27B0" style={{ transform: 'rotate(90deg)' }} />
                  )}
                  <span className={cn(
                    "truncate",
                    isActive ? "ml-0" : "ml-3 md:ml-4 group-hover:ml-2 transition-all duration-200"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* NEW badge */}
                  {item.isNew && (
                    <span className="ml-1 md:ml-2 px-1 py-0.5 text-xs font-medium border border-blue-500 text-blue-500 dark:text-white rounded-md">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
         <div className="w-full">
           <Separator/>
         </div>
        </div>    
      <div><h1 className="font-bold tracking-wider px-1 md:px-2 text-sm md:text-base">Components</h1></div>
        {/* Component Categories */}
        {categories.map((category) => {
          return (         
            <div key={category.category} className="space-y-2 md:space-y-3">
              <div className="text-xs font-bold text-primary/80 dark:text-primary/70 uppercase tracking-wider px-1 md:px-2">
                {category.category}
              </div>
              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center w-full text-xs md:text-sm py-1.5 md:py-2 rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {isActive && (
                        <Minus className="mr-1 text-purple-500" size={20} fill="#3455eb" style={{ transform: 'rotate(90deg)' }} />
                      )}
                      <span className={cn(
                        "truncate",
                        isActive ? "ml-0" : "ml-3 md:ml-4 group-hover:ml-2 transition-all duration-200"
                      )}>
                        {item.name}
                      </span>
                      
                      {/* NEW badge */}
                      {item.isNew && (
                        <span className="ml-1 md:ml-2 px-1 py-0.5 text-xs font-medium border border-purple-500 text-purple-500 dark:text-white rounded-md">
                          New
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};